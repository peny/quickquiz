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
                _this.context.drawImage(image,0,0,290,290);
                callback();
                return _this;
            };
        },

        draw2DPoint: function(name,x,y){
            var _this = this;
            _this.context.save();
            var randomcolor = Math.floor(Math.random()*150);
            _this.context.fillStyle = 'rgb('+Math.floor(26+randomcolor/6)+','+randomcolor+','+(randomcolor+32)+')';
            console.log(_this.context.fillStyle);
            _this.context.font = '16px Helvetica Neue,Helvetica,Arial Black';
            _this.context.fillText(name,x,y);
            _this.context.restore();
            return _this;
        },

        drawImage: function(imageurl,x,y){
            var _this = this;
            var image = new Image();
            image.src = imageurl;
            image.onload = function(){
                _this.context.drawImage(image,x,y,30,30);
                return _this;
            };

        },

        render: function(){
            var _this = this;
            var compassoffset = 30;

            var context = {
            };

            var html = _this.template(context);
            _this.$el.html(html);
            _this.canvas = _this.$el.find('#compass-canvas')[0];
            _this.context = _this.canvas.getContext('2d');
            _this.draw2DCompass(function(){
                var canvasHeight = _this.canvas.height;
                //var canvasWidth = $(_this.canvas).width();

                _.each(_this.model.get('completed').toJSON(),function(completed){
                    window.test = _this;
                    var canvasX = (completed.result.x*8)+compassoffset;
                    var canvasY = (completed.result.y*8)+compassoffset;
                    if(completed.imageurl){
                        _this.drawImage(completed.imageurl,canvasX,canvasHeight-canvasY);
                    } else {
                        _this.draw2DPoint(completed.name,canvasX,canvasHeight-canvasY);
                    }
                });
            });
        }
    });

    return CompassView;
});
