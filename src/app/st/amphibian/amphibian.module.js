(function() {
    
    angular.module('app.st.amphibian', []).config(config);
    
    function config($stateProvider) {
        
        $stateProvider.state({
            name: 'app.st.amphibian',
            url: 'amphibian',
            abstract: true
        });

        
        
        $stateProvider.state({
            name: 'app.st.amphibian.list',
            url: '/list',
            templateUrl: './src/app/st/amphibian/amphibian-list.html',
            controller: 'AmphibianListController',
            data: {
                title: 'menu.st.amphibian.list',
                authRequired: true,
                permissions: []
            },
            params:{

            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/amphibian/amphibian-list.controller.js',
                            './node_modules/file-saver/FileSaver.js'
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        
        $stateProvider.state({
            name: 'app.st.amphibian.view',
            url: '/view',
            templateUrl: './src/app/st/amphibian/amphibian-view.html',
            controller: 'AmphibianViewController',
            data: {
                title: 'menu.st.amphibian.view',
                authRequired: true,
                permissions: []
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/amphibian/amphibian-view.controller.js',
                            './src/app/_common/select-person/select-person.directive.js',
                            './src/app/_common/select-person/select-person.controller.js'
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.view', 'title': 'menu.st.amphibian.view'}];
                }
            }
        });



    }
    
})();
