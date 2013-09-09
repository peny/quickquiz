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
            _this.get('questions').push(_this.generateTestQuestion());
            _this.get('questions').push(_this.generateTestQuestion());
            _this.get('questions').push(_this.generateTestQuestion());
            window.QuickQuizNS.quizzes[_this.get('id')] = _this;
        },

        addCompleted: function(data){
            var _this = this;
            console.log(_this);
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
                        'x'     : 1,
                        'y'     : 0,
                        'z'     : -1
                    },
                    {
                        'text'  : '255,0,0',
                        'help'  : 'Red',
                        'x'     : 0,
                        'y'     : 1,
                        'z'     : 1
                    },
                    {
                        'text'  : '0,0,255',
                        'help'  : 'Blue',
                        'x'     : 20,
                        'y'     : 20,
                        'z'     : 1
                    },
                ]
            };
            return question;
        }
    });

    return QuickquizModel;
});
