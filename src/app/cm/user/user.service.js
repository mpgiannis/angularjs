(function() {
    
    angular.module('app.cm.user').service('userService', userService);
    
    function userService($q, $http, localStorageService, ENV_VARS) {
        
        return {
            getUserData: getUserData
        };
        
        function getUserData() {
            let deferred = $q.defer();
            let ssoAuth = localStorageService.get('ssoAuth');
            $http({
                method: 'GET',
                url: ENV_VARS.baseUrl + "/cm/users/data",
                headers: {
                    'Authorization': 'Bearer ' + ssoAuth.accessToken + '&organization=' + ssoAuth.organization
                }
            }).then(function successCallback(response) {
                localStorageService.set('ssoToitsuUserData', response.data);
                deferred.resolve(true);
            }).catch(function errorCallback() {
                deferred.reject(false);
            });
            return deferred.promise;
        }
        
    }
    
})();
