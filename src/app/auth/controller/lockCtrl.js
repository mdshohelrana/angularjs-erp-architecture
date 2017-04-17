'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.AUTH.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'lockCtrl';
    module.controller(controllerId, lockCtrl);
    
    lockCtrl.$inject = ['$scope', '$timeout'];

    function lockCtrl($scope, $timeout) {

        //rename $scope
        var vm = $scope;      
    }
});