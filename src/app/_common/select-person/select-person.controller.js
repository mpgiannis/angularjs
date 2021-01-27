(function() {
    
    angular.module('app.common').controller('SelectPersonController', SelectPersonController);
    
    function SelectPersonController($scope, $uibModal, personService, toitsuToasterService) {
        
        if($scope.personId) {
            
            /**
             * TODO - Να βγει από σχόλια όταν γίνει σύνδεση με το api!
             * ---------------------------------------------------------------------------------------------------------------------------------------
             */
            
            //personService.getPerson($scope.personId).$promise
            //    .then(function(response) {
            //        $scope.personInfo = buildPersonInfo(response);
            //    })
            //    .catch(function(response) {
            //        toitsuToasterService.apiValidationErrors(response);
            //    });
            
            /**
             * ---------------------------------------------------------------------------------------------------------------------------------------
             */
            
            //TODO - Να διαγραφεί όταν γίνει σύνδεση με το api!
            $scope.personInfo = buildPersonInfo({id: 20, lastName: 'Παπαδόπουλος', firstName: 'Παντελής'});
            //
        }
        
        $scope.personGridId = 'personGrid';
        
        $scope.openModalOrClear = function() {
            
            if($scope.personId) {
                $scope.personId = null;
                $scope.personInfo = null;
                return;
            }
            
            let modalInstance = $uibModal.open({
                animation: true,
                windowClass: 'modal-80percent',
                templateUrl: 'select-person-modal.tpl.html',
                controller: function ($scope, $rootScope, $uibModalInstance, $translate, $ngBootbox, toitsuJqGridService, personConsts, personGridId) {
                    
                    $scope.personGridId = personGridId;
                    $scope.personArgs = {};
                    
                    $scope.personGridData = {
                        caption: $translate.instant('global.results'),
                        url: $rootScope.baseUrl + personConsts.indexUrl,
                        stretchWidth: true,
                        colNames: [
                            'id',
                            $translate.instant('pr.person.lastName'),
                            $translate.instant('pr.person.firstName'),
                            $translate.instant('pr.person.fatherFirstName'),
                            $translate.instant('pr.person.motherFirstName'),
                            $translate.instant('pr.person.birthDate'),
                            'gender',
                            $translate.instant('pr.person.gender'),
                            $translate.instant('pr.person.afm'),
                            $translate.instant('pr.person.idNumber')
                        ],
                        colModel: [
                            {name: 'id', hidden: true},
                            {name: 'lastName', index: 'lastName', sortable: true, editable: false, width: 150},
                            {name: 'firstName', index: 'firstName', sortable: true, editable: false, width: 150},
                            {name: 'fatherFirstName', index: 'fatherFirstName', sortable: true, editable: false, width: 150},
                            {name: 'motherFirstName', index: 'motherFirstName', sortable: true, editable: false, width: 150},
                            {name: 'birthDate', index: 'birthDate', sortable: true, editable: false, width: 150, align: 'center'},
                            {name: 'gender', hidden: true},
                            {name: 'genderLabel', index: 'gender', sortable: true, editable: false, width: 100, align: 'center'},
                            {name: 'afm', index: 'afm', sortable: true, editable: false, width: 100},
                            {name: 'idNumber', index: 'idNumber', sortable: true, editable: false, width: 150}
                        ],
                        sortname: 'lastName',
                        sortorder: 'asc'
                    };
                    
                    $scope.retrieveData = function() {
                        toitsuJqGridService.retrieveData($('#' + $scope.personGridId), $scope.personArgs);
                    };
                    
                    //Μονό κλικ σε γραμμή
                    $scope.personSingleClick = function(id) {
                        
                    };
                    
                    //Διπλό κλικ σε γραμμή
                    $scope.personDoubleClick = function(id) {
                        $uibModalInstance.close(id);
                    };
                    
                    //Επιβεβαίωση
                    $scope.confirm = function() {
                        let id = toitsuJqGridService.getSelectedRowId($('#' + $scope.personGridId));
                        if(!id) {
                            $ngBootbox.alert($translate.instant('global.noRowSelected'));
                        }
                        else {
                            $uibModalInstance.close(id);
                        }
                    };
                    
                    //Ακύρωση
                    $scope.cancel = function() {
                        $uibModalInstance.dismiss();
                    };
                    
                },
                resolve: {
                    personGridId: function() {return $scope.personGridId;}
                }
            });
            
            modalInstance.rendered.then(function() {
                
            });
            
            modalInstance.result.then(function(result) {
                $scope.personId = result;
                
                if($scope.personId) {
                    personService.getPerson($scope.personId).$promise
                        .then(function(response) {
                            $scope.personInfo = buildPersonInfo(response);
                            $scope.onSelect({person: response});
                        })
                        .catch(function(response) {
                            toitsuToasterService.apiValidationErrors(response);
                        });
                }
                
            }, function() {
                
            });
            
        };
        
        function buildPersonInfo(person) {
            return person.lastName + ' ' + person.firstName;
        }
        
    }
    
})();
