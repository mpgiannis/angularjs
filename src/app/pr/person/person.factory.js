(function() {
    
    angular.module('app.pr.person').factory('personFactory', personFactory);
    
    function personFactory($resource, $rootScope, headerService, personConsts) {
        
        return $resource(null, null, {
            'get': {
                url: $rootScope.baseUrl + personConsts.getUrl,
                method: 'GET',
                headers: headerService.getHeadersWithAuth()
            }
        });
        
    }
    
})();