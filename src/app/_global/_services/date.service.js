(function() {
    
    angular.module('app.global').service('dateService', dateService);
    
    function dateService() {
        
        let EUROPE_ATHENS_TIMEZONE = "Europe/Athens";
        
        return {
            getFormattedMomentWithTzAsDateWithSlashes: getFormattedMomentWithTzFromTimestampAsDateWithSlashes,
            getFormattedMomentWithTzAsDateTimeWithSlashes: getFormattedMomentWithTzFromTimestampAsDateTimeWithSlashes,
            getDateWithoutTime: getDateWithoutTime,
            addMonths: addMonths,
            addDays: addDays
        };
        
        /**
         * Ανάκτηση formatted timezone για συγκεκριμένη χρονική στιγμή
         * Επιστρέφεται η ημερομηνία στη μορφή [DD/MM/YYYY]
         */
        function getFormattedMomentWithTzFromTimestampAsDateWithSlashes(momentArg) {
            
            let formattedArg = moment.tz(momentArg, EUROPE_ATHENS_TIMEZONE).format('DD/MM/YYYY');
            
            if(momentArg && formattedArg !== 'Invalid date') {
                return formattedArg;
            }
            else if(Number(momentArg)) {
                return moment.tz(Number(momentArg), EUROPE_ATHENS_TIMEZONE).format('DD/MM/YYYY');
            }
            else {
                return momentArg;
            }
        }
        
        /**
         * Ανάκτηση formatted timezone για συγκεκριμένη χρονική στιγμή
         * Επιστρέφεται η ημερομηνία στη μορφή [DD/MM/YYYY HH:mm]
         */
        function getFormattedMomentWithTzFromTimestampAsDateTimeWithSlashes(momentArg) {
            
            let formattedArg = moment.tz(momentArg, EUROPE_ATHENS_TIMEZONE).seconds(0).format('DD/MM/YYYY HH:mm');
            
            if(momentArg && formattedArg !== 'Invalid date') {
                return formattedArg;
            }
            else if(Number(momentArg)) {
                return moment.tz(Number(momentArg), EUROPE_ATHENS_TIMEZONE).seconds(0).format('DD/MM/YYYY HH:mm');
            }
            else {
                return momentArg;
            }
        }
    
        /**
         * Επιστροφή της δεδομένης ημερομηνίας με την ώρα ορισμένη σε 00:00
         */
        function getDateWithoutTime(momentArg) {
            if(momentArg) {
                return moment(momentArg).startOf('day');
            }
            return momentArg;
        }
    
        /**
         * Προσθήκη μηνών στη δεδομένη ημερομηνία
         */
        function addMonths(momentArg, months) {
            if(!momentArg || !months) {
                return momentArg;
            }
            return moment(momentArg).add(months, 'M');
        }
        
        /**
         * Προσθήκη ημερών στη δεδομένη ημερομηνία
         */
        function addDays(momentArg, days) {
            if(!momentArg || !days) {
                return momentArg;
            }
            return moment(momentArg).add(days, 'days');
        }
    }
    
})();
