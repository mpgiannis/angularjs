/***
GLobal Directives
***/

//// Fix material design floating labels with initial value set
//angular.module('app').directive('ngModel', ['$timeout', function ($timeout) {
//    return {
//        restrict: 'A',
//        priority: -1, // lower priority than built-in ng-model so it runs first
//        link: function (scope, element, attr) {
//            scope.$watch(attr.ngModel, function (value) {
//                $timeout(function () {
//                    if (value) {
//                        element.trigger("change");
//                        element.trigger("focus");
//                    } else if (element.attr('placeholder') === undefined) {
//                        if (!element.is(":focus"))
//                            element.trigger("blur");
//                    }
//                });
//            });
//        }
//    };
//    }]);

// Add asterisk to required fields
angular.module('app').directive('ngRequired', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            $timeout(function () {
                if (scope.required || angular.isUndefined(scope.required))
                    element.after("<span class='requiredFormInput'>*</span>");
            });
        }
    }
}]);
// Add nesstable
angular.module('app').directive('nestable', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            onChangeFactory: '&'
        },
        link: function (scope, element, ngModel) {
            $timeout(function () {
                $(element).nestable()
                    .on('change', function () {
                        scope.onChangeFactory()($(element).nestable('serialize'));
                    });
                });
        }
    }
}]);
// Fix bootstrap horizontal-timeline not loading properly
angular.module('app').directive('horizontalTimeline', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        link: function (scope, element, attr) {
            $timeout(function () {
                $(function () {
                    var timelines = $('.cd-horizontal-timeline');
                    var eventsMinDistance;

                    (timelines.length > 0) && initTimeline(timelines);

                    function initTimeline(timelines) {
                        timelines.each(function () {
                            eventsMinDistance = $(this).data('spacing');
                            var timeline = $(this),
                                timelineComponents = {};

                            //cache timeline components
                            timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
                            timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
                            timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
                            timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('.theDates');
                            timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
                            timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
                            timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
                            timelineComponents['eventsContent'] = timeline.children('.events-content');

                            //assign a left postion to the single events along the timeline
                            setDatePosition(timelineComponents, eventsMinDistance);
                            //assign a width to the timeline
                            var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
                            //the timeline has been initialize - show it
                            timeline.addClass('loaded');

                            //detect click on the next arrow
                            timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
                                event.preventDefault();
                                updateSlide(timelineComponents, timelineTotWidth, 'next');
                            });
                            //detect click on the prev arrow
                            timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
                                event.preventDefault();
                                updateSlide(timelineComponents, timelineTotWidth, 'prev');
                            });
                            //detect click on the a single event - show new event content
                            timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
                                event.preventDefault();
                                timelineComponents['timelineEvents'].removeClass('selected');
                                $(this).addClass('selected');
                                updateOlderEvents($(this));
                                updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
                                updateVisibleContent($(this), timelineComponents['eventsContent']);
                            });

                            //on swipe, show next/prev event content
                            timelineComponents['eventsContent'].on('swipeleft', function () {
                                var mq = checkMQ();
                                (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'next');
                            });
                            timelineComponents['eventsContent'].on('swiperight', function () {
                                var mq = checkMQ();
                                (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'prev');
                            });

                            //keyboard navigation
                            $(document).keyup(function (event) {
                                if (event.which == '37' && elementInViewport(timeline.get(0))) {
                                    showNewContent(timelineComponents, timelineTotWidth, 'prev');
                                } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
                                    showNewContent(timelineComponents, timelineTotWidth, 'next');
                                }
                            });
                        });
                    }

                    function updateSlide(timelineComponents, timelineTotWidth, string) {
                        //retrieve translateX value of timelineComponents['eventsWrapper']
                        var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
                            wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
                        //translate the timeline to the left('next')/right('prev')
                        (string == 'next') ? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth): translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
                    }

                    function showNewContent(timelineComponents, timelineTotWidth, string) {
                        //go from one event to the next/previous one
                        var visibleContent = timelineComponents['eventsContent'].find('.selected'),
                            newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

                        if (newContent.length > 0) { //if there's a next/prev event - show it
                            var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
                                newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

                            updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
                            updateVisibleContent(newEvent, timelineComponents['eventsContent']);
                            newEvent.addClass('selected');
                            selectedDate.removeClass('selected');
                            updateOlderEvents(newEvent);
                            updateTimelinePosition(string, newEvent, timelineComponents);
                        }
                    }

                    function updateTimelinePosition(string, event, timelineComponents) {
                        //translate timeline to the left/right according to the position of the selected event
                        var eventStyle = window.getComputedStyle(event.get(0), null),
                            eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
                            timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
                            timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
                        var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

                        if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < -timelineTranslate)) {
                            translateTimeline(timelineComponents, -eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
                        }
                    }

                    function translateTimeline(timelineComponents, value, totWidth) {
                        var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
                        value = (value > 0) ? 0 : value; //only negative translate value
                        value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
                        setTransformValue(eventsWrapper, 'translateX', value + 'px');
                        //update navigation arrows visibility
                        (value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive'): timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
                        (value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive'): timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
                    }

                    function updateFilling(selectedEvent, filling, totWidth) {
                        //change .filling-line length according to the selected event
                        var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
                            eventLeft = eventStyle.getPropertyValue("left"),
                            eventWidth = eventStyle.getPropertyValue("width");
                        eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
                        var scaleValue = eventLeft / totWidth;
                        setTransformValue(filling.get(0), 'scaleX', scaleValue);
                    }

                    function setDatePosition(timelineComponents, min) {
                        for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
                            var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
                                distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
                            timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
                        }

                        if (i === 0) {
                            var theA = timelineComponents['timelineEvents'].eq(i);
                            var theLi = timelineComponents['eventsContent'].find('li[data-date="'+theA.attr('data-date')+'"]');
                            theA.addClass('selected');
                            theLi.addClass('selected');
                        }
                    }

                    function setTimelineWidth(timelineComponents, width) {
                        var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
                            timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
                            timeSpanNorm = Math.round(timeSpanNorm) + 4,
                            totalWidth = timeSpanNorm * width;
                        timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
                        updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
                        updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);

                        return totalWidth;
                    }

                    function updateVisibleContent(event, eventsContent) {
                        var eventDate = event.data('date'),
                            visibleContent = eventsContent.find('.selected'),
                            selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
                            selectedContentHeight = selectedContent.height();

                        visibleContent.removeClass('selected');

                        if (selectedContent.index() > visibleContent.index()) {
                            var classEnetering = 'enter-right',
                                classLeaving = 'leave-left';
                        } else {
                            var classEnetering = 'enter-left',
                                classLeaving = 'leave-right';
                        }

                        selectedContent.attr('class', classEnetering);
                        visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                            visibleContent.removeClass('leave-right leave-left');
                            selectedContent.removeClass('enter-left enter-right');
                      		selectedContent.addClass('selected');
                        });
                        eventsContent.css('height', selectedContentHeight + 'px');
                    }

                    function updateOlderEvents(event) {
                        event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
                    }

                    function getTranslateValue(timeline) {
                        var timelineStyle = window.getComputedStyle(timeline.get(0), null),
                            timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
                            timelineStyle.getPropertyValue("-moz-transform") ||
                            timelineStyle.getPropertyValue("-ms-transform") ||
                            timelineStyle.getPropertyValue("-o-transform") ||
                            timelineStyle.getPropertyValue("transform");

                        if (timelineTranslate.indexOf('(') >= 0) {
                            var timelineTranslate = timelineTranslate.split('(')[1];
                            timelineTranslate = timelineTranslate.split(')')[0];
                            timelineTranslate = timelineTranslate.split(',');
                            var translateValue = timelineTranslate[4];
                        } else {
                            var translateValue = 0;
                        }

                        return Number(translateValue);
                    }

                    function setTransformValue(element, property, value) {
                        element.style["-webkit-transform"] = property + "(" + value + ")";
                        element.style["-moz-transform"] = property + "(" + value + ")";
                        element.style["-ms-transform"] = property + "(" + value + ")";
                        element.style["-o-transform"] = property + "(" + value + ")";
                        element.style["transform"] = property + "(" + value + ")";
                    }

                    //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
                    function parseDate(events) {
                        var dateArrays = [];
                        events.each(function () {
                            var singleDate = $(this),
                                dateComp = singleDate.data('date').split('T');
                            if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
                                var dayComp = dateComp[0].split('/'),
                                    timeComp = dateComp[1].split(':');
                            } else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
                                var dayComp = ["2000", "0", "0"],
                                    timeComp = dateComp[0].split(':');
                            } else { //only DD/MM/YEAR
                                var dayComp = dateComp[0].split('/'),
                                    timeComp = ["0", "0"];
                            }
                            var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
                            dateArrays.push(newDate);
                        });
                        return dateArrays;
                    }

                    function daydiff(first, second) {
                        return Math.round((second - first));
                    }

                    function minLapse(dates) {
                        //determine the minimum distance among events
                        var dateDistances = [];
                        for (i = 1; i < dates.length; i++) {
                            var distance = daydiff(dates[i - 1], dates[i]);
                            dateDistances.push(distance);
                        }
                        return Math.min.apply(null, dateDistances);
                    }

                    /*
                    	How to tell if a DOM element is visible in the current viewport?
                    	http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
                    */
                    function elementInViewport(el) {
                        var top = el.offsetTop;
                        var left = el.offsetLeft;
                        var width = el.offsetWidth;
                        var height = el.offsetHeight;

                        while (el.offsetParent) {
                            el = el.offsetParent;
                            top += el.offsetTop;
                            left += el.offsetLeft;
                        }

                        return (
                            top < (window.pageYOffset + window.innerHeight) &&
                            left < (window.pageXOffset + window.innerWidth) &&
                            (top + height) > window.pageYOffset &&
                            (left + width) > window.pageXOffset
                        );
                    }

                    function checkMQ() {
                        //check if mobile or desktop device
                        return window.getComputedStyle(document.querySelector('.ydata-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
                    }
                })
            });
        }
    };
    }]);

