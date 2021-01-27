(function() {
    
    angular.module('app.pr.deceased').controller('DeceasedListController', DeceasedListController);
    
    function DeceasedListController($scope, $rootScope, $state, $translate, toitsuJqGridService, deceasedConsts) {
        
        $scope.viewState = 'app.pr.deceased.view';
        $scope.viewUrl = 'pr/deceased/view/';
        
        $scope.newRecord = function() {
            $state.go($scope.viewState, {id: null});
        };
        
        //TODO - Να διαγραφεί όταν γίνει σύνδεση με το api!
        $scope.tempEdit = function() {
            $state.go($scope.viewState, {id: 100});
        };
        
        $scope.deceasedGridId = 'deceasedGrid';
        $scope.deceasedArgs = {};
        
        $scope.deceasedGridData = {
            caption: $translate.instant('global.results'),
            url: $rootScope.baseUrl + deceasedConsts.indexUrl,
            excelUrl: $rootScope.baseUrl + deceasedConsts.indexUrl + '/excel',
            stretchWidth: false,
            colNames: [
                'id',
                $translate.instant('global.extraActions'),
                $translate.instant('pr.person.lastName'),
                $translate.instant('pr.person.firstName'),
                $translate.instant('pr.person.fatherFirstName'),
                $translate.instant('pr.person.motherFirstName'),
                $translate.instant('pr.person.birthDate'),
                $translate.instant('pr.person.idNumber'),
                $translate.instant('pr.deceased.deathDate'),
                $translate.instant('pr.deceased.deathCause'),
                $translate.instant('pr.deceased.deathPlace')
            ],
            colModel: [
                {name: 'id', hidden: true},
                {name: 'extraActions', sortable: false, fixed: true, align: 'center', width: 65},
                {name: 'lastName', index: 'person.lastName', sortable: true, editable: false, width: 150},
                {name: 'firstName', index: 'person.firstName', sortable: true, editable: false, width: 150},
                {name: 'fatherFirstName', index: 'person.fatherFirstName', sortable: true, editable: false, width: 150},
                {name: 'motherFirstName', index: 'person.motherFirstName', sortable: true, editable: false, width: 150},
                {name: 'birthDate', index: 'person.birthDate', sortable: true, editable: false, width: 150, align: 'center'},
                {name: 'idNumber', index: 'person.idNumber', sortable: true, editable: false, width: 150},
                {name: 'deathDate', index: 'deathDate', sortable: true, editable: false, width: 150, align: 'center'},
                {name: 'deathCause', index: 'deathCause', sortable: true, editable: false, width: 150},
                {name: 'deathPlace', index: 'deathPlace', sortable: true, editable: false, width: 150}
            ],
            sortname: 'person.lastName',
            sortorder: 'asc'
        };
        
        $scope.retrieveData = function() {
            toitsuJqGridService.retrieveData($('#' + $scope.deceasedGridId), $scope.deceasedArgs);
        };
        
    }
    
})();