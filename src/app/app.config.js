'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.APP.name);

    //attached all recipies of angular
    module.config([
        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

            // lazy controller, directive and service
            module.controller = $controllerProvider.register;
            module.directive = $compileProvider.directive;
            module.filter = $filterProvider.register;
            module.factory = $provide.factory;
            module.service = $provide.service;
            module.constant = $provide.constant;
            module.value = $provide.value;
        }
    ]);

    //html5 mode enable configuration
    module.config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false //no need base tag into index page
        }).hashPrefix('');
    });

    var keyCodes = {
        backspace: 8,
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        insert: 45,
        del: 46
    };
    var config = {
        appErrorPrefix: '[Personal Blog ERROR] ', //Configure the exceptionHandler decorator               
        keyCodes: keyCodes,
        version: '1.0.0'
    };
    module.value('config', config);

    module.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);

    ////by default URL hook configuration
    //module.config(['$urlRouterProvider', '$sceDelegateProvider', '$stickyStateProvider',
    //    function ($urlRouterProvider, $sceDelegateProvider, $stickyStateProvider) {
    //        $urlRouterProvider.otherwise('/');
    //        $stickyStateProvider.enableDebug(true);
    //        //$sceDelegateProvider.resourceUrlWhitelist(['self', cdnIP + '**']);
    //    }
    //]);

    //module.config(['$translateProvider', function ($translateProvider) {
    //    // Register a loader for the static files
    //    // So, the module will search missing translation tables under the specified urls.
    //    // Those urls are [prefix][langKey][suffix].
    //    $translateProvider.useStaticFilesLoader({
    //        prefix: 'l10n/',
    //        suffix: '.js'
    //    });
    //    // Tell the module what language to use by default
    //    $translateProvider.preferredLanguage('en');
    //    // Tell the module to store the language in the local storage
    //    $translateProvider.useLocalStorage();
    //}]);

    //module.run(function ($browser) {
    //    $browser.baseHref = function () { return "/" };
    //});
});