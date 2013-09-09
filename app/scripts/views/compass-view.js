/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var CompassView = Backbone.View.extend({
        el: '.main-content',

        template: JST['app/scripts/templates/compass.ejs'],

        initialize: function(model){
            var _this = this;
            _this.model = model;
            _this.canvas;
            _this.context;
        },

        events: {
        },

        draw2DCompass: function(){
            var _this = this;
            var width = _this.canvas.width;
            var height = _this.canvas.height;
            _this.context.fillStyle = 'rgb(200,255,200)';
            _this.context.fillRect(0,0,width/2,height/2);
            _this.context.fillStyle = 'rgb(200,200,255)';
            _this.context.fillRect(width/2,height/2, width/2, height/2);
            _this.context.fillStyle = 'rgb(255,255,200)';
            _this.context.fillRect(width/2,0,width/2,height/2);
            _this.context.fillStyle = 'rgb(255,200,200)';
            _this.context.fillRect(0,height/2,width/2,height/2);
            return _this;
        },

        draw2DPoint: function(name,x,y){
            var _this = this;
            _this.context.fillStyle = 'rgb(0,0,0)';
            _this.context.fillText(name,x,y);
            return _this;
        },

        render: function(){
            var _this = this;
            var context = {
            };
            var html = _this.template(context);
            _this.$el.html(html);
            _this.canvas = _this.$el.find('#compass-canvas')[0];
            _this.context = _this.canvas.getContext('2d');
            _this.draw2DCompass();
            _.each(_this.model.get('completed'),function(completed){
                _this.draw2DPoint(completed.name,completed.result.x,completed.result.y);
            });
        }
    });

    return CompassView;
});
