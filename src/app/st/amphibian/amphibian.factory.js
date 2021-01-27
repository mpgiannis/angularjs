(function() {
    
    angular.module('app.st.amphibian').factory('amphibianFactory', amphibianFactory);
    
    function amphibianFactory($resource, $rootScope, headerService, amphibianConsts) {
          
        return $resource(null, null, {
            'get': {
                url: $rootScope.baseUrl + amphibianConsts.getUrl,
                method: 'GET',
                headers: headerService.getHeadersWithAuth()
            },
            'save': {
                url: $rootScope.baseUrl + amphibianConsts.saveUrl,
                method: 'POST',
                headers: headerService.getHeadersWithAuth()
            }
        });
        
    }
    
})();