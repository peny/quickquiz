/*global define*/

define([
    'jquery',
    'backbone',
    'routes/quickquiz-router',
    'routes/compass-router'
], function ($, Backbone, QuickquizRouter, CompassRouter) {
    'use strict';

    var InitialRouter = Backbone.Router.extend({

        initialize: function(){
            new QuickquizRouter();
            new CompassRouter();
        },

        routes: {
        },

    });

    return InitialRouter;
});
