jQuery(function () {
    initPaginationCurrentClass();
    initComingSoonCountDown();
    initPortfolioPaging();
    initCarouselPortfolio();
    initPortfolioSorting();
    initMasonryGallery();
    initStandartGallery();
    initCarouselGallerySlider();
    initAjaxLoadMoreFunction();
    initSubMenuToSidebar();
    initArchivesOpenClose();
});

$(window).load(function()
{
    $('.loaded-block').fadeOut();
});


function initPaginationCurrentClass() {
    var condition = $('.pagination').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $('.pagination .active').addClass('current');
        }
    }
}

/*Coming Soon*/
function initComingSoonCountDown() {
    var condition = $('.comingSoonTimerHolder').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $('.comingSoonTimerHolder').countdowntimer({
                dateAndTime : "2018/12/23 00:00:00",
                size : "lg",
                regexpMatchFormat : "([0-9]{1,3}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
                regexpReplaceWith : '<div class="column"><span>$1</span><p>days</p></div><div class="column"><span>$2</span><p>hours</p></div><div class="column"><span>$3</span><p>minutes</p></div><div class="column"><span>$4</span><p>seconds</p></div>'
            });
        }
    }
}
/*End Coming Soon*/

/*======================Portfolio =============================*/

function initPortfolioPaging() {
    var condition = $('.modulesDetailPaging').length
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            var currentId = $('[data-current_id]').data('current_id');
            var index = $('.hiddenModulesListHolder [data-id="' + currentId + '"]').index();
            var prevIndex = index - 1;
            var nextIndex = index + 1;

            if(prevIndex >= 0 ) {
                $('.modulesDetailPaging .prev').show();
                $('.modulesDetailPaging .prev').attr('href',$('.hiddenModulesListHolder .hiddenItem').eq(prevIndex).data('link'));
                $('.modulesDetailPaging .prev .title').html($('.hiddenModulesListHolder .hiddenItem').eq(prevIndex).data('name'));
            }

            if(nextIndex < $('.hiddenModulesListHolder .hiddenItem').length) {
                $('.modulesDetailPaging .next').show();
                $('.modulesDetailPaging .next').attr('href',$('.hiddenModulesListHolder .hiddenItem').eq(nextIndex).data('link'));
                $('.modulesDetailPaging .next .title').html($('.hiddenModulesListHolder .hiddenItem').eq(nextIndex).data('name'));
            }
        }
    }
}


function initCarouselPortfolio()
{
    var condition = $('.portfolioCarouselHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            var carouselGallerySlider = $('.portfolioCarouselHolder .mask').bxSlider({
                slideSelector : $('.carouselGalleryHolder .slide'),
                pager : true,
                responsive: true,
                controls : false,
                auto : true,
           
                moveSlides: 1,
                shrinkItems: true,
            });
        }
    }
}

function initPortfolioSorting() {
    var condition = $('.portfolioFilterGridHolder').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $('.portfolioFilterGridHolder .cell').hide();
            $grid = $('.portfolioFilterGridHolder').isotope({
                itemSelector: '.cell',
                percentPosition : true
            });

            $grid.imagesLoaded().progress( function(instance, image) {
                $('.portfolioFilterGridHolder .cell').show();
                $grid.isotope('layout');
            });

            $('.portfolioFilterBTNHolder [data-filter]').on( 'click', function() {
                var _this = $(this);
                var filterValue = _this.attr('data-filter');

                $('.portfolioFilterBTNHolder li').removeClass('active');
                _this.closest('li').addClass('active');

                $grid.isotope({ filter: filterValue });

                return false;
            });
        }
    }
}
/*======================End portfolio =============================*/

/*======================Galleries  =============================*/


function initMasonryGallery() {
    var condition = $('.masonryGalleryHolder').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            var $grid = $('.masonryGalleryHolder').masonry();
            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });

            $('.masonryGalleryHolder a').fancybox({
                nextEffect : 'fade',
                prevEffect : 'fade'

            });
        }
    }
}

function initStandartGallery()
{
    var condition = $('.lightboxGalleryHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            $('.lightboxGalleryHolder a').fancybox({
                nextEffect : 'fade',
                prevEffect : 'fade'

            });
        }
    }
}

function initCarouselGallerySlider()
{
    var condition = $('.carouselGalleryHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            var carouselGallerySlider = $('.carouselGalleryHolder .mask').bxSlider({
                slideSelector : $('.carouselGalleryHolder .slide'),
                pager : false,
                controls : false,
                auto : true,
                minSlides: 1,
                maxSlides: 3,
                moveSlides: 1,
                slideWidth: 360,
                shrinkItems: true,
                slideMargin : 30
            });

            $('.carouselGalleryHolder .btn-next').click(function()
            {
                carouselGallerySlider.goToNextSlide();

                return false;
            });

            $('.carouselGalleryHolder .btn-prev').click(function()
            {
                carouselGallerySlider.goToPrevSlide();

                return false;
            });
        }
    }
}

/*======================End Galleries  =============================*/

/*======================Blog  =============================*/
function initAjaxLoadMoreFunction()
{
    var condition = $('.ajaxListHolder').length
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null) 
        {
            if($('.ajaxListHolder .pagination ul li.active').next().length)
            {
                $('.loadMoreBtn').attr('href', $('.ajaxListHolder .pagination ul li.active').next().find('a').attr('href'));
            }
            else
            {
                $('.load-holder').hide();
            }

            $('.loadMoreBtn').click(function()
            {
                var _this = $(this);
                var _href = _this.attr('href');

                $.ajax({
                    url: _href,
                    success: function(data){
                        var requiredObject =  $('div.ajaxListHolder', data);
                        var _items = requiredObject.find('.load-item');
                        var _nextPage = requiredObject.find('.pagination ul li.active').next().find('a');

                        $('.ajaxListHolder .pagination').before(_items);

                        if(_nextPage.length)
                        {
                            $('.load-holder a').attr('href', _nextPage.attr('href'));
                        }
                        else
                        {
                            $('.load-holder a').hide();
                        }
                    }
                });

                return false;
            });
        }
    }
}

/*======================End Blog =============================*/

/*======================Static  =============================*/
function initSubMenuToSidebar()
{
    var menuSelector = '.navigation ul:eq(0)';
    var sidebarPlaceHolderSelect = '.sidebarSubmenuPlaceHolder';//side-navigation
    var activeSelector = '.active';

    var condition = $(sidebarPlaceHolderSelect).size() && $(menuSelector + ' ' + activeSelector + ":has(ul)").size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            copyToSidebar();
        }
    }

    function copyToSidebar()
    {
        var submenuCopy = $(menuSelector).find(activeSelector + ':first ul:eq(0)').clone();

        submenuCopy.addClass('sidebar-nav');
        $(sidebarPlaceHolderSelect).append(submenuCopy);
        $(sidebarPlaceHolderSelect).find('ul').removeAttr('class');
        $(sidebarPlaceHolderSelect).find('ul').addClass('side-nav');
        $(sidebarPlaceHolderSelect).find('ul ul').remove();
    }
}
/*======================end Static  =============================*/

function initArchivesOpenClose() {
    var condition = $('.archivesListOpenClose').size()
    // && false
    ;init(condition); 

    function init(condition) {
        if (condition || condition == null) {
            $('.archives>li').openClose({
                activeClass: 'active',
                opener: '.opener',
                slider: '.slide',
                animSpeed: 400,
                effect: 'slide'
            });
        }
    }
}

