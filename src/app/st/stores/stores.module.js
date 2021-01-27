(function() {
    angular.module('app.st.stores', []).config(config);
    function config($stateProvider) {
        
        $stateProvider.state({
            name: 'app.st.stores',
            url: 'stores',
            abstract: true
            
        });

        $stateProvider.state({
            name: 'app.st.stores.list',
            url: '/list',
            templateUrl: './src/app/st/stores/stores-list.html',
            controller: 'StoresListController',
            data: {
              
            },
            params:{
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/stores-list.controller.js',
                            './src/app/st/stores/deleteImage.jpg'
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });

        $stateProvider.state({
            name: 'app.st.stores.racks',
            url: '/:storeId/racks',
            templateUrl: './src/app/st/stores/stores-racks.html',
            controller: 'RacksController',
            data: {
              
            },
            params:{
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/stores-racks.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        $stateProvider.state({
            name: 'app.st.stores.newStore',
            url: '/newStore',
            templateUrl: './src/app/st/stores/stores-newStore.html',
            controller: 'NewStoreController',
            data: {
              
            },
            params:{
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/stores-newStore.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        $stateProvider.state({
            name: 'app.st.stores.newRack',
            url: '/:id/newRack',
            templateUrl: './src/app/st/stores/stores-newRack.html',
            controller: 'NewRackController',
            data: {
              
            },
            params:{
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/stores-newRack.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        $stateProvider.state({
            name: 'app.st.stores.editStore',
            url: '/editStore',
            templateUrl: './src/app/st/stores/stores-editStore.html',
            controller: 'EditStoreController',
            data: {
              
            },
            params:{
                obj: null
                
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/stores-editStore.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        $stateProvider.state({
            name: 'app.st.stores.editRack',
            url: '/editRack',
            templateUrl: './src/app/st/stores/stores-editRack.html',
            controller: 'EditRackController',
            data: {
              
            },
            params:{
                obj: null
                
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/stores-editRack.controller.js',
                            
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

