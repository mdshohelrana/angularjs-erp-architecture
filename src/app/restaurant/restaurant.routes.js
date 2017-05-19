'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.RES.name);

    module.config(['$stateProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {

            var layout = "app/restaurant/views/restaurant.html";

            $stateProvider
                .state('restaurant', {
                    abstract: true,
                    url: '/restaurant',
                    templateUrl: layout + htmlVersion,
                    data: {
                        title: ''
                    }
                })
                .state('restaurant.visitor', {
                    url: '/visitor',
                    templateUrl: 'app/restaurant/views/visitor.html' + htmlVersion,
                    controller: 'visitorCtrl',
                    resolve: load(['app/restaurant/controller/visitorCtrl.js', 'app/restaurant/services/visitorSvc.js']),
                    data: {
                        title: 'visitor'
                    }
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