// Load automatically the defualt datepicker
angular.module('app').directive('datePicker', ['$translate', function ($translate) {
    return {
        restrict: "A",
        require: 'ngModel',
        scope: {
          defaultDate: '='
        },
        link: function (scope, element, attrs, ngModel) {
            $(function () {
                $(element).datepicker({
                    language: $translate.use(),
                    disabledTimeIntervals: true,
                    locale: "el.js",
                    autoclose: true,
                    format: 'dd/mm/yyyy',
                    changeMonth: true,
                    changeYear: true,
                    closeText: 'Clear',
                    showButtonPanel: true,
                    pickerPosition: 'bottom-left',
                    orientation: 'bottom right'
//                    onClose: function () {
//                        var event = arguments.callee.caller.caller.arguments[0];
//                        // If "Clear" gets clicked, then really clear it
//                        if ($(event.delegateTarget).hasClass('ui-datepicker-close')) {
//                            $(this).val('');
//                            scope.$apply(function () {
//                                ngModel.$setViewValue(null);
//                            });
//                        }
//                    },
//                    onSelect: function (date) {
//                        scope.$apply(function () {
//                            ngModel.$setViewValue(date);
//                        });
//                    }
                }).datepicker("setDate", scope.defaultDate);
            })
        }
    }
}]);

