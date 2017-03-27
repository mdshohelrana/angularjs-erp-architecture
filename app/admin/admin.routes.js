'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.ADMIN.name);

    module.config(['$stateProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {

          var layout = "app/admin/views/admin.html";
          
          $stateProvider
              .state('admin', {
                  abstract: true,
                  url: '/admin',
                  data: {
                      title: ''
                  },
                  templateUrl: layout + htmlVersion
              })
              .state('admin.firstpage', {
                  url: '/firstpage',
                  templateUrl: 'app/admin/views/firstpage.html' + htmlVersion,
                  data: {
                      title: 'firstpage page'
                  }
              });

          //dynamically loaded angular and javascript files
          function load(srcs, callback) {
              return {
                  deps: [
                      '$ocLazyLoad', '$q',
                      function($ocLazyLoad, $q) {
                          var deferred = $q.defer();
                          var promise = false;
                          srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                          if (!promise) {
                              promise = deferred.promise;
                          }
                          angular.forEach(srcs, function(src) {
                              promise = promise.then(function() {
                                  if (JQ_CONFIG[src]) {
                                      return $ocLazyLoad.load(JQ_CONFIG[src]);
                                  }
                                  angular.forEach(MODULE_CONFIG, function(module) {
                                      if (module.name == src) {
                                          name = module.name;
                                      } else {
                                          name = src;
                                      }
                                  });
                                  return $ocLazyLoad.load(name);
                              });
                          });
                          deferred.resolve();
                          return callback ? promise.then(function() { return callback(); }) : promise;
                      }
                  ]
              };
          }
      }]);
});