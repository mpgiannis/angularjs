(function() {
    
    angular.module('app.st.stores').controller('StoresListController', StoresListController);
    
    function StoresListController($scope, $state, $translate, StoresService, $window) {
        
        $scope.stores=[];
        $scope.sortBy = 'id';
        $scope.reverse = false;

        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
         };
        $scope.cancelMessage = $translate.instant('global.cancel');
        
        $scope.showStoresList = function (){
            StoresService.getAllStores().$promise
            .then(function(response){
                console.log(response);
                $scope.stores = response;
            })
            .catch(function(err){
                console.log('oops', err);
            })
            .finally(function(){
                App.unblockUI();
            })
        }

        function init(){
            $scope.showStoresList();
        }
        init();

        $scope.delete = function(storeId){
            if ($window.confirm("Please confirm?")) {
                StoresService.deleteStore(storeId).$promise
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
                alert(storeId)
            }
        }

        $scope.newStore = function() {
            $state.go('app.st.stores.newStore', {id: null});
        };

        $scope.update = function(store) {
            console.log(store);
            $state.go('app.st.stores.editStore', {obj: store});
        };



    }
})();
