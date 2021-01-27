(function() {
    
    angular.module('app.global').directive('toitsuToolbar', toitsuToolbar);
    
    function toitsuToolbar() {
        
        return {
            restrict: 'E',
            templateUrl: './src/app/_global/toitsu-toolbar/toitsu-toolbar.tpl.html',
            replace: true,
            scope: {}
        };
        
    }
    
})();