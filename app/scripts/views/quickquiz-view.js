/*global define, alert*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'flat-ui.checkandradio',
    'jquery.slidesjs'
], function ($, _, Backbone, JST, customRadio) {
    'use strict';

    var QuickquizView = Backbone.View.extend({
        el: '.main-content',

        template: JST['app/scripts/templates/quickquiz.ejs'],

        initialize: function(model){
            var _this = this;
            _this.model = model;
            _this.page = 0;
        },

        events: {
            'click .next-slide'         : 'nextSlide',
            'click .prev-slide'         : 'prevSlide',
            'click .pagination-button'  : 'setPage',
            'click #send-result-button' : 'sendResult',
            'mouseup label.radio'       : 'nextSlide'
        },

        nextSlide: function(e){
            var _this = this;
            //Looks weird on mobile without this
            _.delay(function(){
                if(!$(e.currentTarget).parent().hasClass('disabled')){
                    _this.$el.find('.slidesjs-next').click();
                    _this.setPagination(_this.page+1);
                }
            },50);
        },

        prevSlide: function(e){
            var _this = this;
            if(!$(e.currentTarget).parent().hasClass('disabled')){
                _this.$el.find('.slidesjs-previous').click();
                _this.setPagination(_this.page-1);
            }
        },

        setPage: function(e){
            var _this = this;
            var newPage = $(e.currentTarget).data('page');
            var paginationItems = _this.$el.find('.slidesjs-pagination').children();
            console.log(paginationItems[newPage-1]);
            $($(paginationItems[newPage-1])).find('a').click();
            _this.setPagination(newPage-1);
        },

        setPagination: function(num){
            var _this = this;
            console.log(num, _this.page);
            _this.$el.find('.previous').removeClass('disabled');
            _this.$el.find('.next').removeClass('disabled');
            if(num < 1){
                _this.page = 0;
                _this.$el.find('.previous').addClass('disabled');
            } else if(num > _this.model.get('questions').length){
                _this.page = _this.model.get('questions').length+1;
                _this.$el.find('.next').addClass('disabled');
            } else {
                _this.page = num;
            }
            var $paginationItems = _this.$el.find('.pagination-button');
            $paginationItems.removeClass('active');
            $($paginationItems[_this.page]).addClass('active');
        },

        getResult: function(){
            var _this = this;
            var $answers = _this.$el.find('.slide').find('.answers').find('label.radio.checked').find('input');

            var res = {
                x: 0,
                y: 0,
                z: 0
            };

            _.each($answers, function(answer){
                res.x += $(answer).data('xvalue');
                res.y += $(answer).data('yvalue');
                res.z += $(answer).data('zvalue');
            });

            //Return the calculated x,y,z
            return res;
        },

        getUserData: function(){
            var _this = this;
            var firstName = _this.$el.find('#user-first-name').val();
            var data = {
                name: firstName
            };
            return data;

        },

        sendResult: function(e){
            var _this = this;
            e.preventDefault();
            var result = _this.getResult();
            var user = _this.getUserData();
            var data = {
                name: user.name,
                result: result
            }
            _this.model.addCompleted(data);
            //send to server
            //generate graph
        },

        render: function(){
            var _this = this;
            var context = {
                data: _this.model.toJSON()
            };
            var html = _this.template(context);
            _this.$el.html(html);
            //This is needed
            $(function(){
                _this.$el.find('.questions').slidesjs({
                    height: 500,
                    navigation: {
                        active: true,
                        effect: 'slide'
                    },
                    pagination: {active: true},
                    callback: {
                        loaded: function(){},
                        //start: function(number){_this.setPagination(number);}
                        //complete: function(number){_this.setPagination(number);}
                    }
                });
                _this.setPagination(0);
            });
            customRadio();
        }
    });

    return QuickquizView;
});
