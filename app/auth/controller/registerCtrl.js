'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.AUTH.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'registerCtrl';
    module.controller(controllerId, registerCtrl);

    registerCtrl.$inject = ['$scope', '$timeout'];

    function registerCtrl($scope, $timeout) {

        //rename $scope
        var vm = $scope;
        var API_URL = 'http://localhost:8000/public/api/';

        //bindable method
        vm.save = save;

        //save new record / update existing record
        function save() {
            var url = API_URL + "category";
            $http({
                method: 'POST',
                url: url,
                data: $.param($scope.employee),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (response) {
                console.log(response);
                location.reload();
            }).error(function (response) {
                console.log(response);
                alert('This is embarassing. An error has occured. Please check the log for details');
            });
        }
    }
});