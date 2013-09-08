/*global define*/

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
            'click .next-slide': 'nextSlide',
            'click .prev-slide': 'prevSlide',
            'click .pagination-button': 'setPage'
       },
        
        nextSlide: function(e){
            var _this = this;
            if(!$(e.currentTarget).parent().hasClass('disabled')){
                _this.$el.find('.slidesjs-next').click();
                _this.setPagination(_this.page+1);
            }
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
            _this.getScore();
            _this.$el.find('.previous').removeClass('disabled');
            _this.$el.find('.next').removeClass('disabled');
            if(num < 1){
                  _this.page = 0;
                  _this.$el.find('.previous').addClass('disabled');
            } else if(num > _this.model.questions.length-2){
                  _this.page = _this.model.questions.length-1;
                  _this.$el.find('.next').addClass('disabled');
            } else {
              _this.page = num;
            }
            var $paginationItems = _this.$el.find('.pagination-button');
            $paginationItems.removeClass('active');
            $($paginationItems[_this.page]).addClass('active');
        },

        getScore: function(){
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

        render: function(){
            var _this = this;
            var context = {
                questions: _this.model.questions
            };
            var html = _this.template(context);
            _this.$el.html(html);
            //This is needed
            $(function(){
                _this.$el.find('.questions').slidesjs({
                    height: 300,
                    navigation: {
                      active: true,
                      effect: 'slide'
                    },
                    pagination: {active: true},
                    callback: {
                        loaded: function(number){console.log('loaded', number)},
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
