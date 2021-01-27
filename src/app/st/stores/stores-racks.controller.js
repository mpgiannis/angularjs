(function() {
    angular.module('app.st.stores').controller('RacksController', RacksController);
    
    function RacksController($scope, $translate, StoresService, $stateParams, $window, $state) {
        
        var storeId = $stateParams.storeId;
        $scope.store = null;
        $scope.sortBy = 'id';
        $scope.reverse = false;

        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
         };

        $scope.cancelMessage = $translate.instant('global.cancel');

        $scope.showRacks = function (){
            StoresService.getStore(storeId).$promise
            .then(function(response){
                console.log(response);
                $scope.store = response;
            })
            .catch(function(err){
                console.log('oops', err);
            })
            .finally(function(){
                App.unblockUI();
            })
        }

        function init(){
            $scope.showRacks();
        }
        init();

        $scope.deleteRack = function(rackId){
            if ($window.confirm("Please confirm?")) {
                StoresService.deleteRack(rackId).$promise
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
                alert(rackId)
            }
        }
        $scope.newRack = function() {
            $state.go('app.st.stores.newRack', {id: storeId});
        };
        $scope.updateRack = function(rack) {
            console.log(rack);
            $state.go('app.st.stores.editRack', {obj: rack});
        };
    }
})();
