(function() {
    
    angular.module('app.global').directive('toitsuJqGrid', toitsuJqGrid);
    
    function toitsuJqGrid($rootScope, $compile, $translate, $timeout, $location, $log, toitsuJqGridService, toitsuToasterService, exportService) {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                gridId: '=',
                gridData: '=',
                viewUrl: '@',
                printUrl: '@',
                retrieveData: '&',
                multiselect: '=',
                firstAction: '&',
                secondAction: '&',
                loadComplete: '&',
                loadError: '&',
                rowAttr: '&?',
                singleClick: '&',
                doubleClick: '&',
                successErrorApi: '=',
                onPagingRecords: '&?'
            },
            template: `
                  <div class="overflow-x-auto padding-bottom-10">
                    <table></table>
                    <div class="jqgrid-pagination"></div>
                  </div>
                `,
            link(scope, element) {
                
                let table = element.find('table');
                table.attr('id', scope.gridId);
                
                let pagerId = scope.gridId + '-pager';
                element.find('.jqgrid-pagination').attr('id', pagerId);
                
                //Προσθήκη extraActions για άνοιγμα εγγραφής αν είναι δηλωμένη η παράμετρος viewUrl αντίστοιχα.
                //Αυτό αντικαθιστά τυχόν δηλωμένα extraActions στα gridData.
                if (scope.viewUrl) {
                    let extraActionsList = $.grep(scope.gridData.colModel, function(e) {
                        return e.name === 'extraActions';
                    });
                    if (extraActionsList[0]) {
                        extraActionsList[0].formatter = function(cellvalue, options, rowObject) {
                            
                            let viewAction = '';
                            let viewTooltip = $translate.instant('global.open');
                            if (scope.viewUrl) {
                                let viewIcon = "<i class='fa fa-edit color-blue'></i>";
                                viewAction = '<a class="btn btn-link jqgrid-link" uib-tooltip="' + viewTooltip + '" tooltip-placement="right" href="/' + scope.viewUrl + rowObject.id + '" target="_blank">' + viewIcon + '</a>';
                            }
                            
                            return viewAction;
                        }
                    }
                }
                
                let stretchWidth = false;
                if(scope.gridData.stretchWidth) {
                    stretchWidth = scope.gridData.stretchWidth;
                }
                
                function resizeJqGrid() {
                    if(stretchWidth) {
                        table.jqGrid('setGridWidth', element.width());
                    }
                    else {
                        table.jqGrid('setGridWidth', $('.toitsu-content').width());
                    }
                }
                
                table.jqGrid({
                    url: scope.gridData.url,
                    datatype: 'json',
                    mtype: 'GET',
                    multiselect: scope.multiselect,
                    caption: scope.gridData.caption,
                    sortname: scope.gridData.sortname,
                    sortorder: scope.gridData.sortorder,
                    recordtext: $translate.instant('jqgrid.recordtext'),
                    emptyrecords: $translate.instant('jqgrid.emptyrecords'),
                    loadtext: $translate.instant('jqgrid.loadtext'),
                    pgtext: $translate.instant('jqgrid.pgtext'),
                    rownumbers: (scope.gridData.rownumbers === undefined) ? true : scope.gridData.rownumbers,
                    height: 'auto',
                    colNames: scope.gridData.colNames || [],
                    colModel: scope.gridData.colModel || [],
                    rowNum: 100,
                    rowList: [100, 200, 500],
                    pager: scope.gridData.pager || '#' + pagerId,
                    toolbarfilter: true,
                    viewrecords: true,
                    shrinkToFit: true,
                    footerrow: scope.gridData.footerrow,
                    jsonReader: {
                        root: 'content',
                        total: 'totalPages',
                        records: 'totalElements',
                        page: 'page' + 1
                    },
                    gridview: true,
                    rowattr: function(rd) {
                        if (scope.rowAttr) {
                            //Custom rowattr function
                            return scope.rowAttr({rd: rd});
                        }
                    },
                    loadComplete() {
                        
                        //Resize grid
                        resizeJqGrid();
                        
                        $($('.ui-jqgrid-bdiv').find('table')[0]).css('max-width', 'none');
                        
                        //Compile the dynamically created elements
                        $compile(element.contents())(scope);
                        
                        toitsuJqGridService.showLoading(scope.gridId, false);
                        
                        //Custom function to be run in load complete
                        scope.loadComplete();
                    },
                    loadError: function(xhr, status, error) {
                        if (xhr.status === -1 || xhr.status === 0 || xhr.status === 401) {
                            scope.$apply(function() {
                                $location.path('/401');
                            });
                        }
                        else if (xhr.status === 403) {
                            scope.$apply(function() {
                                toitsuToasterService.httpClientError(403);
                            });
                        }
                        else if(!xhr.responseJSON) {
                            // status
                            $log.error('UI error occurred.')
                        }
                        else {
                            //Log the error to browser console
                            $log.error("Error 500: " + xhr.responseJSON.errorId);
                            
                            //Εμφάνιση του σφάλματος με το toaster
                            scope.$apply(function() {
                                toitsuToasterService.httpError(xhr, 'responseJSON');
                            });
                        }
                        
                        toitsuJqGridService.showLoading(scope.gridId, false);
                        
                        //Custom function to be run in load error
                        scope.loadError();
                    },
                    onSelectRow(rowId) {
                        //Custom singleClick function
                        scope.singleClick({rowId: rowId});
                    },
                    ondblClickRow(rowId) {
                        if (scope.viewUrl) {
                            //Αν είναι δηλωμένο το viewUrl, με διπλό κλικ ανοίγει η εγγραφή.
                            scope.$apply(function() {
                                $location.path(scope.viewUrl + rowId);
                            });
                        }
                        else {
                            //Αλλιώς
                            //Custom doubleClick function
                            scope.doubleClick({id: rowId});
                        }
                    },
                    loadBeforeSend(xhr, settings) {
                        //Prevent grid loading on page load
                        this.p.loadBeforeSend = null; //remove event handler
                        return false; //don't send load data request
                    },
                    onPaging(pgButton) {
                        //If a custom method is defined on 'onPaging[records]' event, default retrieve is not executed
                        if (pgButton == 'records' && scope.onPagingRecords) {
                            scope.onPagingRecords();
                            return 'stop';
                        }
                        else {
                            if (!$('#' + pgButton).hasClass('ui-state-disabled')) {
                                toitsuJqGridService.showLoading(scope.gridId, true);
                            }
                        }
                    },
                    onSortCol(index, iCol, sortorder) {
                        toitsuJqGridService.showLoading(scope.gridId, true);
                    }
                });
                
                table.jqGrid('navGrid', '#' + pagerId, {edit: false, add: false, del: true});
                
                element.find('.ui-jqgrid-bdiv').addClass('ui-jqgrid-shrinked');
                
                scope.exportToExcelLoading = false;
                
                //Add Export to Excel button
                if (scope.gridData.excelUrl) {
                    
                    table.jqGrid('navButtonAdd',
                        '#' + pagerId,
                        {
                            caption: "",
                            buttonicon: "ui-export-to-excel fa fa-file-excel-o",
                            onClickButton: function() {
                                
                                if ($('#excelBtn').attr('disabled') === 'disabled') {
                                    return;
                                }
                                
                                let grid = $(this);
                                
                                let columns = grid.closest(".ui-jqgrid-view").find("th:visible");
                                
                                let colDefs = columns.map(function() {
                                    return $(this).text();
                                }).get();
                                
                                let colModel = $(grid.jqGrid('getGridParam', 'colModel'))
                                    .filter(function() {
                                        return this.hidden !== true;
                                    });
                                
                                let colMapping = {};
                                
                                let rowData = grid.jqGrid('getRowData');
                                
                                $.each(colDefs, function(i, v) {
                                    colMapping[v.trim()] = colModel[i];
                                });
                                
                                let colsFinal = exportService.generateJqGridColsFinal(colDefs, colModel);
                                
                                let title = scope.gridData.excelTitle ? scope.gridData.excelTitle : $translate.instant('global.results');
                                
                                let sortColumnName = grid.jqGrid('getGridParam', 'sortname');
                                let sortOrder = grid.jqGrid('getGridParam', 'sortorder');
                                
                                exportService.exportDataToExcel(scope, title, scope.gridData.args, JSON.stringify(colsFinal), sortColumnName, sortOrder);
                            },
                            position: "last"
                        });
                    
                }
                
                table.jqGrid('inlineNav', '#' + pagerId);
                
                element.find('.ui-jqgrid').removeClass('ui-widget ui-widget-content');
                element.find('.ui-jqgrid-view').children().removeClass('ui-widget-header ui-state-default');
                element.find('.ui-jqgrid-labels, .ui-search-toolbar').children().removeClass('ui-state-default ui-th-column ui-th-ltr');
                element.find('.ui-jqgrid-pager').removeClass('ui-state-default');
                element.find('.ui-jqgrid').removeClass('ui-widget-content');
                
                //add classes
                element.find('.ui-jqgrid-htable').addClass('table table-bordered table-hover');
                element.find('.ui-jqgrid-btable').addClass('table table-bordered');
                if (!scope.rowAttr) {
                    //Ο πίνακας είναι striped αν δεν έχει δηλωθεί η μέθοδος rowAttr
                    element.find('.ui-jqgrid-btable').addClass('table-striped');
                }
                
                element.find('.ui-icon.ui-icon-seek-prev').wrap('<button type="button" class="btn-rounded"><i class="fa fa-backward color-steelblue"></i></button>');
                element.find('.ui-icon.ui-icon-seek-prev').removeClass();
                
                element.find('.ui-icon.ui-icon-seek-first').wrap('<button type="button" class="btn-rounded"><i class="fa fa-fast-backward color-steelblue"></i></button>');
                element.find('.ui-icon.ui-icon-seek-first').removeClass();
                
                element.find('.ui-icon.ui-icon-seek-next').wrap('<button type="button" class="btn-rounded"><i class="fa fa-forward color-steelblue"></i></button>');
                element.find('.ui-icon.ui-icon-seek-next').removeClass();
                
                element.find('.ui-icon.ui-icon-seek-end').wrap('<button type="button" class="btn-rounded"><i class="fa fa-fast-forward color-steelblue"></i></button>');
                element.find('.ui-icon.ui-icon-seek-end').removeClass();
                
                let exportToExcel = $translate.instant("jqgrid.exportToExcel");
                let exportToExcelElement = element.find('.ui-icon.ui-export-to-excel');
                
                let newButton = $('<button>',
                    {
                        id: 'excelBtn',
                        class: 'btn-rounded ui-jqgrid-pager-custom-btn',
                        'uib-tooltip': exportToExcel,
                        'tooltip-placement': 'right',
                        'tooltip-class': 'tooltip-130',
                        'button-prepend': 'fa fa-file-excel-o color-green',
                        'ng-disabled': 'exportToExcelLoading',
                        'button-spinner': 'exportToExcelLoading'
                    });
                
                exportToExcelElement.replaceWith(newButton);
                
                $timeout(function() {
                    //Resize grid to fit page size
                    resizeJqGrid();
                });
                
                //Also resize grid on window resize
                $(window).on('resize.jqGrid', function() {
                    resizeJqGrid();
                });
                
                //Resize grid when this event is called.
                $rootScope.$on('resizeModalJqGrid', function() {
                    resizeJqGrid();
                });
                
                //Resize grid when on toggle menu actions
                $rootScope.$on('menuToggleChanged', function() {
                    resizeJqGrid();
                });
                
                //Resize grid on tab clicked
                $rootScope.$on('selectedTabChanged', function() {
                    resizeJqGrid();
                });
                
                //Remove pager buttons
                element.find('.ui-icon.ui-icon-plus').parent().remove();
                element.find('.ui-icon.ui-icon-pencil').parent().remove();
                element.find('.ui-icon.ui-icon-trash').parent().remove();
                element.find('.ui-icon.ui-icon-search').parent().remove();
                element.find('.ui-icon.ui-icon-refresh').parent().remove();
                element.find('.ui-icon.ui-icon-disk').parent().remove();
                element.find('.ui-icon.ui-icon-cancel').parent().remove();
                
                //Enable tooltips [does not work]
                //element.find('[data-rel=tooltip]').tooltip({'container': 'body'});
                
                //Compile the dynammically created elements
                $compile(element.contents())(scope);
                
                //Ανάκτηση αν έχει δηλωθεί
                scope.retrieveData();
            }
            
        };
        
    }
    
})();
