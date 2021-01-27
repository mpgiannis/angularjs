(function() {
    
    angular.module('app.global').service('ssoService', ssoService);
    
    function ssoService($q, $http, localStorageService, $window, ENV_VARS) {
        
        return {
            loginCallback: loginCallback,
            logoutByIdToken: logoutByIdToken,
            getUserInfo: getUserInfo
        };
        
        function validateLoginResponse(parameterMap) {
            if (!parameterMap.access_token) {
                return false;
            }
            if (!parameterMap.token_type) {
                return false;
            }
            if (!parameterMap.expires_in) {
                return false;
            }
            if (!parameterMap.scope) {
                return false;
            }
            if (!parameterMap.id_token) {
                return false;
            }
            return true;
        }
        
        function getUserInfo() {
            let deferred = $q.defer();
            let ssoAuth = localStorageService.get('ssoAuth');
            $http({
                method: 'GET',
                url: ENV_VARS.sso.url + ENV_VARS.sso.userInfo,
                headers: {
                    'Authorization': 'Bearer ' + ssoAuth.accessToken
                },
                params: {
                    'organizationId': ssoAuth.organization,
                    'application': ENV_VARS.sso.application
                }
            }).then(function successCallback(response) {
                let ssoToitsuUserInfo = {
                    birthdate: response.data.userInfo.birthdate,
                    email: response.data.userInfo.email,
                    familyName: response.data.userInfo.familyName,
                    gender: response.data.userInfo.gender,
                    givenName: response.data.userInfo.givenName,
                    id: response.data.userInfo.id,
                    locale: response.data.userInfo.locale,
                    middleName: response.data.userInfo.middleName,
                    name: response.data.userInfo.name,
                    nickname: response.data.userInfo.nickname,
                    phoneNumber: response.data.userInfo.phoneNumber,
                    picture: response.data.userInfo.picture,
                    preferredUsername: response.data.userInfo.preferredUsername,
                    profile: response.data.userInfo.profile,
                    source: response.data.userInfo.source,
                    sub: response.data.userInfo.sub,
                    website: response.data.userInfo.website,
                    zoneinfo: response.data.userInfo.zoneinfo,
                    
                    app: response.data.customInfo.app,
                    org: response.data.customInfo.org,
                    orgId: response.data.customInfo.orgId,
                    orgUuid: response.data.customInfo.orgUuid,
                    orgapi_data: response.data.customInfo.orgapi_data
                };
                let ssoToitsuUserAddress = {};
                if (response.data.userInfo.address) {
                    ssoToitsuUserAddress = {
                        id: response.data.userInfo.address.id,
                        country: response.data.userInfo.address.country,
                        formatted: response.data.userInfo.address.formatted,
                        locality: response.data.userInfo.address.locality,
                        postalCode: response.data.userInfo.address.postalCode,
                        region: response.data.userInfo.address.region,
                        streetAddress: response.data.userInfo.address.streetAddress
                    };
                }
                let ssoToitsuUserPrivileges = {
                    openonesso_scope: response.data.customInfo.openonesso_scope,
                    openonesso_authority: response.data.customInfo.openonesso_authority,
                };
                localStorageService.set('ssoToitsuUserInfo', ssoToitsuUserInfo);
                localStorageService.set('ssoToitsuUserAddress', ssoToitsuUserAddress);
                localStorageService.set('ssoToitsuUserPrivileges', ssoToitsuUserPrivileges);
                deferred.resolve();
            }).catch(function errorCallback() {
                deferred.reject();
            });
            return deferred.promise;
        }
        
        function logoutByIdToken(idToken) {
            $window.location.href = ENV_VARS.sso.url + ENV_VARS.sso.endSession +
                "?id_token_hint=" + idToken +
                "&post_logout_redirect_uri=" + ENV_VARS.frontUrl;
        }
        
        function loginCallback(url) {
            let callbackResponse = (url).split("#");
            if (callbackResponse.length === 2) {
                
                let responseParameters = (callbackResponse[1]).split("&");
                if (responseParameters.length >= 5) {
                    
                    let parameterMap = [];
                    for (let i = 0; i < responseParameters.length; i++) {
                        let responseParameter = responseParameters[i].split("=");
                        parameterMap[responseParameter[0]] = responseParameter[1];
                    }
                    if (validateLoginResponse(parameterMap)) {
                        
                        let organization = callbackResponse[0].split("organization=")[1];
                        let integerPositiveNumberRegex = /^[1-9]\d*$/;
                        if (integerPositiveNumberRegex.test(organization)) {
                            
                            let ssoStorageExpires = new Date();
                            ssoStorageExpires.setSeconds(ssoStorageExpires.getSeconds() + parseInt(parameterMap.expires_in));
                            let ssoAuth = {
                                accessToken: parameterMap.access_token,
                                organization: organization,
                                tokenType: parameterMap.token_type,
                                vat: parameterMap.state.split("vat_")[1],
                                expiresIn: parameterMap.expires_in,
                                expires: ssoStorageExpires,
                                scope: parameterMap.scope,
                                idToken: parameterMap.id_token
                            };
                            localStorageService.set('ssoAuth', ssoAuth);
                            return true;
                        }
                        else {
                            logoutByIdToken(parameterMap.id_token);
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        
    }
    
})();
