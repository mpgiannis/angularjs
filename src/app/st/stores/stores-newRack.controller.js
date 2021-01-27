(function() {
    angular.module('app.st.stores').controller('NewRackController',NewRackController);
    
    function NewRackController($scope, $translate, StoresService, $stateParams, $state) {
        $scope.cancelMessage = $translate.instant('global.cancel');

        $scope.rack={};
        $scope.rack.storeId=$stateParams.id;
     

        $scope.saveRack = function (){
            StoresService.saveRack($scope.rack).$promise
            .then(function(response){
                $state.go('app.st.stores.racks', {storeId: $scope.rack.storeId});
            })
            .catch(function(err){
                console.log('oops', err);
                $state.go('app.st.stores.racks', {storeId: $scope.rack.storeId});
            })
            .finally(function(){
                App.unblockUI();
            })
           
        }
    }
})();