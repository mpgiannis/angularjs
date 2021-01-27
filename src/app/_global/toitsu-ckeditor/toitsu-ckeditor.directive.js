(function() {
    
    angular.module('app.global').directive('toitsuCkeditor', toitsuCkeditor);
    
    function toitsuCkeditor($rootScope) {
        
        return {
            restrict: 'A',
            scope: {
                content: '=',
                editorOptions: '=',
                api: '=',
                changeReportTitleFunction: '='
            },
            link: function(scope, element) {
                
                let bck = scope.content;
                let ckeditor = CKEDITOR.replace(element[0], scope.editorOptions);
                
                scope.ckeditor = ckeditor;
                
                ckeditor.on('instanceReady', function() {
                    
                    scope.content = bck;
                    ckeditor.setData(scope.content);
                    
                    let iframe = $('.cke_wysiwyg_frame').contents();
                    
                    
                    iframe.find('html').css({'background-color': '#b0b0b0'});
                    
                    iframe.find('body').css({
                        'width': '170mm',
                        //'height': '297mm',
                        'background-color': '#ffffff',
                        'margin': '0mm',
                        'padding': '5mm'
                    });
                    
                    iframe.find('td').css({'padding': '-1px'});
                    
                    $rootScope.$broadcast('menuToggleChanged');
                    
                });
                
                function updateModel() {
                    scope.content = ckeditor.getData();
                }
                
                ckeditor.on('change', updateModel);
                ckeditor.on('key', updateModel);
                ckeditor.on('dataReady', updateModel);
                ckeditor.on('blur', updateModel);
                
                ckeditor.on('beforeCommandExec', function(event) {
                    if (event.data.name === 'print') {
                        if(scope.changeReportTitleFunction) {
                            scope.changeReportTitleFunction();
                        }
                        scope.hideBorderZeroOnPrint('cke_show_border');
                        scope.hidePageBreaksOnPrint('cke_pagebreak');
                    }
                });
                
                ckeditor.on('afterCommandExec', function(event) {
                    if (event.data.name === 'print') {
                        scope.showBorderZeroAfterPrint('cke_show_border');
                        scope.showPageBreaksAfterPrint('cke_pagebreak');
                    }
                });
                
                if (scope.editorOptions.readOnly) {
                    scope.$watch('content', function() {
                        ckeditor.setData(scope.content);
                    });
                }
                
                
                /**
                 * Απόκρυψη των borders πριν από την εκτύπωση
                 */
                scope.hideBorderZeroOnPrint = function(classname) {
                    let node = scope.ckeditor.document.$.getElementsByTagName('body')[0];
                    let elements = node.getElementsByTagName('table');
                    for (let i = 0, len = elements.length; i < len; i++) {
                        let helper = elements[i].getAttribute('class');
                        if (helper)
                            elements[i].setAttribute('class', helper.replace(classname, ''));
                    }
                };
                
                /**
                 * Εμφάνιση των borders μετά από την εκτύπωση
                 */
                scope.showBorderZeroAfterPrint = function(classname) {
                    let node = scope.ckeditor.document.$.getElementsByTagName('body')[0];
                    let elements = node.getElementsByTagName('table');
                    for (let i = 0, len = elements.length; i < len; i++) {
                        let bor = elements[i].getAttribute('border');
                        if (bor && bor == 0) {
                            let helper = elements[i].getAttribute('class');
                            elements[i].setAttribute('class', helper ? helper.concat(classname) : classname);
                        }
                    }
                };
                
                /**
                 * Απόκρυψη των page breaks πριν από την εκτύπωση
                 */
                scope.hidePageBreaksOnPrint = function(classname) {
                    let node = scope.ckeditor.document.$.getElementsByTagName('body')[0];
                    let regExp = new RegExp('\\b' + classname + '\\b');
                    let elements = node.getElementsByTagName('div');
                    for (let i = 0, len = elements.length; i < len; i++) {
                        if (regExp.test(elements[i].className)) {
                            elements[i].setAttribute('style', elements[i].getAttribute('style').concat('; visibility: hidden;'));
                        }
                    }
                };
                
                /**
                 * Εμφάνιση των page breaks πριν από την εκτύπωση
                 */
                scope.showPageBreaksAfterPrint = function(classname) {
                    let node = scope.ckeditor.document.$.getElementsByTagName('body')[0];
                    let regExp = new RegExp('\\b' + classname + '\\b');
                    let elements = node.getElementsByTagName('div');
                    for (let i = 0, len = elements.length; i < len; i++) {
                        if (regExp.test(elements[i].className)) {
                            elements[i].setAttribute('style', elements[i].getAttribute('style').replace('visibility: hidden;', ''));
                        }
                    }
                };
                
                /**
                 * Καταχώριση (προγραμματιστική) δεδομένων στον ckeditor
                 */
                scope.setCkeditorData = function(data) {
                    scope.ckeditor.setData(data);
                };
                
                /**
                 * Exposed functions
                 */
                if(scope.api) {
                    scope.api = {
                        setCkeditorData: scope.setCkeditorData
                    };
                }
            }
        };
        
    }
    
})();