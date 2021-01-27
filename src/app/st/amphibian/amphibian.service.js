(function() {
    
    angular.module('app.st.amphibian').service('amphibianService', amphibianService);
    
    function amphibianService(amphibianFactory) {
        
        return {
            getAmphibian: getAmphibian,
            saveAmphibian: saveAmphibian
        };
        
        function getAmphibian(id) {
            return amphibianFactory.get({id}, null);
        }
        
        function saveAmphibian(amphibian) {
            return amphibianFactory.save({}, amphibian);
        }
        
    }
    
})();