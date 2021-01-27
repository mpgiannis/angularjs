(function() {
    
    angular.module('app.st.stores.reports').factory('reportsFactory', reportsFactory);
    
    function reportsFactory($resource, headerService, reportsConsts) {
          
        return $resource(null, null, {
         
            'getReports': {
                url: reportsConsts.getUrl,
                method: 'GET',
                isArray:true,
                headers: headerService.getSimpleHeaders()
            },
            'getReport': {
                url: reportsConsts.getUrl+'/:reportId',
                method: 'GET',
                headers: headerService.getSimpleHeaders()
            },
            'save': {
                url: reportsConsts.getUrl,
                method: 'POST',
                headers: headerService.getHeadersWithAuth()
            },
            'deleteReport': {
                url: reportsConsts.getUrl+'/:reportId',
                method: 'DELETE',
                headers: headerService.getSimpleHeaders(),
                responseType: 'arraybuffer'
            },
            'updateReport': {
                url: reportsConsts.getUrl,
                method: 'PUT',
                headers: headerService.getHeadersWithAuth()
            },
            'saveImportExport': {
                url: reportsConsts.getImExUrl,
                method: 'POST',
                headers: headerService.getHeadersWithAuth()
            },
            'deleteImportExport': {
                url: reportsConsts.getImExUrl+'/:imexId',
                method: 'DELETE',
                headers: headerService.getSimpleHeaders(),
                responseType: 'arraybuffer'
            },
            'updateImportExport': {
                url: reportsConsts.getImExUrl,
                method: 'PUT',
                headers: headerService.getHeadersWithAuth()
            }
        });  
    }
})();