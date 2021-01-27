(function() {
    angular.module('app.st.stores.reports').controller('ReportsController', reportsController);
    
    function reportsController($scope, $state, $translate, reportsService, $window) {
        $scope.reports=[];
        $scope.sortBy = 'id';
        $scope.reverse = false;

        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
         };

        $scope.cancelMessage = $translate.instant('global.cancel');
        $scope.showReports = function (){
            reportsService.getAllReports().$promise
            .then(function(response){
                console.log(response);
                 $scope.reports = response; 
                            })
            .catch(function(err){
                console.log('oops', err);
            })
            .finally(function(){
                App.unblockUI();
            })
        }
        function init(){
            $scope.showReports();
        }
        init();
        $scope.deleteReport = function(reportId){
            if ($window.confirm("Please confirm?")) {
                reportsService.deleteReport(reportId).$promise
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
                alert(reportId)
            }
        }

        $scope.newReport = function() {
            $state.go('app.st.stores.newReport', {id: null});
        };
        $scope.updateReport = function(report) {
            console.log(report);
            $state.go('app.st.stores.editReport', {obj: report});
        };
    }
})();