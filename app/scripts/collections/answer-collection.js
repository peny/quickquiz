/*global define*/

define([
    'underscore',
    'backbone',
    'models/answer-model'
], function (_, Backbone, AnswerModel) {
    'use strict';

    var AnswerCollection = Backbone.Collection.extend({
        model: AnswerModel
    });

    return AnswerCollection;
});
