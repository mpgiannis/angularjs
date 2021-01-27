(function() {
    
    angular.module('app.pr.deceased').controller('DeceasedViewController', DeceasedViewController);
    
    function DeceasedViewController($scope, $translate, $state, deceasedService, toitsuToasterService, formService, deceased, lists) {
    
        /**
         * TODO - 1) Να βγει από σχόλια όταν γίνει σύνδεση με το api!
         * -------------------------------------------------------------------------------------------------------------------------------------------
         */
        
        //$scope.deceased = deceased;
        //$scope.lists = lists;
        
        /**
         * -------------------------------------------------------------------------------------------------------------------------------------------
         */
        
        /**
         * TODO - 1) Να διαγραφεί όταν γίνει σύνδεση με το api!
         * -------------------------------------------------------------------------------------------------------------------------------------------
         */
        
        if($state.params.id) {
            $scope.deceased = {
                id: $state.params.id,
                person: {
                    id: 20,
                    type: 'HUMAN',
                    gender: 'MALE',
                    lastName: 'Παπαδόπουλος',
                    firstName: 'Παντελής',
                    fatherFirstName: 'Περικλής',
                    testCheckbox: true,
                    testRadio: 1
                },
                deathRegisterOfficeId: 2,
                deathDate: 813276000000,
                deathCause: 'Δοκιμή',
                testFirstNumber: 2500,
                testSecondNumber: 1024.811
            };
        }
        else {
            $scope.deceased = {};
        }
        
        $scope.lists = {};
        $scope.lists.personTypes = [{value: 'HUMAN', label: 'Φυσικό Πρόσωπο'}, {value: 'COMPANY', label: 'Εταιρεία'}];
        $scope.lists.genders = [{value: 'MALE', label: 'Άρρεν'}, {value: 'FEMALE', label: 'Θήλυ'}];
        $scope.lists.registerOffices = [{id: 1, name: 'Κοζάνης'}, {id: 2, name: 'Μετσόβου'}, {id: 3, name: 'ΕΛΑ'}];
        $scope.lists.countries = [{id: 1, name: 'Ελλάδα'}, {id: 2, name: 'Ισπανία'}, {id: 3, name: 'Νορβηγία'}];
        $scope.lists.birthDateTypes = [{label: 'Ημερομηνία', ordinal: 0}, {label: 'Ημερομηνία/Ώρα', ordinal: 1}, {label: 'Έτος', ordinal: 2}];
        
        /**
         * -------------------------------------------------------------------------------------------------------------------------------------------
         */
        
        $scope.personDataIsOpen = true;
        $scope.deceasedDataIsOpen = true;
        
        //Καλείται μέσα από το directive select-person όταν επιλεγεί πρόσωπο
        $scope.personSelected = function(person) {
            console.log(person);
        };
        
        $scope.saveDeceased = function() {
            
            App.blockUI();
            
            /**
             * TODO - 2) Να βγει από σχόλια όταν γίνει σύνδεση με το api!
             * ---------------------------------------------------------------------------------------------------------------------------------------
             */
            
            //deceasedService.saveDeceased($scope.deceased).$promise
            //    .then(function(response) {
            //        $scope.deceased = response;
            //        formService.setPristine('deceasedForm');
            //        
            //        $state.go($state.current, {id: $scope.deceased.id}).then(function() {
            //            toitsuToasterService.showSuccess($translate.instant('pr.deceased.saveSuccess'));
            //        });
            //    })
            //    .catch(function(response) {
            //        toitsuToasterService.apiValidationErrors(response);
            //    })
            //    .finally(function() {
            //        App.unblockUI();
            //    });
            
            /**
             * ---------------------------------------------------------------------------------------------------------------------------------------
             */
            
            /**
             * TODO - 2) Να διαγραφεί όταν γίνει σύνδεση με το api!
             * ---------------------------------------------------------------------------------------------------------------------------------------
             */
            
            if(!$scope.deceased.id) {
                $scope.deceased.id = 500;
            }
            formService.setPristine('deceasedForm');
            $state.go($state.current, {id: $scope.deceased.id}).then(function() {
                toitsuToasterService.showSuccess($translate.instant('pr.deceased.saveSuccess'));
            });
            App.unblockUI();
            
            /**
             * ---------------------------------------------------------------------------------------------------------------------------------------
             */
        };
        
    }
    
})();