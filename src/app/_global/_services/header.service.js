(function() {
    
    angular.module('app.global').service('headerService', headerService);
    
    function headerService(authService) {
        
        return {

            getHeadersWithAuth: getHeadersWithAuth,
            setXhrAuthHeader: setXhrAuthHeader,
            getHeadersWithAuthAndContentTypePdf: getHeadersWithAuthAndContentTypePdf,
            getSimpleHeaders: getSimpleHeaders
        };
        
        function getHeadersWithAuth() {
            let headers = {};
            headers['Authorization'] = authService.getAuthorizationHeader();
            return headers;
        }
        
        function getHeadersWithAuthAndContentType() {
            let headers = {
                'Content-Type': 'application/json;charset=UTF-8'
            };
            headers['Authorization'] = authService.getAuthorizationHeader();
            return headers;
        }

        function getHeadersWithAuthAndContentTypePdf() {
            let headers = {
                'Content-Type': 'application/pdf'
            };
            headers['Authorization'] = authService.getAuthorizationHeader();
            return headers;
        }
        
        function setXhrAuthHeader(xhr) {
            xhr.setRequestHeader('Authorization', authService.getAuthorizationHeader());
        }

        function getSimpleHeaders() {
            let headers = {
                'Content-Type': 'application/json;charset=UTF-8'
            };
           /*  headers['Authorization'] = authService.getAuthorizationHeader();  */
            return headers;
        }
        
    }
    
})();
