(function() {
    
    angular.module('app.pr.deceased').service('deceasedService', deceasedService);
    
    function deceasedService(deceasedFactory) {
        
        return {
            getDeceased: getDeceased,
            saveDeceased: saveDeceased
        };
        
        function getDeceased(id) {
            //TODO - Να αλλάξει όταν γίνει σύνδεση με το api!
            //return deceasedFactory.get({id}, null);
            return {};
        }
        
        function saveDeceased(deceased) {
            //TODO - Να αλλάξει όταν γίνει σύνδεση με το api!
            //return deceasedFactory.save({}, deceased);
            return {};
        }
    }
    
})();