'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.APP.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'splashCtrl';
    module.controller(controllerId, splashCtrl);

    splashCtrl.$inject = ['$scope', '$timeout', '$state'];

    function splashCtrl($scope, $timeout, $state) {

        //rename $scope
        var vm = $scope;
        vm.message = 'PERSONAL BLOG SITE';
        vm.gotoBlog = gotoBlog;

        //go to main page after sometimes
        $timeout(function () {
            gotoBlog();
        }, 3000);

        //go to blog site
        function gotoBlog() {
            $state.go('blog.home');
            //$state.go('restaurant.visitor');
        }
    }
});