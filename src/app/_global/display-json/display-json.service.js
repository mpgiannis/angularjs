(function() {
    
    angular.module('app.global').service('displayJsonService', displayJsonService);
    
    function displayJsonService($uibModal) {
        
        return {
            openModal: openModal
        };
        
        function openModal(originalJson, title) {
            
            let modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './src/app/_global/display-json/display-json-modal.tpl.html',
                windowClass: 'modal-fixed-width-md',
                controller: function($scope, $uibModalInstance, originalJson, title) {
                    
                    $scope.formattedJson = JSON.stringify(JSON.parse(originalJson), null, 2); //Indent with 2 spaces
                    $scope.title = title;
                    
                    //Κλείσιμο
                    $scope.close = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                    
                },
                resolve: {
                    originalJson: function() {return originalJson;},
                    title: function() {return title;}
                }
            });
            
            modalInstance.result.then(function(result) {
                
            }, function() {
                
            });
        }
        
    }
})();