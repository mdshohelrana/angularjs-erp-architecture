'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.BLOG.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'homeCtrl';
    module.controller(controllerId, homeCtrl);
    
    homeCtrl.$inject = ['$scope', '$timeout'];

    function homeCtrl($scope, $timeout) {

        //rename $scope
        var vm = $scope;      
    }
});