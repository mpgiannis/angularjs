(function() {

    angular.module('app.pr', [
        'app.pr.person',
        'app.pr.deceased',
        'app.pr.familyGraveRight'
    ]).config(config);

    function config($stateProvider) {

        $stateProvider.state({
            name: 'app.pr',
            url: '/pr/',
            abstract: true
        });

    }

})();
