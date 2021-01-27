(function() {
    angular.module('app.st.stores.products').controller('EditProductController',editProductController);
    function editProductController($scope, $translate, ProductsService, $state, $stateParams) {
        $scope.cancelMessage = $translate.instant('global.cancel');
    
        $scope.product=$stateParams.obj;
        $scope.updateProduct =function(){
            $scope.product.name=$scope.newProduct.name;
            $scope.product.description=$scope.newProduct.description;
            $scope.product.barcode=$scope.newProduct.barcode;
            $scope.product.measureUnit=$scope.newProduct.measureUnit;
            console.log($scope.product);
            ProductsService.updateProduct($scope.product).$promise
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
        };
    }
})();