(function() {
    
    angular.module('app.global').directive('compactDatetimepicker', compactDatetimepicker);
    
    function compactDatetimepicker() {
        
        return {
            restrict: 'E',
            templateUrl: './src/app/_global/compact-datetimepicker/compact-datetimepicker.tpl.html',
            replace: true,
            controller: 'CompactDatetimepickerController',
            scope: {
                model: '=',
                name: '@',
                disabled: '=ngDisabled',
                type: '@', //D = Date, Y = Year, default = Datetime
                mindate: "=",
                maxdate: "=",
                change: '&', //Το περιεχόμενο της μεθόδου πρέπει να περικλείεται σε $timeout
                init: '&' //Το περιεχόμενο της μεθόδου πρέπει να περικλείεται σε $timeout
            }
        };
        
    }
    
})();