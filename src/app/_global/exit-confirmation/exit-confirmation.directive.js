(function() {
    
    angular.module('app.global').directive('exitConfirmation', exitConfirmation);
    
    function exitConfirmation($transitions, $ngBootbox, $rootScope, $state, $stateParams, $translate) {
        
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                
                //Ανάκτηση φόρμας από το name attribute του element που έχει δηλωμένο το directive.
                let form = scope[attrs.name];
                
                $transitions.onStart({}, function(transition) {
                    
                    if(form.$dirty) {
                        
                        if(transition.from() === transition.to()) {
                            //Αν το state εκκίνησης και προορισμού είναι το ίδιο, τότε δε βγαίνει το exitConfirmation.
                            //Μπορεί να γίνει βελτίωση της υλοποίησης ώστε να λαμβάνονται υπόψη παράμετροι ανά state.
                            
                            //Ορισμός του $dirty σε false για να μη βγει ξανά η επιβεβαίωση.
                            form.$dirty = false;
                        }
                        else {
                            //Διακοπή της μετάβασης
                            transition.abort();
                            $rootScope.showSpinner = false;
                            
                            $ngBootbox.customDialog({
                                message: $translate.instant('global.exitConfirmation'),
                                buttons: {
                                    confirm: {
                                        label: $translate.instant('global.confirm'),
                                        className: 'btn-success',
                                        callback: function() {
                                            //Ορισμός του $dirty σε false για να μη βγει ξανά η επιβεβαίωση.
                                            form.$dirty = false;
                                            
                                            //Μετάβαση στο state προορισμού.
                                            $state.go(transition.to());
                                        }
                                    },
                                    cancel: {
                                        label: $translate.instant('global.cancel'),
                                        className: 'btn-danger',
                                        callback: function() {
                                            //Δε γίνεται καμία ενέργεια.
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
                
            }
        };
    }
    
})();
