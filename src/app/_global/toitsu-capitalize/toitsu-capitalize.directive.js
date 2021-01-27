(function() {
    
    angular.module('app.global').directive('toitsuCapitalize', toitsuCapitalize);
    
    function toitsuCapitalize() {
        
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
            },
            link: function(scope, element, attrs, controller) {
                
                function upperCaseParser(val) {
                    if(val) {
                        controller.$setViewValue(val.toUpperCase());
                        controller.$render();
                        return val.toUpperCase();
                    }
                    return null;
                }
                
                controller.$parsers.push(upperCaseParser);
            }
        };
    }
    
})();
