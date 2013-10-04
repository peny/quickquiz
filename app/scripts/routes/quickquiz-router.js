/*global define*/

define([
    'jquery',
    'backbone',
    'models/quickquiz-model',
    'views/quickquiz-view',
    'views/upload-view'
], function ($, Backbone, QuickquizModel, QuickquizView, UploadView) {
    'use strict';

    var QuickquizRouter = Backbone.Router.extend({
        routes: {
            '': 'showQuiz',
            'quiz': 'showQuiz',
            'quiz/:id' : 'showQuiz',
            'quiz/:id/upload' : 'renderUpload',
            'quiz/:id/' : 'showQuiz',
            'quiz/:id/:group': 'showQuiz'
        },

        showQuiz: function(id,group){
            var _this = this;
            var model = window.QuickQuizNS.quizzes.findWhere({quizid: id});
            if(!model){
                model = new QuickquizModel({quizid: id, group: group});
            }
            model.getQuestions(null,function(){
                console.log('got questions, rendering..');
                _this.renderBase().
                renderQuiz(model);
                return _this;
            });
        },

        renderUpload: function(id){
            var _this = this;
            var uploadView = new UploadView();
            uploadView.render(id);
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
