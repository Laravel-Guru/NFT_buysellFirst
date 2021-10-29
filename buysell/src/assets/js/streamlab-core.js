/*
Template: StreamLab - Streamlab - Video Streaming HTML5 Template
Author: Gentechtree
Version: 1.0
Design and Developed by: Gentechtree
*/
/*================================================
[  Table of contents  ]
================================================
==> Check Scrollbale 
==>  Register Venoor Js Dependancies
==>  CountDown
==>  Slick Slider
==>  Owl Carousel Slider
==>  Video Popup
==>  Circle Progress
==>  Vertical Progress
==>  Accordion Panel
==>  Playlist
*/
(function(jQuery) {
    "use strict";

    /*==============================================
    Check Scrollbale 
    ===============================================*/
    function isScrollable(jQuerywrapper) {
        var ajaxVisible = jQuerywrapper.offset().top + jQuerywrapper.outerHeight(true),
            ajaxScrollTop = jQuery(window).scrollTop() + jQuery(window).height();
        if (ajaxVisible <= ajaxScrollTop && ajaxVisible + jQuery(window).height() > ajaxScrollTop) {
            return true;
        }
        return false;
    }
    /*==============================================
    Register Venoor Js Dependancies
    ===============================================*/
    var registerDependencies = function() {
            var PluginJsConfig = {
                "js_dependencies": {
                    "asyncloader.js": "js/vendor/asyncloader.js",
                    "asyncloader": "js/asyncloader.min.js?ver=1.0",
                    "circle-progress": "js/circle-progress.min.js?ver=1.0",
                    "isotope.pkgd": "js/isotope.pkgd.min.js?ver=1.0",
                    "jquery.countTo": "js/jquery.countTo.min.js?ver=1.0",
                    "jquery.magnific-popup": "js/jquery.magnific-popup.min.js?ver=1.0",
                    "owl.carousel": "js/owl.carousel.min.js?ver=1.0",
                    "slick": "js/slick.min.js?ver=1.0"
                }
            };
            if (null != PluginJsConfig && null != PluginJsConfig.js_dependencies) {
                var js_dependencies = PluginJsConfig.js_dependencies;
                for (var dependency in js_dependencies) {
                    asyncloader.register(js_dependencies[dependency], dependency);
                }
            }

        },
        /*==============================================
        CountDown
        ===============================================*/
        timer = function() {
            jQuery('.timer').countTo();
        },
        /*==============================================
        Slick Slider
        ===============================================*/
        slick = function() {
            jQuery('.slider-for').each(function() {
                jQuery('.slider-for').not('.slick-initialized').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: '.slider-nav'
                });
            });
            jQuery('.slider-nav').each(function() {
                var prev = 'ion-chevron-up';
                var next = 'ion-chevron-down';
                jQuery('.slider-nav').not('.slick-initialized').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    asNavFor: '.slider-for',
                    dots: true,
                    vertical: true,
                    focusOnSelect: true,
                    centerMode: true,
                    prevArrow: '<div class="prev"><span class="' + prev + '"></span></div>',
                    nextArrow: '<div class="next"><span class="' + next + '"></span></div>',
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            adaptiveHeight: true,
                        },
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    }, ],
                });
            });
            jQuery('.slider-for-1').each(function() {
                jQuery('.slider-for-1').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: '.slider-nav-1'
                });
            });
            jQuery('.slider-nav-1').each(function() {
                var prev = 'ion-chevron-up';
                var next = 'ion-chevron-down';
                jQuery('.slider-nav-1').slick({
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    asNavFor: '.slider-for-1',
                    dots: true,
                    focusOnSelect: true,
                    centerMode: true,
                    prevArrow: '<div class="prev"><span class="' + prev + '"></span></div>',
                    nextArrow: '<div class="next"><span class="' + next + '"></span></div>',
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            adaptiveHeight: true,
                        },
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    }, ],
                });
            });
            jQuery('.banner-style-2 .slider').slick({
                centerMode: true,
                centerPadding: '500px',
                slidesToShow: 3,
                focusOnSelect: true,
                dots: false,
                infinite: true,
            });
        },
        /*==============================================
        Owl Carousel Slider
        ===============================================*/
        owl_carousel = function() {
            jQuery('.owl-carousel').each(function() {
                var app_slider = jQuery(this);
                var rtl = false;
                var prev = 'ion-ios-arrow-back';
                var next = 'ion-ios-arrow-forward';
                var prev_text = 'Prev';
                var next_text = 'Next';
                if (jQuery('body').hasClass('pt-is-rtl')) {
                    rtl = true;
                    prev = 'ion-ios-arrow-forward';
                    next = 'ion-ios-arrow-back';
                }
                if (app_slider.data('prev_text') && app_slider.data('prev_text') != '') {
                    prev_text = app_slider.data('prev_text');
                }
                if (app_slider.data('next_text') && app_slider.data('next_text') != '') {
                    next_text = app_slider.data('next_text');
                }
                app_slider.owlCarousel({
                    rtl: rtl,
                    items: app_slider.data("desk_num"),
                    loop: app_slider.data("loop"),
                    margin: app_slider.data("margin"),
                    nav: app_slider.data("nav"),
                    dots: app_slider.data("dots"),
                    loop: app_slider.data("loop"),
                    autoplay: app_slider.data("autoplay"),
                    autoplayHoverPause: true,
                    autoplayTimeout: app_slider.data("autoplay-timeout"),
                    navText: ["<i class='" + prev + "'></i>", "<i class='" + next + "'></i>"],
                    responsiveClass: true,
                    responsive: {
                        // breakpoint from 0 up
                        0: {
                            items: app_slider.data("mob_sm"),
                            nav: true,
                            dots: false
                        },
                        // breakpoint from 480 up
                        480: {
                            items: app_slider.data("mob_num"),
                            nav: true,
                            dots: false
                        },
                        // breakpoint from 786 up
                        786: {
                            items: app_slider.data("tab_num")
                        },
                        // breakpoint from 1023 up
                        1023: {
                            items: app_slider.data("lap_num")
                        },
                        1199: {
                            items: app_slider.data("desk_num")
                        }
                    }
                });
            });
        },
        /*==============================================
        Video Popup
        ===============================================*/
        pop_video = function() {
            jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps, .button-play').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade',
                preloader: true,
            });
        },
        /*==============================================
        Circle Progress
        ===============================================*/
        circle_progress = function() {
            jQuery('.pt-circle-progress-bar').each(function() {
                var number = jQuery(this).data('skill-level');
                var empty_color = jQuery(this).data('empty-color');
                var fill_color = jQuery(this).data('fill-color');
                var size = jQuery(this).data('size');
                var thickness = jQuery(this).data('thickness');
                jQuery(this).circleProgress({
                    value: '0.' + number,
                    size: size,
                    emptyFill: empty_color,
                    fill: {
                        color: fill_color
                    }
                }).on('circle-animation-progress', function(event, progress) {
                    jQuery(this).find('.pt-progress-count').html(Math.round(number * progress) + '%');
                });
            });
        },
        /*==============================================
        Vertical Progress
        ===============================================*/
        progress_bar = function() {
            jQuery('.pt-progress-bar > span').each(function() {
                var progress_bar = jQuery(this);
                var width = jQuery(this).data('percent');
                progress_bar.css({
                    'transition': 'width 2s'
                });
                jQuery('.progress-value').css({
                    'transition': 'margin 2s'
                });
                setTimeout(function() {
                    jQuery(this).show(function() {
                        progress_bar.css('width', width + '%');
                    });
                }, 500);
                setTimeout(function() {
                    jQuery('.pt-progressbar-style-2 .progress-value').show(function() {
                        jQuery('.pt-progressbar-style-2 .progress-value').css('margin-left', width + 'px');
                    });
                }, 500);
                setTimeout(function() {
                    jQuery('.pt-progressbar-style-3 .progress-tooltip').show(function() {
                        jQuery('.pt-progressbar-style-3 .progress-tooltip').css('margin-left', width + 'px');
                    });
                }, 500);
            });
        },
        /*==============================================
        Accordion Panel
        ===============================================*/
        accordion = function() {
            jQuery('.pt-accordion-block .pt-accordion-box .pt-accordion-details').hide();
            jQuery('.pt-accordion-block .pt-accordion-box:first').addClass('pt-active').children().slideDown('slow');
            jQuery('.pt-accordion-block .pt-accordion-box').on("click", function() {
                if (jQuery(this).children('div.pt-accordion-details').is(':hidden')) {
                    jQuery('.pt-accordion-block .pt-accordion-box').removeClass('pt-active').children('div.pt-accordion-details').slideUp('slow');
                    jQuery(this).toggleClass('pt-active').children('div.pt-accordion-details').slideDown('slow');
                }
            });
        },

        /*==============================================
        Playlist
        ===============================================*/
        playlist = function() {
            jQuery('.movie-actions--link_add-to-playlist.dropdown ,.tv-show-actions--link_add-to-playlist.dropdown , .video-actions--link_add-to-playlist.dropdown').on('mouseover', function(e) {
                jQuery('.dropdown-menu').removeClass('show');
                e.preventDefault();

                jQuery(this).find('.dropdown-menu').toggleClass('show');
                e.stopPropagation();
            });
            jQuery('body').on('click', function() {
                jQuery('.dropdown-menu').removeClass('show');
            });
            jQuery('.movie-actions--link_add-to-playlist.dropdown').on('mouseout', function(e) {
                jQuery('.dropdown-menu').removeClass('show');
                e.preventDefault();

            });

        };


    jQuery(document).ready(function() {

        registerDependencies();

        jQuery('.dropdown-menu').addClass('mCustomScrollbar');

        if (jQuery('.timer').length > 0) {
            asyncloader.require(['jquery.countTo'], function() {
                timer();
            });
        }
        if (jQuery('.owl-carousel').length > 0) {
            asyncloader.require(['owl.carousel'], function() {
                owl_carousel();
            });
        }
        if (jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps, .button-play').length > 0) {
            asyncloader.require(['jquery.magnific-popup'], function() {
                pop_video();
            });
        }
        if (jQuery('.pt-circle-progress-bar').length > 0) {
            asyncloader.require(['circle-progress'], function() {
                circle_progress();
            });
        }
        if (jQuery('.slider').length > 0) {
            asyncloader.require(['slick'], function() {
                slick();
            });
        }

        jQuery('p:empty').remove();

    });
})(jQuery);