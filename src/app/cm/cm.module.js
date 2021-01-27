(function() {

    angular.module('app.cm', [
        'app.cm.enum',
        'app.cm.country',
        'app.cm.registerOffice',
        'app.cm.user'
    ]).config(config);

    function config($stateProvider) {

        $stateProvider.state({
            name: 'app.cm',
            url: '/cm/',
            abstract: true
        });

    }

})();
