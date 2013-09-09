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
            questions: []
        },

        initialize: function(id, group){
            var _this = this;
            _this.id = id || _this.id;
            _this.group = group || _this.group;
            _this.questions = _this.defaults.questions;
            _this.questions.push(_this.generateTestQuestion());
            _this.questions.push(_this.generateTestQuestion());
            _this.questions.push(_this.generateTestQuestion());
            _this.questions.push(_this.generateTestQuestion());
            _this.questions.push(_this.generateTestQuestion());
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
                        'x'     : 1,
                        'y'     : 0,
                        'z'     : 1
                    },
                ]
            };
            return question;
        }
    });

    return QuickquizModel;
});
