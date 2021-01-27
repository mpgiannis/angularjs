(function() {
    
    angular.module('app', [
        'ui.router',
        'ui.bootstrap',
        'ngAnimate',
        'ngResource',
        'pascalprecht.translate',
        'oc.lazyLoad',
        'toaster',
        'ui.select',
        'localytics.directives',
        'ui.mask',
        'ui.bootstrap.datetimepicker',
        'ngBootbox',
        'ngJsTree',
        'ngFileUpload',
        'ngFileSaver',
        'LocalStorageModule',
        'app.config',
        'app.global',
        'app.common',
        'app.cm',
        'app.st',
        'app.pr'
    ]);
    
    angular.module('app').config(config);
    
    function config($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider, $locationProvider) {
        
        /**
         * Routing
         */
        $stateProvider.state({
            name: 'loginCallback',
            url: '/logincallback',
            data: {
                authRequired: false
            }
        });
        
        $stateProvider.state({
            name: 'app',
            abstract: true
        });
        
        $stateProvider.state({
            name: 'app.home',
            url: '/',
            template: '',
            data: {
                authRequired: false
            },
            resolve: {
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [];
                }
            }
        });
        
        $stateProvider.state({
            name: 'app.401',
            url: '/401',
            template: '<div class="row">'+'<div class="col-md-12 text-center">'+
                    '<h3 class="font-red">{{ "global.error.401" | translate}}</h3>'+
                    '<p>{{ "global.error.401.continue" | translate}}</p>'+
                    '</div>'+'</div>',
            data: {
                authRequired: false
            },
            resolve: {
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [];
                }
            },
            controller: function(authService){
                authService.removeAuthAndUserStorage();
            }
        });
        
        $stateProvider.state({
            name: 'app.403',
            url: '/403',
            template: '<div class="row">'+'<div class="col-md-12 text-center">'+
                    '<h3 class="font-red">{{ "global.error.403" | translate}}</h3>'+
                    '</div>'+'</div>',
            data: {
                authRequired: false
            },
            resolve: {
                activation: function($rootScope) {
                    $rootScope.breadcrumbs = [];
                }
            },
            controller: function($translate){
            }
        });
                
        //Αν δοθεί url που δεν αντιστοιχεί σε state, γίνεται μετάβαση στην αρχική σελίδα
        $urlRouterProvider.otherwise(function($injector) {
            $injector.get('$state').go('app.home');
        });
    
        /**
         * Error interceptor to catch errors in http requests
         */
        $httpProvider.interceptors.push('errorInterceptorFactory');
        
        /**
         * Messages
         */
        $translateProvider.useStaticFilesLoader({files: [{prefix: '/messages/messages-', suffix: '.json'}]});
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.useLoaderCache(true);
        
        /**
         * Αφαίρεση του # από το url
         */
        $locationProvider.html5Mode({
            enabled: true
        });
    
        /**
         * Χρήση σωστού timezone στη μετατροπή των ημερομηνιών σε JSON
         */
        Date.prototype.toJSON = function() {
            return moment(this).format();
        };
    }
    
    angular.module('app').run(run);
    
    function run(appService) {
        appService.initialize();
    }
    
    angular.element(document).ready(ready);
    
    function ready() {
        angular.bootstrap(document, ['app']);
    }
    
})();
