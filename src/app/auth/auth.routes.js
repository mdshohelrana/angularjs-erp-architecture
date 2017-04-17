'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.AUTH.name);

    module.config(['$stateProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {

            var layout = "app/auth/views/auth.html";

            $stateProvider
                .state('auth', {
                    abstract: true,
                    url: '/auth',
                    templateUrl: layout + htmlVersion,
                    data: {
                        title: ''
                    }
                })
                .state('auth.register', {
                    url: '/register',
                    templateUrl: 'app/auth/views/register.html' + htmlVersion,
                    controller: 'registerCtrl',
                    resolve: load(['app/auth/controller/registerCtrl.js','app/auth/models/auth.js']),
                    data: {
                        title: 'register'
                    }
                })
                .state('auth.login', {
                    url: '/login',
                    templateUrl: 'app/auth/views/login.html' + htmlVersion,
                    controller: 'loginCtrl',
                    resolve: load(['app/auth/controller/loginCtrl.js','app/auth/models/auth.js']),
                    data: {
                        title: 'login'
                    }
                })
                .state('auth.forgotPassword', {
                    url: '/forgotPassword',
                    templateUrl: 'app/auth/views/forgotPassword.html' + htmlVersion,
                    controller: 'forgotPasswordCtrl',
                    resolve: load(['app/auth/controller/forgotPasswordCtrl.js','app/auth/models/auth.js']),
                    data: {
                        title: 'forgotPassword'
                    }
                }).state('auth.lock', {
                    url: '/lock',
                    templateUrl: 'app/auth/views/lock.html' + htmlVersion,
                    controller: 'lockCtrl',
                    resolve: load(['app/auth/controller/lockCtrl.js','app/auth/models/auth.js']),
                    data: {
                        title: 'Lock'
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