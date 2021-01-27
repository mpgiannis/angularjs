(function() {
    
    angular.module('app.global').service('authService', authService);
    
    function authService(localStorageService, $window, ssoService, ENV_VARS) {
        
        return {
            login: login,
            logout: logout,
            getAuthorizationHeader: getAuthorizationHeader,
            isLoggedIn: isLoggedIn,
            isLoggedInWithUserStorage: isLoggedInWithUserStorage,
            getUserDisplayName: getUserDisplayName,
            getUserOrgName: getUserOrgName,
            getUserProfile: getUserProfile,
            getUserPicture: getUserPicture,
            userHasPermission: userHasPermission,
            areUserStorageCreated: areUserStorageCreated,
            removeAuthAndUserStorage: removeAuthAndUserStorage
        };
        
        function login() {
            $window.location.href = ENV_VARS.sso.url + ENV_VARS.sso.federation +
            "&application=" + ENV_VARS.sso.application +
            "&organization=" + encodeURI(ENV_VARS.sso.federationOrganization) +
            "&client_id=" + ENV_VARS.sso.clientId +
            "&response_type=" + ENV_VARS.sso.responseType +
            "&redirect_uri=" + encodeURI(ENV_VARS.frontUrl + ENV_VARS.sso.loginCallback);
        }
        
        function logout() {
            let ssoAuth = localStorageService.get('ssoAuth');
            if (ssoAuth) {
                removeAuthAndUserStorage();
                ssoService.logoutByIdToken(ssoAuth.idToken);
            }
        }
        
        function getUserProfile() {
            return ENV_VARS.sso.url + ENV_VARS.sso.userProfile;
        }
        
        function getUserPicture() {
            let ssoToitsuUserInfo = localStorageService.get('ssoToitsuUserInfo');
            if (ssoToitsuUserInfo) {
                if (ssoToitsuUserInfo.picture) {
                    let userPicture = ssoToitsuUserInfo.picture.split("profiles");
                    return ENV_VARS.sso.url + '/profiles' + userPicture[1];
                }
                else {
                    return './images/avatar.png'
                }
            }
            else {
                return './images/avatar.png'
            }
        }
        
        function getAuthorizationHeader() {
            let authorization;
            let ssoAuth = localStorageService.get('ssoAuth');
            if (ssoAuth) {
                authorization = ssoAuth.tokenType + ' ' + ssoAuth.accessToken + '&organization=' + ssoAuth.organization;
            }
            return authorization;
        }
        
        function isAuthStorageCreated() {
            //TODO - Να αλλάξει ώστε να παίζει το authentication!
            return true;
            
            //let authStorage = localStorageService.get('ssoAuth');
            //if (authStorage) {
            //    return !moment(authStorage.expires).isBefore();
            //}
            //return false;
        }
        
        function areUserStorageCreated() {
            return !!(localStorageService.get('ssoToitsuUserInfo') && localStorageService.get('ssoToitsuUserAddress') && localStorageService.get('ssoToitsuUserPrivileges'));
        }
        
        function removeAuthAndUserStorage() {
            localStorageService.remove('ssoAuth');
            localStorageService.remove('ssoToitsuUserInfo');
            localStorageService.remove('ssoToitsuUserAddress');
            localStorageService.remove('ssoToitsuUserPrivileges');
            localStorageService.remove('ssoToitsuUserData');
        }
        
        function isLoggedIn() {
            if (isAuthStorageCreated()) {
                return true;
            }
            else {
                removeAuthAndUserStorage();
                return false;
            }
        }
        
        function isLoggedInWithUserStorage() {
            let ssoAuth = localStorageService.get('ssoAuth');
            if (ssoAuth) {
                if (!moment(ssoAuth.expires).isBefore()) {
                    if (!areUserStorageCreated()) {
                        ssoService.getUserInfo().then(function successCallback() {
                            return true;
                        }).catch(function errorCallback() {
                            removeAuthAndUserStorage();
                            return false;
                        });
                    }
                    else {
                        return true;
                    }
                }
                else {
                    removeAuthAndUserStorage();
                    return false;
                }
            }
            else {
                removeAuthAndUserStorage();
                return false;
            }
        }
        
        function getUserDisplayName() {
            let displayName = '';
            let ssoToitsuUserInfo = localStorageService.get('ssoToitsuUserInfo');
            if (ssoToitsuUserInfo) {
                if (ssoToitsuUserInfo.name) {
                    displayName = ssoToitsuUserInfo.name;
                }
                else if (ssoToitsuUserInfo.preferredUsername) {
                    displayName = ssoToitsuUserInfo.preferredUsername;
                }
                else if (ssoToitsuUserInfo.nickname) {
                    displayName = ssoToitsuUserInfo.nickname;
                }
                else if (ssoToitsuUserInfo.email) {
                    displayName = ssoToitsuUserInfo.email;
                }
            }
            return displayName;
        }
        
        function getUserOrgName() {
            let orgName = '';
            let ssoToitsuUserInfo = localStorageService.get('ssoToitsuUserInfo');
            if (ssoToitsuUserInfo) {
                if (ssoToitsuUserInfo.org) {
                    orgName = ssoToitsuUserInfo.org;
                }
            }
            return orgName;
        }
        
        function userHasPermission(permissions) {
            if (!permissions || !permissions.length) {
                return true;
            }
            let found = false;
            angular.forEach(permissions, function(permission, index) {
                if (localStorageService.get('ssoToitsuUserPrivileges') && localStorageService.get('ssoToitsuUserPrivileges').openonesso_scope.indexOf(permission) >= 0) {
                    found = true;
                    return;
                }
            });
            return found;
        }
        
    }
    
})();
