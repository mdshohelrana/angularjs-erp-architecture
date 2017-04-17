'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.COMMON.name);

    module.directive('hrefVoid', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                element.attr('href', '#');
                element.on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                })
            }
        }
    });

});