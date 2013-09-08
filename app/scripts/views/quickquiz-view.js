/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'jquery.slidesjs'
], function ($, _, Backbone, JST) {
    'use strict';

    var QuickquizView = Backbone.View.extend({
        el: '.main-content',

        template: JST['app/scripts/templates/quickquiz.ejs'],

        initialize: function(model){
            var _this = this;
            _this.model = model;
        },

        render: function(){
            var _this = this;
            var context = {
                questions: _this.model.questions
            };
            var html = _this.template(context);
            _this.$el.html(html);
            $(function(){
            _this.$el.find('.questions').slidesjs({
              height: 300,
            });          
            });
        }
    });

    return QuickquizView;
});
