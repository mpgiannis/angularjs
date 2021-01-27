(function() {
    
    angular.module('app.global').directive('toitsuSpinner', toitsuSpinner);
    
    function toitsuSpinner() {
        
        return {
            restrict: 'E',
            templateUrl: './src/app/_global/toitsu-spinner/toitsu-spinner.tpl.html',
            replace: true,
            scope: {}
        };
        
    }
    
})();