'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.AUTH.name);

    //jquery configuraions
    module.constant('JQ_CONFIG', {
        tagsinput: [
            '../libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
            '../libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.css'
        ]
    });

    //angular module configurations
    module.constant('MODULE_CONFIG', [
        {
            name: 'ngGrid',
            files: [
                '../libs/angular/ng-grid/build/ng-grid.min.js',
                '../libs/angular/ng-grid/ng-grid.min.css',
                '../libs/angular/ng-grid/ng-grid.bootstrap.css'
            ]
        }
    ]);

    // oclazyload config
    module.config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function ($ocLazyLoadProvider, MODULE_CONFIG) {
          // We configure ocLazyLoad to use the lib script.js as the async loader
          $ocLazyLoadProvider.config({
              debug: false,
              events: true,
              modules: MODULE_CONFIG,
              asyncLoader: requirejs
          });
      }]);

});