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
        'flat-ui.checkandradio': ['jquery'],
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        bootstrap: 'vendor/bootstrap',
        'jquery.slidesjs': '../bower_components/slidesjs3-bower/source/jquery.slides.min',
        'flat-ui.checkandradio':  'hacks/custom_checkbox_and_radio',
    }
});

require([
    'jquery',
    'backbone',
    'routes/initial-router'
], function ($, Backbone, Router) {
    $(function(){
        window.QuickQuizNS = {};
        window.QuickQuizNS.quizzes = [];
        console.log(window.QuickQuizNS)
        new Router();
        Backbone.history.start();
    });
});
