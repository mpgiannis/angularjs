(function() {
    
    angular.module('app.global').directive('authDirective', authDirective);
    
    function authDirective(authService) {
        
        return {
            restrict: 'A',
            link: function(scope) {
                
                scope.isLoggedIn = function() {
                    return authService.isLoggedIn();
                };
                                
                scope.getUserDisplayName = function() {
                    return authService.getUserDisplayName();
                };
                
                scope.getUserOrgName = function() {
                    return authService.getUserOrgName();
                };
                
                scope.getUserProfile = function() {
                    return authService.getUserProfile();
                };
                
                scope.getUserPicture = function() {
                    return authService.getUserPicture();
                }
                
            }
        };
        
    }
    
})();
