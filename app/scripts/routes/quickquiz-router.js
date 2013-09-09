/*global define*/

define([
    'jquery',
    'backbone',
    'models/quickquiz-model',
    'views/quickquiz-view'
], function ($, Backbone, QuickquizModel, QuickquizView) {
    'use strict';

    var QuickquizRouter = Backbone.Router.extend({
        routes: {
            '': 'showQuiz',
            'quiz': 'showQuiz',
            'quiz/:id' : 'showQuiz',
            'quiz/:id/' : 'showQuiz',
            'quiz/:id/:group': 'showQuiz'
        },

        showQuiz: function(id,group){
            var _this = this;
            var model = window.QuickQuizNS.quizzes[id];
            if(!model){
                model = new QuickquizModel({id: id, group: group});
            }
            _this.renderBase().
            renderQuiz(model);
            return _this;
        },

        renderBase: function(){
            var _this = this;
            return _this;
        },

        renderQuiz: function(quiz){
            var _this = this;
            var quickquizview = new QuickquizView(quiz);
            quickquizview.render();
            return _this;
        }

    });

    return QuickquizRouter;
});
