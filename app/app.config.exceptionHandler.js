'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.APP.name);

    //error handling configuration
    module.config(['$provide', exceptionConfig]);
    function exceptionConfig($provide) {
        $provide.decorator('$exceptionHandler',
            ['$delegate', 'config', '$log', extendExceptionHandler]);
    }
    function extendExceptionHandler($delegate, config, $log) {
        var appErrorPrefix = config.appErrorPrefix;

        return function (exception, cause) {
            $delegate(exception, cause);
            if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) { return; }

            var errorData = {
                exception: exception,
                cause: cause
            };
            var msg = 'ERROR PREFIX' + exception.message;
            $log.error(msg, errorData);
        };
    }
});