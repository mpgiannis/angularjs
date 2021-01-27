(function() {
    
    angular.module('app.global').constant('uiDatetimePickerConfig', {
        dateFormat: 'yyyy-MM-dd HH:mm',
        defaultTime: '00:00:00',
        html5Types: {
            date: 'yyyy-MM-dd',
            'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
            'month': 'yyyy-MM'
        },
        initialPicker: 'date',
        reOpenDefault: false,
        enableDate: true,
        enableTime: true,
        buttonBar: {
            show: true,
            now: {
                show: true,
                text: 'Τώρα',
                cls: 'btn-sm btn-default'
            },
            today: {
                show: true,
                text: 'Σήμερα',
                cls: 'btn-sm btn-default'
            },
            clear: {
                show: true,
                text: 'Καθαρισμός',
                cls: 'btn-sm btn-default'
            },
            date: {
                show: true,
                text: 'Ημ/νία',
                cls: 'btn-sm btn-default'
            },
            time: {
                show: true,
                text: 'Ώρα',
                cls: 'btn-sm btn-default'
            },
            close: {
                show: true,
                text: 'Κλείσιμο',
                cls: 'btn-sm btn-default'
            },
            cancel: {
                show: false,
                text: 'Ακύρωση',
                cls: 'btn-sm btn-default'
            }
        },
        closeOnDateSelection: true,
        closeOnTimeNow: true,
        appendToBody: false,
        altInputFormats: [],
        ngModelOptions: {timezone: null},
        saveAs: false,
        readAs: false
    });
    
})();
