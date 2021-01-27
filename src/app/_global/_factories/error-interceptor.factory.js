(function() {
    
    angular.module('app').factory('errorInterceptorFactory', errorInterceptorFactory);
    
    function errorInterceptorFactory($q, $log, $location, $translate, toitsuToasterService) {
        
        return {
            request: function(config) {
                return config || $q.when(config);
            },
            requestError: function(request) {
                return $q.reject(request);
            },
            response: function(response) {
                return response || $q.when(response);
            },
            responseError: function(response) {
                
                let responseData = (response.data ? response.data : {});
                
                //Εάν το επιστρεφόμενο response είναι σε μορφή arraybuffer
                //(προς το παρόν στη διαδικασία δημιουργίας excel αρχείων)
                //πραγματοποιείται μετατροπή του σε μορφή JSON object ώστε
                //να είναι εφικτή η ομοιόμορφη διαχείριση τους
                if(response && response.config && response.config.responseType === "arraybuffer" && response.data) {
                    
                    let responseDataView = new DataView(response.data);
                    let decoder = new TextDecoder("utf-8");
                    let responseDataString = decoder.decode(responseDataView);
                    responseData = JSON.parse(responseDataString);
                    
                    //Συντόμευση του url στις μεθόδους δημιουργίας excel αρχείων
                    if(responseData && responseData.url) {
                        let indexOf = responseData.url.indexOf('excel?model');
                        if(indexOf > -1) {
                            responseData.url = responseData.url.substring(0, indexOf + 6);
                        }
                    }
                }
                
                if(response && (response.status === 401 || response.status === -1)) {
                    $location.path('/401');
                }
                
                if(response && response.status === 403) {
                    toitsuToasterService.httpClientError(403);
                }
                
                if(response && (response.status >= 500)) {
                    //Log the error to browser console
                    $log.error("Error 500: " + responseData.errorId);
                    
                    //Εμφάνιση του σφάλματος με το toaster
                    toitsuToasterService.httpError(response, 'data');
                }
                
                return $q.reject(response);
            }
        };
    }
    
    
})();
