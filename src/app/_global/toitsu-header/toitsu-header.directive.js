(function() {
    
    angular.module('app.global').directive('toitsuHeader', toitsuHeader);
    
    function toitsuHeader($translate, $state, authService) {
        
        return {
            restrict: 'E',
            templateUrl: './src/app/_global/toitsu-header/toitsu-header.tpl.html',
            replace: true,
            scope: {},
            link: function(scope, element, attrs) {
                
                let currentLang = $translate.use();
                
                scope.getIconFlagLanguage = function() {
                    if (currentLang === 'el') {
                        return 'gr';
                    }
                    else {
                        return 'gb';
                    }
                };
                
                scope.toggleENLanguage = function() {
                    if (currentLang !== 'en') {
                        currentLang = 'en';
                        retranslation();
                    }
                };
                
                scope.toggleELLanguage = function() {
                    if (currentLang !== 'el') {
                        currentLang = 'el';
                        retranslation();
                    }
                };
                
                function retranslation() {
                    $translate.use(currentLang).then(function() {
                        $state.reload($state.current);
                    });
                }
                
                scope.totalActiveNotifications = 0;
                scope.showNotifs = false;
                
                scope.showNotifications = function() {
                    scope.showNotifs = true;
                };
                
                scope.hideNotifications = function() {
                    scope.showNotifs = false;
                };
                
                scope.login = function() {
                    authService.login();
                };
                
                scope.logout = function() {
                    authService.logout();
                };
                
            }
        };
        
    }
    
})();
