(function() {
    
    angular.module('app.global').directive('toitsuNumber', toitsuNumber);
    
    function toitsuNumber($timeout) {
        
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                isFloat: '=',
                decimals: '=',
                hideThousands: '=',
                alignRight: '='
            },
            link: function(scope, element, attrs, controller) {
                
                /**
                 * Ταξινόμηση κειμένου δεξιά αν η παράμετρος alignRight είναι true
                 */
                if(scope.alignRight) {
                    element.addClass('text-align-right');
                }
                
                /**
                 * Κατά την αρχικοποίηση, η εμφάνιση του πεδίου προσαρμόζεται ώστε το κόμμα να είναι το διαχωριστικό του δεκαδικού μέρους.
                 * Επίσης εμφανίζεται η τελεία στις χιλιάδες αν δεν έχουμε hideThousands = true.
                 */
                $timeout(function() {
                    if(controller.$modelValue) {
                        controller.$setViewValue(String(controller.$modelValue).replace('.', ','));
                        controller.$render();
                        
                        let renderedValue = String(controller.$modelValue).replace('.', ',');
                        if(!scope.hideThousands) {
                            renderedValue = addThousandsDots(renderedValue);
                        }
                        if(scope.isFloat) {
                            renderedValue = appendTrailingDecimalZeroes(renderedValue, scope.decimals);
                        }
                        element[0].value = renderedValue;
                    }
                });
                
                /**
                 * Εμφάνιση ακέραιου αριθμού.
                 * Οι μη επιτρεπτοί χαρακτήρες αφαιρούνται αυτόματα.
                 */
                function integerInputValue(val) {
                    if(val) {
                        let digits = val.replace(/[^0-9]/g, '');
                        if(digits !== val) {
                            controller.$setViewValue(digits);
                            controller.$render();
                        }
                        return parseInt(digits, 10);
                    }
                    return undefined;
                }
    
                /**
                 * Εμφάνιση δεκαδικού αριθμού.
                 * Οι μη επιτρεπτοί χαρακτήρες αφαιρούνται αυτόματα.
                 * Αν ο χρήστης πληκτρολογήσει την τελεία, αυτή μετατρέπεται σε κόμμα.
                 * Επίσης κόβονται τα επιπλέον δεκαδικά ψηφία.
                 */
                function floatInputValue(val) {
                    
                    if(val) {
                        let digits = val.replace(/[^0-9.,]/g, '');
                        
                        digits = digits.replace(/,/g, '.');
                        
                        if(digits.split('.').length > 2) {
                            digits = digits.substring(0, digits.length - 1);
                        }
                        digits = trimExtraDecimalDigits(digits, scope.decimals);
                        
                        let viewValue = digits.replace('.', ',');
                        
                        controller.$setViewValue(viewValue);
                        controller.$render();
                        
                        return parseFloat(digits);
                    }
                    return undefined;
                }
                
                if(scope.isFloat) {
                    controller.$parsers.push(floatInputValue);
                }
                else {
                    controller.$parsers.push(integerInputValue);
                }
                
                /**
                 * Όταν γίνεται εστίαση στο πεδίο, η τιμή που φαίνεται δεν περιέχει επιπλέον δεκαδικά μηδενικά ή τις τελείες των χιλιάδων.
                 * Όταν το πεδίο χάνει την εστίαση, εμφανίζονται τα επιπλέον δεκαδικά μηδενικά και οι τελείες των χιλιάδων (αν δεν έχουμε hideThousands = true).
                 */
                
                element.on('focus', function () {
                    if(controller.$modelValue) {
                        controller.$setViewValue(String(controller.$modelValue).replace('.', ','));
                        controller.$render();
                    }
                });
                
                element.on('blur', function () {
                    if(controller.$modelValue) {
                        let renderedValue = String(controller.$modelValue).replace('.', ',');
                        if(!scope.hideThousands) {
                            renderedValue = addThousandsDots(renderedValue);
                        }
                        if(scope.isFloat) {
                            renderedValue = appendTrailingDecimalZeroes(renderedValue, scope.decimals);
                        }
                        element[0].value = renderedValue;
                    }
                });
                
                /**
                 * Προσθήκη τελειών χιλιάδων στο δεδομένο αριθμητικό string.
                 */
                function addThousandsDots(numberString) {
                    
                    let splitArray = numberString.split(',');
                    let integerPart = splitArray[0];
                    let integerPartWithDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    
                    if(splitArray.length === 1) {
                        return integerPartWithDots;
                    }
                    else if(splitArray.length === 2) {
                        return integerPartWithDots + ',' + splitArray[1];
                    }
                    else {
                        return numberString;
                    }
                }
                
                /**
                 * Προσθήκη επιπλέον μηδενικών (αν απαιτείται) στο τέλος του δεδομένου αριθμητικού string. 
                 */
                function appendTrailingDecimalZeroes(numberString, decimals) {
                    
                    let myDecimals = decimals ? decimals : 2;
                    
                    let splitArray = numberString.split(',');
                    let integerPart = splitArray[0];
                    
                    if(splitArray.length === 1 || splitArray.length === 2) {
                        let decimalPart = (splitArray.length === 1) ? '' : splitArray[1];
                        
                        let extraZeroes = myDecimals - decimalPart.length;
                        for(let i=0; i<extraZeroes; i++) {
                            decimalPart += '0';
                        }
                        
                        return integerPart + ',' + decimalPart;
                    }
                    else {
                        return numberString;
                    }
                }
                
                /**
                 * Αφαίρεση των τελευταίων δεκαδικών ψηφίων από το δεδομένο αριθμητικό string,
                 * ώστε να υπάρχουν το πολύ decimals δεκαδικά.
                 * Αν δεν έχει δοθεί το decimals, κρατάμε έως 2 δεκαδικά.
                 */
                function trimExtraDecimalDigits(numberString, decimals) {
                    let myDecimals = decimals ? decimals : 2;
                    
                    let splitArray = numberString.split('.');
                    let integerPart = splitArray[0];
                    
                    if(splitArray.length === 1) {
                        return integerPart;
                    }
                    else if(splitArray.length === 2) {
                        return integerPart + '.' + splitArray[1].substring(0, myDecimals);
                    }
                    else {
                        return numberString;
                    }
                }
            }
        };
    }
    
})();
