(function() {
    
    angular.module('app.st.amphibian').controller('AmphibianListController', AmphibianListController);
    
    function AmphibianListController($scope, $state, $translate) {
        
        $scope.newRecord = function() {
            $state.go('app.st.amphibian.view', {id: null});
        };
      
        class Student {
            constructor(theName, theColor) {
                this.name = theName;
                this.color = theColor;
            }
            
            greet() {
                return 'Hello, my name is ' + this.name + ' and my favorite color is ' + this.color + '.';
            }
        }
        
        let jon = new Student('Jon Skeet', 'blue');
        $scope.studentGreeting = jon.greet();
        
        
        $scope.cancelMessage = $translate.instant('global.cancel');
    }
    
})();

