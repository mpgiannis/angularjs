(function() {
    
    angular.module('app.global').service('toitsuToasterService', toitsuToasterService);
    
    function toitsuToasterService($translate, $transitions, toaster) {
        
        $transitions.onStart({}, function() {
            clearMessages();
        });
        
        return {
            showSuccess: showSuccess,
            showInfo: showInfo,
            showWarning: showWarning,
            showError: showError,
            
            showSuccessStay: showSuccessStay,
            showInfoStay: showInfoStay,
            showWarningStay: showWarningStay,
            showErrorStay: showErrorStay,
            
            addSuccess: addSuccess,
            addInfo: addInfo,
            addWarning: addWarning,
            addError: addError,
            
            addSuccessStay: addSuccessStay,
            addInfoStay: addInfoStay,
            addWarningStay: addWarningStay,
            addErrorStay: addErrorStay,
            
            apiValidationErrors: apiValidationErrors,
            apiValidationErrorsAsAddedWarningsStay: apiValidationErrorsAsAddedWarningsStay,
            httpError: httpError,
            httpClientError: httpClientError
        };
        
        function showSuccess(message, title) {
            clearMessages();
            toaster.pop('success', title, message);
        }
        
        function showInfo(message, title) {
            clearMessages();
            toaster.pop('info', title, message);
        }
        
        function showWarning(message, title) {
            clearMessages();
            toaster.pop('warning', title, message);
        }
        
        function showError(message, title) {
            clearMessages();
            toaster.pop('error', title, message);
        }
        
        
        function showSuccessStay(message, title) {
            clearMessages();
            toaster.pop('success', title, message, -1);
        }
        
        function showInfoStay(message, title) {
            clearMessages();
            toaster.pop('info', title, message, -1);
        }
        
        function showWarningStay(message, title) {
            clearMessages();
            toaster.pop('warning', title, message, -1);
        }
        
        function showErrorStay(message, title) {
            clearMessages();
            toaster.pop('error', title, message, -1);
        }
        
        
        function addSuccess(message, title) {
            toaster.pop('success', title, message);
        }
        
        function addInfo(message, title) {
            toaster.pop('info', title, message);
        }
        
        function addWarning(message, title) {
            toaster.pop('warning', title, message);
        }
        
        function addError(message, title) {
            toaster.pop('error', title, message);
        }
        
        
        function addSuccessStay(message, title) {
            toaster.pop('success', title, message, -1);
        }
        
        function addInfoStay(message, title) {
            toaster.pop('info', title, message, -1);
        }
        
        function addWarningStay(message, title) {
            toaster.pop('warning', title, message, -1);
        }
        
        function addErrorStay(message, title) {
            toaster.pop('error', title, message, -1);
        }
        
        
        function apiValidationErrors(response) {
            if(response.status === 422 && response.data && response.data.errors) {
                clearMessages();
                
                let message = '';
                for(let i = 0; i < response.data.errors.length; i++) {
                    message += response.data.errors[i] + '<br/>';
                }
                
                toaster.pop('error', '', message, -1);
            }
        }
        
        function apiValidationErrorsAsAddedWarningsStay(response) {
            if(response.status === 422 && response.data && response.data.errors) {
                
                let message = '';
                for(let i = 0; i < response.data.errors.length; i++) {
                    message += response.data.errors[i] + '<br/>';
                }
                
                toaster.pop('warning', '', message, -1);
            }
        }
        
        function httpError(response, dataVarName) {
            
            if(!dataVarName) {
                dataVarName = 'data';
            }
            
            let error = {
                errorType: "http",
                errorId: response[dataVarName].errorId,
                url: response[dataVarName].url,
                status: response.status,
                text: (response[dataVarName].errorMessage ? response[dataVarName].errorMessage : $translate.instant('global.error.generalError')),
                data: (response[dataVarName].exception ? response[dataVarName].exception.stackTrace : null),
                sqlMessage: response[dataVarName].sqlMessage,
                causeMessage: response[dataVarName].causeMessage
            };
            
            let message =
                '<strong>' + $translate.instant('global.error.errorId') + ': ' + error.errorId + '</strong>' +
                '<br/>' + $translate.instant('global.error.status') + ": " + error.status +
                '<br/>' + $translate.instant('global.error.url') + ': ' + error.url +
                '<br/>' + error.text + (error.sqlMessage ? (' - ' + error.sqlMessage) : '') + (error.causeMessage ? (' - ' + error.causeMessage) : '');
            
            toaster.pop('error', '', message, -1);
            
        }
        
        function httpClientError(statusCode) {
            
            let text = '4xx';
            if (statusCode === 401) {
                text = $translate.instant('global.error.401');
            } else if (statusCode === 403) {
                text = $translate.instant('global.error.403');
            }
            
            let error = {
                status: statusCode,
                text: text
            };
            
            let message =
                $translate.instant('global.error.status') + ": " + error.status +
                '<br/>' + error.text;
            
            toaster.pop('error', '', message, -1);
        }
        
        function clearMessages() {
            toaster.clear();
        }
    }
    
})();