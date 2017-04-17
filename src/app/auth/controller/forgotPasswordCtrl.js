'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.AUTH.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'forgotPasswordCtrl';
    module.controller(controllerId, forgotPasswordCtrl);
    
    forgotPasswordCtrl.$inject = ['$scope', '$timeout'];

    function forgotPasswordCtrl($scope, $timeout) {

        //rename $scope
        var vm = $scope;      
    }
});