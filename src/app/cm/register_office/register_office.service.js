(function() {
    
    angular.module('app.cm.registerOffice').service('registerOfficeService', registerOfficeService);
    
    function registerOfficeService(registerOfficeFactory) {
        
        return {
            getActiveRegisterOffices: getActiveRegisterOffices
        };
        
        function getActiveRegisterOffices(ids) {
            //TODO - Να αλλάξει όταν γίνει σύνδεση με το api!
            //return registerOfficeFactory.getActive({ids}, null);
            return [];
        }
        
    }
    
})();