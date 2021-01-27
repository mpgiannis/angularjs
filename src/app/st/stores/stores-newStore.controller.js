(function() {
    angular.module('app.st.stores').controller('NewStoreController',NewStoreController);
    
    function NewStoreController($scope, $translate, StoresService, $state) {
  
        $scope.cancelMessage = $translate.instant('global.cancel');
        $scope.store={};
        $scope.racksDescription=[];

        $scope.saveStore = function (){
         console.log($scope.store);
            StoresService.saveStore($scope.store).$promise
            .then(function(response){
                $scope.store=response;
                if($scope.displayedForms.length!=0)
                    {
                        for (var i=0; i<$scope.racksDescription.length; i++) 
                        {
                            $scope.store.racks.push({description: $scope.racksDescription[i], storeId: $scope.store.id});
                        }
                        StoresService.updateStore($scope.store).$promise
                        .then(function(response){
                            console.log(response);        
                        })
                        .catch(function(err){
                            console.log('oops', err);
                        })
                        .finally(function(){
                            App.unblockUI();
                        })  
                    }
                $state.go('app.st.stores.list');

            })
            .catch(function(err){
                console.log('oops', err);
            })
            .finally(function(){
                App.unblockUI();
            })
        }

        var forms = [
            "newRackForm",
          ];
        $scope.displayedForms = [];
        $scope.addForm = function(formIndex) {
            $scope.displayedForms.push(forms[formIndex]);
          }

        $scope.Delete = function ($index) { 
            $scope.racksDescription.splice($index, 1);
            $scope.displayedForms.splice($index, 1);
        }; 


    }
})();