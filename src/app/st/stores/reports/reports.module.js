(function() {
   
    angular.module('app.st.stores.reports', ['ngMaterial']).config(config);
    
    function config($stateProvider) {

      
        
        $stateProvider.state({
            name: 'app.st.stores.reports',
            url: '/reports',
            templateUrl: './src/app/st/stores/reports/reports.html',
            controller: 'ReportsController',
            data: {
              
            },
            params:{
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/reports/reports.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        $stateProvider.state({
            name: 'app.st.stores.newReport',
            url: '/newReport',
            templateUrl: './src/app/st/stores/reports/newReport.html',
            controller: 'NewReportController',
            data: {
              
            },
            params:{
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/reports/newReport.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        $stateProvider.state({
            name: 'app.st.stores.editReport',
            url: '/editReport',
            templateUrl: './src/app/st/stores/reports/editReport.html',
            controller: 'EditReportController',
            data: {
              
            },
            params:{
                obj: null
                
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/reports/editReport.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        $stateProvider.state({
            name: 'app.st.stores.importsExports',
            url: '/reports/:reportId/importsExports',
            templateUrl: './src/app/st/stores/reports/importsExports.html',
            controller: 'ImportsExportsController',
            data: {
              
            },
            params:{
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/reports/importsExports.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        $stateProvider.state({
            name: 'app.st.stores.newImportExport',
            url: '/reports/:id/newImportExport',
            templateUrl: './src/app/st/stores/reports/newImportExport.html',
            controller: 'NewImportExportController',
            data: {
              
            },
            params:{
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/reports/newImportExport.controller.js',
                            
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [{'state': 'app.st.amphibian.list', 'title': 'menu.st.amphibian.list'}];
                }
            }
        });
        $stateProvider.state({
            name: 'app.st.stores.editImportExport',
            url: '/editImportExport',
            templateUrl: './src/app/st/stores/reports/editImportExport.html',
            controller: 'EditImportExportController',
            data: {
              
            },
            params:{
                obj: null
                
        
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/st/stores/reports/editImportExport.controller.js',
                            
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

