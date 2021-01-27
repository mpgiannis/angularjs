(function() {
    
    angular.module('app.pr.person', []).config(config);
    
    function config($stateProvider) {
        
        $stateProvider.state({
            name: 'app.pr.person',
            url: 'person',
            abstract: true
        });
        
    }
    
})();
