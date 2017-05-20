'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.RES.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'visitorCtrl';
    module.controller(controllerId, visitorCtrl);

    visitorCtrl.$inject = ['$scope', '$timeout', 'visitorSvc', 'googlePlaceSvc'];

    function visitorCtrl($scope, $timeout, visitorSvc, googlePlaceSvc) {

        //rename $scope
        var vm = $scope;
        vm.venues = [];
        vm.searchResult = { state: null, searchPlace: null };

        //constuctor
        _init();

        function _init() {
            try {
                googlePlaceSvc.init();
            }
            catch (e) {
                _displayError(e);
            }
        }

        //search by restaurant
        vm.search = function () {
            googlePlaceSvc.search(vm.searchResult.searchPlace).then(
                function (res) { // success
                    googlePlaceSvc.addMarker(res);
                },
                function (status) { // error
                    _displayError(status);
                }
            );
        }

        //common method
        function _displayError(error) {
            console.log(error.messsage);
        }
    }
});