/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'models/answer-model',
    'collections/answer-collection',
], function ($, _, Backbone, AnswerModel, AnswerCollection) {
    'use strict';

    var QuickquizModel = Backbone.Model.extend({

        defaults: {
            'quizid': 0,
            'group': 0,
        },

        initialize: function(){

            var _this = this;
            var completed = new AnswerCollection();
            _this.set({questions: [], completed: completed});
        },

        getQuestions: function(id,callback){
            var _this = this;
            var url = '/questions.json';
            if(id){
                url = id;
            }
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
            }).done(function(json){
                _.each(json,function(question){
                    _this.get('questions').push(question);
                });
                _this.getResults(function(){});
                window.QuickQuizNS.quizzes.add(_this);
                callback(null);
            }).fail(function(err){
                console.log('error: '+JSON.stringify(err));
            });
        },

        getResults: function(callback){
            var _this = this;
            var url = '/result';
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                data: { group: _this.get('quizid') },
            }).done(function(json){
                _.each(json,function(result){

                    console.log(json,result);
                    var completed = new AnswerModel({
                        name: result.name,
                        imageurl: result.imageurl,
                        result: {
                            x : result.x,
                            y : result.y,
                            z : result.z
                        }
                    });
                    _this.get('completed').add(completed);
                });
                callback(null);
            }).fail(function(err){
                console.log('error: '+JSON.stringify(err));
            });
        },

        addCompleted: function(data){
            var _this = this;

            var completed = new AnswerModel(data);
            _this.get('completed').add(completed);

            var flatData = {
                name    : data.name,
                group   : _this.get('quizid'),
                x       : data.result.x,
                y       : data.result.y,
                z       : data.result.z
            };

            var url = '/result';
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                data: flatData,
            }).done(function(){
            }).fail(function(err){
                console.log('error: '+JSON.stringify(err));
            });
        },

        generateTestQuestion: function(){
            //var _this = this;
            var question = {
                'text' : 'What color do you like?',
                'help' : 'By color we mean an RGB value',
                'id'   : _.uniqueId('question_'),
                answers : [
                    {
                        'text'  : '0,255,0',
                        'help'  : 'Green',
                        'x'     : 33,
                        'y'     : 33,
                        'z'     : 0
                    },
                    {
                        'text'  : '255,0,0',
                        'help'  : 'Red',
                        'x'     : 10,
                        'y'     : 15,
                        'z'     : 0
                    },
                    {
                        'text'  : '0,0,255',
                        'help'  : 'Blue',
                        'x'     : 30,
                        'y'     : 10,
                        'z'     : 0
                    },
                ]
            };
            return question;
        }
    });

    return QuickquizModel;
});
