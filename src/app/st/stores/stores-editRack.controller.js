(function() {
    angular.module('app.st.stores').controller('EditRackController',EditRackController);
    
    function EditRackController($scope, $translate, StoresService, $state, $stateParams) {
  
        $scope.cancelMessage = $translate.instant('global.cancel');
    
        $scope.rack=$stateParams.obj;
        $scope.updateRack =function(){
            $scope.rack.description=$scope.newRack.description;
            $scope.rack.storeId=$scope.newRack.storeId;
            console.log($scope.rack);
            StoresService.updateRack($scope.rack).$promise
            .then(function(response){
                console.log(response);
                $state.go('app.st.stores.list');

            })
            .catch(function(err){
                console.log('oops', err);
            })
            .finally(function(){
                App.unblockUI();
            })

        };

    }
})();