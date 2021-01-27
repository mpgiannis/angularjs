(function() {
    
    angular.module('app.cm.registerOffice').factory('registerOfficeFactory', registerOfficeFactory);
    
    function registerOfficeFactory($resource, $rootScope, headerService, registerOfficeConsts) {
        
        return $resource(null, null, {
            'getActive': {
                url: $rootScope.baseUrl + registerOfficeConsts.getActiveUrl,
                method: 'GET',
                isArray: true,
                headers: headerService.getHeadersWithAuth()
            }
        });
        
    }
    
})();