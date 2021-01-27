(function() {
    angular.module('app.st.stores.products', []).config(config);
    function config($stateProvider) {
        
        $stateProvider.state({
            name: 'app.st.stores.products',
            url: '/products',
            templateUrl: './src/app/st/stores/products/products.html',
            controller: 'ProductsController',
            data: {
              
            },
            params:{
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/products/products.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        $stateProvider.state({
            name: 'app.st.stores.newProduct',
            url: '/newProduct',
            templateUrl: './src/app/st/stores/products/newProduct.html',
            controller: 'NewProductController',
            data: {
              
            },
            params:{
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/products/newProduct.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        $stateProvider.state({
            name: 'app.st.stores.editProduct',
            url: '/editProduct',
            templateUrl: './src/app/st/stores/products/editProduct.html',
            controller: 'EditProductController',
            data: {
              
            },
            params:{
                obj: null
                
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/products/editProduct.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
 }  
})();

