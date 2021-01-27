(function() {
    
    angular.module('app.global').service('appService', appService);
    
    function appService($rootScope, $state, $stateParams, $translate, $transitions, $location, $timeout, $uibModal, ssoService, authService, userService, dateService, toitsuToasterService, ENV_VARS) {
        
        return {
            initialize: initialize
        };
        
        function initialize() {
            
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            
            $translate.use('el');
            
            $rootScope.baseUrl = ENV_VARS.baseUrl;
            
            $rootScope.settings = {
                layout: {
                    pageSidebarClosed: false, // sidebar menu state
                    pageContentWhite: true, // set page content layout
                    pageBodySolid: false, // solid body color state
                    //pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
                }
            };
            
            $transitions.onStart({
                to: 'loginCallback'
            }, function(transition) {
                if (!ssoService.loginCallback($location.absUrl())) {
                    transition.abort();
                    $state.transitionTo("app.home");
                }
                else {
                    ssoService.getUserInfo().then(function successCallback() {
                        userService.getUserData().then(function successCallback() {
                            transition.abort();
                            $state.transitionTo("app.home");
                        }).catch(function errorCallback() {
                            authService.logout();
                        });
                    }).catch(function errorCallback() {
                        authService.logout();
                    });
                }
            });
            
            $transitions.onStart({
                to: function(state) {
                    return state.data != null && state.data.authRequired === true;
                }
            }, function(transition) {
                //TODO - Να βγει από σχόλια ώστε να παίζει το authentication!
                //if (authService.isLoggedInWithUserStorage()) {
                //    if (userService.hasUserCemeteriesStorage()) {
                //        if (!authService.userHasPermission(transition.$to().data.permissions) || !authService.userHasPermission(['internal_user'])) {
                //            transition.abort();
                //            $state.transitionTo("app.403");
                //        }
                //    }
                //    else {
                //        transition.abort();
                //        $state.transitionTo("app.home");
                //    }
                //}
                //else {
                //    transition.abort();
                //    $state.transitionTo("app.home");
                //}
            });
            
            /**
             * HTML title
             */
            $transitions.onSuccess({
                to: function(state) {
                    $translate.onReady(function() {
                        if (state.data && state.data.title) {
                            $rootScope.title = $translate.instant(state.data.title);
                        }
                        else {
                            $rootScope.title = $translate.instant('global.appTitle');
                        }
                    });
                }
            });
            
            
            /**
             * Spinner
             */
            $transitions.onStart({}, function() {
                $rootScope.showSpinner = true;
            });
            
            $transitions.onSuccess({}, function() {
                $rootScope.showSpinner = false;
                Layout.setAngularJsSidebarMenuActiveLink('match', null, $state); // activate selected link in the sidebar menu
                
                // auto scorll to page top
                setTimeout(function() {
                    App.scrollTop(); // scroll to the top on content load
                }, $rootScope.settings.layout.pageAutoScrollOnLoad);
            });
            
            $transitions.onError({}, function(transition) {
                $rootScope.showSpinner = false;
                let rejection = transition.error();
                if (rejection.type === 6){
                    if (rejection.detail.status === -1 || rejection.detail.status === 401) {
                        $location.path('/401');
                    }
                    else if (rejection.detail.status === 403) {
                        toitsuToasterService.httpClientError(403);
                    }
                }
            });
            
            /**
             * Toaster
             */
            $rootScope.toasterOptions = {
                'close-button': true,
                'tap-to-dismiss': false,
                'body-output-type': 'trustedHtml',
                'time-out': {
                    'toast-success': 5000,
                    'toast-info': 8000,
                    'toast-warning': 8000,
                    'toast-error': 10000
                }
            };
            
            /**
             * Chosen
             */
            $rootScope.chosenAttrs = {
                allow_single_deselect: true,
                search_contains: true,
                no_results_text: ' ',
                placeholder_text_multiple: 'Επιλέξτε...',
                placeholder_text_single: 'Επιλέξτε...'
            };
            
            /**
             * BlockUI options
             */
            App.blockUIOptions = {
                animate: true,
                overlayColor: 'black'
            };
            
            /**
             * Μέθοδος για αλλαγή της κατάστασης μιας boolean μεταβλητής του δεδομένου scope μεταξύ true και false
             */
            $rootScope.toggleDisplayVar = function(scope, event, displayVar) {
                event.stopPropagation();
                event.preventDefault();
                scope[displayVar] = !scope[displayVar];
            };
            
            /**
             * Μέθοδοι για εμφάνιση ημερομηνιών με σωστό format
             */
            $rootScope.formatDate = function(arg) {
                return dateService.getFormattedMomentWithTzAsDateWithSlashes(arg);
            };
            
            $rootScope.formatDateTime = function(arg) {
                return dateService.getFormattedMomentWithTzAsDateTimeWithSlashes(arg);
            };
            
            /**
             * Μέθοδος για έλεγχο των δικαιωμάτων του χρήστη
             */
            $rootScope.userHasPermission = function(permissions) {
                return authService.userHasPermission(permissions);
            };
            
            /**
             * Μέθοδος για scroll στο κάτω μέρος της σελίδας
             */
            $rootScope.scrollToBottom = function() {
                $('html, body').animate({scrollTop: $(document).height()}, 500);
            };
            
            angular.element(document).ready(function() {
                $('body').removeClass('page-on-load'); // remove page loading indicator
                App.runResizeHandlers(); //Make the side menu scrollbar appear if needed
            });
            
        }
        
    }
    
})();
