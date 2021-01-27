(function() {

    angular.module('app.cm.country', []).config(config);

    function config($stateProvider) {

        $stateProvider.state({
            name: 'app.cm.country',
            url: 'country',
            abstract: true
        });

    }

})();
