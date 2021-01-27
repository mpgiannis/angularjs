(function() {
    angular.module('app.st.stores').controller('EditStoreController',EditStoreController);
    
    function EditStoreController($scope, $translate, StoresService, $state, $stateParams) {
  
        $scope.cancelMessage = $translate.instant('global.cancel');
    
        $scope.store=$stateParams.obj;
        $scope.updateStore =function(){
            $scope.store.description=$scope.newStore.description;
            console.log($scope.store);
            StoresService.updateStore($scope.store).$promise
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