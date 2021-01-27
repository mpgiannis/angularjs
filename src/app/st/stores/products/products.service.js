(function() {
    
    angular.module('app.st.stores.products').service('ProductsService', productsService);
    
    function productsService(ProductsFactory) {
        
        return {
            getAllProducts:getAllProducts,
            deleteProduct:deleteProduct,
            saveProduct:saveProduct,
            updateProduct:updateProduct,
            getProduct:getProduct
        }

        function getAllProducts() {
            return ProductsFactory.getProducts({}, null);
        }  
        function deleteProduct(productId) {
            return ProductsFactory.deleteProduct({productId:productId}, null);
        } 
        function saveProduct(product) {
            return ProductsFactory.save({}, product);
        }
        function updateProduct(product) {
            return ProductsFactory.updateProduct({}, product);
        }
        function getProduct(productId) {
            return ProductsFactory.getProduct({productId:productId}, null);
        } 
    }
    
})();