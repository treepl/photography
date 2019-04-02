jQuery(function () {
    initPortfolioGallery();
    initAjaxLoadMoreFunction();
});

$(window).load(function()
{
    $('.loaded-block').fadeOut();
});

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
