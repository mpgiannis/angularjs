(function() {
    angular.module('app.st.stores.reports').service('reportsService', reportsService);
    function reportsService(reportsFactory) {
        
        return {
            getAllReports:getAllReports,
            getReport:getReport,
            saveReport:saveReport,
            deleteReport:deleteReport,
            updateReport:updateReport,
            saveImportExport:saveImportExport,
            deleteImportExport:deleteImportExport,
            updateImportExport:updateImportExport
        }
        function getAllReports() {
            return reportsFactory.getReports({}, null);
        } 
        function getReport(reportId) {
            return reportsFactory.getReport({reportId}, null);
        }
        function saveReport(report) {
            return reportsFactory.save({}, report);
        }
        function deleteReport(reportId) {
            return reportsFactory.deleteReport({reportId:reportId}, null);
        } 
       function updateReport(report) {
            return reportsFactory.updateReport({}, report);
        }
        function saveImportExport(imex) {
            return reportsFactory.saveImportExport({}, imex);
        }
        function deleteImportExport(imexId) {
            return reportsFactory.deleteImportExport({imexId: imexId}, null);
         }
        function updateImportExport(imex) {
            return reportsFactory.updateImportExport({}, imex);
        }
    }
})();