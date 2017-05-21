'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.RES.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var serviceId = 'viewSvc';
    module.factory(serviceId, viewSvc);

    viewSvc.$inject = [];

    function viewSvc() {

        //create a service instance
        var service = {
            getAllRestaurents: getAllRestaurents
        };
        return service;

        function getAllRestaurents() {
            try {
                //get all post
                console.log("get all");
            }
            catch (e) {
                throw e;
            }
        }
    }
});