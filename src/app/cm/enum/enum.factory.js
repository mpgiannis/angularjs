(function() {
    
    angular.module('app.cm.enum').factory('enumFactory', enumFactory);
    
    function enumFactory($resource, $rootScope, headerService, enumConsts) {
        
        return $resource(null, null, {
            'getValues': {
                url: $rootScope.baseUrl + enumConsts.getValuesUrl,
                method: 'GET',
                isArray: true,
                headers: headerService.getHeadersWithAuth()
            }
        });
        
    }
    
})();