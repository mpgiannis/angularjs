(function() {
    
    angular.module('app.pr.deceased', []).config(config);
    
    function config($stateProvider) {
        
        $stateProvider.state({
            name: 'app.pr.deceased',
            url: 'deceased',
            abstract: true
        });
        
        $stateProvider.state({
            name: 'app.pr.deceased.list',
            url: '/list',
            templateUrl: './src/app/pr/deceased/deceased-list.html',
            controller: 'DeceasedListController',
            data: {
                title: 'menu.pr.deceased.list',
                authRequired: true,
                permissions: []
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/pr/deceased/deceased-list.controller.js'
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs =[{'state': 'app.pr.deceased.list', 'title': 'menu.pr.deceased.list'}];
                }
            }
        });
        
        $stateProvider.state({
            name: 'app.pr.deceased.view',
            url: '/view/:id',
            templateUrl: './src/app/pr/deceased/deceased-view.html',
            controller: 'DeceasedViewController',
            data: {
                title: 'menu.pr.deceased.view',
                authRequired: true,
                permissions: []
            },
            params: {
                id: {dynamic: true}
            },
            resolve: {
                dependencies: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            './src/app/pr/deceased/deceased-view.controller.js',
                            './src/app/_common/select-person/select-person.directive.js',
                            './src/app/_common/select-person/select-person.controller.js'
                        ]
                    }]);
                },
                activation: function($rootScope) {
                    $rootScope.breadcrumbs =[{'state': 'app.pr.deceased.view', 'title': 'menu.pr.deceased.view'}];
                },
                deceased: function($stateParams, deceasedService) {
                    return !$stateParams.id ? {person: {}} : deceasedService.getDeceased($stateParams.id).$promise;
                },
                lists: function($q, enumService, countryService, registerOfficeService) {
                    let lists = {};
                    
                    lists.personTypes = enumService.getEnumValues('pr.core.enums.PersonType').$promise;
                    lists.genders = enumService.getEnumValues('global.core.enums.Gender').$promise;
                    lists.countries = countryService.getActiveCountries().$promise;
                    lists.registerOffices = registerOfficeService.getActiveRegisterOffices().$promise;
                    lists.birthDateTypes = [{label: 'Ημερομηνία', ordinal: 0}, {label: 'Ημερομηνία/Ώρα', ordinal: 1}, {label: 'Έτος', ordinal: 2}];
                    
                    return $q.all(lists);
                }
            }
        });
    }
    
})();
