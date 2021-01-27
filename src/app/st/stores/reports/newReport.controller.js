(function() {
    angular.module('app.st.stores.reports').controller('NewReportController',newReportController);
    
    function newReportController($scope, $translate, reportsService, $state, $filter, ProductsService, StoresService) {
        $scope.cancelMessage = $translate.instant('global.cancel');
        $scope.report={};
        $scope.imexProductName=[];
        $scope.imexRackDescr=[];
        $scope.imexAmount=[];
        $scope.saveReport = function (){
               $scope.report.dateRep = $filter('date')( $scope.mydateRep, "yyyy-MM-dd");
               reportsService.saveReport($scope.report).$promise
               .then(function(response){
                   $scope.report=response;
                   console.log($scope.report);
                   if($scope.displayedForms.length!=0)
                    {
                        for (var i=0; i<$scope.imexProductName.length; i++) 
                        {
                            $scope.report.importsExports.push({reportId: $scope.report.id, productId: $scope.imexProductName[i], rackId: $scope.imexRackDescr[i], amount: $scope.imexAmount[i] });
                        }
                        reportsService.updateReport($scope.report).$promise
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

                   $state.go('app.st.stores.reports');
   
               })
               .catch(function(err){
                   console.log('oops', err);
               })
               .finally(function(){
                   App.unblockUI();
               })
             
           }

           
        var forms = [
            "newImExForm",
          ];
        $scope.displayedForms = [];
        $scope.addForm = function(formIndex) {
            $scope.displayedForms.push(forms[formIndex]);
            init();
          }
        $scope.Delete = function ($index) { 
            $scope.racksDescription.splice($index, 1);
            $scope.displayedForms.splice($index, 1);
        }; 
        function init(){
            $scope.showOptions();
        }
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
    }
})();