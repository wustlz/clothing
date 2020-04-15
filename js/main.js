"use strict";
$(document).ready(function (e) {

    new WOW().init();
    function toggleChevron(e) {
        $(e.target)
                .prev('.panel-heading')
                .find("i.indicator")
                .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
    }
    $('#accordion').on('hidden.bs.collapse', toggleChevron);
    $('#accordion').on('shown.bs.collapse', toggleChevron);
    $('.accordion-toggle').click(function () {

        $('.panel-heading').toggleClass('bg-head');
    });

    $('#container').mixItUp();


//++++++++++++++++++++++++++++++++
//   All Sliders
//++++++++++++++++++++++++++++++++
//    With Arrows
    $("#main-banner").owlCarousel({
        items: 1,
        lazyLoad: true,
        navigation: true,
        navigationText: ["prev", "next"],
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1]
    });
//   Without Arrows
    $("#main-banner2").owlCarousel({
        items: 1,
        lazyLoad: true,
        navigation: false,
        navigationText: ["prev", "next"],
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1]
    });


//++++++++++++++++++++++++++++++++
//   Google Analyrics
//++++++++++++++++++++++++++++++++
    (function (b, o, i, l, e, r) {
        b.GoogleAnalyticsObject = l;
        b[l] || (b[l] =
                function () {
                    (b[l].q = b[l].q || []).push(arguments);
                });
        b[l].l = +new Date;
        e = o.createElement(i);
        r = o.getElementsByTagName(i)[0];
        e.src = '';
        r.parentNode.insertBefore(e, r);
    }
    (window, document, 'script', 'ga'));
    ga('create', 'UA-XXXXX-X', 'auto');
    ga('send', 'pageview');

});