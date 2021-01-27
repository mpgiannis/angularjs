(function() {
    
    angular.module('app.st.stores').service('StoresService', StoresService);
    
    function StoresService(StoresFactory) {
        
        return {
            getAllStores: getAllStores,
            getStore: getStore,
            deleteStore:deleteStore,
            saveStore:saveStore,
            deleteRack:deleteRack,
            saveRack:saveRack,
            updateStore:updateStore,
            updateRack:updateRack,
            getRack:getRack,
            getAllRacks:getAllRacks

        };
    
        function getAllStores() {
            return StoresFactory.get({}, null);
        }
        function getStore(storeId) {
            return StoresFactory.getStore({storeId: storeId}, null);
        }
        function deleteStore(storeId) {
           return StoresFactory.deleteStore({storeId: storeId}, null);
        }
        function saveStore(store) {
            return StoresFactory.save({}, store);
        }
        function deleteRack(rackId) {
           return StoresFactory.deleteRack({rackId: rackId}, null);
        }
        function saveRack(rack) {
            return StoresFactory.saveRack({}, rack);
        }
        function updateStore(store) {
            return StoresFactory.updateStore({}, store);
        }
        function updateRack(rack) {
            return StoresFactory.updateRack({}, rack);
        }
        function getRack(rackId) {
            return StoresFactory.getRack({rackId: rackId}, null);
        }
        function getAllRacks() {
            return StoresFactory.getAllRacks({}, null);
        }
        
    }
    
})();