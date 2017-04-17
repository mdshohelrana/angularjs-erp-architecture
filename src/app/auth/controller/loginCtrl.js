'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.AUTH.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'loginCtrl';
    module.controller(controllerId, loginCtrl);
    
    loginCtrl.$inject = ['$scope', '$timeout'];

    function loginCtrl($scope, $timeout) {

        //rename $scope
        var vm = $scope;      
    }
});