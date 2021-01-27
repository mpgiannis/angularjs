(function() {
    
    angular.module('app.global').service('toitsuJqGridService', toitsuJqGridService);
    
    function toitsuJqGridService(headerService) {
        
        return {
            retrieveData: retrieveData,
            getSelectedRowId: getSelectedRowId,
            getRowObject: getRowObject,
            getAllRowIds: getAllRowIds,
            getSelectedRows: getSelectedRows,
            getRowCellValue: getRowCellValue,
            hasRows: hasRows,
            resizeGrid: resizeGrid,
            clearGrid: clearGrid,
            reloadGrid: reloadGrid,
            getSelectedRowCount: getSelectedRowCount,
            getAllRowCount: getAllRowCount,
            showLoading: showLoading,
            addPostData: addPostData
        };
        
        function retrieveData(myGrid, args) {
            let queryString = JSON.stringify(args);
            
            for (let i = 0; i < myGrid.length; i++) {
                if (myGrid[i].grid) {
                    showLoading(myGrid[i].getAttribute('id'), true);
                    break;
                }
            }
            
            myGrid.jqGrid('setGridParam', {
                ajaxGridOptions: {
                    beforeSend(xhr) {
                        headerService.setXhrAuthHeader(xhr);
                    }
                },
                search: true,
                page: 1,
                postData: {searchString: queryString}
            }).trigger('reloadGrid');
        }
        
        function getSelectedRowId(myGrid) {
            return myGrid.jqGrid('getGridParam', 'selrow');
        }
        
        function getRowObject(myGrid, id) {
            return myGrid.jqGrid('getRowData', id);
        }
        
        function getAllRowIds(myGrid) {
            return myGrid.jqGrid('getDataIDs');
        }
        
        function getSelectedRows(myGrid) {
            return myGrid.jqGrid('getGridParam', 'selarrrow');
        }
        
        function getRowCellValue(myGrid, rowId, colName) {
            return myGrid.jqGrid('getCell', rowId, colName);
        }
        
        function hasRows(myGrid) {
            return (myGrid.getGridParam('reccount') > 0);
        }
        
        function resizeGrid(myGrid) {
            myGrid.jqGrid('setGridWidth', $('#content').width());
        }
        
        function clearGrid(myGrid) {
            let rowIds = myGrid.jqGrid('getDataIDs');
            //Iterate through the rows and delete each of them
            for (let i = 0, len = rowIds.length; i < len; i++) {
                let currRow = rowIds[i];
                myGrid.jqGrid('delRowData', currRow);
            }
        }
        
        function reloadGrid(myGrid) {
            myGrid.trigger('reloadGrid');
        }
        
        function getSelectedRowCount(myGrid) {
            return myGrid.jqGrid('getGridParam', 'selarrrow').length;
        }
        
        function getAllRowCount(myGrid) {
            return myGrid.jqGrid('getDataIDs').length;
        }
        
        function showLoading(gridId, show) {
            let showLoadingElement = $('#load_' + gridId);
            if (show) {
                showLoadingElement.show();
            }
            else {
                showLoadingElement.hide();
            }
        }
        
        function addPostData(myGrid, params) {
            myGrid.jqGrid('setGridParam', {
                postData: params
            });
        }
    }
    
})();