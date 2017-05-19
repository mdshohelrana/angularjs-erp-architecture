'use strict';

define([
    'angular', 'ngSanitize', 'ngAnimate', 'restangular', 'satellizer', 'uiRouter', 'oclazyload'
    //, 'angularTranslate'
    //, 'ngStorage'

    , 'jquery', 'twitterBootstrap'

    , 'app/_common/common.module', 'app/auth/auth.module', 'app/admin/admin.module', 'app/blog/blog.module', 'app/restaurant/restaurant.module'

], function (ng) {

    //all angular common vendors module
    var angularModule = [, APP_MODULES.COMMON.name, APP_MODULES.AUTH.name, APP_MODULES.ADMIN.name, APP_MODULES.BLOG.name, APP_MODULES.RES.name
    , 'ngSanitize', 'ngAnimate', 'restangular', 'satellizer', 'ui.router', 'oc.lazyLoad'
        //, 'pascalprecht.translate'
        //, 'ngStorage'        
    ];

    //create application module
    var app = ng.module(APP_MODULES.APP.name, angularModule);

    return app;
});