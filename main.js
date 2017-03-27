'use strict';

//no cache when app is loaded
var jsVersion = "bust=v_00_00_" + new Date().getSeconds().toString();
var htmlVersion = "?bust=v_00_00_" + new Date().getSeconds().toString();

require.config({
    baseURL: 'Vendors',
    urlArgs: jsVersion,
    waitSeconds: 0,
    paths: {

        //helper and javascript plugins
        plugins: 'assets/js/plugins',
        jsVariables: 'assets/js/jsVariables',
        jsMethods: 'assets/js/jsMethods',
        extension: 'assets/js/extensions',

        //library for jquery
        domReady: 'assets/js/plugin/domReady',
        jquery: 'assets/libs/jquery/dist/jquery.min',
        twitterBootstrap: 'assets/libs/bootstrap/dist/js/bootstrap.min',
        lodash: 'assets/libs/lodash/dist/lodash.min',

        //library for angular
        angular: 'assets/libs/angular/angular.min',
        ngSanitize: 'assets/libs/angular-sanitize/angular-sanitize.min',        
        ngAnimate: 'assets/libs/angular-animate/angular-animate.min',
        restangular: 'assets/libs/restangular/dist/restangular.min',
        uiRouter: 'assets/libs/angular-ui-router/release/angular-ui-router.min',       
        oclazyload: 'assets/libs/oclazyload/dist/ocLazyLoad.require.min',
        //angularTranslate: 'assets/libs/angular-translate/angular-translate.min',
        //ngStorage: 'assets/libs/ngstorage/ngStorage.min',

        //application module
        appBootstrap: 'app/app.bootstrap',
    },
    shim: {
        domReady: {
            deps: ['jquery']
        },
        twitterBootstrap: {
            deps: ['jquery']
        },
        lodash: {
            deps: ['jquery']
        },
        angular: {
            exports: 'angular'
        },
        ngSanitize: {
            deps: ['angular']
        },
        ngAnimate: {
            deps: ['angular']
        },
        restangular: {
            deps: ['angular', 'lodash']
        },
        uiRouter: {
            deps: ['angular']
        },
        oclazyload: {
            deps: ['angular']
        },
        //angularTranslate: {
        //    deps: ['angular']
        //},
        //ngStorage: {
        //    deps: ['angular']
        //},
        appBootstrap: {
            deps: ['plugins', 'jsVariables', 'jsMethods', 'extension', 'angular']
        }
    },
    priority: ["angular"],

    // kick start application
    deps: ['appBootstrap']
});