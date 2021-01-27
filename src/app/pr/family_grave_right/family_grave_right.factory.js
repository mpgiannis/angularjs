(function() {
    
    angular.module('app.pr.familyGraveRight').factory('familyGraveRightFactory', familyGraveRightFactory);
    
    function familyGraveRightFactory($resource, $rootScope, headerService, familyGraveRightConsts) {
        
        return $resource(null, null, {
            'get': {
                url: $rootScope.baseUrl + familyGraveRightConsts.getUrl,
                method: 'GET',
                headers: headerService.getHeadersWithAuth()
            },
            'getByBeneficiary': {
                url: $rootScope.baseUrl + familyGraveRightConsts.getByBeneficiaryUrl,
                method: 'GET',
                isArray: true,
                headers: headerService.getHeadersWithAuth()
            },
            'save': {
                url: $rootScope.baseUrl + familyGraveRightConsts.saveUrl,
                method: 'POST',
                headers: headerService.getHeadersWithAuth()
            }
        });
        
    }
    
})();