'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.RES.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var serviceId = 'visitorSvc';
    module.factory(serviceId, visitorSvc);

    visitorSvc.$inject = [];

    function visitorSvc() {

        //create a service instance
        var service = {
            getAllPost: getAllPost
        };
        return service;

        function getAllPost() {
            try {
                //get all post
                console.log("get all blog post");
            }
            catch (e) {
                throw e;
            }
        }
    }
});