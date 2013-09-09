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
            var model = window.QuickQuizNS.quizzes[id];
            if(!model){
                model = new QuickquizModel({id: id, group: group});
            }
            _this.renderBase().
            renderCompass(model);
            return _this;
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
