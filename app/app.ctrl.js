'use strict';

define(['angular'], function (ng) {

    //get module definations
    var module = ng.module(APP_MODULES.APP.name);

    // Inject the dependencies. 
    // Point to the controller definition function.
    var controllerId = 'appCtrl';
    module.controller(controllerId, appCtrl);

    //appCtrl.$inject = ['$scope', '$translate', '$localStorage', '$window'];
    appCtrl.$inject = ['$scope', '$window'];

    function appCtrl($scope, $window) {

        //rename $scope
        var vm = $scope;

        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        if (isIE) { angular.element($window.document.body).addClass('ie'); }
        if (isSmartDevice($window)) { angular.element($window.document.body).addClass('smart') };

        // config
        vm.app = {
            name: 'MyBlog',
            version: '1.0.0',
            copyRight: new Date().getFullYear(),
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: false,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        };

        //// save settings to local storage
        //if (angular.isDefined($localStorage.settings)) {
        //    vm.app.settings = $localStorage.settings;
        //} else {
        //    $localStorage.settings = vm.app.settings;
        //}

        ////catch any changes of app.settings from any other modules
        //vm.$watch('app.settings', function () {
        //    if (vm.app.settings.asideDock && vm.app.settings.asideFixed) {
        //        // aside dock and fixed must set the header fixed.
        //        vm.app.settings.headerFixed = true;
        //    }
        //    // for box layout, add background image
        //    vm.app.settings.container ? angular.element('html').addClass('bg') : angular.element('html').removeClass('bg');
        //    // save to local storage
        //    $localStorage.settings = vm.app.settings;
        //}, true);

        //// angular translate
        //vm.lang = { isopen: false };
        //vm.langs = { en: 'English', de_DE: 'German', it_IT: 'Italian' };
        //vm.selectLang = vm.langs[$translate.proposedLanguage()] || "English";
        //vm.setLang = function (langKey, $event) {
        //    // set the current lang
        //    vm.selectLang = vm.langs[langKey];
        //    // You can change the language during runtime
        //    $translate.use(langKey);
        //    vm.lang.isopen = !vm.lang.isopen;
        //};

        //check the smart device
        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }
    }
});