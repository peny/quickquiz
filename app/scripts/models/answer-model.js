/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {
    'use strict';

    var AnswerModel = Backbone.Model.extend({

        defaults: {
            'name': '',
            'result': {},
        },

        initialize: function(){
            //var _this = this;
        },

        addCompleted: function(data){

            var flatData = {
                name    : data.name,
                group   : data.group,
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
    });

    return AnswerModel;
});
