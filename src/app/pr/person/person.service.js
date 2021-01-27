(function() {
    
    angular.module('app.pr.person').service('personService', personService);
    
    function personService(personFactory) {
        
        return {
            getPerson: getPerson
        };
        
        function getPerson(id) {
            //TODO - Να αλλάξει όταν γίνει σύνδεση με το api!
            //return personFactory.get({id}, null);
            return {};
        }
    }
    
})();