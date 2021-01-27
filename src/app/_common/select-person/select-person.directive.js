(function() {
    
    angular.module('app.common').directive('selectPerson', selectPerson);
    
    function selectPerson() {
        
        return {
            restrict: 'E',
            templateUrl: './src/app/_common/select-person/select-person.tpl.html',
            replace: true,
            controller: 'SelectPersonController',
            scope: {
                personId: '=',
                onSelect: '&'
            }
        };
        
    }
    
})();
