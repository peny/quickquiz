/*global define*/

define([
    'jquery',
    'backbone',
    'models/quickquiz-model',
    'views/compass-view'
], function ($, Backbone, QuickquizModel, CompassView) {
    'use strict';

    var CompassRouter = Backbone.Router.extend({
        routes: {
            'compass': 'showCompass',
            'compass/:id': 'showCompass',
            'quiz/:id/result' : 'showCompass',
        },

        showCompass: function(id,group){
            var _this = this;
            var model = window.QuickQuizNS.quizzes.findWhere({quizid: id});
            if(!model){
                model = new QuickquizModel({quizid: id, group: group});
            }
            model.getResults(function(){
                _this.renderBase().
                renderCompass(model);
                return _this;
            });
        },

        renderBase: function(){
            var _this = this;
            return _this;
        },

        renderCompass: function(quiz){
            var _this = this;
            var compassview = new CompassView(quiz);
            compassview.render();
            return _this;
        }

    });

    return CompassRouter;
});
