
'use strict';

//all of the main module is defined here
var APP_MODULES = {
    APP: { name: 'APP', code: 1 },
    COMMON: { name: 'COMMON', code: 2 },
    AUTH: { name: 'AUTH', code: 3 },
    ADMIN: { name: 'ADMIN', code: 4 },
    BLOG: { name: 'BLOG', code: 5 },
    RES: { name: 'RES', code: 6 }
};

//for development
var APP_MODULES_URL = {
    adminLocalUrl: 'http://127.0.0.1:6000/api/',
    setupLocalUrl: 'http://127.0.0.1:6000/api/',
    blogLocalUrl: 'http://127.0.0.1:6000/api/'
};

//for publish
//var APP_MODULES_URL = {
//    adminLocalUrl: 'http://127.0.0.1:6000/api/',
//    setupLocalUrl: 'http://127.0.0.1:6000/api/',
//    blogLocalUrl: 'http://127.0.0.1:6000/api/'
//};