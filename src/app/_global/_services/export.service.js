(function() {
    
    angular.module('app.global').service('exportService', exportService);
    
    function exportService($http, $log, FileSaver, headerService, toitsuToasterService) {
        
        return {
            generateJqGridColsFinal: generateJqGridColsFinal,
            exportDataToExcel: exportDataToExcel,
            convertErrorFromArrayBufferToJson: convertErrorFromArrayBufferToJson,
            exportDataToExcelMultisheet: exportDataToExcelMultisheet
        };
        
        /**
         * JqGrid Column Generation
         */
        function generateJqGridColsFinal(colDefs, colModel) {
            
            return $.map(colDefs, function(v, k) {
                let type = typeof(colModel[k].formatter) != "undefined" ? colModel[k].formatter : "string";
                if(typeof(type) == "function") {
                    if(typeof(colModel[k].edittype != "undefined" && colModel[k].edittype == "checkbox")) {
                        type = "string";
                    }
                }
                
                if(colModel[k].name == "someUniqueColumnName") {
                    type = "blank";
                }
                
                return {
                    type: type,
                    width: typeof(colModel[k].width) != "undefined" ? colModel[k].width : null,
                    align: typeof(colModel[k].align) != "undefined" ? colModel[k].align : "left",
                    name: v,
                    alias: colModel[k].name
                };
            });
            
        }
        
        /**
         * Αποθήκευση δεδομένων ευρετηρίου σε αρχείο Excel βάση των ορισμάτων
         */
        function exportDataToExcel(scope, title, args, columns, sortColumnName, sortOrder) {
            
            scope.exportToExcelLoading = true;
            
            $http({
                url: scope.gridData.excelUrl,
                params: {
                    title: title,
                    model: columns,
                    searchString: JSON.stringify(args),
                    sidx: sortColumnName,
                    sord: sortOrder
                },
                method: 'GET',
                headers: headerService.getHeadersWithAuth(),
                responseType: 'arraybuffer'
            }).then(function(response) {
                
                let file = new Blob([response.data], {});
                
                let excelFileName = title + "_" + moment(new Date()).format('DD_MM_YYYY_HH_mm_ss') + ".xlsx";
                
                FileSaver.saveAs(file, excelFileName);
                
                $log.info("Excel file was created: " + excelFileName);
                
            }).catch(function(response) {
                if(response) {
                    response.data = convertErrorFromArrayBufferToJson(response.data);
                    toitsuToasterService.apiValidationErrors(response);
                }
            }).finally(function() {
                scope.exportToExcelLoading = false;
            });
            
        }
        
        /**
         * Δημιουργία αντικειμένου JSON για σφάλμα το οποίο είναι
         * κωδικοποιημένο ως binary (μορφή arraybuffer)
         */
        function convertErrorFromArrayBufferToJson(data) {
            
            let responseDataView = new DataView(data);
            let decoder = new TextDecoder("utf-8");
            let responseDataString = decoder.decode(responseDataView);
            
            return JSON.parse(responseDataString);
        }
        
        /**
         * Εξαγωγή δεδομένων σε excel με πολλαπλά φύλλα εργασίας από διαφορετικές μεθόδους ευρετηρίων.
         * Δεν υποστηρίζονται arguments στις μεθόδους.
         */
        function exportDataToExcelMultisheet(url, filename, exportParamsWrapper, scope, loadingVar) {
            
            scope[loadingVar] = true;
            
            $http({
                url: url,
                method: 'POST',
                headers: headerService.getHeadersWithAuth(),
                data: exportParamsWrapper,
                responseType: 'arraybuffer'
            }).then(function(response) {
                
                let file = new Blob([response.data], {});
                
                let excelFileName = filename + "_" + moment(new Date()).format('DD_MM_YYYY_HH_mm_ss') + ".xlsx";
                
                FileSaver.saveAs(file, excelFileName);
                
                $log.info("Multisheet Excel file was created: " + excelFileName);
                
            }).catch(function(response) {
                if(response) {
                    response.data = convertErrorFromArrayBufferToJson(response.data);
                    toitsuToasterService.apiValidationErrors(responseData);
                }
            }).finally(function() {
                scope[loadingVar] = false;
            });
            
        }
        
    }
    
})();
