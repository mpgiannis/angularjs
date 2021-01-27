(function() {
    angular.module('app.st.stores.reports').controller('EditImportExportController',editImportExportController);
    function editImportExportController($scope, $translate, reportsService, $state, $stateParams, ProductsService, StoresService) {
        $scope.cancelMessage = $translate.instant('global.cancel');
    
        $scope.imex=$stateParams.obj;
        $scope.updateImportExport =function(){
            $scope.imex.productId=$scope.newImex.productId;
            $scope.imex.rackId=$scope.newImex.rackId;
            $scope.imex.amount=$scope.newImex.amount;
            console.log($scope.imex);
            reportsService.updateImportExport($scope.imex).$promise
            .then(function(response){
                console.log(response);
                $state.go('app.st.stores.reports');

            })
            .catch(function(err){
                console.log('oops', err);
            })
            .finally(function(){
                App.unblockUI();
            })

        };

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