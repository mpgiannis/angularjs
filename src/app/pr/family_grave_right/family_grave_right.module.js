(function() {
    
    angular.module('app.pr.familyGraveRight', []).config(config);
    
    function config($stateProvider) {
        
        $stateProvider.state({
            name: 'app.pr.familyGraveRight',
            url: 'familygraveright',
            abstract: true
        });
        
        $stateProvider.state({
            name: 'app.pr.familyGraveRight.list',
            url: '/list',
            templateUrl: './src/app/pr/family_grave_right/family_grave_right-list.html',
            controller: 'FamilyGraveRightListController',
            data: {
                title: 'menu.pr.familyGraveRight.list',
                authRequired: true,
                permissions: []
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/pr/family_grave_right/family_grave_right-list.controller.js'
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs =[{'state': 'app.pr.familyGraveRight.list', 'title': 'menu.pr.familyGraveRight.list'}];
                }
            }
        });
        
        $stateProvider.state({
            name: 'app.pr.familyGraveRight.view',
            url: '/view',
            templateUrl: './src/app/pr/family_grave_right/family_grave_right-view.html',
            controller: 'FamilyGraveRightViewController',
            data: {
                title: 'menu.pr.familyGraveRight.view',
                authRequired: true,
                permissions: []
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/pr/family_grave_right/family_grave_right-view.controller.js'
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs =[{'state': 'app.pr.familyGraveRight.view', 'title': 'menu.pr.familyGraveRight.view'}];
                }
            }
        });
    }
    
})();