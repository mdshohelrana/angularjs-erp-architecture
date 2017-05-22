'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.RES.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'detailsCtrl';
    module.controller(controllerId, detailsCtrl);

    detailsCtrl.$inject = ['$scope', '$state', 'googlePlaceSvc'];

    function detailsCtrl($scope, $state, googlePlaceSvc) {

        //rename $scope
        var vm = $scope;
        vm.venue = {};
        vm.backtomain = backtomain;

        //constuctor
        _init();

        function _init() {
            try {
                getDetailsByRefId($state.parameterObject);
            }
            catch (e) {
                _displayError(e);
            }
        }

        //get details by reference id
        function getDetailsByRefId(place) {
            try {
                googlePlaceSvc.getDetailsByRef(place).then(function (details) {
                    vm.venue = parseVenu(details);
                }).catch(function (ex) {
                    _displayError(e);
                });;
            } catch (e) {
                _displayError(e);
            }
        }

        //back to the main page
        function backtomain() {
            try {
                $state.go('restaurant.view');
            } catch (e) {
                _displayError(e);
            }
        }

        function parseVenu(data) {
            try {
                var tempData = {};
                tempData.title = data.name;
                tempData.picture_url = data.icon;
                tempData.formatted_address = data.formatted_address;
                tempData.opening_hours = data.opening_hours.weekday_text;
                empData.reviews = data.reviews;

                return tempData;
            } catch (e) {
                _displayError(e);
            }
        }

        //common method
        function _displayError(error) {
            console.log(error.messsage);
        }
    }
});