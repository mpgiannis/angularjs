(function() {
    
    angular.module('app.cm.enum').service('enumService', enumService);
    
    function enumService(enumFactory) {
        
        return {
            getEnumValues: getEnumValues
        };
        
        function getEnumValues(enumClass) {
            //TODO - Να αλλάξει όταν γίνει σύνδεση με το api!
            //return enumFactory.getValues({enumClass}, null);
            return [];
        }
        
    }
    
})();