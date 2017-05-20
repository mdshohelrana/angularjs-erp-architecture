'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.COMMON.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var serviceId = 'googlePlaceSvc';
    module.factory(serviceId, googlePlaceSvc);

    googlePlaceSvc.$inject = ['$q'];

    function googlePlaceSvc($q) {

        //create a service instance
        var service = {
            init: init,
            search: search,
            addMarker: addMarker
        };
        return service;

        //init
        function init() {
            try {
                var self = this;
                var options = {
                    center: new google.maps.LatLng(23.810332, 90.41251809999994),
                    zoom: 13,
                    disableDefaultUI: true
                }
                self.map = new google.maps.Map(
                    document.getElementById("map"), options
                );
                self.places = new google.maps.places.PlacesService(this.map);
            }
            catch (e) {
                throw e;
            }
        }

        //search
        function search(str) {
            try {
                var self = this;
                var d = $q.defer();
                self.places.textSearch({ query: str }, function (results, status) {
                    if (status == 'OK') {
                        d.resolve(results[0]);
                    }
                    else d.reject(status);
                });
                return d.promise;
            } catch (e) {
                throw e;
            }
        }

        //add marker
        function addMarker(res) {
            try {
                var self = this;
                if (self.marker) self.marker.setMap(null);
                this.marker = new google.maps.Marker({
                    map: self.map,
                    position: res.geometry.location,
                    animation: google.maps.Animation.DROP
                });
                self.map.setCenter(res.geometry.location);
            } catch (e) {
                throw e;
            }
        }
    }
});