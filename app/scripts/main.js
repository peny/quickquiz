/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        'jquery.slidesjs': ['jquery'],
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        'jquery.slidesjs': '../bower_components/slidesjs3-bower/source/jquery.slides.min',
        bootstrap: 'vendor/bootstrap'
    }
});

require([
    'backbone',
    'routes/initial-router'
], function (Backbone, Router) {
    new Router();
    Backbone.history.start();
});
