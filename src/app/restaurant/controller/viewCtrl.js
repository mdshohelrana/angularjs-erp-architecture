'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.RES.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'viewCtrl';
    module.controller(controllerId, viewCtrl);

    viewCtrl.$inject = ['$scope', '$timeout', '$state', 'viewSvc', 'googlePlaceSvc'];

    function viewCtrl($scope, $timeout, $state, viewSvc, googlePlaceSvc) {

        //rename $scope
        var vm = $scope;
        vm.venues = [];
        vm.searchResult = { state: null, searchPlace: null };
        vm.search = search;
        vm.getDetailsByRefId = getDetailsByRefId;

        //constuctor
        _init();

        function _init() {
            try {
                googlePlaceSvc.init().then(function (data) {
                    vm.venues = parseVenu(data);
                    googlePlaceSvc.createMarker(data);

                    //set message when record did not find
                    if (data.length === 0) {
                        vm.searchResult = 'noResult';
                    }
                    else {
                        vm.searchResult = null;
                    }
                }, function (e) {
                    _displayError(e);
                });
            }
            catch (e) {
                _displayError(e);
            }
        }

        //search by restaurant
        function search() {
            googlePlaceSvc.search(vm.searchResult.searchPlace).then(function (res) { // success
                googlePlaceSvc.createMarker(res);
            }, function (status) { // error
                _displayError(status);
            });
        }

        //get details by reference id
        function getDetailsByRefId(place) {
            try {
                //set params value
                $state.parameterObject = place;
                $state.go('restaurant.details');
            } catch (e) {
                _displayError(e);
            }
        }

        function parseVenu(data) {
            try {
                var tempList = [];
                for (var i = 0; i < data.length; i++) {

                    var mapObj = data[i];
                    var obj = new venu(mapObj);
                    if (mapObj.photos)
                        obj.picture_url = mapObj.photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 100 });

                    obj.plus = [];
                    obj.minus = [];

                    var rating = Math.round(mapObj.rating) / 1.0;
                    for (var j in [0, 1, 2, 3, 4]) {
                        if (rating > 0.5) {
                            rating--;
                            obj.plus.push(j);
                        } else {
                            obj.minus.push(j);
                        }
                    }
                    tempList.push(obj);
                }
                return tempList;
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