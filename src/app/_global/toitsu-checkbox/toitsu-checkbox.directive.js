(function() {
    
    angular.module('app.global').directive('toitsuCheckbox', toitsuCheckbox);
    
    function toitsuCheckbox() {
        
        return {
            restrict: 'E',
            templateUrl: './src/app/_global/toitsu-checkbox/toitsu-checkbox.tpl.html',
            replace: true,
            scope: {
                model: '=',
                name: '@',
                disabled: '=ngDisabled', 
                change: '&' //Το περιεχόμενο της μεθόδου πρέπει να περικλείεται σε $timeout
            }
        };
        
    }
    
})();