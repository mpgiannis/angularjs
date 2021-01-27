(function() {

    angular.module('app.st', [
        'app.st.amphibian',
        'app.st.stores',
        'app.st.stores.products',
        'app.st.stores.reports'
    ]).config(config);

    function config($stateProvider) {

        $stateProvider.state({
            name: 'app.st',
            url: '/st/',
            abstract: true
        });

    }



})();
