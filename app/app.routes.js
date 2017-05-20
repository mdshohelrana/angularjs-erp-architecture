'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.APP.name);

    //run app module
    module.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    module.config(['$provide', '$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
      function ($provide, $stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {

          var layout = "app/_common/layout/app.html";

          $urlMatcherFactoryProvider.caseInsensitive(true);
          $urlRouterProvider.otherwise('/restaurant/visitor');
          //$urlRouterProvider.otherwise('/app/splash');
          //$urlRouterProvider.otherwise('/auth/register');
          //$urlRouterProvider.otherwise('/admin/firstpage');
          //$urlRouterProvider.otherwise('/blog/firstpage');

          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  data: {
                      title: ''
                  },
                  templateUrl: layout + htmlVersion
              })
              .state('app.splash', {
                  url: '/splash',
                  data: {
                      title: 'Splash Page'
                  },
                  templateUrl: 'app/_common/splash/splash.html' + htmlVersion,
                  controller: 'splashCtrl',
                  resolve: load(['app/_common/splash/splashCtrl.js'])
              });

          //no history
          $provide.decorator('$sniffer', function ($delegate) {
              $delegate.history = false;
              return $delegate;
          });

          //dynamically loaded angular and javascript files
          function load(srcs, callback) {
              return {
                  deps: [
                      '$ocLazyLoad', '$q',
                      function ($ocLazyLoad, $q) {
                          var deferred = $q.defer();
                          var promise = false;
                          srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                          if (!promise) {
                              promise = deferred.promise;
                          }
                          angular.forEach(srcs, function (src) {
                              promise = promise.then(function () {
                                  if (JQ_CONFIG[src]) {
                                      return $ocLazyLoad.load(JQ_CONFIG[src]);
                                  }
                                  angular.forEach(MODULE_CONFIG, function (module) {
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
                          return callback ? promise.then(function () { return callback(); }) : promise;
                      }
                  ]
              };
          }
      }]);
});