(function() {
    
    angular.module('app.cm.country').factory('countryFactory', countryFactory);
    
    function countryFactory($resource, $rootScope, headerService, countryConsts) {
        
        return $resource(null, null, {
            'getActive': {
                url: $rootScope.baseUrl + countryConsts.getActiveUrl,
                method: 'GET',
                isArray: true,
                headers: headerService.getHeadersWithAuth()
            }
        });
        
    }
    
})();