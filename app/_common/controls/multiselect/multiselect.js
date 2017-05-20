
'use strict';
define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.COMMON.name);

    var directive = {
        restrict: 'E',
        replace: true,
        scope: {
            sourceList: '=',
            selectedItems: '=?',
            selectedValues: '=ngModel',
            selectedTexts: '=?',
            valueProperty: '@',
            textProperty: '@',
        },
        templateUrl: '_common/Controls/multiselect/multiselect.html',
        link: link
    };
    return directive;

    function link() {

    }
});