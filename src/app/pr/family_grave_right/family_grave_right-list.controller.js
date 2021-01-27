(function() {
    
    angular.module('app.pr.familyGraveRight').controller('FamilyGraveRightListController', FamilyGraveRightListController);
    
    function FamilyGraveRightListController($scope, $state) {
        
        $scope.newRecord = function() {
            $state.go('app.pr.familyGraveRight.view', {id: null});
        };
        
    }
    
})();