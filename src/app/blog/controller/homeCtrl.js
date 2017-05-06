'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.BLOG.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'homeCtrl';
    module.controller(controllerId, homeCtrl);

    homeCtrl.$inject = ['$scope', '$timeout', 'homeSvc'];

    function homeCtrl($scope, $timeout, homeSvc) {

        //rename $scope
        var vm = $scope;
        vm.postList = [];

        //constuctor
        _init();

        function _init() {
            try {
                homeSvc.getAllPost();
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