(function() {
    
    angular.module('app.st.amphibian').controller('AmphibianViewController', AmphibianViewController);
    
    function AmphibianViewController($scope, $ngBootbox) {
        
        $scope.displayBootbox = function() {
            $ngBootbox.alert('Hello from Bootbox!');
        }
        
    }
    
})();