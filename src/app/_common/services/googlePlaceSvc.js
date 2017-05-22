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
            getDetailsByRef: getDetailsByRef,
            createMarker: createMarker,
            latLng: { lat: 23.810332, lng: 90.41251809999994 },
            request: {
                radius: '1000',              
                rankby: 'distance',
                types: ['restaurant','food']
            },
            map: void (0),
            places: void (0),
            markers: void (0)
        };
        return service;
        // opennow: true,
        // minprice: 0,
        // maxprice: 4,

        //init
        function init() {
            try {
                var self = this;
                var d = $q.defer();

                //get the current positions
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {

                        self.latLng.lat = position.coords.latitude;
                        self.latLng.lng = position.coords.longitude;

                        //options                
                        var options = {
                            center: self.latLng,
                            zoom: 15
                        };
                        self.request.location = self.latLng;
                        self.map = new google.maps.Map(document.getElementById("map"), options);
                        self.places = new google.maps.places.PlacesService(self.map);

                        self.places.nearbySearch(self.request, function (results, status) {
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                d.resolve(results);
                            } else d.reject(status);
                        });
                    }, function (e) {
                        d.reject(e)
                    });
                }
                return d.promise;
            }
            catch (e) {
                throw e;
            }
        }

        //search
        function search(str) {
            try {
                var self = this;
                self.request.query = str;

                var d = $q.defer();
                self.places.textSearch(self.request, function (results, status) {
                    if (status == 'OK') {
                        d.resolve(results);
                    }
                    else d.reject(status);
                });
                return d.promise;
            } catch (e) {
                throw e;
            }
        }

        //get details by getDetailsByRef
        function getDetailsByRef(place) {
            try {
                var self = this;
                var d = $q.defer();

                var request = {
                    reference: place.reference
                };
                self.places.getDetails(request, function (details, status) {
                    if (status == 'OK') {
                        d.resolve(details);
                    }
                    else d.reject(status);
                });

                return d.promise;
            } catch (e) {
                throw e;
            }
        }

        function createMarker(results) {
            var self = this;

            //clear the marker
            deleteMarkers(self);

            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                var placeLoc = place.geometry.location;

                // Adds a marker to the map and push to the array.
                var marker = new google.maps.Marker({
                    map: self.map,
                    position: place.geometry.location,
                    //icon: {
                    //    //url: 'http://maps.gstatic.com/mapfiles/circle.png',
                    //    anchor: new google.maps.Point(16, 16),
                    //    scaledSize: new google.maps.Size(20, 32)
                    //}
                });
                self.markers.push(marker);
            }

            //show markers
            showMarkers(self);
        }

        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers(self) {
            setMapOnAll(self, null);
        }

        // Sets the map on all markers in the array.
        function setMapOnAll(self, map) {
            if (!self.markers) return;
            for (var i = 0; i < self.markers.length; i++) {
                self.markers[i].setMap(map);
            }
        }

        // Shows any markers currently in the array.
        function showMarkers(self) {
            setMapOnAll(self, self.map);
        }

        // Deletes all markers in the array by removing references to them.
        function deleteMarkers(self) {
            clearMarkers(self);
            self.markers = [];
        }
    }
});