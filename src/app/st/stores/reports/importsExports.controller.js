(function() {
    angular.module('app.st.stores.reports').controller('ImportsExportsController', importsExportsController);
    function importsExportsController($scope, $state, $translate, reportsService, $stateParams, $window, ProductsService, StoresService) {
        
        var reportId = $stateParams.reportId;
        $scope.report = null;
        $scope.sortBy = 'id';
        $scope.reverse = false;

        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
         };

        $scope.cancelMessage = $translate.instant('global.cancel');

        $scope.showImportsExports = function (){
            reportsService.getReport(reportId).$promise
            .then(function(response){
                $scope.report = response;
                /* console.log($scope.report.importsExports[1].productId); */
            })
            .catch(function(err){
                console.log('oops', err);
            })
            .finally(function(){
                App.unblockUI();
            })

        }
        function init(){
            $scope.showImportsExports();
        }
        init();
        $scope.deleteImEx = function(imexId){
            if ($window.confirm("Please confirm?")) {
                reportsService.deleteImportExport(imexId).$promise
                .then(function(response){
                    console.log(response);
                    init();
                })
                .catch(function(err){
                    console.log('oops', err);
                })
                .finally(function(){
                    App.unblockUI();
                })
            } else {
                alert(imexId)
            }
        }
        $scope.newImEx = function() {
            $state.go('app.st.stores.newImportExport', {id: reportId});
        };

        $scope.updateImEx = function(imex) {
            $state.go('app.st.stores.editImportExport', {obj: imex});
        };
    }
})();