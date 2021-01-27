(function() {
    angular.module('app.st.stores.reports').controller('EditReportController',editReportController);
    function editReportController($scope, $translate, reportsService, $state, $stateParams) {
        $scope.cancelMessage = $translate.instant('global.cancel');
    
        $scope.report=$stateParams.obj;
        $scope.updateReport =function(){
            $scope.report.dateRep=$scope.newReport.dateRep;
            $scope.report.type=$scope.newReport.type;
            $scope.report.descriptionReason=$scope.newReport.descriptionReason;
            $scope.report.receivedDeliveredBy=$scope.newReport.receivedDeliveredBy;
            $scope.report.infos=$scope.newReport.infos;
            console.log($scope.report);
            reportsService.updateReport($scope.report).$promise
            .then(function(response){
                console.log(response);
                $state.go('app.st.stores.reports');

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