(function() {
    
    angular.module('app.cm.country').service('countryService', countryService);
    
    function countryService(countryFactory) {
        
        return {
            getActiveCountries: getActiveCountries
        };
        
        function getActiveCountries(ids) {
            //TODO - Να αλλάξει όταν γίνει σύνδεση με το api!
            //return countryFactory.getActive({ids}, null);
            return [];
        }
        
    }
    
})();