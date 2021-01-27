(function() {
    
    angular.module('app.global').service('formService', formService);
    
    function formService() {
        
        return {
            isDirty: isDirty,
            setPristine: setPristine
        };
        
        function isDirty(name) {
            return getFormController(name).$dirty;
        }
        
        function setPristine(name) {
            getFormController(name).$setPristine();
        }
        
        function getFormController(name) {
            return angular.element('form[name="' + name + '"]').scope()[name];
        }
    }
    
})();
