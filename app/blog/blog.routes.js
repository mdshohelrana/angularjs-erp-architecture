'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.BLOG.name);

    module.config(['$stateProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
        function ($stateProvider, JQ_CONFIG, MODULE_CONFIG) {

            var layout = "app/blog/views/blog.html";

            $stateProvider
                .state('blog', {
                    abstract: true,
                    url: '/blog',
                    templateUrl: layout + htmlVersion,
                    data: {
                        title: ''
                    }
                })
                .state('blog.about', {
                    url: '/about',
                    templateUrl: 'app/_common/about/about.html' + htmlVersion,
                    controller: 'aboutCtrl',
                    resolve: load(['app/_common/about/aboutCtrl.js']),
                    data: {
                        title: 'About'
                    }
                })
                .state('blog.home', {
                    url: '/home',
                    templateUrl: 'app/blog/views/home.html' + htmlVersion,
                    controller: 'homeCtrl',
                    resolve: load(['app/blog/controller/homeCtrl.js']),
                    data: {
                        title: 'all blog views'
                    }
                })
                .state('blog.post', {
                    url: '/post',
                    templateUrl: 'app/blog/views/post.html' + htmlVersion,
                    data: {
                        title: 'post page'
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