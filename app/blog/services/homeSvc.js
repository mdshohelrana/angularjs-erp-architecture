'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.BLOG.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var serviceId = 'homeSvc';
    module.factory(serviceId, homeSvc);

    homeSvc.$inject = [];

    function homeSvc() {

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