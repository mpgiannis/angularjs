(function() {
    
    angular.module('app.pr.familyGraveRight').service('familyGraveRightService', familyGraveRightService);
    
    function familyGraveRightService(familyGraveRightFactory) {
        
        return {
            getFamilyGraveRight: getFamilyGraveRight,
            getFamilyGraveRightsByBeneficiary: getFamilyGraveRightsByBeneficiary,
            saveFamilyGraveRight: saveFamilyGraveRight
        };
        
        function getFamilyGraveRight(id) {
            return familyGraveRightFactory.get({id}, null);
        }
        
        function getFamilyGraveRightsByBeneficiary(beneficiaryId) {
            return familyGraveRightFactory.getByBeneficiary({beneficiaryId}, null);
        }
        
        function saveFamilyGraveRight(familyGraveRight) {
            return familyGraveRightFactory.save({}, familyGraveRight);
        }
    }
    
})();