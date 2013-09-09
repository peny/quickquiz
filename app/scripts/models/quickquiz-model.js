/*global define*/

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var QuickquizModel = Backbone.Model.extend({

        defaults: {
            id: 0,
            group: 0,
            questions: [],
            completed: []
        },

        initialize: function(){
            var _this = this;
            if(_this.get('questions').length === 0){
                _this.get('questions').push(_this.generateTestQuestion());
                _this.get('questions').push(_this.generateTestQuestion());
                _this.get('questions').push(_this.generateTestQuestion());
            }
            window.QuickQuizNS.quizzes[_this.get('id')] = _this;
        },

        addCompleted: function(data){
            var _this = this;
            _this.get('completed').push(data);
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
