(function() {
    
    angular.module('app.global').directive('toitsuNav', toitsuNav);
    
    function toitsuNav($state, toitsuNavConsts) {
        
        return {
            restrict: 'E',
            templateUrl: './src/app/_global/toitsu-nav/toitsu-nav.tpl.html',
            replace: true,
            scope: {},
            link: function(scope, element, attrs) {
                Layout.initSidebar($state);
                
                scope.isStNav = function() {
                    let currentStateNameArray = $state.current.name.split('.');
                    for (let i = 0, len = toitsuNavConsts.stStates.length; i < len; i++) {
                        if (currentStateNameArray[2] === toitsuNavConsts.stStates[i]) {
                            return true;
                        }
                    }
                    return false;
                };
                
                scope.isPrNav = function() {
                    let currentStateNameArray = $state.current.name.split('.');
                    for (let i = 0, len = toitsuNavConsts.prStates.length; i < len; i++) {
                        if (currentStateNameArray[2] === toitsuNavConsts.prStates[i]) {
                            return true;
                        }
                    }
                    return false;
                };
                
                scope.isParamNav = function() {
                    let currentStateNameArray = $state.current.name.split('.');
                    for (let i = 0, len = toitsuNavConsts.paramStates.length; i < len; i++) {
                        if (currentStateNameArray[2] === toitsuNavConsts.paramStates[i]) {
                            return true;
                        }
                    }
                    return false;
                };
                
                scope.stateIs = function(stateName) {
                    return $state.current.name === stateName;
                };
                
                scope.stateIncludes = function(stateName) {
                    return $state.current.name.includes(stateName);
                };
            }
        };
        
    }
    
})();