angular.module('app').directive('dateTimePicker', ['$translate', function ($translate) {
    return {
        restrict: "A",
        require: 'ngModel',
        scope: {
          defaultDate: '='
        },
        link: function (scope, element, attrs, ngModel) {
            $(function () {
                $(element).datetimepicker({
                    language: $translate.use(),
                    locale: "el.js",
                    autoclose: true,
                    format: 'dd/mm/yyyy hh:ii',
                    changeMonth: true,
                    changeYear: true,
                    closeText: 'Clear',
                    showButtonPanel: true,
                    pickerPosition: 'bottom-left',
                    orientation: 'bottom right'
                });
            })
        }
    }
}]);

//Custom Date range picker directive
angular.module('app').directive('customDaterangePicker', ['$translate', function ($translate) {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            var theRanges = {};
            var Today = $translate.instant('Today');
            var Yesterday = $translate.instant('Yesterday');
            var Last7Days = $translate.instant('Last7Days');
            var Last30Days = $translate.instant('Last30Days');
            var ThisMonth = $translate.instant('ThisMonth');
            var LastMonth = $translate.instant('LastMonth');

            theRanges[Today] = [moment(), moment()];
            theRanges[Yesterday] = [moment().subtract(1, 'days'), moment().subtract(1, 'days')];
            theRanges[Last7Days] = [moment().subtract(6, 'days'), moment()];
            theRanges[Last30Days] = [moment().subtract(29, 'days'), moment()];
            theRanges[ThisMonth] = [moment().startOf('month'), moment().endOf('month')];
            theRanges[LastMonth] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];

            $(function () {
                $(element).daterangepicker({
                        language: $translate.use(),
                        startDate: moment().subtract(29, 'days'),
                        endDate: moment(),
                        format: 'DD/MM/YYYY',
                        //                    dateLimit: {
                        //                        days: 60
                        //                    },
                        showDropdowns: true,
                        showWeekNumbers: false,
                        timePicker: false,
                        timePickerIncrement: 1,
                        timePicker12Hour: false,
                        ranges: theRanges,
                        buttonClasses: ['btn'],
                        applyClass: 'green',
                        cancelClass: 'default',
                        separator: $translate.instant('to'),
                        orientation: 'bottom auto',
                        locale: {
                            applyLabel: $translate.instant('Apply'),
                            fromLabel: $translate.instant('From'),
                            toLabel: $translate.instant('To'),
                            customRangeLabel: $translate.instant('CustomRange'),
                            firstDay: 1
                        }
                    },
                    function (start, end) {
                        //                    $('.custom-daterange-picker span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
                        scope.$apply(function () {
                            ngModel.$setViewValue(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
                        });
                    });
            });
        }
    }
}]);

