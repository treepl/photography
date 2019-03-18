jQuery(function () {
    initPortfolioGallery();
});

$(window).load(function()
{
    $('.loaded-block').fadeOut();
});


 function initPortfolioGallery() {
    var condition = $('.portfolioGalleryHolder').size()
        // && false
        ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            var $grid = $('.portfolioGalleryHolder').masonry({
                itemSelector: '.cell',
                percentPosition: true,
                originLeft :true,
                originTop : true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });

            $('.portfolioGalleryHolder a').fancybox({
                nextEffect : 'fade',
                prevEffect : 'fade'

            });
        }
    }
}
