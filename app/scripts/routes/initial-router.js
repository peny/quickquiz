/*global define*/

define([
    'jquery',
    'backbone',
    'routes/quickquiz-router'
], function ($, Backbone, QuickquizRouter) {
    'use strict';

    var InitialRouter = Backbone.Router.extend({

        initialize: function(){
            new QuickquizRouter();
        },

        routes: {
        },

    });

    return InitialRouter;
});
