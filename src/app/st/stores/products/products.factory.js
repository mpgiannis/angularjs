(function() {
    
    angular.module('app.st.stores.products').factory('ProductsFactory', productsFactory);
    
    function productsFactory($resource, headerService, productsConsts) {
          
        return $resource(null, null, {
         
            'getProducts': {
                url: productsConsts.getUrl,
                method: 'GET',
                isArray:true,
                headers: headerService.getSimpleHeaders()
            },
            'deleteProduct': {
                url: productsConsts.getUrl+'/:productId',
                method: 'DELETE',
                headers: headerService.getSimpleHeaders(),
                responseType: 'arraybuffer'
            },
            'save': {
                url: productsConsts.getUrl,
                method: 'POST',
                headers: headerService.getHeadersWithAuth()
            },

            'updateProduct': {
                url: productsConsts.getUrl,
                method: 'PUT',
                headers: headerService.getHeadersWithAuth()
            },
            'getProduct': {
                url: productsConsts.getUrl+'/:productId',
                method: 'GET',
                headers: headerService.getSimpleHeaders()
            }
        });  
    }
})();