(function() {
    
    angular.module('app.st.stores').factory('StoresFactory', StoresFactory);
    
    function StoresFactory($resource, headerService, storesConsts) {
        
        return $resource(null, null, {
            'get': {
                url: storesConsts.getUrl,
                method: 'GET',
                isArray:true,
                headers: headerService.getSimpleHeaders()
            },
            'getStore': {
                url: storesConsts.getUrl+'/:storeId',
                method: 'GET',
                headers: headerService.getSimpleHeaders()
            },
            'deleteStore': {
                url: storesConsts.getUrl+'/:storeId',
                method: 'DELETE',
                headers: headerService.getSimpleHeaders(),
                responseType: 'arraybuffer'
            },
            'save': {
                url: storesConsts.getUrl,
                method: 'POST',
                headers: headerService.getHeadersWithAuth()
            },
            'deleteRack': {
                url: storesConsts.getRacksUrl+'/:rackId',
                method: 'DELETE',
                headers: headerService.getSimpleHeaders(),
                responseType: 'arraybuffer'
            },

            'saveRack': {
                url: storesConsts.getRacksUrl,
                method: 'POST',
                headers: headerService.getHeadersWithAuth()
            },

            'updateStore': {
                url: storesConsts.getUrl,
                method: 'PUT',
                headers: headerService.getHeadersWithAuth()
            },

            'updateRack': {
                url:  storesConsts.getRacksUrl,
                method: 'PUT',
                headers: headerService.getHeadersWithAuth()
            },
            'getRack': {
                url: storesConsts.getRacksUrl+'/:rackId',
                method: 'GET',
                headers: headerService.getSimpleHeaders()
            },
            'getAllRacks': {
                url: storesConsts.getRacksUrl,
                method: 'GET',
                isArray:true,
                headers: headerService.getSimpleHeaders()
            }
        });
    }
    
})();