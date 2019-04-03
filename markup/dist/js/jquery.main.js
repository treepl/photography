jQuery(function () {
    initPortfolioGallery();
	initAjaxLoadMoreFunction();
	initComingSoonCountDown();
	initFoundation();
});

$(window).load(function()
{
    $('.loaded-block').fadeOut();
});

function initFoundation() {
	jQuery(document).foundation();

	$(function() {
		$('.search')
		  .bind('click', function(event) {
			$(".search-field").toggleClass("expand-search");
	  
			// if the search field is expanded, focus on it
			if ($(".search-field").hasClass("expand-search")) {
			  $(".search-field").focus();
			}
		  })
	  });
}

/*Coming Soon*/
function initComingSoonCountDown() {
    var condition = $('.comingSoonTimerHolder').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $('.comingSoonTimerHolder').countdowntimer({
                dateAndTime : "2019/06/06 00:00:00",
                size : "lg",
                regexpMatchFormat : "([0-9]{1,3}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
                regexpReplaceWith : '<div class="column"> <div class="holder"> <span>$1</span> <p>days</p></div></div><div class="column"> <div class="holder"> <span>$2</span> <p>hours</p></div></div><div class="column"> <div class="holder"> <span>$3</span> <p>minutes</p></div></div><div class="column"> <div class="holder"> <span>$4</span> <p>seconds</p></div></div>'
            });
        }
    }
}
/*End Coming Soon*/

function initAjaxLoadMoreFunction()
{
	var condition = $('.ajaxListHolder').size()
	    // && false
	;init(condition);

	function init(condition)
	{
	    if(condition || condition == null)
	    {
			var $container = $('.ajaxListHolder');

			if($container.find('.next').length)
			{
				$('.loadMoreBtn').attr('href', $container.find('.next a').attr('href'));
				$container.find('.pagination').remove();
			}
			else
			{
				$('.loadMoreBtn').hide();
			}

			$container.isotope(
				{
					itemSelector: '.load-item',
					animationEngine: 'best-available',
					transitionDuration : '0.6s'
				});

			$('.filterBTNHolder a').on( 'click', function()
			{
				var _this = $(this);
				var filterValue = _this.attr('data-filter');

				$('.filterBTNHolder li').removeClass('active');
				_this.closest('li').addClass('active');

				$container.isotope({ filter: filterValue });

				return false;
			});

			$('.loadMoreBtn').click(function()
			{
				var _this = $(this);
				var _href = _this.attr('href');

				$.ajax({
					url: _href,
					success: function(data){
						var requiredObject =  $('div.ajaxListHolder', data);
						var _items = requiredObject.find('.load-item');
						var _nextPageLink = requiredObject.find('.next');

						if(_nextPageLink.length)
						{
							$('.loadMoreBtn').attr('href', _nextPageLink.find('a').attr('href'));
						}
						else
						{
							$('.loadMoreBtn').hide();
						}
						var sortF = $('.sortListHolder .active').attr('data-filter');

						$container.append( _items ).isotope( 'appended', _items ).isotope('layout');

						setTimeout(function()
						{
							$('.sortListHolder .active a').trigger('click');
						},500);
					}
				});

				return false;
			});
	    }
	}
}


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
