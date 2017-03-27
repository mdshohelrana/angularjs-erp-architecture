'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.COMMON.name);

    module.directive('blogInclude', function () {
        return {
            replace: true,
            restrict: 'A',
            templateUrl: function (element, attr) {
                return attr.blogInclude;
            },
            compile: function (element) {
                element[0].className = element[0].className.replace(/placeholder[^\s]+/g, '');
            }
        };
    });

});