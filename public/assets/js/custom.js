function initCarousels() {
    var $ = jQuery;
    if (!$ || !$.fn.owlCarousel) return;

    var carouselSelectors = [
        '.homepage-banner-carousel',
        '.match-carousel',
        '.match-highlights-carousel',
        '.sponsors-carousel',
        '.testimonial-carousel',
        '.state-carousel',
    ];

    // Destroy any existing instances before reinitialising
    carouselSelectors.forEach(function(sel) {
        var el = $(sel);
        if (el.length && el.data('owl.carousel')) {
            el.trigger('destroy.owl.carousel');
            el.removeClass('owl-loaded owl-drag');
        }
    });

    if ($('.homepage-banner-carousel').length) {
        $('.homepage-banner-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 7000,
            items: 1,
        });
    }

    if ($('.match-carousel').length) {
        $('.match-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive:{
                0:{ items:1, nav: false },
                600:{ items:2, nav: true },
                1000:{ items:3 },
                1200:{ items:4 }
            }
        });
    }

    if ($('.match-highlights-carousel').length) {
        $('.match-highlights-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive:{
                0:{ items:1, nav: false },
                600:{ items:2, nav: true },
                1000:{ items:3 }
            }
        });
    }

    if ($('.sponsors-carousel').length) {
        $('.sponsors-carousel').owlCarousel({
            loop: false,
            margin: 30,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive:{
                0:{ items:2 },
                600:{ items:3 },
                1000:{ items:4 },
                1200:{ items:5 }
            }
        });
    }

    if ($('.testimonial-carousel').length) {
        $('.testimonial-carousel').owlCarousel({
            loop: true,
            margin: 15,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive:{
                0:{ items:1, nav: false },
                600:{ items:1, nav: true },
                1000:{ items:2 },
                1200:{ items:3 }
            }
        });
    }

    if ($('.state-carousel').length) {
        $('.state-carousel').owlCarousel({
            loop: false,
            margin: 10,
            nav: true,
            dots: false,
            autoplay: false,
            responsive:{
                0:{ items:2, nav: false },
                600:{ items:3, nav: true },
                1000:{ items:4 },
                1200:{ items:5 }
            }
        });
    }

    // Tab refresh
    $('#pills-tab button[data-bs-toggle="pill"]').on('shown.bs.tab', function () {
        $('.match-carousel').trigger('refresh.owl.carousel');
    });

    // Custom nav buttons
    $('#new-prev').off('click').on('click', function () {
        $('.match-carousel').trigger('prev.owl.carousel');
    });
    $('#new-next').off('click').on('click', function () {
        $('.match-carousel').trigger('next.owl.carousel');
    });
    $('#mh-prev').off('click').on('click', function () {
        $('.match-highlights-carousel').trigger('prev.owl.carousel');
    });
    $('#mh-next').off('click').on('click', function () {
        $('.match-highlights-carousel').trigger('next.owl.carousel');
    });
}

// Expose globally so the Next.js reinit component can call it
window.initCarousels = initCarousels;

jQuery(document).ready(function() {
    onloadmethod();
    initCarousels();

    jQuery('[data-fancybox="client_gallery"]').fancybox({
        buttons: ['slideShow', 'thumbs', 'zoom', 'fullScreen', 'share', 'close'],
        loop: false,
        protect: true
    });
});

jQuery(window).resize(function() {
    onloadmethod();
});

function onloadmethod() {
    var fullwidth = jQuery('.fullwidth').width();
    jQuery('.fullwidth').css('left', -fullwidth / 2);
}

AOS.init();
