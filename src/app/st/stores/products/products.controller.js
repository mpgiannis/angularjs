(function() {
    angular.module('app.st.stores.products').controller('ProductsController', ProductsController);
    
    function ProductsController($scope, $state, $translate, ProductsService, $window) {
        $scope.products=[];
        $scope.sortBy = 'id';
        $scope.reverse = false;

        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
         };

        $scope.cancelMessage = $translate.instant('global.cancel');
        $scope.showProducts = function (){
            ProductsService.getAllProducts().$promise
            .then(function(response){
                console.log(response);
                 $scope.products = response; 
                            })
            .catch(function(err){
                console.log('oops', err);
            })
            .finally(function(){
                App.unblockUI();
            })
        }
        function init(){
            $scope.showProducts();
        }
        init();
        $scope.deleteProduct = function(productId){
            if ($window.confirm("Please confirm?")) {
                ProductsService.deleteProduct(productId).$promise
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
                alert(productId)
            }
        }

        $scope.newProduct = function() {
            $state.go('app.st.stores.newProduct', {id: null});
        };
        $scope.updateProduct = function(product) {
            console.log(product);
            $state.go('app.st.stores.editProduct', {obj: product});
        };
    }
})();