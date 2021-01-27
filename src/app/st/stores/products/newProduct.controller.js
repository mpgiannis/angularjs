(function() {
    angular.module('app.st.stores.products').controller('NewProductController',newProductController);
    function newProductController($scope, $translate, ProductsService, $state) {
        $scope.cancelMessage = $translate.instant('global.cancel');
        $scope.product={};

        $scope.saveProduct = function (){
            console.log($scope.product);
               ProductsService.saveProduct($scope.product).$promise
               .then(function(response){
                   console.log(response);
                   $state.go('app.st.stores.products');
   
               })
               .catch(function(err){
                   console.log('oops', err);
               })
               .finally(function(){
                   App.unblockUI();
               })
             
           }
    }
})();