'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.COMMON.name);

    module.directive('blogPageTitle', function ($rootScope, $timeout) {
        return {
            restrict: 'A',
            compile: function (element, attributes) {
                element.removeAttr('blog-page-title data-blog-page-title');

                var defaultTitle = attributes.blogPageTitle;
                var listener = function (event, toState, toParams, fromState, fromParams) {
                    var title = defaultTitle;
                    if (toState.data && toState.data.title) title = toState.data.title + ' | ' + title;
                    // Set asynchronously so page changes before title does
                    $timeout(function () {
                        $('html head title').text(title);
                    });
                };
                $rootScope.$on('$stateChangeStart', listener);
            }
        }
    });

});