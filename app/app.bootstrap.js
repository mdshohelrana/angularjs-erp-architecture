'use strict';

define([
    'app/app.module'
], function (app) {

    require(['domReady'], function (domReady) {

        //after loading all modules, need dowload all config files
        require([
            'domReady'

            //applications
            , 'app/app.config'
            , 'app/app.config.lazyload'
            , 'app/app.config.exceptionHandler'
            , 'app/app.routes'
            , 'app/app.ctrl'

            //common
            , 'app/_common/common.config'
            , 'app/_common/directives/blogPageTitle'
            , 'app/_common/directives/hrefVoid'
            , 'app/_common/directives/blogInclude'

            //Auth
            , 'app/auth/auth.config'
            , 'app/auth/auth.config.lazyload'
            , 'app/auth/auth.routes'

            //admin            
            , 'app/admin/admin.config'
            , 'app/admin/admin.config.exceptionHandler'
            , 'app/admin/admin.routes'

            //blog
            , 'app/blog/blog.config'
            , 'app/blog/blog.config.lazyload'
            , 'app/blog/blog.routes'

        ], function (domReady) {

            //after document ready
            domReady(function () {

                //start application
                var initInjector = angular.bootstrap(document, [APP_MODULES.APP.name]);

            });
        });
    });
});