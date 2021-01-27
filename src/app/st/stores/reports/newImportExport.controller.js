(function() {
    angular.module('app.st.stores.reports').controller('NewImportExportController',newImportExportController);
    
    function newImportExportController($scope, $translate, reportsService, $stateParams, $state, ProductsService, StoresService) {
        $scope.cancelMessage = $translate.instant('global.cancel');

        $scope.imex={};
        $scope.imex.reportId=$stateParams.id;
        console.log($scope.imex.reportId);
     

        $scope.saveImportExport = function (){
            reportsService.saveImportExport($scope.imex).$promise
            .then(function(response){
                console.log(response);
                $state.go('app.st.stores.importsExports', {reportId: $scope.imex.reportId});
            })
            .catch(function(err){
                console.log('oops', err);
                $state.go('app.st.stores.importsExports', {reportId: $scope.imex.reportId});
            })
            .finally(function(){
                App.unblockUI();
            })
           
        }
        $scope.showOptions = function (){
            ProductsService.getAllProducts().$promise
            .then(function(response){
                $scope.products = response;
                StoresService.getAllRacks().$promise
                .then(function(response){
                    $scope.racks = response;
                })
                .catch(function(err){
                    console.log('oops', err);
                })
                .finally(function(){
                    App.unblockUI();
                })
            })
            .catch(function(err){
                console.log('oops', err);
            })
            .finally(function(){
                App.unblockUI();
            })

        }
        function init(){
            $scope.showOptions();
        }
        init();
    }
})();