(function() {
    
    angular.module('app.pr.deceased').factory('deceasedFactory', deceasedFactory);
    
    function deceasedFactory($resource, $rootScope, headerService, deceasedConsts) {
        
        return $resource(null, null, {
            'get': {
                url: $rootScope.baseUrl + deceasedConsts.getUrl,
                method: 'GET',
                headers: headerService.getHeadersWithAuth()
            },
            'save': {
                url: $rootScope.baseUrl + deceasedConsts.saveUrl,
                method: 'POST',
                headers: headerService.getHeadersWithAuth()
            }
        });
        
    }
    
})();