(function() {
    
    angular.module('app.global').directive('toitsuFooter', toitsuFooter);
    
    function toitsuFooter(ENV_VARS) {
        
        return {
            restrict: 'E',
            templateUrl: './src/app/_global/toitsu-footer/toitsu-footer.tpl.html',
            replace: true,
            scope: {},
            link: function(scope, element, attrs) {
                
                scope.version = ENV_VARS.version;
                
                Layout.initFooter();
                
                let cur = 2018;
                let year = new Date();
                if (cur === year.getFullYear()) {
                    year = year.getFullYear();
                }
                else {
                    year = cur + '-' + year.getFullYear();
                }
                document.getElementById("copyright-years").innerHTML = year;
            }
        };
        
    }
    
})();