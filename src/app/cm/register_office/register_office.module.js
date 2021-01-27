(function() {

    angular.module('app.cm.registerOffice', []).config(config);

    function config($stateProvider) {

        $stateProvider.state({
            name: 'app.cm.registerOffice',
            url: 'registeroffice',
            abstract: true
        });

    }

})();
