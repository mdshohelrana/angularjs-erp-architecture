'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.RES.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'visitorCtrl';
    module.controller(controllerId, visitorCtrl);

    visitorCtrl.$inject = ['$scope', '$timeout', 'visitorSvc'];

    function visitorCtrl($scope, $timeout, visitorSvc) {

        //rename $scope
        var vm = $scope;
        //vm.postList = [];

        //constuctor
        _init();

        function _init() {
            try {
                //visitorSvc.getAllPost();
            }
            catch (e) {
                _displayError(e);
            }
        }

        //common method
        function _displayError(error) {
            console.log(error.messsage);
        }
    }
});