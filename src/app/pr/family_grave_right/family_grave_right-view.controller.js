(function() {
    
    angular.module('app.pr.familyGraveRight').controller('FamilyGraveRightViewController', FamilyGraveRightViewController);
    
    function FamilyGraveRightViewController($scope, $translate, toitsuToasterService) {
        
        $scope.displayFailureMessage = function() {
            toitsuToasterService.showError($translate.instant('global.error.generalError'));
        };
        
    }
    
})();