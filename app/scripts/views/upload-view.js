/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var UploadView = Backbone.View.extend({
        el: '.main-content',

        template: JST['app/scripts/templates/upload.ejs'],

        render: function(group){
            var _this = this;
            var context = {
                group: group
            };
            var html = _this.template(context);
            _this.$el.html(html);
        }
    });

    return UploadView;
});
