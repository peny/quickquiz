/*global define*/

define([
    'underscore',
    'backbone',
    'models/quickquiz-model'
], function (_, Backbone, QuickquizModel) {
    'use strict';

    var QuickquizCollection = Backbone.Collection.extend({
        model: QuickquizModel
    });

    return QuickquizCollection;
});