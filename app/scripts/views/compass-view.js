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
            _this.canvas = {};
            _this.context = {};
        },

        events: {
        },

        draw2DCompass: function(callback){
            var _this = this;
            //var width = _this.canvas.width;
            //var height = _this.canvas.height;
            var image = new Image();
            image.src = 'public/images/compass.png';
            image.onload = function(){
                _this.context.drawImage(image,0,0,300,300);
                callback();
                return _this;
            };
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
            _this.draw2DCompass(function(){
                var canvasHeight = _this.canvas.height;

                _.each(_this.model.get('completed'),function(completed){
                    var canvasX = completed.result.x*6;
                    var canvasY = completed.result.y*6;
                    window.test = _this;
                    _this.draw2DPoint(completed.name,canvasX,canvasHeight-canvasY);
                });
            });
        }
    });

    return CompassView;
});
