'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = angular.module(APP_MODULES.BLOG.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'aboutCtrl';
    module.controller(controllerId, aboutCtrl);
    
    aboutCtrl.$inject = ['$scope', '$timeout'];

    function aboutCtrl($scope, $timeout) {

        //rename $scope
        var vm = $scope;
    }
});