angular.module('app').directive('touchSpin', ['$timeout', function ($timeout) {
    return {
        restrict: "A",
        scope: {
            fora: '='
        },
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            $timeout(function () {
                $(function () {
                    var minVal = -1000000000;
                    var maxVal = 1000000000;
                    if (scope.fora === '1') minVal = ngModel;
                    else maxVal = ngModel;
                    $(element).TouchSpin({
                        min: minVal,
                        max: maxVal,
                        initval: ngModel,
                        buttondown_class: "btn btn-danger",
                        buttonup_class: "btn btn-info"
                    })
                });
            });
        }
    }
}]);

angular.module('app').directive('inputMask', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).inputmask(""+scope.$eval(attrs.inputMask).mask+"", {"placeholder": ""+scope.$eval(attrs.inputMask).placeholder+""});
            $(element).on('change', function (el) {
//                console.log(attrs.connectionCreateController);
//                console.log(element);
                scope.$eval(attrs.ngModel + " ='" + element.val() + "'");
                // or scope[attrs.ngModel] = el.val() if your expression doesn't contain dot.
            });
        }
    };
});

// Handle global LINK click
angular.module('app').directive('a', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            $timeout(function () {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function (e) {
                        e.preventDefault(); // prevent link click for above criteria
                    });
                }
            })
        }
    };
}]);

// Handle Dropdown Hover Plugin Integration
angular.module('app').directive('dropdownMenuHover', function () {
    return {
        link: function (scope, elem) {
            elem.dropdownHover();
        }
    };
});

angular.module('app').directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
