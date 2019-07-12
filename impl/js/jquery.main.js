/*=========================================== REGION: page init callbacks  ====================================================*/
if($('.login-nav').length)
{
    $('body').addClass('secureZoneHolder');
}
$(document).ready(function()
{
    initSubMenuToSidebar();
    initWebApp3DetailPaging();
    var customTemplateId = getURLParam('customTemplateId') || '';
    var _domain = getURLParam('domain') || '';

    if(customTemplateId.length > 0)
    {
        $('#main a, .side-navigation a').each(function() {
            var _this = $(this);

            if(_this.attr('href').indexOf('#') != 0 && _this.attr('href').indexOf('http') == -1) {
                _this.attr('href',_this.attr('href') + '?customTemplateId=' + customTemplateId + '&domain=' + _domain);
            }
        });

        $('#header .logo a').attr('href','javascript:');

        $.ajax(
            {
                url : '//' + _domain + '/api/v1/template_service/getCustomTemplateInfo/' + customTemplateId,
                dataType  : 'json',
                success : function(data)
                {
                    if(data.result.isGrayImages) {
                        $('img').each(function() {
                            if(!$(this).closest('.captchaimg').length) {
                                $(this).attr('src', '/gray-images' + $(this).attr('src'));
                            }
                        });

                        $('a[rel]').each(function() {
                            $(this).attr('href', '/gray-images' + $(this).attr('href'));
                        });

                        $('body').addClass('grey-images');
                    }

                    if(!$.isEmptyObject(data.result.customSitemap))
                    {
                        var menuHtml = '<ul id="nav" class="nav-slide">';

                        menuHtml = createMenu(data.result.customSitemap, menuHtml);

                        menuHtml += '</ul>';

                        $('#header #nav').remove();
                        $('#header #myMenu1').append(menuHtml);
                        $('#header #nav .drop').each(function() {
                            if(!$(this).find('li').length) $(this).remove();
                        });
                        initDropDownClasses();
                        initTouchNav();
                    }

                    if(!$.isEmptyObject(data.result.customStyles))
                    {
                        var _buttonsObj = data.result.customStyles.buttons.subsection;
                        var _colorsObj = data.result.customStyles.colors.subsection;
                        var headerLogoObj = data.result.customStyles['logo-section'].subsection;
                        var textsObj = data.result.customStyles['texts'].subsection;

                        if(data.result.compiledCssVersion) {
                            var link = '//' + _domain + '/template_styles_factory/css/' + customTemplateId + '/' + data.result.template_id + '/css/main.css';
                            var newStyle = '<link class="newStyle" media="all" rel="stylesheet" href="' + link + '">'
                            var linkCss = $('[href^="/css/main.css"]');

                            linkCss.after(newStyle);

                            $('.newStyle').load(function() {
                                linkCss.remove();
                            });
                        } else {
                            var styles = '';

                            styles += createStyles(_buttonsObj);
                            styles += createStyles(_colorsObj);
                            styles += createStyles(textsObj);

                            $('body').append('<style>' + styles + '</style>');
                        }

                        for(var key in headerLogoObj)
                        {
                            var _o = headerLogoObj[key];

                            for(var key2 in headerLogoObj[key]['column'])
                            {
                                for(var key3 in headerLogoObj[key]['column'][key2])
                                {
                                    for(var key4 in headerLogoObj[key]['column'][key2]['items'])
                                    {
                                        var _o = headerLogoObj[key]['column'][key2]['items'][key4];

                                        if(_o['filetype'] == 'header-logo')
                                        {
                                            $('#header .logo img').attr('src', _o['default-value']);
                                        }
                                        else if(_o['filetype'] == 'footer-logo')
                                        {
                                            $('#footer .footer-logo img').attr('src', _o['default-value']);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    setTimeout(function()
                    {
                        $('.loaded-block').fadeOut();
                    },500);


                }
            });

        function createStyles(styleObj)
        {
            var s = '';
            for(var key in styleObj)
            {
                var _o = styleObj[key];

                for(var key2 in styleObj[key]['column'])
                {
                    for(var key3 in styleObj[key]['column'][key2])
                    {
                        for(var key4 in styleObj[key]['column'][key2]['items'])
                        {
                            var _o = styleObj[key]['column'][key2]['items'][key4];

                            if(_o['default-value'].length)
                            {
                                s += _o['selector'] + '{' + _o.property + ':' + _o['default-value'] + ';} \r\n';
                            } else {
                                s += _o['selector'] + '{' + _o.property + ':transparent;} \r\n';
                            }
                        }
                    }
                }
            }

            return s;
        }

        function createMenu(navObj,holder)
        {
            for(var key in navObj)
            {
                if(key != 'included') {
                    if(!navObj[key].layout_data['hide_from_menu']) {
                        var _href = navObj[key].layout_data.link || '#';

                        if(_href != '#') _href += '?customTemplateId=' + customTemplateId + '&domain=' + _domain;

                        holder += '<li><a href="' + _href + '">' + navObj[key].layout_data.name + '</a>';

                        if(!$.isEmptyObject(navObj[key]['nodes']))
                        {
                            holder += '<div class="drop"><ul>';

                            holder = createMenu(navObj[key]['nodes'],holder);

                            holder += '</ul></div>';
                        }

                        holder += '</li>';
                    }
                }
            }

            return holder;
        }
    }
    else {
        $('.loaded-block').fadeOut();
    }
});
/*=========================================== REGION: page init callbacks  ====================================================*/
jQuery(function(){
    /*General*/
    initCustomForms();
    initMobileNav();
    initDropDownClasses();
    initTouchNav();
    initBackToTop();
    initMenuCustomSelection();
    initPagingFunction();
    initHeaderSmallScroll();
    validationRemoveError();
    initSearchOpener();
    initTextSlider();
    initOpenClose();
    initCodeOpenClose();
    initAnchorNav();
    initCalloutClose();
    initProgressBar();
    initFixedSidebar();
    initTestimonialsSlider();
    /*end General*/
    initHomeLogoCarousel();
    /*Coming Soon*/
    initComingSoonCountDown();
    /*End Coming Soon*/

    /*home 2*/
    // initHome2PageSlider();
    /*end home 2*/

    /*Static*/
    initAccordion();
    initTabs();

    //initSubMenuToSidebar();
    /*end Static*/

    /*Events*/
    initEventsLoadMoreFunction();
    /*end Events*/

    /*gallery*/
    initslideshowGallerySlider();
    initStandartGallery();
    initCarouselGallerySlider();
    initMasonryGallery();
    initMasonry2Gallery();
    /*end gallery*/

    /*web app 1*/
    initWebAppAjaxLoadMoreFunction();
    initCaseStudyDetailSlider();
    /*end web app 2*/

    /*web app 2*/
    initWebApp2GoogleMaps();
    /*end web app 2*/

    /*web app 3*/
    initWebApp3Function();
    initWebApp3DetailSlider();

    /*end web app 3*/

    /*product list 2*/
    initCatalogueMenu();
    initProductList2LoadMoreFunction();
    /*end product list 2*/

    /*product detail*/
    initProductDetailSlider();

    $(document).on('ezbcAppReady', function()
    {
        setTimeout(function()
        {
            initCustomForms();
        },100);
    });
    /*end product detail*/

    /*shopping cart*/
    initResetShoppingCart();
    initResetProductDetail();
    /*end shopping cart*/

    /*multi step shopping cart*/
    initMultiStepShoppingCart();
    /*end multi step shopping cart*/
    /*style guide*/
    initCopyCode();
    /*end style guide*/
    initStaticMultiStep();
});

$(window).load(function()
{
    /*blog*/
    initBlogListLoadMoreFunction();
    counter();
    /*end blog*/
    /*home 1*/
    // initBgVideo();
    /*end home 1*/
});

///////////////////////////// REGION: getting url param object //////////////////////////////////////////////
function getURLParam(key, incentiveCase, url){var e=key;var t=incentiveCase;var n=url;function r(){if(t){e=e.toLowerCase()}n=i(n);var r=s(n,t);return r[e]}function i(e){if(e==null){e=window.location.href}e=e.replace(/^.*?(\?(.*?)(#.*?)?)?$/,"$2");return e}function s(e,t){var n=e.split("&");var r={};for(var i=0;i<n.length;i++){var s=n[i];var o=[s.substring(0,s.indexOf("=")),s.substring(s.indexOf("=")).replace("=","")];if(t){o[0]=o[0].toLowerCase()}r[o[0]]=o[1]}return r}return r()}
///////////////////////////// ENDREGION: getting url param object //////////////////////////////////////////////


/*=========================================== ENDREGION: page init callbacks ==================================================*/

/*=========================================== REGION: functions ===============================================================*/

function counter() {
    var condition = $('.countersHolder').size()
        // && false
    ;init(condition);

    function init(condition) {

        if(condition || condition == null) {
            Number.prototype.formatMoney = function(c, d, t){
                var n = this,
                    c = isNaN(c = Math.abs(c)) ? 2 : c,
                    d = d == undefined ? "." : d,
                    t = t == undefined ? "," : t,
                    s = n < 0 ? "-" : "",
                    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
                    j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
            };
            $('.countersHolder').viewportChecker({
                offset: '20%',
                callbackFunction: function(elem, action){
                    $('.countersHolder .col-3').each(function(index, elm){
                        var $container = $(this),
                            $number = $container.find('.value'),
                            initial = ($container.data('initial') || '0') + '',
                            target = ($container.data('target') || '10') + '',
                            prefix = $container.data('prefix') || '',
                            suffix = $container.data('suffix') || '',
                            commaNumber;
                        // 0 for integers, 1+ for floats (number of digits after the decimal)
                        precision = 0,
                            usingComma = false;
                        if (target.indexOf('.') != -1) {
                            precision = target.length - 1 - target.indexOf('.');
                        } else if (target.indexOf(',') != -1) {
                            precision = target.length - 1 - target.indexOf(',');
                            usingComma = true;
                            target = target.replace(/\,/gim, '');
                        }
                        initial = window[precision ? 'parseFloat' : 'parseInt'](initial, 10);
                        target = window[precision ? 'parseFloat' : 'parseInt'](target, 10);

                        if ( /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent) ) {
                            if (usingComma) {
                                $number.html(prefix + target.toFixed(precision).replace('\.', ',') + suffix);
                            } else {
                                $number.html(prefix + target.toFixed(precision) + suffix);
                            }

                            return;
                        }

                        if (usingComma) {
                            commaNumber = +initial.toFixed(precision);
                            $number.html(prefix + commaNumber.formatMoney(0, '', ',') + suffix);
                        } else {
                            $number.html(prefix + initial.toFixed(precision) + suffix);
                        }

                        var current = initial,
                            step = 25,
                            stepValue = (target - initial) / 25,
                            interval = setInterval(function(usingComma){
                                current += stepValue;
                                step--;
                                if (usingComma) {
                                    commaNumber = +current.toFixed(precision);
                                    $number.html(prefix + commaNumber.formatMoney(0, '', ',') + suffix);
                                } else {
                                    $number.html(prefix + current.toFixed(precision) + suffix);
                                }
                                if (step <= 0) {
                                    if (usingComma) {
                                        commaNumber = +target.toFixed(precision);
                                        $number.html(prefix + commaNumber.formatMoney(0, '', ',') + suffix);
                                    } else {
                                        $number.html(prefix + target.toFixed(precision) + suffix);
                                    }
                                    window.clearInterval(interval);
                                }
                            }, 40, usingComma);
                    });
                }
            });
        }
    }
}

function initCaseStudyDetailSlider() {
    var condition = $('.caseStudySlider').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $('.caseStudySlider .slideset').bxSlider({
                mode : 'horizontal',
                // pagerCustom: '.text-slider .sliderNav',
                pager: true,
                controls : true,
                slideSelector : '.slide',
                auto : true
            });
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
                dateAndTime : "2019/07/23 00:00:00",
                size : "lg",
                regexpMatchFormat : "([0-9]{1,3}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
                regexpReplaceWith : '<div class="column"><span>$1</span><p>days</p></div><div class="column"><span>$2</span><p>hours</p></div><div class="column"><span>$3</span><p>minutes</p></div><div class="column"><span>$4</span><p>seconds</p></div>'
            });
        }
    }
}
/*End Coming Soon*/



function initSearchOpener() {
    $('.searchOpenerBTN').click(function(){
        $('.header-form').toggleClass('search-active');

        return false;
    });
}

function initCustomForms() {
    jcf.setOptions('Select', {
        wrapNative: false
    });
    jcf.replaceAll();
}


///////////////////////////// REGION: OpenClose //////////////////////////////////////////////
/*
 $('div.slide-block').OpenClose(
 {
 activeClass:'active',
 opener:'a.open-close',
 slider:'div.block',
 effect:'fade',
 animSpeed:500
 });
 */
!function(e){e.fn.OpenClose=function(n){var n=e.extend({activeClass:"active",opener:".opener",slider:".slide",animSpeed:400,animStart:!1,animEnd:!1,effect:"fade",event:"click"},n);return this.each(function(){var t=e(this),a=n.animSpeed,i=n.activeClass,s=e(n.opener,t),f=e(n.slider,t),d=n.animStart,o=n.animEnd,c=n.effect,r=n.event;f.length&&(s.bind(r,function(){return f.is(":animated")||("function"==typeof d&&d(),t.hasClass(i)?(f["fade"==c?"fadeOut":"slideUp"](a,function(){"function"==typeof o&&o()}),t.removeClass(i)):(t.addClass(i),f["fade"==c?"fadeIn":"slideDown"](a,function(){"function"==typeof o&&o()}))),!1}),t.hasClass(i)?f.show():f.hide())})}}(jQuery);
///////////////////////////// ENDREGION: OpenClose //////////////////////////////////////////////

function initStaticMultiStep()
{
    $('.button.step2').click(function()
    {
        $('.step3Holder').hide();
        $('.step2Holder').fadeIn();
        $('.steps-holder li').removeClass('current');
        $('.steps-holder li').eq(1).addClass('current');

        return false;
    });

    $('.button.step3').click(function()
    {
        $('.step2Holder').hide();
        $('.step3Holder').fadeIn();
        $('.steps-holder li').removeClass('current');
        $('.steps-holder li').eq(2).addClass('current');

        return false;
    });

    var param = getURLParam('step');
    if(param == 2)
    {
        $('.button.step2').trigger('click');
    }
    else if(param == 3)
    {
        $('.button.step3').trigger('click');
    }

    $('.steps [data-step]').click(function()
    {
        if($(this).data('step') == 2)
        {
            $('.button.step2').trigger('click');
        }
        else
        {
            $('.button.step3').trigger('click');
        }

        return false;
    });



    ///////////////////////////// REGION: getting url param object //////////////////////////////////////////////
    function getURLParam(key, incentiveCase, url){var e=key;var t=incentiveCase;var n=url;function r(){if(t){e=e.toLowerCase()}n=i(n);var r=s(n,t);return r[e]}function i(e){if(e==null){e=window.location.href}e=e.replace(/^.*?(\?(.*?)(#.*?)?)?$/,"$2");return e}function s(e,t){var n=e.split("&");var r={};for(var i=0;i<n.length;i++){var s=n[i];var o=[s.substring(0,s.indexOf("=")),s.substring(s.indexOf("=")).replace("=","")];if(t){o[0]=o[0].toLowerCase()}r[o[0]]=o[1]}return r}return r()}
    ///////////////////////////// ENDREGION: getting url param object //////////////////////////////////////////////
}

/*======================General=============================*/

function initFixedSidebar() {
    var condition = $('.elements-sidebar').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $(window).scroll(function() {
                if($(window).scrollTop() > 0) {
                    var scroll = $(window).scrollTop() + 22;
                } else {
                    var scroll = 0;
                }

                $('.elements-sidebar').css('top', scroll);
            });
        }
    }
}

function initProgressBar() {
    var condition = $('.progressBarAnimate').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $('.progressBarAnimate').viewportChecker({
                classToAdd: 'animate'
            });
        }
    }
}

function initCalloutClose() {
    $(document).on('click', '.calloutCloseHoler .close', function() {
        $(this).closest('.calloutCloseHoler').fadeOut();

        return false;
    });
}

function initAnchorNav(){
    $('.anchor-nav a').click(function(){
        var el = $(this).attr('href');
        var elWrapped = $(el);
        var navheight = $('#header .header-frame').outerHeight();
        scrollToElement(elWrapped,navheight);
        return false;
    });
}
function scrollToElement(element,navheight){
    var offset = element.offset();
    var offsetTop = offset.top;
    var positionTop = element.attr('id');
    var totalScroll = offsetTop-navheight;

    $('body,html').animate({
        scrollTop: totalScroll
    }, 500);
}

function initOpenClose() {
    jQuery('.open-close').OpenClose({
        activeClass: 'active',
        opener: '.opener',
        slider: '.slide',
        animSpeed: 400,
        effect: 'slide'
    });
}

function initCodeOpenClose() {
    jQuery('.code-open-close').OpenClose({
        activeClass: 'active',
        opener: '.opener',
        slider: '.slide',
        animSpeed: 400,
        effect: 'slide'
    });
}
function initTextSlider() {
    var condition = $('.text-slider').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $('.text-slider .slideset').bxSlider({
                mode : 'horizontal',
                // pagerCustom: '.text-slider .sliderNav',
                controls : false,
                slideSelector : '.slide',
                adaptiveHeight : true,
                auto : true
            });
        }
    }
}

function initMobileNav() {
    jQuery('body').mobileNav({
        hideOnClickOutside: true,
        menuActiveClass: 'nav-active',
        menuOpener: '.nav-opener',
        menuDrop: '.nav-slide'
    });
}

function initTouchNav() {
    jQuery('#nav').each(function(){
        new TouchNav({
            navBlock: this,
            menuDrop: 'div'
        });
    });
}

function initDropDownClasses() {
    jQuery('#nav li').each(function() {
        var item = jQuery(this);
        var drop = item.find('ul');
        var link = item.find('a').eq(0);
        if(drop.length) {
            item.addClass('has-drop-down');
            if(link.length) link.addClass('has-drop-down-a');
        }
    });
}

function initBackToTop()
{
    var condition = $('.backToTopBTN').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            $('.backToTopBTN').click(function()
            {
                $('body,html').animate({
                    scrollTop: 0
                }, 500);

                return false;
            });
        }
    }
}

function initMenuCustomSelection()
{
    var condition = $('[data-select_menu_item]').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            $('.main_menu').menuAutoSelector(
                {
                    selected_class  : 'selected',
                    menu_item_selector : "li",
                    all_parents_selected : true
                });
            $('#myAccountNav ul').menuAutoSelector(
                {
                    selected_class  : 'selected',
                    menu_item_selector : "li",
                    all_parents_selected : true
                });
        }
    }
}

function initPagingFunction()
{
    var condition = $('.paginationHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            $('.paginationHolder').wrapTextNodesWithTag(
                {
                    tagName :'span'
                });

            $('.paginationHolder .pagination').wrapTextNodesWithTag(
                {
                    tagName :'span'
                });
        }
    }
}

function initHeaderSmallScroll()
{
    $(window).scroll(function ()
    {
        scroll();
    });

    scroll();

    function scroll()
    {
        var x = $(document).scrollTop();
        var _offset = 0;

        if($('.login-nav').length)
        {
            _offset = 55;
        }

        if(x > _offset)
        {
            $('body').addClass('scroll');
        }
        else
        {
            $('body').removeClass('scroll');
        }
    }
}

function validationRemoveError()
{
    $('input, select, textarea').change(function()
    {
        $(this).removeClass('error');
        $(this).closest('li').removeClass('error');
    });
}
/*======================end General=============================*/

/*======================Home 1=============================*/

function initBgVideo()
{
    var condition = $('.videoBgHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            if($('body').hasClass('desktop'))
            {
                jQuery.mbYTPlayer.apiKey = "AIzaSyDdi0F_8pKEKirAtIQv6ChwdnL2eTdAmiQ";
                $('.videoBgHolder').YTPlayer();

                $(document).on('click','.btn-play.pause', function()
                {
                    $('.videoBgHolder').YTPPause();
                    $('.videoBgHolder').addClass('paused');
                    $(this).removeClass('pause');
                    $(this).addClass('play');

                    return false;
                });

                $(document).on('click','.btn-play.play',function()
                {
                    $('.videoBgHolder').YTPPlay();
                    $('.videoBgHolder').removeClass('paused');
                    $(this).removeClass('play');
                    $(this).addClass('pause');

                    return false;
                });
            }
        }
    }
}

function initTestimonialsSlider() {
    var condition = $('.testimonialsSliderHolder ').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $('.testimonialsSliderHolder .slideset').bxSlider({
                mode : 'horizontal',
                // pagerCustom: '.text-slider .sliderNav',
                slideSelector : '.slide',
                adaptiveHeight : true,
                auto : false,
                pager: false
            });
        }
    }
}

function initHomeLogoCarousel()
{
    var condition = $('.initHomeLogoCarousel').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            var carouselGallerySlider = $('.initHomeLogoCarousel').bxSlider({
                pager : false,
                controls : false,
                auto : false,
                pause : 8000,
                maxSlides: 6,
                minSlides:2,
                slideWidth: 190,
                moveSlides: 6,
                shrinkItems: true
            });
        }
    }
}
/*======================end Home 1=============================*/

/*======================Home 2=============================*/
function initHome2PageSlider()
{
    var condition = $('.homePageSliderHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            var homeSliderPause = +$('.homePageSliderHolder').data('pause');
            var homeSliderAuto = true;

            if(!homeSliderPause) homeSliderAuto = false;

            var homeSlider = $('.homePageSliderHolder .slideset').bxSlider({
                mode: 'fade',
                slideSelector : $('.homePageSliderHolder .slide'),
                pager : false,
                controls : false,
                auto : homeSliderAuto,
                pause : homeSliderPause
            });

            $('.homePageSliderHolder .btn-next').click(function()
            {
                homeSlider.goToNextSlide();

                return false;
            });

            $('.homePageSliderHolder .btn-prev').click(function()
            {
                homeSlider.goToPrevSlide();

                return false;
            });
        }
    }
}
/*======================end Home 2=============================*/

/*======================Static  =============================*/
function initTabs() {
    jQuery('ul.tabset').tabset({
        tabLinks: 'a',
        addToParent: true,
        defaultTab: false
    });
    jQuery('ul.patterns-tabset').tabset({
        tabLinks: 'a',
        addToParent: true,
        defaultTab: false
    });
}

function initSubMenuToSidebar()
{
    var menuSelector = '.main_menu ul:eq(0)';
    var sidebarPlaceHolderSelect = '.sidebarSubmenuPlaceHolder';//side-navigation
    var activeSelector = '.selected';

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
        $(sidebarPlaceHolderSelect).find('ul ul').remove();
    }
}
/*======================end Static  =============================*/

/*======================Static and FAQ =============================*/
function initAccordion() {
    jQuery('.accordion').slideAccordion({
        opener: 'a.opener',
        slider: 'div.slide',
        animSpeed: 400
    });
}
/*======================end Static  =============================*/

/*======================Events=============================*/
function initEventsLoadMoreFunction()
{
    var condition = $('.eventsListHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            if($('.eventsListHolder .pagination.webapp .pag-next').length)
            {
                $('.load-holder a').attr('href', $('.eventsListHolder .pagination.webapp .pag-next a').attr('href'));
            }
            else
            {
                $('.load-holder').hide();
            }

            $('.load-holder a').click(function()
            {
                var _this = $(this);
                var _href = _this.attr('href');

                $.ajax({
                    url: _href,
                    success: function(data){
                        var requiredObject =  $('div.eventsListHolder', data);
                        var _items = requiredObject.find('.event-holder');
                        var _nextPage = requiredObject.find('.pagination.webapp .pag-next a');

                        $('.eventsListHolder').append(_items);

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
/*======================end Events=============================*/

/*======================gallery=============================*/
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
                slideWidth: 386,
                shrinkItems: true,
                slideMargin : 20
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

function initStandartGallery()
{
    var condition = $('.standardGalleryHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            $('.standardGalleryHolder a').fancybox({
                nextEffect : 'fade',
                prevEffect : 'fade'

            });
        }
    }
}

function initslideshowGallerySlider()
{
    var condition = $('.slideshowGalleryHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            var slideshowGallerySlider = $('.slideshowGalleryHolder .slideset').bxSlider({
                mode: 'fade',
                slideSelector : $('.slideshowGalleryHolder .slide'),
                pager : false,
                controls : false,
                auto : true
            });

            $('.slideshowGalleryHolder .btn-next').click(function()
            {
                slideshowGallerySlider.goToNextSlide();

                return false;
            });

            $('.slideshowGalleryHolder .btn-prev').click(function()
            {
                slideshowGallerySlider.goToPrevSlide();

                return false;
            });
        }
    }
}

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

function initMasonry2Gallery() {
    var condition = $('.masonry2GalleryHolder').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            var $grid = $('.masonry2GalleryHolder').masonry();
            $grid.imagesLoaded().progress( function(instance, image) {
                var ratio = image.img.width / image.img.height;
                if(ratio >= 3) {
                    $(image.img).closest('.item-block').addClass('item-block-large');
                }

                $grid.masonry('layout');
            });

            $('.masonry2GalleryHolder a').fancybox({
                nextEffect : 'fade',
                prevEffect : 'fade'

            });
        }
    }
}
/*======================end gallery=============================*/

/*======================Blog=============================*/
function initBlogListLoadMoreFunction()
{
    var condition = $('.hiddenPaginationHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            if($('.hiddenPaginationHolder #nextpage').attr('href') == '#')
            {
                $('.load-holder').hide();
            }
            else
            {
                $('.loadMoreBlogBtn').attr('href', $('.hiddenPaginationHolder #nextpage').attr('href'));
            }

            if($('.masonryBlogListHolder').length && $('.masonryBlogListHolder .post').length > 1)
            {
                var masonryGrid = $('.masonryBlogListHolder #catblogoutput').masonry({
                    // set itemSelector so .grid-sizer is not used in layout
                    itemSelector: '.post',
                    percentPosition: true,
                    originLeft :true,
                    originTop : true
                });
            }

            $('.loadMoreBlogBtn').click(function()
            {
                var _this = $(this);
                var _href = _this.attr('href');

                $.ajax({
                    url: _href,
                    success: function(data){
                        var requiredObject =  $('div.col-two-third', data);
                        var _items = requiredObject.find('.post');
                        var _nextPageUrl = requiredObject.find('#nextpage').attr('href');

                        $('#catblogoutput').append(_items);

                        if($('.masonryBlogListHolder').length)
                        {
                            masonryGrid.masonry( 'appended', _items );

                            setTimeout(function()
                            {
                                masonryGrid.masonry('layout');
                            },1000);
                        }

                        if(_nextPageUrl == '#')
                        {
                            $('.load-holder').hide();
                        }
                        else
                        {
                            $('.loadMoreBlogBtn').attr('href', _nextPageUrl);
                        }
                    }
                });

                return false;
            });
        }
    }
}
/*======================end Blog  =============================*/

/*======================web app 1  =============================*/
function initWebAppAjaxLoadMoreFunction()
{
    var condition = $('.ajaxWebappListHolder').size()
        // && false
    ;init(condition);
    function init(condition)
    {
        if(condition || condition == null)
        {
            if($('.ajaxWebappListHolder .pagination.webapp .pag-next').length)
            {
                $('.loadMoreBtn').attr('href', $('.ajaxWebappListHolder .pagination.webapp .pag-next a').attr('href'));
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
                        var requiredObject =  $('div.ajaxWebappListHolder', data);
                        var _items = requiredObject.find('.item');
                        var _nextPage = requiredObject.find('.pagination.webapp .pag-next a');

                        $('.ajaxWebappListHolder').append(_items);

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
/*======================end web app 1  =============================*/

/*======================web app 2  =============================*/
function initWebApp2GoogleMaps()
{
    var condition = $('#webApp2MapHolder').size()
        // && false
    ;init(condition);
    function init(condition)
    {
        if(condition || condition == null)
        {
            if($('#webApp2MapHolder').data('lat'))
            {
                var myLatLng = {lat: $('#webApp2MapHolder').data('lat'), lng: $('#webApp2MapHolder').data('long')};
                initMap(myLatLng);
            }
            else if($('#webApp2MapHolder').data('address'))
            {
                var geocoder = new google.maps.Geocoder();
                var myLatLng = geocodeAddress(geocoder, $('#webApp2MapHolder').data('address'));
                initMap(myLatLng);
            }
            else
            {
                $('#webApp2MapHolder').hide();
            }
        }
        function initMap(myLatLng)
        {

            var mapOptions =
                {
                    zoom: 12,
                    center: myLatLng,
                    scrollwheel: false,
                    styles: [
                        {
                            "stylers": [
                                { "saturation": -100 }
                            ]
                        }
                    ],
                    mapTypeId: google.maps.MapTypeId.ROADMAP

                };

            var mapElement = document.getElementById('webApp2MapHolder');
            var map = new google.maps.Map(mapElement, mapOptions);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: '/images/map-marker.png'
            });

        }

        function geocodeAddress(geocoder, address) {
            geocoder.geocode({'address': address}, function(results, status) {
                initMap(results[0].geometry.location);
            });
        }
    }
}
/*======================end web app 2  =============================*/

/*web app 3*/
function initWebApp3Function() {
    var condition = $('.webapp3FilterGridHolder').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $('.webapp3FilterGridHolder .item').hide();
            $grid = $('.webapp3FilterGridHolder').isotope({
                itemSelector: '.item',
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: '.item'
                }
            });

            $grid.imagesLoaded().progress( function() {
                $('.webapp3FilterGridHolder .item').show();
                $grid.isotope('layout')
            });

            $('.webApp3FilterBTNHolder [data-filter]').on( 'click', function() {
                var _this = $(this);
                var filterValue = _this.attr('data-filter');

                $('.webApp3FilterBTNHolder li').removeClass('active');
                _this.closest('li').addClass('active');

                $grid.isotope({ filter: filterValue });

                return false;
            });

            $('.webApp3FilterBTNHolder .opener').click(function() {
                $('.webApp3FilterBTNHolder').toggleClass('active');

                return false;
            });

            window.ajaxFlag2 = true;

            $(window).scroll(function() {
                loadContent($grid);
            });
        }
    }

    function loadContent(masonryGrid) {
        if(window.ajaxFlag2) {
            var contentPosition = $('.webapp3FilterGridHolder').offset().top + $('.webapp3FilterGridHolder').outerHeight();
            var currentPosition = $(window).scrollTop() + $(window).height();
            var _nextBTN = $('.webapp3FilterGridHolder .pagination.webapp .pag-next');

            if(currentPosition > contentPosition) {
                if(_nextBTN.length) {
                    window.ajaxFlag2 = false;

                    var nextPageLink = _nextBTN.find('a').attr('href');

                    $.ajax({
                        url: nextPageLink,
                        success: function(data) {
                            var requiredObject =  $('div.webapp3FilterGridHolder', data);
                            var items = requiredObject.find('.item' );
                            var __next = requiredObject.find('.pagination.webapp .pag-next a');

                            items.hide();
                            masonryGrid.append( items );
                            masonryGrid.imagesLoaded().done( function() {
                                items.show();
                                masonryGrid
                                    .isotope( 'appended', items )
                                    .isotope('layout').isotope({
                                    filter: $('.webApp3FilterBTNHolder .active a').data('filter')
                                });
                            });

                            if(__next.length) {
                                _nextBTN.find('a').attr('href', __next.attr('href'));
                            }
                            else {
                                _nextBTN.remove();
                            }

                            window.ajaxFlag2 = true;
                        }
                    });
                }
            }
        }
    }
}

function initWebApp3DetailSlider() {
    var condition = $('.webApp3SliderHolder').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $('.webApp3SliderHolder .webApp3Slider').bxSlider({
                mode : 'fade',
                pagerCustom: '.webApp3SliderHolder .sliderNav',
                controls : false,
                slideSelector : '.slide',
                adaptiveHeight : true,
                auto : true
            });
        }
    }
}

function initWebApp3DetailPaging()
{
    var condition = $('.webAppDetailPaging').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {

            var currentId = $('[data-current_id]').data('current_id');

            var index = $('.hiddenWebAppListHolder [data-id="' + currentId + '"]').index();
            var prevIndex = index - 1;
            var nextIndex = index + 1;

            if(prevIndex >= 0 )
            {
                $('.webAppDetailPaging .btn-prev').show();
                $('.webAppDetailPaging .btn-prev').attr('href',$('.hiddenWebAppListHolder .hiddenItem').eq(prevIndex).data('link'));
            }

            if(nextIndex < $('.hiddenWebAppListHolder .hiddenItem').length)
            {
                $('.webAppDetailPaging .btn-next').show();
                $('.webAppDetailPaging .btn-next').attr('href',$('.hiddenWebAppListHolder .hiddenItem').eq(nextIndex).data('link'));
            }
        }
    }
}
/*end web app 3*/

/*======================product list 2  =============================*/
function initCatalogueMenu()
{
    var condition = $('.catologueListHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            $('.catalogueitemdump').reformatLinkCataloguesStructure(
                {
                    removeOld          : true,
                    parentNodeClass    : 'parentNode',
                    nodeElementClass   : 'nodeElement',
                    nodeLinkClass      : 'nodeLink',
                    parentTag : 'ul',
                    nodeElementTag: 'li'
                });

            var menuClone = $('.parentNode.level1').clone();

            $('.parentNode.level0').remove();
            $('.catologueListHolder .side-nav').append(menuClone);

            $('.catologueListHolder .side-nav').menuAutoSelector(
                {
                    selected_class  : 'selected',
                    menu_item_selector : "li",
                    all_parents_selected : true
                });
        }
    }
}
function initProductList2LoadMoreFunction()
{
    var condition = $('.secondProductListHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            if($(' .nextPageHolder a').length)
            {
                $('.productLoadMoreHolder > a').attr('href', $(' .nextPageHolder a').attr('href'));
            }
            else
            {
                $('.productLoadMoreHolder').hide();
            }

            $('.productLoadMoreHolder > a').click(function()
            {
                var _this = $(this);
                var _href = _this.attr('href');

                $.ajax({
                    url: _href,
                    success: function(data){
                        var requiredObject =  $('div.products-holder', data);
                        var _items = requiredObject.find('.productSmall > li');
                        var _nextPage = requiredObject.find('.nextPageHolder a');

                        $('.secondProductListHolder .productSmall').append(_items);

                        if(_nextPage.length)
                        {
                            $('.productLoadMoreHolder> a').attr('href',_nextPage.attr('href'));
                        }
                        else
                        {
                            $('.productLoadMoreHolder').hide();
                        }
                    }
                });

                return false;
            });
        }
    }
}
/*======================end product list 2  =============================*/

/*======================product detail  =============================*/
function initProductDetailSlider()
{
    var condition = $('.productDetailGalleryHolder').size() && $('.productDetailGalleryHolder .slide').length > 1
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {

            resetProductDetail();
        }

        function resetProductDetail()
        {
            setTimeout(function()
            {
                if($('.productDetailGalleryHolder').data('enabled') != true)
                {
                    $('.productDetailGalleryHolder .mask').bxSlider({
                        mode : 'fade',
                        pagerCustom: '.productDetailGalleryHolder .thumbnails',
                        controls : false,
                        slideSelector : '.productDetailGalleryHolder .slide',
                        adaptiveHeight : true
                    });

                    $('.another-items tr:gt(0)').remove();

                    $('.productDetailGalleryHolder').data('enabled', true);
                    initCustomForms();
                }

                resetProductDetail();
            }, 40);
        }

    }
}
/*======================end product detail =============================*/

/*======================shopping cart =============================*/
function initResetShoppingCart()
{
    var condition = $('#catCartDetails').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            resetShopingCart();
        }
    }

    function resetShopingCart()
    {
        setTimeout(function()
        {
            if(jQuery('#catCartDetails .shopping-table').data('enabled') != true)
            {
                initCustomForms();
                if($('.shippingCalc').length)
                {
                    var _attr1 = $('.shippingCalc').find('input').attr('onclick');
                    $('.shippingCalc').find('input').attr('onclick','');
                    $('.shippingCalc').find('input').attr('onchange',_attr1);
                }
                $('#catCartDetails .shopping-table').data('enabled', true);
            }

            resetShopingCart();
        }, 40);
    }
}

function initResetProductDetail()
{
    var condition = $('.productList.productLarge').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            resetProductDetail();
        }
    }

    function resetProductDetail()
    {
        setTimeout(function()
        {
            if($('.productSubmitInput').data('enabled') != true)
            {
                initCustomForms();
                $('.productSubmitInput').data('enabled', true);
            }

            resetProductDetail();
        }, 40);
    }
}
/*======================end shopping cart =============================*/

/*======================multi step shopping cart =============================*/
function initMultiStepShoppingCart()
{
    var condition = $('.shoppingCartMultiStepHolder').size()
        // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            $('.goNext2Step').click(function()
            {
                if($('#check-shipping').prop('checked'))
                {
                    $('#BillingAddress').val($('#ShippingAddress').val());
                    $('#BillingCity').val($('#ShippingCity').val());
                    $('#BillingState').val($('#ShippingState').val());
                    $('#BillingZip').val($('#ShippingZip').val());
                    $('#BillingCountry').val($('#ShippingCountry').val());
                }

                if(step1Validation())
                {
                    $('.goBack1Step').hide();
                    $('.goNext2Step').hide();
                    $('.section-2').hide();
                    $('.goBack2Step').fadeIn();
                    $('.payBtn').fadeIn();
                    $('.section-3').fadeIn();
                    $('[data-step="2"]').removeClass('current');
                    $('[data-step="3"]').addClass('current');
                    $('body,html').animate({
                        scrollTop:0
                    }, 100);
                }

                return false;
            });

            $('.goBack2Step').click(function()
            {
                $('.goBack2Step').hide();
                $('.payBtn').hide();
                $('.section-3').hide();
                $('.goBack1Step').fadeIn();
                $('.goNext2Step').fadeIn();
                $('.section-2').fadeIn();
                $('[data-step="2"]').addClass('current');
                $('[data-step="3"]').removeClass('current');
                $('body,html').animate({
                    scrollTop:0
                }, 100);

                return false;
            });

            $('.payBtn').click(function()
            {
                $('#catwebformform42059').submit();

                return false;
            });
        }
    }

    function step1Validation()
    {
        var why = '';
        var theForm = document.getElementById('catwebformform42059');
        var validationTrigger = '';

        if (theForm.FirstName)
        {
            why += isEmpty(theForm.FirstName.value, "First Name");
            validationTrigger = isEmpty(theForm.FirstName.value, "First Name");

            if(validationTrigger != '')
            {
                $(theForm.FirstName).addClass('error');
                validationTrigger = '';
            }
        }
        if (theForm.LastName)
        {
            why += isEmpty(theForm.LastName.value, "Last Name");
            validationTrigger = isEmpty(theForm.LastName.value, "First Name");

            if(validationTrigger != '')
            {
                $(theForm.LastName).addClass('error');
                validationTrigger = '';
            }
        }
        if (theForm.EmailAddress)
        {
            why += checkEmail(theForm.EmailAddress.value);
            validationTrigger = checkEmail(theForm.EmailAddress.value);

            if(validationTrigger != '')
            {
                $(theForm.EmailAddress).addClass('error');
                validationTrigger = '';
            }
        }
        if (theForm.WorkPhone)
        {
            why += isEmpty(theForm.WorkPhone.value, "Phone number");
            validationTrigger = isEmpty(theForm.WorkPhone.value, "Phone number");

            if(validationTrigger != '')
            {
                $(theForm.WorkPhone).addClass('error');
                validationTrigger = '';
            }
        }

        if (theForm.ShippingAddress)
        {
            why += isEmpty(theForm.ShippingAddress.value, "Shipping Address");
            validationTrigger = isEmpty(theForm.ShippingAddress.value, "Phone number");

            if(validationTrigger != '')
            {
                $(theForm.ShippingAddress).addClass('error');
                validationTrigger = '';
            }
        }
        if (theForm.ShippingCity)
        {
            why += isEmpty(theForm.ShippingCity.value, "Shipping City");
            validationTrigger = isEmpty(theForm.ShippingCity.value, "Phone number");

            if(validationTrigger != '')
            {
                $(theForm.ShippingCity).addClass('error');
                validationTrigger = '';
            }
        }
        if (theForm.ShippingState)
        {
            why += isEmpty(theForm.ShippingState.value, "Shipping State");
            validationTrigger = isEmpty(theForm.ShippingState.value, "Phone number");

            if(validationTrigger != '')
            {
                $(theForm.ShippingState).addClass('error');
                validationTrigger = '';
            }
        }
        if (theForm.ShippingZip)
        {
            why += isEmpty(theForm.ShippingZip.value, "Shipping Zip");
            validationTrigger = isEmpty(theForm.ShippingZip.value, "Phone number");

            if(validationTrigger != '')
            {
                $(theForm.ShippingZip).addClass('error');
                validationTrigger = '';
            }
        }
        if (theForm.ShippingCountry)
        {
            why += checkDropdown(theForm.ShippingCountry.value, "Shipping Country");
            validationTrigger = checkDropdown(theForm.ShippingCountry.value, "Shipping Country");

            if(validationTrigger != '')
            {
                $(theForm.ShippingCountry).addClass('error');
                validationTrigger = '';
            }
        }

        if (theForm.BillingAddress)
        {
            why += isEmpty(theForm.BillingAddress.value, "Billing Address");
            validationTrigger = isEmpty(theForm.BillingAddress.value, "Billing Address");

            if(validationTrigger != '')
            {
                $(theForm.BillingAddress).addClass('error');
                validationTrigger = '';
            }
        }
        if (theForm.BillingCity)
        {
            why += isEmpty(theForm.BillingCity.value, "Billing City");
            validationTrigger = isEmpty(theForm.BillingCity.value, "Billing Address");

            if(validationTrigger != '')
            {
                $(theForm.BillingCity).addClass('error');
                validationTrigger = '';
            }
        }
        if (theForm.BillingState)
        {
            why += isEmpty(theForm.BillingState.value, "Billing State");
            validationTrigger = isEmpty(theForm.BillingState.value, "Billing Address");

            if(validationTrigger != '')
            {
                $(theForm.BillingState).addClass('error');
                validationTrigger = '';
            }
        }
        if (theForm.BillingZip)
        {
            why += isEmpty(theForm.BillingZip.value, "Billing Zip");
            validationTrigger = isEmpty(theForm.BillingZip.value, "Billing Address");

            if(validationTrigger != '')
            {
                $(theForm.BillingZip).addClass('error');
                validationTrigger = '';
            }
        }
        if (theForm.BillingCountry)
        {
            why += checkDropdown(theForm.BillingCountry.value, "Billing Country");
            validationTrigger = checkDropdown(theForm.BillingCountry.value, "Billing Country");

            if(validationTrigger != '')
            {
                $(theForm.BillingCountry).addClass('error');
                validationTrigger = '';
            }
        }

        if (why != "") {
            //alert(why);
            return false;
        }
        else
        {
            return true;
        }
    }
}
/*======================end multi step shopping cart =============================*/
/*style guide*/
function initCopyCode() {
    var condition = $('.codeHolder').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            var clipboard = new Clipboard('.codeHolder .copy-text', {
                text: function (trigger) {

                    var __text = $(trigger).closest('.codeHolder').find('code').text();

                    return __text;
                }
            });
        }
    }
}
/*end style guide*/

/*=========================================== ENDREGION: functions =============================================================*/

/*=========================================== REGION: PLUGINS DECLARATION ======================================================*/
/*=========================================== General ======================================================*/
/**
 * jQuery-viewport-checker - v1.8.8 - 2017-09-25
 * https://github.com/dirkgroenen/jQuery-viewport-checker
 *
 * Copyright (c) 2017 Dirk Groenen
 * Licensed MIT <https://github.com/dirkgroenen/jQuery-viewport-checker/blob/master/LICENSE>
 */

!function(a){a.fn.viewportChecker=function(b){var c={classToAdd:"visible",classToRemove:"invisible",classToAddForFullView:"full-visible",removeClassAfterAnimation:!1,offset:100,repeat:!1,invertBottomOffset:!0,callbackFunction:function(a,b){},scrollHorizontal:!1,scrollBox:window};a.extend(c,b);var d=this,e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()};return this.checkElements=function(){var b,f;c.scrollHorizontal?(b=Math.max(a("html").scrollLeft(),a("body").scrollLeft(),a(window).scrollLeft()),f=b+e.width):(b=Math.max(a("html").scrollTop(),a("body").scrollTop(),a(window).scrollTop()),f=b+e.height),d.each(function(){var d=a(this),g={},h={};if(d.data("vp-add-class")&&(h.classToAdd=d.data("vp-add-class")),d.data("vp-remove-class")&&(h.classToRemove=d.data("vp-remove-class")),d.data("vp-add-class-full-view")&&(h.classToAddForFullView=d.data("vp-add-class-full-view")),d.data("vp-keep-add-class")&&(h.removeClassAfterAnimation=d.data("vp-remove-after-animation")),d.data("vp-offset")&&(h.offset=d.data("vp-offset")),d.data("vp-repeat")&&(h.repeat=d.data("vp-repeat")),d.data("vp-scrollHorizontal")&&(h.scrollHorizontal=d.data("vp-scrollHorizontal")),d.data("vp-invertBottomOffset")&&(h.scrollHorizontal=d.data("vp-invertBottomOffset")),a.extend(g,c),a.extend(g,h),!d.data("vp-animated")||g.repeat){String(g.offset).indexOf("%")>0&&(g.offset=parseInt(g.offset)/100*e.height);var i=g.scrollHorizontal?d.offset().left:d.offset().top,j=g.scrollHorizontal?i+d.width():i+d.height(),k=Math.round(i)+g.offset,l=g.scrollHorizontal?k+d.width():k+d.height();g.invertBottomOffset&&(l-=2*g.offset),k<f&&l>b?(d.removeClass(g.classToRemove),d.addClass(g.classToAdd),g.callbackFunction(d,"add"),j<=f&&i>=b?d.addClass(g.classToAddForFullView):d.removeClass(g.classToAddForFullView),d.data("vp-animated",!0),g.removeClassAfterAnimation&&d.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){d.removeClass(g.classToAdd)})):d.hasClass(g.classToAdd)&&g.repeat&&(d.removeClass(g.classToAdd+" "+g.classToAddForFullView),g.callbackFunction(d,"remove"),d.data("vp-animated",!1))}})},("ontouchstart"in window||"onmsgesturechange"in window)&&a(document).bind("touchmove MSPointerMove pointermove",this.checkElements),a(c.scrollBox).bind("load scroll",this.checkElements),a(window).resize(function(b){e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()},d.checkElements()}),this.checkElements(),this}}(jQuery);
//# sourceMappingURL=jquery.viewportchecker.min.js.map
function DivLoadSequence(t,r){var a=$(t);a.sort(SortByName),$(a).each(function(t){var e=$(this);$(a).length,setTimeout(function(t){e.addClass(r)},200*t)})}function SortByName(t,r){var a=parseInt($(t).attr("displayorder")),e=parseInt($(r).attr("displayorder"));return a<e?-1:a>e?1:0}
// ==================================================
/*
 * Simple Mobile Navigation
 */
;(function($) {
    function MobileNav(options) {
        this.options = $.extend({
            container: null,
            hideOnClickOutside: false,
            menuActiveClass: 'nav-active',
            menuOpener: '.nav-opener',
            menuDrop: '.nav-drop',
            toggleEvent: 'click',
            outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
        }, options);
        this.initStructure();
        this.attachEvents();
    }
    MobileNav.prototype = {
        initStructure: function() {
            this.page = $('html');
            this.container = $(this.options.container);
            this.opener = this.container.find(this.options.menuOpener);
            this.drop = this.container.find(this.options.menuDrop);
        },
        attachEvents: function() {
            var self = this;

            if(activateResizeHandler) {
                activateResizeHandler();
                activateResizeHandler = null;
            }

            this.outsideClickHandler = function(e) {
                if(self.isOpened()) {
                    var target = $(e.target);
                    if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
                        self.hide();
                    }
                }
            };

            this.openerClickHandler = function(e) {
                e.preventDefault();
                self.toggle();
            };

            this.opener.on(this.options.toggleEvent, this.openerClickHandler);
        },
        isOpened: function() {
            return this.container.hasClass(this.options.menuActiveClass);
        },
        show: function() {
            this.container.addClass(this.options.menuActiveClass);
            if(this.options.hideOnClickOutside) {
                this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
            }
        },
        hide: function() {
            this.container.removeClass(this.options.menuActiveClass);
            if(this.options.hideOnClickOutside) {
                this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
            }
        },
        toggle: function() {
            if(this.isOpened()) {
                this.hide();
            } else {
                this.show();
            }
        },
        destroy: function() {
            this.container.removeClass(this.options.menuActiveClass);
            this.opener.off(this.options.toggleEvent, this.clickHandler);
            this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
        }
    };

    var activateResizeHandler = function() {
        var win = $(window),
            doc = $('html'),
            resizeClass = 'resize-active',
            flag, timer;
        var removeClassHandler = function() {
            flag = false;
            doc.removeClass(resizeClass);
        };
        var resizeHandler = function() {
            if(!flag) {
                flag = true;
                doc.addClass(resizeClass);
            }
            clearTimeout(timer);
            timer = setTimeout(removeClassHandler, 500);
        };
        win.on('resize orientationchange', resizeHandler);
    };

    $.fn.mobileNav = function(options) {
        return this.each(function() {
            var params = $.extend({}, options, {container: this}),
                instance = new MobileNav(params);
            $.data(this, 'MobileNav', instance);
        });
    };
}(jQuery));

// navigation accesibility module
function TouchNav(opt) {
    this.options = {
        hoverClass: 'hover',
        menuItems: 'li',
        menuOpener: 'a',
        menuDrop: 'ul',
        navBlock: null
    };
    for(var p in opt) {
        if(opt.hasOwnProperty(p)) {
            this.options[p] = opt[p];
        }
    }
    this.init();
}
TouchNav.isActiveOn = function(elem) {
    return elem && elem.touchNavActive;
};
TouchNav.prototype = {
    init: function() {
        if(typeof this.options.navBlock === 'string') {
            this.menu = document.getElementById(this.options.navBlock);
        } else if(typeof this.options.navBlock === 'object') {
            this.menu = this.options.navBlock;
        }
        if(this.menu) {
            this.addEvents();
        }
    },
    addEvents: function() {
        // attach event handlers
        var self = this;
        var touchEvent = (navigator.pointerEnabled && 'pointerdown') || (navigator.msPointerEnabled && 'MSPointerDown') || (this.isTouchDevice && 'touchstart');
        this.menuItems = lib.queryElementsBySelector(this.options.menuItems, this.menu);

        var initMenuItem = function(item) {
            var currentDrop = lib.queryElementsBySelector(self.options.menuDrop, item)[0],
                currentOpener = lib.queryElementsBySelector(self.options.menuOpener, item)[0];

            // only for touch input devices
            if( currentDrop && currentOpener && (self.isTouchDevice || self.isPointerDevice) ) {
                lib.event.add(currentOpener, 'click', lib.bind(self.clickHandler, self));
                lib.event.add(currentOpener, 'mousedown', lib.bind(self.mousedownHandler, self));
                lib.event.add(currentOpener, touchEvent, function(e){
                    if( !self.isTouchPointerEvent(e) ) {
                        self.preventCurrentClick = false;
                        return;
                    }
                    self.touchFlag = true;
                    self.currentItem = item;
                    self.currentLink = currentOpener;
                    self.pressHandler.apply(self, arguments);
                });
            }
            // for desktop computers and touch devices
            jQuery(item).bind('mouseenter', function(){
                if(!self.touchFlag) {
                    self.currentItem = item;
                    self.mouseoverHandler();
                }
            });
            jQuery(item).bind('mouseleave', function(){
                if(!self.touchFlag) {
                    self.currentItem = item;
                    self.mouseoutHandler();
                }
            });
            item.touchNavActive = true;
        };

        // addd handlers for all menu items
        for(var i = 0; i < this.menuItems.length; i++) {
            initMenuItem(self.menuItems[i]);
        }

        // hide dropdowns when clicking outside navigation
        if(this.isTouchDevice || this.isPointerDevice) {
            lib.event.add(document.documentElement, 'mousedown', lib.bind(this.clickOutsideHandler, this));
            lib.event.add(document.documentElement, touchEvent, lib.bind(this.clickOutsideHandler, this));
        }
    },
    mousedownHandler: function(e) {
        if(this.touchFlag) {
            e.preventDefault();
            this.touchFlag = false;
            this.preventCurrentClick = false;
        }
    },
    mouseoverHandler: function() {
        lib.addClass(this.currentItem, this.options.hoverClass);
        jQuery(this.currentItem).trigger('itemhover');
    },
    mouseoutHandler: function() {
        lib.removeClass(this.currentItem, this.options.hoverClass);
        jQuery(this.currentItem).trigger('itemleave');
    },
    hideActiveDropdown: function() {
        for(var i = 0; i < this.menuItems.length; i++) {
            if(lib.hasClass(this.menuItems[i], this.options.hoverClass)) {
                lib.removeClass(this.menuItems[i], this.options.hoverClass);
                jQuery(this.menuItems[i]).trigger('itemleave');
            }
        }
        this.activeParent = null;
    },
    pressHandler: function(e) {
        // hide previous drop (if active)
        if(this.currentItem !== this.activeParent) {
            if(this.activeParent && this.currentItem.parentNode === this.activeParent.parentNode) {
                lib.removeClass(this.activeParent, this.options.hoverClass);
            } else if(!this.isParent(this.activeParent, this.currentLink)) {
                this.hideActiveDropdown();
            }
        }
        // handle current drop
        this.activeParent = this.currentItem;
        if(lib.hasClass(this.currentItem, this.options.hoverClass)) {
            this.preventCurrentClick = false;
        } else {
            e.preventDefault();
            this.preventCurrentClick = true;
            lib.addClass(this.currentItem, this.options.hoverClass);
            jQuery(this.currentItem).trigger('itemhover');
        }
    },
    clickHandler: function(e) {
        // prevent first click on link
        if(this.preventCurrentClick) {
            e.preventDefault();
        }
    },
    clickOutsideHandler: function(event) {
        var e = event.changedTouches ? event.changedTouches[0] : event;
        if(this.activeParent && !this.isParent(this.menu, e.target)) {
            this.hideActiveDropdown();
            this.touchFlag = false;
        }
    },
    isParent: function(parent, child) {
        while(child.parentNode) {
            if(child.parentNode == parent) {
                return true;
            }
            child = child.parentNode;
        }
        return false;
    },
    isTouchPointerEvent: function(e) {
        return (e.type.indexOf('touch') > -1) ||
            (navigator.pointerEnabled && e.pointerType === 'touch') ||
            (navigator.msPointerEnabled && e.pointerType == e.MSPOINTER_TYPE_TOUCH);
    },
    isPointerDevice: (function() {
        return !!(navigator.pointerEnabled || navigator.msPointerEnabled);
    }()),
    isTouchDevice: (function() {
        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    }())
};


/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
;(function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.jcf = factory(jQuery);
    }
}(this, function($) {
    'use strict';

    // define version
    var version = '1.2.3';

    // private variables
    var customInstances = [];

    // default global options
    var commonOptions = {
        optionsKey: 'jcf',
        dataKey: 'jcf-instance',
        rtlClass: 'jcf-rtl',
        focusClass: 'jcf-focus',
        pressedClass: 'jcf-pressed',
        disabledClass: 'jcf-disabled',
        hiddenClass: 'jcf-hidden',
        resetAppearanceClass: 'jcf-reset-appearance',
        unselectableClass: 'jcf-unselectable'
    };

    // detect device type
    var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
        isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
    commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

    // create global stylesheet if custom forms are used
    var createStyleSheet = function() {
        var styleTag = $('<style>').appendTo('head'),
            styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

        // crossbrowser style handling
        var addCSSRule = function(selector, rules, index) {
            index = index || 0;
            if (styleSheet.insertRule) {
                styleSheet.insertRule(selector + '{' + rules + '}', index);
            } else {
                styleSheet.addRule(selector, rules, index);
            }
        };

        // add special rules
        addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
        addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
        addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
        addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

        // detect rtl pages
        var html = $('html'), body = $('body');
        if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
            html.addClass(commonOptions.rtlClass);
        }

        // handle form reset event
        html.on('reset', function() {
            setTimeout(function() {
                api.refreshAll();
            }, 0);
        });

        // mark stylesheet as created
        commonOptions.styleSheetCreated = true;
    };

    // simplified pointer events handler
    (function() {
        var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
            touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
            eventList, eventMap = {}, eventPrefix = 'jcf-';

        // detect events to attach
        if (pointerEventsSupported) {
            eventList = {
                pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
                pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
                pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
                pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
            };
        } else {
            eventList = {
                pointerover: 'mouseover',
                pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
                pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
                pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
            };
        }

        // create event map
        $.each(eventList, function(targetEventName, fakeEventList) {
            $.each(fakeEventList.split(' '), function(index, fakeEventName) {
                eventMap[fakeEventName] = targetEventName;
            });
        });

        // jQuery event hooks
        $.each(eventList, function(eventName, eventHandlers) {
            eventHandlers = eventHandlers.split(' ');
            $.event.special[eventPrefix + eventName] = {
                setup: function() {
                    var self = this;
                    $.each(eventHandlers, function(index, fallbackEvent) {
                        if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
                        else self['on' + fallbackEvent] = fixEvent;
                    });
                },
                teardown: function() {
                    var self = this;
                    $.each(eventHandlers, function(index, fallbackEvent) {
                        if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
                        else self['on' + fallbackEvent] = null;
                    });
                }
            };
        });

        // check that mouse event are not simulated by mobile browsers
        var lastTouch = null;
        var mouseEventSimulated = function(e) {
            var dx = Math.abs(e.pageX - lastTouch.x),
                dy = Math.abs(e.pageY - lastTouch.y),
                rangeDistance = 25;

            if (dx <= rangeDistance && dy <= rangeDistance) {
                return true;
            }
        };

        // normalize event
        var fixEvent = function(e) {
            var origEvent = e || window.event,
                touchEventData = null,
                targetEventName = eventMap[origEvent.type];

            e = $.event.fix(origEvent);
            e.type = eventPrefix + targetEventName;

            if (origEvent.pointerType) {
                switch (origEvent.pointerType) {
                    case 2: e.pointerType = 'touch'; break;
                    case 3: e.pointerType = 'pen'; break;
                    case 4: e.pointerType = 'mouse'; break;
                    default: e.pointerType = origEvent.pointerType;
                }
            } else {
                e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
            }

            if (!e.pageX && !e.pageY) {
                touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
                e.pageX = touchEventData.pageX;
                e.pageY = touchEventData.pageY;
            }

            if (origEvent.type === 'touchend') {
                lastTouch = { x: e.pageX, y: e.pageY };
            }
            if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
                return;
            } else {
                return ($.event.dispatch || $.event.handle).call(this, e);
            }
        };
    }());

    // custom mousewheel/trackpad handler
    (function() {
        var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
            shimEventName = 'jcf-mousewheel';

        $.event.special[shimEventName] = {
            setup: function() {
                var self = this;
                $.each(wheelEvents, function(index, fallbackEvent) {
                    if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
                    else self['on' + fallbackEvent] = fixEvent;
                });
            },
            teardown: function() {
                var self = this;
                $.each(wheelEvents, function(index, fallbackEvent) {
                    if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
                    else self['on' + fallbackEvent] = null;
                });
            }
        };

        var fixEvent = function(e) {
            var origEvent = e || window.event;
            e = $.event.fix(origEvent);
            e.type = shimEventName;

            // old wheel events handler
            if ('detail'      in origEvent) { e.deltaY = -origEvent.detail;      }
            if ('wheelDelta'  in origEvent) { e.deltaY = -origEvent.wheelDelta;  }
            if ('wheelDeltaY' in origEvent) { e.deltaY = -origEvent.wheelDeltaY; }
            if ('wheelDeltaX' in origEvent) { e.deltaX = -origEvent.wheelDeltaX; }

            // modern wheel event handler
            if ('deltaY' in origEvent) {
                e.deltaY = origEvent.deltaY;
            }
            if ('deltaX' in origEvent) {
                e.deltaX = origEvent.deltaX;
            }

            // handle deltaMode for mouse wheel
            e.delta = e.deltaY || e.deltaX;
            if (origEvent.deltaMode === 1) {
                var lineHeight = 16;
                e.delta *= lineHeight;
                e.deltaY *= lineHeight;
                e.deltaX *= lineHeight;
            }

            return ($.event.dispatch || $.event.handle).call(this, e);
        };
    }());

    // extra module methods
    var moduleMixin = {
        // provide function for firing native events
        fireNativeEvent: function(elements, eventName) {
            $(elements).each(function() {
                var element = this, eventObject;
                if (element.dispatchEvent) {
                    eventObject = document.createEvent('HTMLEvents');
                    eventObject.initEvent(eventName, true, true);
                    element.dispatchEvent(eventObject);
                } else if (document.createEventObject) {
                    eventObject = document.createEventObject();
                    eventObject.target = element;
                    element.fireEvent('on' + eventName, eventObject);
                }
            });
        },
        // bind event handlers for module instance (functions beggining with "on")
        bindHandlers: function() {
            var self = this;
            $.each(self, function(propName, propValue) {
                if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
                    // dont use $.proxy here because it doesn't create unique handler
                    self[propName] = function() {
                        return propValue.apply(self, arguments);
                    };
                }
            });
        }
    };

    // public API
    var api = {
        version: version,
        modules: {},
        getOptions: function() {
            return $.extend({}, commonOptions);
        },
        setOptions: function(moduleName, moduleOptions) {
            if (arguments.length > 1) {
                // set module options
                if (this.modules[moduleName]) {
                    $.extend(this.modules[moduleName].prototype.options, moduleOptions);
                }
            } else {
                // set common options
                $.extend(commonOptions, moduleName);
            }
        },
        addModule: function(proto) {
            // proto is factory function
            if ($.isFunction(proto)) {
                proto = proto($, window);
            }

            // add module to list
            var Module = function(options) {
                // save instance to collection
                if (!options.element.data(commonOptions.dataKey)) {
                    options.element.data(commonOptions.dataKey, this);
                }
                customInstances.push(this);

                // save options
                this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

                // bind event handlers to instance
                this.bindHandlers();

                // call constructor
                this.init.apply(this, arguments);
            };

            // parse options from HTML attribute
            var getInlineOptions = function(element) {
                var dataOptions = element.data(commonOptions.optionsKey),
                    attrOptions = element.attr(commonOptions.optionsKey);

                if (dataOptions) {
                    return dataOptions;
                } else if (attrOptions) {
                    try {
                        return $.parseJSON(attrOptions);
                    } catch (e) {
                        // ignore invalid attributes
                    }
                }
            };

            // set proto as prototype for new module
            Module.prototype = proto;

            // add mixin methods to module proto
            $.extend(proto, moduleMixin);
            if (proto.plugins) {
                $.each(proto.plugins, function(pluginName, plugin) {
                    $.extend(plugin.prototype, moduleMixin);
                });
            }

            // override destroy method
            var originalDestroy = Module.prototype.destroy;
            Module.prototype.destroy = function() {
                this.options.element.removeData(this.options.dataKey);

                for (var i = customInstances.length - 1; i >= 0; i--) {
                    if (customInstances[i] === this) {
                        customInstances.splice(i, 1);
                        break;
                    }
                }

                if (originalDestroy) {
                    originalDestroy.apply(this, arguments);
                }
            };

            // save module to list
            this.modules[proto.name] = Module;
        },
        getInstance: function(element) {
            return $(element).data(commonOptions.dataKey);
        },
        replace: function(elements, moduleName, customOptions) {
            var self = this,
                instance;

            if (!commonOptions.styleSheetCreated) {
                createStyleSheet();
            }

            $(elements).each(function() {
                var moduleOptions,
                    element = $(this);

                instance = element.data(commonOptions.dataKey);
                if (instance) {
                    instance.refresh();
                } else {
                    if (!moduleName) {
                        $.each(self.modules, function(currentModuleName, module) {
                            if (module.prototype.matchElement.call(module.prototype, element)) {
                                moduleName = currentModuleName;
                                return false;
                            }
                        });
                    }
                    if (moduleName) {
                        moduleOptions = $.extend({ element: element }, customOptions);
                        instance = new self.modules[moduleName](moduleOptions);
                    }
                }
            });
            return instance;
        },
        refresh: function(elements) {
            $(elements).each(function() {
                var instance = $(this).data(commonOptions.dataKey);
                if (instance) {
                    instance.refresh();
                }
            });
        },
        destroy: function(elements) {
            $(elements).each(function() {
                var instance = $(this).data(commonOptions.dataKey);
                if (instance) {
                    instance.destroy();
                }
            });
        },
        replaceAll: function(context) {
            var self = this;
            $.each(this.modules, function(moduleName, module) {
                $(module.prototype.selector, context).each(function() {
                    if (this.className.indexOf('jcf-ignore') < 0) {
                        self.replace(this, moduleName);
                    }
                });
            });
        },
        refreshAll: function(context) {
            if (context) {
                $.each(this.modules, function(moduleName, module) {
                    $(module.prototype.selector, context).each(function() {
                        var instance = $(this).data(commonOptions.dataKey);
                        if (instance) {
                            instance.refresh();
                        }
                    });
                });
            } else {
                for (var i = customInstances.length - 1; i >= 0; i--) {
                    customInstances[i].refresh();
                }
            }
        },
        destroyAll: function(context) {
            if (context) {
                $.each(this.modules, function(moduleName, module) {
                    $(module.prototype.selector, context).each(function(index, element) {
                        var instance = $(element).data(commonOptions.dataKey);
                        if (instance) {
                            instance.destroy();
                        }
                    });
                });
            } else {
                while (customInstances.length) {
                    customInstances[0].destroy();
                }
            }
        }
    };

    // we need to make JCF available globally if we're in AMD environment
    if (typeof define === 'function' && define.amd) {
        window.jcf = api;
    }

    return api;
}));
/*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
(function(jcf) {

    jcf.addModule(function($, window) {
        'use strict';

        var module = {
            name: 'Select',
            selector: 'select',
            options: {
                element: null,
                multipleCompactStyle: false
            },
            plugins: {
                ListBox: ListBox,
                ComboBox: ComboBox,
                SelectList: SelectList
            },
            matchElement: function(element) {
                return element.is('select');
            },
            init: function() {
                this.element = $(this.options.element);
                this.createInstance();
            },
            isListBox: function() {
                return this.element.is('[size]:not([jcf-size]), [multiple]');
            },
            createInstance: function() {
                if (this.instance) {
                    this.instance.destroy();
                }
                if (this.isListBox() && !this.options.multipleCompactStyle) {
                    this.instance = new ListBox(this.options);
                } else {
                    this.instance = new ComboBox(this.options);
                }
            },
            refresh: function() {
                var typeMismatch = (this.isListBox() && this.instance instanceof ComboBox) ||
                    (!this.isListBox() && this.instance instanceof ListBox);

                if (typeMismatch) {
                    this.createInstance();
                } else {
                    this.instance.refresh();
                }
            },
            destroy: function() {
                this.instance.destroy();
            }
        };

        // combobox module
        function ComboBox(options) {
            this.options = $.extend({
                wrapNative: true,
                wrapNativeOnMobile: true,
                fakeDropInBody: true,
                useCustomScroll: true,
                flipDropToFit: true,
                maxVisibleItems: 6,
                fakeAreaStructure: '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
                fakeDropStructure: '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
                optionClassPrefix: 'jcf-option-',
                selectClassPrefix: 'jcf-select-',
                dropContentSelector: '.jcf-select-drop-content',
                selectTextSelector: '.jcf-select-text',
                dropActiveClass: 'jcf-drop-active',
                flipDropClass: 'jcf-drop-flipped'
            }, options);
            this.init();
        }
        $.extend(ComboBox.prototype, {
            init: function() {
                this.initStructure();
                this.bindHandlers();
                this.attachEvents();
                this.refresh();
            },
            initStructure: function() {
                // prepare structure
                this.win = $(window);
                this.doc = $(document);
                this.realElement = $(this.options.element);
                this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(this.realElement);
                this.selectTextContainer = this.fakeElement.find(this.options.selectTextSelector);
                this.selectText = $('<span></span>').appendTo(this.selectTextContainer);
                makeUnselectable(this.fakeElement);

                // copy classes from original select
                this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));

                // handle compact multiple style
                if (this.realElement.prop('multiple')) {
                    this.fakeElement.addClass('jcf-compact-multiple');
                }

                // detect device type and dropdown behavior
                if (this.options.isMobileDevice && this.options.wrapNativeOnMobile && !this.options.wrapNative) {
                    this.options.wrapNative = true;
                }

                if (this.options.wrapNative) {
                    // wrap native select inside fake block
                    this.realElement.prependTo(this.fakeElement).css({
                        position: 'absolute',
                        height: '100%',
                        width: '100%'
                    }).addClass(this.options.resetAppearanceClass);
                } else {
                    // just hide native select
                    this.realElement.addClass(this.options.hiddenClass);
                    this.fakeElement.attr('title', this.realElement.attr('title'));
                    this.fakeDropTarget = this.options.fakeDropInBody ? $('body') : this.fakeElement;
                }
            },
            attachEvents: function() {
                // delayed refresh handler
                var self = this;
                this.delayedRefresh = function() {
                    setTimeout(function() {
                        self.refresh();
                        if (self.list) {
                            self.list.refresh();
                            self.list.scrollToActiveOption();
                        }
                    }, 1);
                };

                // native dropdown event handlers
                if (this.options.wrapNative) {
                    this.realElement.on({
                        focus: this.onFocus,
                        change: this.onChange,
                        click: this.onChange,
                        keydown: this.delayedRefresh
                    });
                } else {
                    // custom dropdown event handlers
                    this.realElement.on({
                        focus: this.onFocus,
                        change: this.onChange,
                        keydown: this.onKeyDown
                    });
                    this.fakeElement.on({
                        'jcf-pointerdown': this.onSelectAreaPress
                    });
                }
            },
            onKeyDown: function(e) {
                if (e.which === 13) {
                    this.toggleDropdown();
                } else if (this.dropActive) {
                    this.delayedRefresh();
                }
            },
            onChange: function() {
                this.refresh();
            },
            onFocus: function() {
                if (!this.pressedFlag || !this.focusedFlag) {
                    this.fakeElement.addClass(this.options.focusClass);
                    this.realElement.on('blur', this.onBlur);
                    this.toggleListMode(true);
                    this.focusedFlag = true;
                }
            },
            onBlur: function() {
                if (!this.pressedFlag) {
                    this.fakeElement.removeClass(this.options.focusClass);
                    this.realElement.off('blur', this.onBlur);
                    this.toggleListMode(false);
                    this.focusedFlag = false;
                }
            },
            onResize: function() {
                if (this.dropActive) {
                    this.hideDropdown();
                }
            },
            onSelectDropPress: function() {
                this.pressedFlag = true;
            },
            onSelectDropRelease: function(e, pointerEvent) {
                this.pressedFlag = false;
                if (pointerEvent.pointerType === 'mouse') {
                    this.realElement.focus();
                }
            },
            onSelectAreaPress: function(e) {
                // skip click if drop inside fake element or real select is disabled
                var dropClickedInsideFakeElement = !this.options.fakeDropInBody && $(e.target).closest(this.dropdown).length;
                if (dropClickedInsideFakeElement || e.button > 1 || this.realElement.is(':disabled')) {
                    return;
                }

                // toggle dropdown visibility
                this.selectOpenedByEvent = e.pointerType;
                this.toggleDropdown();

                // misc handlers
                if (!this.focusedFlag) {
                    if (e.pointerType === 'mouse') {
                        this.realElement.focus();
                    } else {
                        this.onFocus(e);
                    }
                }
                this.pressedFlag = true;
                this.fakeElement.addClass(this.options.pressedClass);
                this.doc.on('jcf-pointerup', this.onSelectAreaRelease);
            },
            onSelectAreaRelease: function(e) {
                if (this.focusedFlag && e.pointerType === 'mouse') {
                    this.realElement.focus();
                }
                this.pressedFlag = false;
                this.fakeElement.removeClass(this.options.pressedClass);
                this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
            },
            onOutsideClick: function(e) {
                var target = $(e.target),
                    clickedInsideSelect = target.closest(this.fakeElement).length || target.closest(this.dropdown).length;

                if (!clickedInsideSelect) {
                    this.hideDropdown();
                }
            },
            onSelect: function() {
                this.refresh();

                if (this.realElement.prop('multiple')) {
                    this.repositionDropdown();
                } else {
                    this.hideDropdown();
                }

                this.fireNativeEvent(this.realElement, 'change');
            },
            toggleListMode: function(state) {
                if (!this.options.wrapNative) {
                    if (state) {
                        // temporary change select to list to avoid appearing of native dropdown
                        this.realElement.attr({
                            size: 4,
                            'jcf-size': ''
                        });
                    } else {
                        // restore select from list mode to dropdown select
                        if (!this.options.wrapNative) {
                            this.realElement.removeAttr('size jcf-size');
                        }
                    }
                }
            },
            createDropdown: function() {
                // destroy previous dropdown if needed
                if (this.dropdown) {
                    this.list.destroy();
                    this.dropdown.remove();
                }

                // create new drop container
                this.dropdown = $(this.options.fakeDropStructure).appendTo(this.fakeDropTarget);
                this.dropdown.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
                makeUnselectable(this.dropdown);

                // handle compact multiple style
                if (this.realElement.prop('multiple')) {
                    this.dropdown.addClass('jcf-compact-multiple');
                }

                // set initial styles for dropdown in body
                if (this.options.fakeDropInBody) {
                    this.dropdown.css({
                        position: 'absolute',
                        top: -9999
                    });
                }

                // create new select list instance
                this.list = new SelectList({
                    useHoverClass: true,
                    handleResize: false,
                    alwaysPreventMouseWheel: true,
                    maxVisibleItems: this.options.maxVisibleItems,
                    useCustomScroll: this.options.useCustomScroll,
                    holder: this.dropdown.find(this.options.dropContentSelector),
                    multipleSelectWithoutKey: this.realElement.prop('multiple'),
                    element: this.realElement
                });
                $(this.list).on({
                    select: this.onSelect,
                    press: this.onSelectDropPress,
                    release: this.onSelectDropRelease
                });
            },
            repositionDropdown: function() {
                var selectOffset = this.fakeElement.offset(),
                    fakeElementBounds = this.fakeElement[0].getBoundingClientRect(),
                    selectWidth = fakeElementBounds.width || fakeElementBounds.right - fakeElementBounds.left,
                    selectHeight = this.fakeElement.outerHeight(),
                    dropHeight = this.dropdown.css('width', selectWidth).outerHeight(),
                    winScrollTop = this.win.scrollTop(),
                    winHeight = this.win.height(),
                    calcTop, calcLeft, bodyOffset, needFlipDrop = false;

                // check flip drop position
                if (selectOffset.top + selectHeight + dropHeight > winScrollTop + winHeight && selectOffset.top - dropHeight > winScrollTop) {
                    needFlipDrop = true;
                }

                if (this.options.fakeDropInBody) {
                    bodyOffset = this.fakeDropTarget.css('position') !== 'static' ? this.fakeDropTarget.offset().top : 0;
                    if (this.options.flipDropToFit && needFlipDrop) {
                        // calculate flipped dropdown position
                        calcLeft = selectOffset.left;
                        calcTop = selectOffset.top - dropHeight - bodyOffset;
                    } else {
                        // calculate default drop position
                        calcLeft = selectOffset.left;
                        calcTop = selectOffset.top + selectHeight - bodyOffset;
                    }

                    // update drop styles
                    this.dropdown.css({
                        width: selectWidth,
                        left: calcLeft,
                        top: calcTop
                    });
                }

                // refresh flipped class
                this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass, this.options.flipDropToFit && needFlipDrop);
            },
            showDropdown: function() {
                // do not show empty custom dropdown
                if (!this.realElement.prop('options').length) {
                    return;
                }

                // create options list if not created
                if (!this.dropdown) {
                    this.createDropdown();
                }

                // show dropdown
                this.dropActive = true;
                this.dropdown.appendTo(this.fakeDropTarget);
                this.fakeElement.addClass(this.options.dropActiveClass);
                this.refreshSelectedText();
                this.repositionDropdown();
                this.list.setScrollTop(this.savedScrollTop);
                this.list.refresh();

                // add temporary event handlers
                this.win.on('resize', this.onResize);
                this.doc.on('jcf-pointerdown', this.onOutsideClick);
            },
            hideDropdown: function() {
                if (this.dropdown) {
                    this.savedScrollTop = this.list.getScrollTop();
                    this.fakeElement.removeClass(this.options.dropActiveClass + ' ' + this.options.flipDropClass);
                    this.dropdown.removeClass(this.options.flipDropClass).detach();
                    this.doc.off('jcf-pointerdown', this.onOutsideClick);
                    this.win.off('resize', this.onResize);
                    this.dropActive = false;
                    if (this.selectOpenedByEvent === 'touch') {
                        this.onBlur();
                    }
                }
            },
            toggleDropdown: function() {
                if (this.dropActive) {
                    this.hideDropdown();
                } else {
                    this.showDropdown();
                }
            },
            refreshSelectedText: function() {
                // redraw selected area
                var selectedIndex = this.realElement.prop('selectedIndex'),
                    selectedOption = this.realElement.prop('options')[selectedIndex],
                    selectedOptionImage = selectedOption ? selectedOption.getAttribute('data-image') : null,
                    selectedOptionText = '',
                    selectedOptionClasses,
                    self = this;

                if (this.realElement.prop('multiple')) {
                    $.each(this.realElement.prop('options'), function(index, option) {
                        if (option.selected) {
                            selectedOptionText += (selectedOptionText ? ', ' : '') + option.innerHTML;
                        }
                    });
                    if (!selectedOptionText) {
                        selectedOptionText = self.realElement.attr('placeholder') || '';
                    }
                    this.selectText.removeAttr('class').html(selectedOptionText);
                } else if (!selectedOption) {
                    if (this.selectImage) {
                        this.selectImage.hide();
                    }
                    this.selectText.removeAttr('class').empty();
                } else if (this.currentSelectedText !== selectedOption.innerHTML || this.currentSelectedImage !== selectedOptionImage) {
                    selectedOptionClasses = getPrefixedClasses(selectedOption.className, this.options.optionClassPrefix);
                    this.selectText.attr('class', selectedOptionClasses).html(selectedOption.innerHTML);

                    if (selectedOptionImage) {
                        if (!this.selectImage) {
                            this.selectImage = $('<img>').prependTo(this.selectTextContainer).hide();
                        }
                        this.selectImage.attr('src', selectedOptionImage).show();
                    } else if (this.selectImage) {
                        this.selectImage.hide();
                    }

                    this.currentSelectedText = selectedOption.innerHTML;
                    this.currentSelectedImage = selectedOptionImage;
                }
            },
            refresh: function() {
                // refresh fake select visibility
                if (this.realElement.prop('style').display === 'none') {
                    this.fakeElement.hide();
                } else {
                    this.fakeElement.show();
                }

                // refresh selected text
                this.refreshSelectedText();

                // handle disabled state
                this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
            },
            destroy: function() {
                // restore structure
                if (this.options.wrapNative) {
                    this.realElement.insertBefore(this.fakeElement).css({
                        position: '',
                        height: '',
                        width: ''
                    }).removeClass(this.options.resetAppearanceClass);
                } else {
                    this.realElement.removeClass(this.options.hiddenClass);
                    if (this.realElement.is('[jcf-size]')) {
                        this.realElement.removeAttr('size jcf-size');
                    }
                }

                // removing element will also remove its event handlers
                this.fakeElement.remove();

                // remove other event handlers
                this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
                this.realElement.off({
                    focus: this.onFocus
                });
            }
        });

        // listbox module
        function ListBox(options) {
            this.options = $.extend({
                wrapNative: true,
                useCustomScroll: true,
                fakeStructure: '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
                selectClassPrefix: 'jcf-select-',
                listHolder: '.jcf-list-wrapper'
            }, options);
            this.init();
        }
        $.extend(ListBox.prototype, {
            init: function() {
                this.bindHandlers();
                this.initStructure();
                this.attachEvents();
            },
            initStructure: function() {
                this.realElement = $(this.options.element);
                this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
                this.listHolder = this.fakeElement.find(this.options.listHolder);
                makeUnselectable(this.fakeElement);

                // copy classes from original select
                this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
                this.realElement.addClass(this.options.hiddenClass);

                this.list = new SelectList({
                    useCustomScroll: this.options.useCustomScroll,
                    holder: this.listHolder,
                    selectOnClick: false,
                    element: this.realElement
                });
            },
            attachEvents: function() {
                // delayed refresh handler
                var self = this;
                this.delayedRefresh = function(e) {
                    if (e && (e.which === 16 || e.ctrlKey || e.metaKey || e.altKey)) {
                        // ignore modifier keys
                        return;
                    } else {
                        clearTimeout(self.refreshTimer);
                        self.refreshTimer = setTimeout(function() {
                            self.refresh();
                            self.list.scrollToActiveOption();
                        }, 1);
                    }
                };

                // other event handlers
                this.realElement.on({
                    focus: this.onFocus,
                    click: this.delayedRefresh,
                    keydown: this.delayedRefresh
                });

                // select list event handlers
                $(this.list).on({
                    select: this.onSelect,
                    press: this.onFakeOptionsPress,
                    release: this.onFakeOptionsRelease
                });
            },
            onFakeOptionsPress: function(e, pointerEvent) {
                this.pressedFlag = true;
                if (pointerEvent.pointerType === 'mouse') {
                    this.realElement.focus();
                }
            },
            onFakeOptionsRelease: function(e, pointerEvent) {
                this.pressedFlag = false;
                if (pointerEvent.pointerType === 'mouse') {
                    this.realElement.focus();
                }
            },
            onSelect: function() {
                this.fireNativeEvent(this.realElement, 'change');
                this.fireNativeEvent(this.realElement, 'click');
            },
            onFocus: function() {
                if (!this.pressedFlag || !this.focusedFlag) {
                    this.fakeElement.addClass(this.options.focusClass);
                    this.realElement.on('blur', this.onBlur);
                    this.focusedFlag = true;
                }
            },
            onBlur: function() {
                if (!this.pressedFlag) {
                    this.fakeElement.removeClass(this.options.focusClass);
                    this.realElement.off('blur', this.onBlur);
                    this.focusedFlag = false;
                }
            },
            refresh: function() {
                this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
                this.list.refresh();
            },
            destroy: function() {
                this.list.destroy();
                this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass);
                this.fakeElement.remove();
            }
        });

        // options list module
        function SelectList(options) {
            this.options = $.extend({
                holder: null,
                maxVisibleItems: 6,
                selectOnClick: true,
                useHoverClass: false,
                useCustomScroll: false,
                handleResize: true,
                multipleSelectWithoutKey: false,
                alwaysPreventMouseWheel: false,
                indexAttribute: 'data-index',
                cloneClassPrefix: 'jcf-option-',
                containerStructure: '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
                containerSelector: '.jcf-list-content',
                captionClass: 'jcf-optgroup-caption',
                disabledClass: 'jcf-disabled',
                optionClass: 'jcf-option',
                groupClass: 'jcf-optgroup',
                hoverClass: 'jcf-hover',
                selectedClass: 'jcf-selected',
                scrollClass: 'jcf-scroll-active'
            }, options);
            this.init();
        }
        $.extend(SelectList.prototype, {
            init: function() {
                this.initStructure();
                this.refreshSelectedClass();
                this.attachEvents();
            },
            initStructure: function() {
                this.element = $(this.options.element);
                this.indexSelector = '[' + this.options.indexAttribute + ']';
                this.container = $(this.options.containerStructure).appendTo(this.options.holder);
                this.listHolder = this.container.find(this.options.containerSelector);
                this.lastClickedIndex = this.element.prop('selectedIndex');
                this.rebuildList();

                // save current selection in multiple select
                if (this.element.prop('multiple')) {
                    this.previousSelection = this.getSelectedOptionsIndexes();
                }
            },
            attachEvents: function() {
                this.bindHandlers();
                this.listHolder.on('jcf-pointerdown', this.indexSelector, this.onItemPress);
                this.listHolder.on('jcf-pointerdown', this.onPress);

                if (this.options.useHoverClass) {
                    this.listHolder.on('jcf-pointerover', this.indexSelector, this.onHoverItem);
                }
            },
            onPress: function(e) {
                $(this).trigger('press', e);
                this.listHolder.on('jcf-pointerup', this.onRelease);
            },
            onRelease: function(e) {
                $(this).trigger('release', e);
                this.listHolder.off('jcf-pointerup', this.onRelease);
            },
            onHoverItem: function(e) {
                var hoverIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));
                this.fakeOptions.removeClass(this.options.hoverClass).eq(hoverIndex).addClass(this.options.hoverClass);
            },
            onItemPress: function(e) {
                if (e.pointerType === 'touch' || this.options.selectOnClick) {
                    // select option after "click"
                    this.tmpListOffsetTop = this.list.offset().top;
                    this.listHolder.on('jcf-pointerup', this.indexSelector, this.onItemRelease);
                } else {
                    // select option immediately
                    this.onSelectItem(e);
                }
            },
            onItemRelease: function(e) {
                // remove event handlers and temporary data
                this.listHolder.off('jcf-pointerup', this.indexSelector, this.onItemRelease);

                // simulate item selection
                if (this.tmpListOffsetTop === this.list.offset().top) {
                    this.listHolder.on('click', this.indexSelector, { savedPointerType: e.pointerType }, this.onSelectItem);
                }
                delete this.tmpListOffsetTop;
            },
            onSelectItem: function(e) {
                var clickedIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)),
                    pointerType = e.data && e.data.savedPointerType || e.pointerType || 'mouse',
                    range;

                // remove click event handler
                this.listHolder.off('click', this.indexSelector, this.onSelectItem);

                // ignore clicks on disabled options
                if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
                    return;
                }

                if (this.element.prop('multiple')) {
                    if (e.metaKey || e.ctrlKey || pointerType === 'touch' || this.options.multipleSelectWithoutKey) {
                        // if CTRL/CMD pressed or touch devices - toggle selected option
                        this.realOptions[clickedIndex].selected = !this.realOptions[clickedIndex].selected;
                    } else if (e.shiftKey) {
                        // if SHIFT pressed - update selection
                        range = [this.lastClickedIndex, clickedIndex].sort(function(a, b) {
                            return a - b;
                        });
                        this.realOptions.each(function(index, option) {
                            option.selected = (index >= range[0] && index <= range[1]);
                        });
                    } else {
                        // set single selected index
                        this.element.prop('selectedIndex', clickedIndex);
                    }
                } else {
                    this.element.prop('selectedIndex', clickedIndex);
                }

                // save last clicked option
                if (!e.shiftKey) {
                    this.lastClickedIndex = clickedIndex;
                }

                // refresh classes
                this.refreshSelectedClass();

                // scroll to active item in desktop browsers
                if (pointerType === 'mouse') {
                    this.scrollToActiveOption();
                }

                // make callback when item selected
                $(this).trigger('select');
            },
            rebuildList: function() {
                // rebuild options
                var self = this,
                    rootElement = this.element[0];

                // recursively create fake options
                this.storedSelectHTML = rootElement.innerHTML;
                this.optionIndex = 0;
                this.list = $(this.createOptionsList(rootElement));
                this.listHolder.empty().append(this.list);
                this.realOptions = this.element.find('option');
                this.fakeOptions = this.list.find(this.indexSelector);
                this.fakeListItems = this.list.find('.' + this.options.captionClass + ',' + this.indexSelector);
                delete this.optionIndex;

                // detect max visible items
                var maxCount = this.options.maxVisibleItems,
                    sizeValue = this.element.prop('size');
                if (sizeValue > 1 && !this.element.is('[jcf-size]')) {
                    maxCount = sizeValue;
                }

                // handle scrollbar
                var needScrollBar = this.fakeOptions.length > maxCount;
                this.container.toggleClass(this.options.scrollClass, needScrollBar);
                if (needScrollBar) {
                    // change max-height
                    this.listHolder.css({
                        maxHeight: this.getOverflowHeight(maxCount),
                        overflow: 'auto'
                    });

                    if (this.options.useCustomScroll && jcf.modules.Scrollable) {
                        // add custom scrollbar if specified in options
                        jcf.replace(this.listHolder, 'Scrollable', {
                            handleResize: this.options.handleResize,
                            alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel
                        });
                        return;
                    }
                }

                // disable edge wheel scrolling
                if (this.options.alwaysPreventMouseWheel) {
                    this.preventWheelHandler = function(e) {
                        var currentScrollTop = self.listHolder.scrollTop(),
                            maxScrollTop = self.listHolder.prop('scrollHeight') - self.listHolder.innerHeight();

                        // check edge cases
                        if ((currentScrollTop <= 0 && e.deltaY < 0) || (currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
                            e.preventDefault();
                        }
                    };
                    this.listHolder.on('jcf-mousewheel', this.preventWheelHandler);
                }
            },
            refreshSelectedClass: function() {
                var self = this,
                    selectedItem,
                    isMultiple = this.element.prop('multiple'),
                    selectedIndex = this.element.prop('selectedIndex');

                if (isMultiple) {
                    this.realOptions.each(function(index, option) {
                        self.fakeOptions.eq(index).toggleClass(self.options.selectedClass, !!option.selected);
                    });
                } else {
                    this.fakeOptions.removeClass(this.options.selectedClass + ' ' + this.options.hoverClass);
                    selectedItem = this.fakeOptions.eq(selectedIndex).addClass(this.options.selectedClass);
                    if (this.options.useHoverClass) {
                        selectedItem.addClass(this.options.hoverClass);
                    }
                }
            },
            scrollToActiveOption: function() {
                // scroll to target option
                var targetOffset = this.getActiveOptionOffset();
                if (typeof targetOffset === 'number') {
                    this.listHolder.prop('scrollTop', targetOffset);
                }
            },
            getSelectedOptionsIndexes: function() {
                var selection = [];
                this.realOptions.each(function(index, option) {
                    if (option.selected) {
                        selection.push(index);
                    }
                });
                return selection;
            },
            getChangedSelectedIndex: function() {
                var selectedIndex = this.element.prop('selectedIndex'),
                    self = this,
                    found = false,
                    targetIndex = null;

                if (this.element.prop('multiple')) {
                    // multiple selects handling
                    this.currentSelection = this.getSelectedOptionsIndexes();
                    $.each(this.currentSelection, function(index, optionIndex) {
                        if (!found && self.previousSelection.indexOf(optionIndex) < 0) {
                            if (index === 0) {
                                found = true;
                            }
                            targetIndex = optionIndex;
                        }
                    });
                    this.previousSelection = this.currentSelection;
                    return targetIndex;
                } else {
                    // single choice selects handling
                    return selectedIndex;
                }
            },
            getActiveOptionOffset: function() {
                // calc values
                var currentIndex = this.getChangedSelectedIndex();

                // selection was not changed
                if (currentIndex === null) {
                    return;
                }

                // find option and scroll to it if needed
                var dropHeight = this.listHolder.height(),
                    dropScrollTop = this.listHolder.prop('scrollTop'),
                    fakeOption = this.fakeOptions.eq(currentIndex),
                    fakeOptionOffset = fakeOption.offset().top - this.list.offset().top,
                    fakeOptionHeight = fakeOption.innerHeight();

                // scroll list
                if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
                    // scroll down (always scroll to option)
                    return fakeOptionOffset - dropHeight + fakeOptionHeight;
                } else if (fakeOptionOffset < dropScrollTop) {
                    // scroll up to option
                    return fakeOptionOffset;
                }
            },
            getOverflowHeight: function(sizeValue) {
                var item = this.fakeListItems.eq(sizeValue - 1),
                    listOffset = this.list.offset().top,
                    itemOffset = item.offset().top,
                    itemHeight = item.innerHeight();

                return itemOffset + itemHeight - listOffset;
            },
            getScrollTop: function() {
                return this.listHolder.scrollTop();
            },
            setScrollTop: function(value) {
                this.listHolder.scrollTop(value);
            },
            createOption: function(option) {
                var newOption = document.createElement('span');
                newOption.className = this.options.optionClass;
                newOption.innerHTML = option.innerHTML;
                newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

                var optionImage, optionImageSrc = option.getAttribute('data-image');
                if (optionImageSrc) {
                    optionImage = document.createElement('img');
                    optionImage.src = optionImageSrc;
                    newOption.insertBefore(optionImage, newOption.childNodes[0]);
                }
                if (option.disabled) {
                    newOption.className += ' ' + this.options.disabledClass;
                }
                if (option.className) {
                    newOption.className += ' ' + getPrefixedClasses(option.className, this.options.cloneClassPrefix);
                }
                return newOption;
            },
            createOptGroup: function(optgroup) {
                var optGroupContainer = document.createElement('span'),
                    optGroupName = optgroup.getAttribute('label'),
                    optGroupCaption, optGroupList;

                // create caption
                optGroupCaption = document.createElement('span');
                optGroupCaption.className = this.options.captionClass;
                optGroupCaption.innerHTML = optGroupName;
                optGroupContainer.appendChild(optGroupCaption);

                // create list of options
                if (optgroup.children.length) {
                    optGroupList = this.createOptionsList(optgroup);
                    optGroupContainer.appendChild(optGroupList);
                }

                optGroupContainer.className = this.options.groupClass;
                return optGroupContainer;
            },
            createOptionContainer: function() {
                var optionContainer = document.createElement('li');
                return optionContainer;
            },
            createOptionsList: function(container) {
                var self = this,
                    list = document.createElement('ul');

                $.each(container.children, function(index, currentNode) {
                    var item = self.createOptionContainer(currentNode),
                        newNode;

                    switch (currentNode.tagName.toLowerCase()) {
                        case 'option': newNode = self.createOption(currentNode); break;
                        case 'optgroup': newNode = self.createOptGroup(currentNode); break;
                    }
                    list.appendChild(item).appendChild(newNode);
                });
                return list;
            },
            refresh: function() {
                // check for select innerHTML changes
                if (this.storedSelectHTML !== this.element.prop('innerHTML')) {
                    this.rebuildList();
                }

                // refresh custom scrollbar
                var scrollInstance = jcf.getInstance(this.listHolder);
                if (scrollInstance) {
                    scrollInstance.refresh();
                }

                // refresh selectes classes
                this.refreshSelectedClass();
            },
            destroy: function() {
                this.listHolder.off('jcf-mousewheel', this.preventWheelHandler);
                this.listHolder.off('jcf-pointerdown', this.indexSelector, this.onSelectItem);
                this.listHolder.off('jcf-pointerover', this.indexSelector, this.onHoverItem);
                this.listHolder.off('jcf-pointerdown', this.onPress);
            }
        });

        // helper functions
        var getPrefixedClasses = function(className, prefixToAdd) {
            return className ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + '$1 ') : '';
        };
        var makeUnselectable = (function() {
            var unselectableClass = jcf.getOptions().unselectableClass;
            function preventHandler(e) {
                e.preventDefault();
            }
            return function(node) {
                node.addClass(unselectableClass).on('selectstart', preventHandler);
            };
        }());

        return module;
    });

}(jcf));
/*!
 * JavaScript Custom Forms : Checkbox Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
(function(jcf) {

    jcf.addModule(function($) {
        'use strict';

        return {
            name: 'Checkbox',
            selector: 'input[type="checkbox"]',
            options: {
                wrapNative: true,
                checkedClass: 'jcf-checked',
                uncheckedClass: 'jcf-unchecked',
                labelActiveClass: 'jcf-label-active',
                fakeStructure: '<span class="jcf-checkbox"><span></span></span>'
            },
            matchElement: function(element) {
                return element.is(':checkbox');
            },
            init: function() {
                this.initStructure();
                this.attachEvents();
                this.refresh();
            },
            initStructure: function() {
                // prepare structure
                this.doc = $(document);
                this.realElement = $(this.options.element);
                this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
                this.labelElement = this.getLabelFor();

                if (this.options.wrapNative) {
                    // wrap native checkbox inside fake block
                    this.realElement.appendTo(this.fakeElement).css({
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        opacity: 0,
                        margin: 0
                    });
                } else {
                    // just hide native checkbox
                    this.realElement.addClass(this.options.hiddenClass);
                }
            },
            attachEvents: function() {
                // add event handlers
                this.realElement.on({
                    focus: this.onFocus,
                    click: this.onRealClick
                });
                this.fakeElement.on('click', this.onFakeClick);
                this.fakeElement.on('jcf-pointerdown', this.onPress);
            },
            onRealClick: function(e) {
                // just redraw fake element (setTimeout handles click that might be prevented)
                var self = this;
                this.savedEventObject = e;
                setTimeout(function() {
                    self.refresh();
                }, 0);
            },
            onFakeClick: function(e) {
                // skip event if clicked on real element inside wrapper
                if (this.options.wrapNative && this.realElement.is(e.target)) {
                    return;
                }

                // toggle checked class
                if (!this.realElement.is(':disabled')) {
                    delete this.savedEventObject;
                    this.stateChecked = this.realElement.prop('checked');
                    this.realElement.prop('checked', !this.stateChecked);
                    this.fireNativeEvent(this.realElement, 'click');
                    if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
                        this.realElement.prop('checked', this.stateChecked);
                    } else {
                        this.fireNativeEvent(this.realElement, 'change');
                    }
                    delete this.savedEventObject;
                }
            },
            onFocus: function() {
                if (!this.pressedFlag || !this.focusedFlag) {
                    this.focusedFlag = true;
                    this.fakeElement.addClass(this.options.focusClass);
                    this.realElement.on('blur', this.onBlur);
                }
            },
            onBlur: function() {
                if (!this.pressedFlag) {
                    this.focusedFlag = false;
                    this.fakeElement.removeClass(this.options.focusClass);
                    this.realElement.off('blur', this.onBlur);
                }
            },
            onPress: function(e) {
                if (!this.focusedFlag && e.pointerType === 'mouse') {
                    this.realElement.focus();
                }
                this.pressedFlag = true;
                this.fakeElement.addClass(this.options.pressedClass);
                this.doc.on('jcf-pointerup', this.onRelease);
            },
            onRelease: function(e) {
                if (this.focusedFlag && e.pointerType === 'mouse') {
                    this.realElement.focus();
                }
                this.pressedFlag = false;
                this.fakeElement.removeClass(this.options.pressedClass);
                this.doc.off('jcf-pointerup', this.onRelease);
            },
            getLabelFor: function() {
                var parentLabel = this.realElement.closest('label'),
                    elementId = this.realElement.prop('id');

                if (!parentLabel.length && elementId) {
                    parentLabel = $('label[for="' + elementId + '"]');
                }
                return parentLabel.length ? parentLabel : null;
            },
            refresh: function() {
                // redraw custom checkbox
                var isChecked = this.realElement.is(':checked'),
                    isDisabled = this.realElement.is(':disabled');

                this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
                    .toggleClass(this.options.uncheckedClass, !isChecked)
                    .toggleClass(this.options.disabledClass, isDisabled);

                if (this.labelElement) {
                    this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
                }
            },
            destroy: function() {
                // restore structure
                if (this.options.wrapNative) {
                    this.realElement.insertBefore(this.fakeElement).css({
                        position: '',
                        width: '',
                        height: '',
                        opacity: '',
                        margin: ''
                    });
                } else {
                    this.realElement.removeClass(this.options.hiddenClass);
                }

                // removing element will also remove its event handlers
                this.fakeElement.off('jcf-pointerdown', this.onPress);
                this.fakeElement.remove();

                // remove other event handlers
                this.doc.off('jcf-pointerup', this.onRelease);
                this.realElement.off({
                    focus: this.onFocus,
                    click: this.onRealClick
                });
            }
        };
    });

}(jcf));
/*!
 * JavaScript Custom Forms : Radio Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
(function(jcf) {

    jcf.addModule(function($) {
        'use strict';

        return {
            name: 'Radio',
            selector: 'input[type="radio"]',
            options: {
                wrapNative: true,
                checkedClass: 'jcf-checked',
                uncheckedClass: 'jcf-unchecked',
                labelActiveClass: 'jcf-label-active',
                fakeStructure: '<span class="jcf-radio"><span></span></span>'
            },
            matchElement: function(element) {
                return element.is(':radio');
            },
            init: function() {
                this.initStructure();
                this.attachEvents();
                this.refresh();
            },
            initStructure: function() {
                // prepare structure
                this.doc = $(document);
                this.realElement = $(this.options.element);
                this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
                this.labelElement = this.getLabelFor();

                if (this.options.wrapNative) {
                    // wrap native radio inside fake block
                    this.realElement.prependTo(this.fakeElement).css({
                        position: 'absolute',
                        opacity: 0
                    });
                } else {
                    // just hide native radio
                    this.realElement.addClass(this.options.hiddenClass);
                }
            },
            attachEvents: function() {
                // add event handlers
                this.realElement.on({
                    focus: this.onFocus,
                    click: this.onRealClick
                });
                this.fakeElement.on('click', this.onFakeClick);
                this.fakeElement.on('jcf-pointerdown', this.onPress);
            },
            onRealClick: function(e) {
                // redraw current radio and its group (setTimeout handles click that might be prevented)
                var self = this;
                this.savedEventObject = e;
                setTimeout(function() {
                    self.refreshRadioGroup();
                }, 0);
            },
            onFakeClick: function(e) {
                // skip event if clicked on real element inside wrapper
                if (this.options.wrapNative && this.realElement.is(e.target)) {
                    return;
                }

                // toggle checked class
                if (!this.realElement.is(':disabled')) {
                    delete this.savedEventObject;
                    this.currentActiveRadio = this.getCurrentActiveRadio();
                    this.stateChecked = this.realElement.prop('checked');
                    this.realElement.prop('checked', true);
                    this.fireNativeEvent(this.realElement, 'click');
                    if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
                        this.realElement.prop('checked', this.stateChecked);
                        this.currentActiveRadio.prop('checked', true);
                    } else {
                        this.fireNativeEvent(this.realElement, 'change');
                    }
                    delete this.savedEventObject;
                }
            },
            onFocus: function() {
                if (!this.pressedFlag || !this.focusedFlag) {
                    this.focusedFlag = true;
                    this.fakeElement.addClass(this.options.focusClass);
                    this.realElement.on('blur', this.onBlur);
                }
            },
            onBlur: function() {
                if (!this.pressedFlag) {
                    this.focusedFlag = false;
                    this.fakeElement.removeClass(this.options.focusClass);
                    this.realElement.off('blur', this.onBlur);
                }
            },
            onPress: function(e) {
                if (!this.focusedFlag && e.pointerType === 'mouse') {
                    this.realElement.focus();
                }
                this.pressedFlag = true;
                this.fakeElement.addClass(this.options.pressedClass);
                this.doc.on('jcf-pointerup', this.onRelease);
            },
            onRelease: function(e) {
                if (this.focusedFlag && e.pointerType === 'mouse') {
                    this.realElement.focus();
                }
                this.pressedFlag = false;
                this.fakeElement.removeClass(this.options.pressedClass);
                this.doc.off('jcf-pointerup', this.onRelease);
            },
            getCurrentActiveRadio: function() {
                return this.getRadioGroup(this.realElement).filter(':checked');
            },
            getRadioGroup: function(radio) {
                // find radio group for specified radio button
                var name = radio.attr('name'),
                    parentForm = radio.parents('form');

                if (name) {
                    if (parentForm.length) {
                        return parentForm.find('input[name="' + name + '"]');
                    } else {
                        return $('input[name="' + name + '"]:not(form input)');
                    }
                } else {
                    return radio;
                }
            },
            getLabelFor: function() {
                var parentLabel = this.realElement.closest('label'),
                    elementId = this.realElement.prop('id');

                if (!parentLabel.length && elementId) {
                    parentLabel = $('label[for="' + elementId + '"]');
                }
                return parentLabel.length ? parentLabel : null;
            },
            refreshRadioGroup: function() {
                // redraw current radio and its group
                this.getRadioGroup(this.realElement).each(function() {
                    jcf.refresh(this);
                });
            },
            refresh: function() {
                // redraw current radio button
                var isChecked = this.realElement.is(':checked'),
                    isDisabled = this.realElement.is(':disabled');

                this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
                    .toggleClass(this.options.uncheckedClass, !isChecked)
                    .toggleClass(this.options.disabledClass, isDisabled);

                if (this.labelElement) {
                    this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
                }
            },
            destroy: function() {
                // restore structure
                if (this.options.wrapNative) {
                    this.realElement.insertBefore(this.fakeElement).css({
                        position: '',
                        width: '',
                        height: '',
                        opacity: '',
                        margin: ''
                    });
                } else {
                    this.realElement.removeClass(this.options.hiddenClass);
                }

                // removing element will also remove its event handlers
                this.fakeElement.off('jcf-pointerdown', this.onPress);
                this.fakeElement.remove();

                // remove other event handlers
                this.doc.off('jcf-pointerup', this.onRelease);
                this.realElement.off({
                    blur: this.onBlur,
                    focus: this.onFocus,
                    click: this.onRealClick
                });
            }
        };
    });

}(jcf));
/*!
 * JavaScript Custom Forms : Range Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */

(function(jcf) {

    jcf.addModule(function($) {
        'use strict';

        return {
            name: 'Range',
            selector: 'input[type="range"]',
            options: {
                realElementClass: 'jcf-real-element',
                fakeStructure: '<span class="jcf-range"><span class="jcf-range-wrapper"><span class="jcf-range-track"><span class="jcf-range-handle"></span></span></span></span>',
                dataListMark: '<span class="jcf-range-mark"></span>',
                rangeDisplayWrapper: '<span class="jcf-range-display-wrapper"></span>',
                rangeDisplay: '<span class="jcf-range-display"></span>',
                handleSelector: '.jcf-range-handle',
                trackSelector: '.jcf-range-track',
                activeHandleClass: 'jcf-active-handle',
                verticalClass: 'jcf-vertical',
                orientation: 'horizontal',
                range: false, // or "min", "max", "all"
                dragHandleCenter: true,
                snapToMarks: true,
                snapRadius: 5,
                minRange: 0
            },
            matchElement: function(element) {
                return element.is(this.selector);
            },
            init: function() {
                this.initStructure();
                this.attachEvents();
                this.refresh();
            },
            initStructure: function() {
                this.page = $('html');
                this.realElement = $(this.options.element).addClass(this.options.hiddenClass);
                this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement).prepend(this.realElement);
                this.track = this.fakeElement.find(this.options.trackSelector);
                this.trackHolder = this.track.parent();
                this.handle = this.fakeElement.find(this.options.handleSelector);
                this.createdHandleCount = 0;
                this.activeDragHandleIndex = 0;
                this.isMultiple = this.realElement.prop('multiple') || typeof this.realElement.attr('multiple') === 'string';
                this.values = this.isMultiple ? this.realElement.attr('value').split(',') : [this.realElement.val()];
                this.handleCount = this.isMultiple ? this.values.length : 1;

                // create range display
                this.rangeDisplayWrapper = $(this.options.rangeDisplayWrapper).insertBefore(this.track);
                if (this.options.range === 'min' || this.options.range === 'all') {
                    this.rangeMin = $(this.options.rangeDisplay).addClass('jcf-range-min').prependTo(this.rangeDisplayWrapper);
                }
                if (this.options.range === 'max' || this.options.range === 'all') {
                    this.rangeMax = $(this.options.rangeDisplay).addClass('jcf-range-max').prependTo(this.rangeDisplayWrapper);
                }

                // clone handles if needed
                while (this.createdHandleCount < this.handleCount) {
                    this.createdHandleCount++;
                    this.handle.clone().addClass('jcf-index-' + this.createdHandleCount).insertBefore(this.handle);

                    // create mid ranges
                    if (this.createdHandleCount > 1) {
                        if (!this.rangeMid) {
                            this.rangeMid = $();
                        }
                        this.rangeMid = this.rangeMid.add($(this.options.rangeDisplay).addClass('jcf-range-mid').prependTo(this.rangeDisplayWrapper));
                    }
                }

                // grab all handles
                this.handle.detach();
                this.handle = null;
                this.handles = this.fakeElement.find(this.options.handleSelector);
                this.handles.eq(0).addClass(this.options.activeHandleClass);

                // handle orientation
                this.isVertical = (this.options.orientation === 'vertical');
                this.directionProperty = this.isVertical ? 'top' : 'left';
                this.offsetProperty = this.isVertical ? 'bottom' : 'left';
                this.eventProperty = this.isVertical ? 'pageY' : 'pageX';
                this.sizeProperty = this.isVertical ? 'height' : 'width';
                this.sizeMethod = this.isVertical ? 'innerHeight' : 'innerWidth';
                this.fakeElement.css('touchAction', this.isVertical ? 'pan-x' : 'pan-y');
                if (this.isVertical) {
                    this.fakeElement.addClass(this.options.verticalClass);
                }

                // set initial values
                this.minValue = parseFloat(this.realElement.attr('min'));
                this.maxValue = parseFloat(this.realElement.attr('max'));
                this.stepValue = parseFloat(this.realElement.attr('step')) || 1;

                // check attribute values
                this.minValue = isNaN(this.minValue) ? 0 : this.minValue;
                this.maxValue = isNaN(this.maxValue) ? 100 : this.maxValue;

                // handle range
                if (this.stepValue !== 1) {
                    this.maxValue -= (this.maxValue - this.minValue) % this.stepValue;
                }
                this.stepsCount = (this.maxValue - this.minValue) / this.stepValue;
                this.createDataList();
            },
            attachEvents: function() {
                this.realElement.on({
                    focus: this.onFocus
                });
                this.trackHolder.on('jcf-pointerdown', this.onTrackPress);
                this.handles.on('jcf-pointerdown', this.onHandlePress);
            },
            createDataList: function() {
                var self = this,
                    dataValues = [],
                    dataListId = this.realElement.attr('list');

                if (dataListId) {
                    $('#' + dataListId).find('option').each(function() {
                        var itemValue = parseFloat(this.value || this.innerHTML),
                            mark, markOffset;

                        if (!isNaN(itemValue)) {
                            markOffset = self.valueToOffset(itemValue);
                            dataValues.push({
                                value: itemValue,
                                offset: markOffset
                            });
                            mark = $(self.options.dataListMark).text(itemValue).attr({
                                'data-mark-value': itemValue
                            }).css(self.offsetProperty, markOffset + '%').appendTo(self.track);
                        }
                    });
                    if (dataValues.length) {
                        self.dataValues = dataValues;
                    }
                }
            },
            getDragHandleRange: function(handleIndex) {
                // calculate range for slider with multiple handles
                var minStep = -Infinity,
                    maxStep = Infinity;

                if (handleIndex > 0) {
                    minStep = this.valueToStepIndex(parseFloat(this.values[handleIndex - 1]) + this.options.minRange);
                }
                if (handleIndex < this.handleCount - 1) {
                    maxStep = this.valueToStepIndex(parseFloat(this.values[handleIndex + 1]) - this.options.minRange);
                }

                return {
                    minStepIndex: minStep,
                    maxStepIndex: maxStep
                };
            },
            getNearestHandle: function(percent) {
                // handle vertical sliders
                if (this.isVertical) {
                    percent = 1 - percent;
                }

                // detect closest handle when track is pressed
                var closestHandle = this.handles.eq(0),
                    closestDistance = Infinity,
                    self = this;

                if (this.handleCount > 1) {
                    this.handles.each(function() {
                        var handleOffset = parseFloat(this.style[self.offsetProperty]) / 100,
                            handleDistance = Math.abs(handleOffset - percent);

                        if (handleDistance < closestDistance) {
                            closestDistance = handleDistance;
                            closestHandle = $(this);
                        }
                    });
                }
                return closestHandle;
            },
            onTrackPress: function(e) {
                var trackSize, trackOffset, innerOffset;

                e.preventDefault();
                if (!this.realElement.is(':disabled') && !this.activeDragHandle) {
                    trackSize = this.track[this.sizeMethod]();
                    trackOffset = this.track.offset()[this.directionProperty];
                    this.activeDragHandle = this.getNearestHandle((e[this.eventProperty] - trackOffset) / this.trackHolder[this.sizeMethod]());
                    this.activeDragHandleIndex = this.handles.index(this.activeDragHandle);
                    this.handles.removeClass(this.options.activeHandleClass).eq(this.activeDragHandleIndex).addClass(this.options.activeHandleClass);
                    innerOffset = this.activeDragHandle[this.sizeMethod]() / 2;

                    this.dragData = {
                        trackSize: trackSize,
                        innerOffset: innerOffset,
                        trackOffset: trackOffset,
                        min: trackOffset,
                        max: trackOffset + trackSize
                    };
                    this.page.on({
                        'jcf-pointermove': this.onHandleMove,
                        'jcf-pointerup': this.onHandleRelease
                    });

                    if (e.pointerType === 'mouse') {
                        this.realElement.focus();
                    }

                    this.onHandleMove(e);
                }
            },
            onHandlePress: function(e) {
                var trackSize, trackOffset, innerOffset;

                e.preventDefault();
                if (!this.realElement.is(':disabled') && !this.activeDragHandle) {
                    this.activeDragHandle = $(e.currentTarget);
                    this.activeDragHandleIndex = this.handles.index(this.activeDragHandle);
                    this.handles.removeClass(this.options.activeHandleClass).eq(this.activeDragHandleIndex).addClass(this.options.activeHandleClass);
                    trackSize = this.track[this.sizeMethod]();
                    trackOffset = this.track.offset()[this.directionProperty];
                    innerOffset = this.options.dragHandleCenter ? this.activeDragHandle[this.sizeMethod]() / 2 : e[this.eventProperty] - this.handle.offset()[this.directionProperty];

                    this.dragData = {
                        trackSize: trackSize,
                        innerOffset: innerOffset,
                        trackOffset: trackOffset,
                        min: trackOffset,
                        max: trackOffset + trackSize
                    };
                    this.page.on({
                        'jcf-pointermove': this.onHandleMove,
                        'jcf-pointerup': this.onHandleRelease
                    });

                    if (e.pointerType === 'mouse') {
                        this.realElement.focus();
                    }
                }
            },
            onHandleMove: function(e) {
                var self = this,
                    newOffset, dragPercent, stepIndex, valuePercent, handleDragRange;

                // calculate offset
                if (this.isVertical) {
                    newOffset = this.dragData.max + (this.dragData.min - e[this.eventProperty]) - this.dragData.innerOffset;
                } else {
                    newOffset = e[this.eventProperty] - this.dragData.innerOffset;
                }

                // fit in range
                if (newOffset < this.dragData.min) {
                    newOffset = this.dragData.min;
                } else if (newOffset > this.dragData.max) {
                    newOffset = this.dragData.max;
                }

                e.preventDefault();
                if (this.options.snapToMarks && this.dataValues) {
                    // snap handle to marks
                    var dragOffset = newOffset - this.dragData.trackOffset;
                    dragPercent = (newOffset - this.dragData.trackOffset) / this.dragData.trackSize * 100;

                    $.each(this.dataValues, function(index, item) {
                        var markOffset = item.offset / 100 * self.dragData.trackSize,
                            markMin = markOffset - self.options.snapRadius,
                            markMax = markOffset + self.options.snapRadius;

                        if (dragOffset >= markMin && dragOffset <= markMax) {
                            dragPercent = item.offset;
                            return false;
                        }
                    });
                } else {
                    // snap handle to steps
                    dragPercent = (newOffset - this.dragData.trackOffset) / this.dragData.trackSize * 100;
                }

                // move handle only in range
                stepIndex = Math.round(dragPercent * this.stepsCount / 100);
                if (this.handleCount > 1) {
                    handleDragRange = this.getDragHandleRange(this.activeDragHandleIndex);
                    if (stepIndex < handleDragRange.minStepIndex) {
                        stepIndex = Math.max(handleDragRange.minStepIndex, stepIndex);
                    } else if (stepIndex > handleDragRange.maxStepIndex) {
                        stepIndex = Math.min(handleDragRange.maxStepIndex, stepIndex);
                    }
                }
                valuePercent = stepIndex * (100 / this.stepsCount);

                if (this.dragData.stepIndex !== stepIndex) {
                    this.dragData.stepIndex = stepIndex;
                    this.dragData.offset = valuePercent;
                    this.activeDragHandle.css(this.offsetProperty, this.dragData.offset + '%');

                    // update value(s) and trigger "input" event
                    this.values[this.activeDragHandleIndex] = '' + this.stepIndexToValue(stepIndex);
                    this.updateValues();
                    this.realElement.trigger('input');
                }
            },
            onHandleRelease: function() {
                var newValue;
                if (typeof this.dragData.offset === 'number') {
                    newValue = this.stepIndexToValue(this.dragData.stepIndex);
                    this.realElement.val(newValue).trigger('change');
                }

                this.page.off({
                    'jcf-pointermove': this.onHandleMove,
                    'jcf-pointerup': this.onHandleRelease
                });
                delete this.activeDragHandle;
                delete this.dragData;
            },
            onFocus: function() {
                if (!this.fakeElement.hasClass(this.options.focusClass)) {
                    this.fakeElement.addClass(this.options.focusClass);
                    this.realElement.on({
                        blur: this.onBlur,
                        keydown: this.onKeyPress
                    });
                }
            },
            onBlur: function() {
                this.fakeElement.removeClass(this.options.focusClass);
                this.realElement.off({
                    blur: this.onBlur,
                    keydown: this.onKeyPress
                });
            },
            onKeyPress: function(e) {
                var incValue = (e.which === 38 || e.which === 39),
                    decValue = (e.which === 37 || e.which === 40);

                // handle TAB key in slider with multiple handles
                if (e.which === 9 && this.handleCount > 1) {
                    if (e.shiftKey && this.activeDragHandleIndex > 0) {
                        this.activeDragHandleIndex--;
                    } else if (!e.shiftKey && this.activeDragHandleIndex < this.handleCount - 1) {
                        this.activeDragHandleIndex++;
                    } else {
                        return;
                    }
                    e.preventDefault();
                    this.handles.removeClass(this.options.activeHandleClass).eq(this.activeDragHandleIndex).addClass(this.options.activeHandleClass);
                }

                // handle cursor keys
                if (decValue || incValue) {
                    e.preventDefault();
                    this.step(incValue ? this.stepValue : -this.stepValue);
                }
            },
            updateValues: function() {
                var value = this.values.join(',');
                if (this.values.length > 1) {
                    this.realElement.prop('valueLow', this.values[0]);
                    this.realElement.prop('valueHigh', this.values[this.values.length - 1]);
                    this.realElement.val(value);

                    // if browser does not accept multiple values set only one
                    if (this.realElement.val() !== value) {
                        this.realElement.val(this.values[this.values.length - 1]);
                    }
                } else {
                    this.realElement.val(value);
                }

                this.updateRanges();
            },
            updateRanges: function() {
                // update display ranges
                var self = this,
                    handle;

                if (this.rangeMin) {
                    handle = this.handles[0];
                    this.rangeMin.css(this.offsetProperty, 0).css(this.sizeProperty, handle.style[this.offsetProperty]);
                }
                if (this.rangeMax) {
                    handle = this.handles[this.handles.length - 1];
                    this.rangeMax.css(this.offsetProperty, handle.style[this.offsetProperty]).css(this.sizeProperty, 100 - parseFloat(handle.style[this.offsetProperty]) + '%');
                }
                if (this.rangeMid) {
                    this.handles.each(function(index, curHandle) {
                        var prevHandle, midBox;
                        if (index > 0) {
                            prevHandle = self.handles[index - 1];
                            midBox = self.rangeMid[index - 1];
                            midBox.style[self.offsetProperty] = prevHandle.style[self.offsetProperty];
                            midBox.style[self.sizeProperty] = parseFloat(curHandle.style[self.offsetProperty]) - parseFloat(prevHandle.style[self.offsetProperty]) + '%';
                        }
                    });
                }
            },
            step: function(changeValue) {
                var originalValue = parseFloat(this.values[this.activeDragHandleIndex || 0]),
                    newValue = originalValue,
                    minValue = this.minValue,
                    maxValue = this.maxValue;

                if (isNaN(originalValue)) {
                    newValue = 0;
                }

                newValue += changeValue;

                if (this.handleCount > 1) {
                    if (this.activeDragHandleIndex > 0) {
                        minValue = parseFloat(this.values[this.activeDragHandleIndex - 1]) + this.options.minRange;
                    }
                    if (this.activeDragHandleIndex < this.handleCount - 1) {
                        maxValue = parseFloat(this.values[this.activeDragHandleIndex + 1]) - this.options.minRange;
                    }
                }

                if (newValue > maxValue) {
                    newValue = maxValue;
                } else if (newValue < minValue) {
                    newValue = minValue;
                }

                if (newValue !== originalValue) {
                    this.values[this.activeDragHandleIndex || 0] = '' + newValue;
                    this.updateValues();
                    this.realElement.trigger('input').trigger('change');
                    this.setSliderValue(this.values);
                }
            },
            valueToStepIndex: function(value) {
                return (value - this.minValue) / this.stepValue;
            },
            stepIndexToValue: function(stepIndex) {
                return this.minValue + this.stepValue * stepIndex;
            },
            valueToOffset: function(value) {
                var range = this.maxValue - this.minValue,
                    percent = (value - this.minValue) / range;

                return percent * 100;
            },
            getSliderValue: function() {
                return $.map(this.values, function(value) {
                    return parseFloat(value) || 0;
                });
            },
            setSliderValue: function(values) {
                // set handle position accordion according to value
                var self = this;
                this.handles.each(function(index, handle) {
                    handle.style[self.offsetProperty] = self.valueToOffset(values[index]) + '%';
                });
            },
            refresh: function() {
                // handle disabled state
                var isDisabled = this.realElement.is(':disabled');
                this.fakeElement.toggleClass(this.options.disabledClass, isDisabled);

                // refresh handle position according to current value
                this.setSliderValue(this.getSliderValue());
                this.updateRanges();
            },
            destroy: function() {
                this.realElement.removeClass(this.options.hiddenClass).insertBefore(this.fakeElement);
                this.fakeElement.remove();

                this.realElement.off({
                    keydown: this.onKeyPress,
                    focus: this.onFocus,
                    blur: this.onBlur
                });
            }
        };
    });

}(jcf));
;(function($) {
    'use strict';

    jcf.addModule({
        name: 'File',
        selector: 'input[type="file"]',
        options: {
            fakeStructure: '<span class="jcf-file"><span class="jcf-fake-input"></span><span class="jcf-upload-button"><span class="jcf-button-content"></span></span></span>',
            buttonText: 'Choose file',
            placeholderText: 'No file chosen',
            realElementClass: 'jcf-real-element',
            extensionPrefixClass: 'jcf-extension-',
            selectedFileBlock: '.jcf-fake-input',
            buttonTextBlock: '.jcf-button-content'
        },
        matchElement: function(element) {
            return element.is('input[type="file"]');
        },
        init: function() {
            this.initStructure();
            this.attachEvents();
            this.refresh();
        },
        initStructure: function() {
            this.doc = $(document);
            this.realElement = $(this.options.element).addClass(this.options.realElementClass);
            this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement);
            this.fileNameBlock = this.fakeElement.find(this.options.selectedFileBlock);
            this.buttonTextBlock = this.fakeElement.find(this.options.buttonTextBlock).text(this.options.buttonText);

            this.realElement.appendTo(this.fakeElement).css({
                position: 'absolute',
                opacity: 0
            });
        },
        attachEvents: function() {
            this.realElement.on({
                'jcf-pointerdown': this.onPress,
                change: this.onChange,
                focus: this.onFocus
            });
        },
        onChange: function() {
            this.refresh();
        },
        onFocus: function() {
            this.fakeElement.addClass(this.options.focusClass);
            this.realElement.on('blur', this.onBlur);
        },
        onBlur: function() {
            this.fakeElement.removeClass(this.options.focusClass);
            this.realElement.off('blur', this.onBlur);
        },
        onPress: function() {
            this.fakeElement.addClass(this.options.pressedClass);
            this.doc.on('jcf-pointerup', this.onRelease);
        },
        onRelease: function() {
            this.fakeElement.removeClass(this.options.pressedClass);
            this.doc.off('jcf-pointerup', this.onRelease);
        },
        getFileName: function() {
            var resultFileName = '',
                files = this.realElement.prop('files');

            if (files && files.length) {
                $.each(files, function(index, file) {
                    resultFileName += (index > 0 ? ', ' : '') + file.name;
                });
            } else {
                resultFileName = this.realElement.val().replace(/^[\s\S]*(?:\\|\/)([\s\S^\\\/]*)$/g, '$1');
            }

            return resultFileName;
        },
        getFileExtension: function() {
            var fileName = this.realElement.val();
            return fileName.lastIndexOf('.') < 0 ? '' : fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        },
        updateExtensionClass: function() {
            var currentExtension = this.getFileExtension(),
                currentClassList = this.fakeElement.prop('className'),
                cleanedClassList = currentClassList.replace(new RegExp('(\\s|^)' + this.options.extensionPrefixClass + '[^ ]+','gi'), '');

            this.fakeElement.prop('className', cleanedClassList);
            if (currentExtension) {
                this.fakeElement.addClass(this.options.extensionPrefixClass + currentExtension);
            }
        },
        refresh: function() {
            var selectedFileName = this.getFileName() || this.options.placeholderText;
            this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
            this.fileNameBlock.text(selectedFileName);
            this.updateExtensionClass();
        },
        destroy: function() {
            // reset styles and restore element position
            this.realElement.insertBefore(this.fakeElement).removeClass(this.options.realElementClass).css({
                position: '',
                opacity: ''
            });
            this.fakeElement.remove();

            // remove event handlers
            this.realElement.off({
                'jcf-pointerdown': this.onPress,
                change: this.onChange,
                focus: this.onFocus,
                blur: this.onBlur
            });
            this.doc.off('jcf-pointerup', this.onRelease);
        }
    });

}(jQuery));
/*
 * Utility module
 */
lib = {
    hasClass: function(el,cls) {
        return el && el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
    },
    addClass: function(el,cls) {
        if (el && !this.hasClass(el,cls)) el.className += " "+cls;
    },
    removeClass: function(el,cls) {
        if (el && this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
    },
    extend: function(obj) {
        for(var i = 1; i < arguments.length; i++) {
            for(var p in arguments[i]) {
                if(arguments[i].hasOwnProperty(p)) {
                    obj[p] = arguments[i][p];
                }
            }
        }
        return obj;
    },
    each: function(obj, callback) {
        var property, len;
        if(typeof obj.length === 'number') {
            for(property = 0, len = obj.length; property < len; property++) {
                if(callback.call(obj[property], property, obj[property]) === false) {
                    break;
                }
            }
        } else {
            for(property in obj) {
                if(obj.hasOwnProperty(property)) {
                    if(callback.call(obj[property], property, obj[property]) === false) {
                        break;
                    }
                }
            }
        }
    },
    event: (function() {
        var fixEvent = function(e) {
            e = e || window.event;
            if(e.isFixed) return e; else e.isFixed = true;
            if(!e.target) e.target = e.srcElement;
            e.preventDefault = e.preventDefault || function() {this.returnValue = false;};
            e.stopPropagation = e.stopPropagation || function() {this.cancelBubble = true;};
            return e;
        };
        return {
            add: function(elem, event, handler) {
                if(!elem.events) {
                    elem.events = {};
                    elem.handle = function(e) {
                        var ret, handlers = elem.events[e.type];
                        e = fixEvent(e);
                        for(var i = 0, len = handlers.length; i < len; i++) {
                            if(handlers[i]) {
                                ret = handlers[i].call(elem, e);
                                if(ret === false) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }
                        }
                    };
                }
                if(!elem.events[event]) {
                    elem.events[event] = [];
                    if(elem.addEventListener) elem.addEventListener(event, elem.handle, false);
                    else if(elem.attachEvent) elem.attachEvent('on'+event, elem.handle);
                }
                elem.events[event].push(handler);
            },
            remove: function(elem, event, handler) {
                var handlers = elem.events[event];
                for(var i = handlers.length - 1; i >= 0; i--) {
                    if(handlers[i] === handler) {
                        handlers.splice(i,1);
                    }
                }
                if(!handlers.length) {
                    delete elem.events[event];
                    if(elem.removeEventListener) elem.removeEventListener(event, elem.handle, false);
                    else if(elem.detachEvent) elem.detachEvent('on'+event, elem.handle);
                }
            }
        };
    }()),
    queryElementsBySelector: function(selector, scope) {
        scope = scope || document;
        if(!selector) return [];
        if(selector === '>*') return scope.children;
        if(typeof document.querySelectorAll === 'function') {
            return scope.querySelectorAll(selector);
        }
        var selectors = selector.split(',');
        var resultList = [];
        for(var s = 0; s < selectors.length; s++) {
            var currentContext = [scope || document];
            var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
            for (var i = 0; i < tokens.length; i++) {
                token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
                if (token.indexOf('#') > -1) {
                    var bits = token.split('#'), tagName = bits[0], id = bits[1];
                    var element = document.getElementById(id);
                    if (element && tagName && element.nodeName.toLowerCase() != tagName) {
                        return [];
                    }
                    currentContext = element ? [element] : [];
                    continue;
                }
                if (token.indexOf('.') > -1) {
                    var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
                    for (var h = 0; h < currentContext.length; h++) {
                        var elements;
                        if (tagName == '*') {
                            elements = currentContext[h].getElementsByTagName('*');
                        } else {
                            elements = currentContext[h].getElementsByTagName(tagName);
                        }
                        for (var j = 0; j < elements.length; j++) {
                            found[foundCount++] = elements[j];
                        }
                    }
                    currentContext = [];
                    var currentContextIndex = 0;
                    for (var k = 0; k < found.length; k++) {
                        if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
                            currentContext[currentContextIndex++] = found[k];
                        }
                    }
                    continue;
                }
                if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
                    var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
                    if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
                        attrName = 'htmlFor';
                    }
                    var found = [], foundCount = 0;
                    for (var h = 0; h < currentContext.length; h++) {
                        var elements;
                        if (tagName == '*') {
                            elements = currentContext[h].getElementsByTagName('*');
                        } else {
                            elements = currentContext[h].getElementsByTagName(tagName);
                        }
                        for (var j = 0; elements[j]; j++) {
                            found[foundCount++] = elements[j];
                        }
                    }
                    currentContext = [];
                    var currentContextIndex = 0, checkFunction;
                    switch (attrOperator) {
                        case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
                        case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
                        case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
                        case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
                        case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
                        case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
                        default : checkFunction = function(e) { return e.getAttribute(attrName) };
                    }
                    currentContext = [];
                    var currentContextIndex = 0;
                    for (var k = 0; k < found.length; k++) {
                        if (checkFunction(found[k])) {
                            currentContext[currentContextIndex++] = found[k];
                        }
                    }
                    continue;
                }
                tagName = token;
                var found = [], foundCount = 0;
                for (var h = 0; h < currentContext.length; h++) {
                    var elements = currentContext[h].getElementsByTagName(tagName);
                    for (var j = 0; j < elements.length; j++) {
                        found[foundCount++] = elements[j];
                    }
                }
                currentContext = found;
            }
            resultList = [].concat(resultList,currentContext);
        }
        return resultList;
    },
    trim: function (str) {
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
    },
    bind: function(f, scope, forceArgs){
        return function() {return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments);};
    }
};


///////////////////////////// REGION: Menu Custom Selecting /////////////////////////////////////////
/* USAGE:
 1) For single menu (or multiple menu with one className and same url selected items)
 In js:
 $('.menuClassName').menuAutoSelector(
 {
 selected_class  : 'selected',
 menu_item_selector : "li",
 all_parents_selected : true
 });
 In html:
 <div data-select_menu_item="/url"></div>

 2) For multiple menu with different selectors and different url selected items
 In js:
 $('#menuClassName1').menuAutoSelector();
 $('#menuClassName2').menuAutoSelector();

 In html:
 <div data-select_menu_item="/url" data-menu_selector="#menuClassName1"></div>
 <div data-select_menu_item="/url1" data-menu_selector="#menuClassName2"></div>

 3) For multiple menu with same selectors and different url selected items
 In js:
 $('.menuClassName').menuAutoSelector();

 In html:
 <div data-select_menu_item="/url" data-menu_selector=".menuClassName:eq(0)"></div>
 <div data-select_menu_item="/url1" data-menu_selector=".menuClassName:eq(1)"></div>
 */
(function(e){function t(t){t=e.extend({menuHolder:e(".nav"),selected_class:"selected",menu_item_selector:"li",all_parents_selected:true},t);var r=e("[data-select_menu_item]");r.each(function(){var r=e(this).data("select_menu_item");var i=e(this).data("menu_selector");if(r!=null&&(i==null||n(e(i),t.menuHolder))){if(t.all_parents_selected){t.menuHolder.find(t.menu_item_selector+":not(."+t.selected_class+'):has([href="'+r+'"])').addClass(t.selected_class)}else{t.menuHolder.find(t.menu_item_selector+":not(."+t.selected_class+') [href="'+r+'"]').closest(t.menu_item_selector+":not(."+t.selected_class+")").addClass(t.selected_class)}}})}function n(e,t){var n=false;if(e!=null&&t!=null){n=e.get(0)==t.get(0)}return n}e.fn.menuAutoSelector=function(n){e(this).each(function(){n=n==null?{}:n;n.menuHolder=e(this);n=e.extend(n,n.menuHolder.data());t(n)})}})(jQuery);
///////////////////////////// ENDREGION: Menu Custom Selecting /////////////////////////////////////////

///////////////////////////// REGION: Wrap TextNodes With Tag //////////////////////////////////////////////
/* USAGE
 $('.target').wrapTextNodesWithTag(
 {
 tagName :'span'
 });
 */
(function (e) {
    function t(t, n) {
        function r(t) {
            function n() {
                return this.nodeType === 3
            }

            var r = e(t).contents().filter(n);
            return r
        }

        var i = r(t);
        var s = e(t);
        i.each(function () {
            var t = e(this).text();
            t = e.trim(t);
            if (t != "" && n != "") {
                if(t != '..')
                {
                    t = "<" + n + ">" + t + "</" + n + ">";
                    e(this).after(t);
                    e(this).remove()
                }
                else
                {
                    t = "<i>" + t + "</i>";
                    e(this).after(t);
                    e(this).remove()
                }
            }
        })
    }

    e.fn.wrapTextNodesWithTag = function (n) {
        var r = e(this).selector;
        e(this).each(function (e) {
            var i = "";
            if (n != null && n.tagName != null) {
                i = n.tagName
            }
            t(r + ":eq(" + e + ")", i)
        })
    }
})(jQuery);
///////////////////////////// ENDREGION: Wrap TextNodes With Tag //////////////////////////////////////////////
/*===========================================end General ======================================================*/

/*===========================================static ======================================================*/

/*
 * jQuery Tabs plugin
 */
;(function($, $win) {
    'use strict';

    function Tabset($holder, options) {
        this.$holder = $holder;
        this.options = options;

        this.init();
    }

    Tabset.prototype = {
        init: function() {
            this.$tabLinks = this.$holder.find(this.options.tabLinks);

            this.setStartActiveIndex();
            this.setActiveTab();

            if (this.options.autoHeight) {
                this.$tabHolder = $(this.$tabLinks.eq(0).attr(this.options.attrib)).parent();
            }
        },

        setStartActiveIndex: function() {
            var $classTargets = this.getClassTarget(this.$tabLinks);
            var $activeLink = $classTargets.filter('.' + this.options.activeClass);
            var $hashLink = this.$tabLinks.filter('[' + this.options.attrib + '="' + location.hash + '"]');
            var activeIndex;

            if (this.options.checkHash && $hashLink.length) {
                $activeLink = $hashLink;
            }

            activeIndex = $classTargets.index($activeLink);

            this.activeTabIndex = this.prevTabIndex = (activeIndex === -1 ? (this.options.defaultTab ? 0 : null) : activeIndex);
        },

        setActiveTab: function() {
            var self = this;

            this.$tabLinks.each(function(i, link) {
                var $link = $(link);
                var $classTarget = self.getClassTarget($link);
                var $tab = $($link.attr(self.options.attrib));

                if (i !== self.activeTabIndex) {
                    $classTarget.removeClass(self.options.activeClass);
                    $tab.addClass(self.options.tabHiddenClass).removeClass(self.options.activeClass);
                } else {
                    $classTarget.addClass(self.options.activeClass);
                    $tab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);
                }

                self.attachTabLink($link, i);
            });
        },

        attachTabLink: function($link, i) {
            var self = this;

            $link.on(this.options.event + '.tabset', function(e) {
                e.preventDefault();

                if (self.activeTabIndex === self.prevTabIndex && self.activeTabIndex !== i) {
                    self.activeTabIndex = i;
                    self.switchTabs();
                }
            });
        },

        resizeHolder: function(height) {
            var self = this;

            if (height) {
                this.$tabHolder.height(height);
                setTimeout(function() {
                    self.$tabHolder.addClass('transition');
                }, 10);
            } else {
                self.$tabHolder.removeClass('transition').height('');
            }
        },

        switchTabs: function() {
            var self = this;

            var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
            var $nextLink = this.$tabLinks.eq(this.activeTabIndex);

            var $prevTab = this.getTab($prevLink);
            var $nextTab = this.getTab($nextLink);

            $prevTab.removeClass(this.options.activeClass);

            if (self.haveTabHolder()) {
                this.resizeHolder($prevTab.outerHeight());
            }

            setTimeout(function() {
                self.getClassTarget($prevLink).removeClass(self.options.activeClass);

                $prevTab.addClass(self.options.tabHiddenClass);
                $nextTab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);

                self.getClassTarget($nextLink).addClass(self.options.activeClass);

                if (self.haveTabHolder()) {
                    self.resizeHolder($nextTab.outerHeight());

                    setTimeout(function() {
                        self.resizeHolder();
                        self.prevTabIndex = self.activeTabIndex;
                    }, self.options.animSpeed);
                } else {
                    self.prevTabIndex = self.activeTabIndex;
                }
            }, this.options.autoHeight ? this.options.animSpeed : 1);
        },

        getClassTarget: function($link) {
            return this.options.addToParent ? $link.parent() : $link;
        },

        getActiveTab: function() {
            return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
        },

        getTab: function($link) {
            return $($link.attr(this.options.attrib));
        },

        haveTabHolder: function() {
            return this.$tabHolder && this.$tabHolder.length;
        },

        destroy: function() {
            var self = this;

            this.$tabLinks.off('.tabset').each(function() {
                var $link = $(this);

                self.getClassTarget($link).removeClass(self.options.activeClass);
                $($link.attr(self.options.attrib)).removeClass(self.options.activeClass + ' ' + self.options.tabHiddenClass);
            });

            this.$holder.removeData('Tabset');
        }
    };

    $.fn.tabset = function(options) {
        options = $.extend({
            activeClass: 'active',
            addToParent: false,
            autoHeight: false,
            checkHash: false,
            defaultTab: true,
            animSpeed: 500,
            tabLinks: 'a',
            attrib: 'href',
            event: 'click',
            tabHiddenClass: 'js-tab-hidden'
        }, options);
        options.autoHeight = options.autoHeight && $.support.opacity;

        return this.each(function() {
            var $holder = $(this);

            if (!$holder.data('Tabset')) {
                $holder.data('Tabset', new Tabset($holder, options));
            }
        });
    };
}(jQuery, jQuery(window)));

/*===========================================end static======================================================*/

/*===========================================static and FAQ======================================================*/
/*
 * jQuery Accordion plugin
 */
;(function($){
    $.fn.slideAccordion = function(opt){
        // default options
        var options = $.extend({
            addClassBeforeAnimation: false,
            allowClickWhenExpanded: false,
            activeClass:'active',
            opener:'.opener',
            slider:'.slide',
            animSpeed: 300,
            collapsible:true,
            event:'click'
        },opt);

        return this.each(function(){
            // options
            var accordion = $(this);
            var items = accordion.find(':has('+options.slider+')');

            items.each(function(){
                var item = $(this);
                var opener = item.find(options.opener);
                var slider = item.find(options.slider);
                opener.bind(options.event, function(e){
                    if(!slider.is(':animated')) {
                        if(item.hasClass(options.activeClass)) {
                            if(options.allowClickWhenExpanded) {
                                return;
                            } else if(options.collapsible) {
                                slider.slideUp(options.animSpeed, function(){
                                    hideSlide(slider);
                                    item.removeClass(options.activeClass);
                                });
                            }
                        } else {
                            // show active
                            var levelItems = item.siblings('.'+options.activeClass);
                            var sliderElements = levelItems.find(options.slider);
                            item.addClass(options.activeClass);
                            showSlide(slider).hide().slideDown(options.animSpeed);

                            // collapse others
                            sliderElements.slideUp(options.animSpeed, function(){
                                levelItems.removeClass(options.activeClass);
                                hideSlide(sliderElements);
                            });
                        }
                    }
                    e.preventDefault();
                });
                if(item.hasClass(options.activeClass)) showSlide(slider); else hideSlide(slider);
            });
        });
    };

    // accordion slide visibility
    var showSlide = function(slide) {
        return slide.css({position:'', top: '', left: '', width: '' });
    };
    var hideSlide = function(slide) {
        return slide.show().css({position:'absolute', top: -9999, left: -9999, width: slide.width() });
    };
}(jQuery));
/*===========================================end static and FAQ======================================================*/

/*===========================================Blog, webapp 3======================================================*/
/*!
 * Masonry PACKAGED v4.0.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(t,e){"use strict";"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var c=d.apply(u,n);o=void 0===o?c:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}(this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||[];return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);r.isBoxSizeOuter=s=200==t(o.width),i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,c=0;u>c;c++){var l=h[c],f=r[l],m=parseFloat(f);a[l]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,E=a.borderTopWidth+a.borderBottomWidth,z=d&&s,b=t(r.width);b!==!1&&(a.width=b+(z?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(z?0:g+E)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+E),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},i.docReady=function(t){"complete"==document.readyState?t():document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var r=i.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",c=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(n&&n.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);c&&c.data(t,o,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t,t.EvEmitter,t.getSize))}(window,function(t,e,i){"use strict";function n(t){for(var e in t)return!1;return e=null,!0}function o(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function r(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,a="string"==typeof s.transition?"transition":"WebkitTransition",h="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[a],d=[h,a,a+"Duration",a+"Property"],c=o.prototype=Object.create(e.prototype);c.constructor=o,c._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},c.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},c.getSize=function(){this.size=i(this.element)},c.css=function(t){var e=this.element.style;for(var i in t){var n=d[i]||i;e[n]=t[i]}},c.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=this.layout.size,s=-1!=n.indexOf("%")?parseFloat(n)/100*r.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=i?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},c.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",c=this.position.y+t[h];e[u]=this.getYValue(c),e[d]="",this.css(e),this.emitEvent("layout",[this])},c.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},c.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},c._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-n,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},c.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},c.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},c.moveTo=c._transitionTo,c.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},c._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},c._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+r(d.transform||"transform");c.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:l,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(u,this,!1))},c.transition=o.prototype[a?"_transition":"_nonTransition"],c.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},c.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};c.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,i=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[i],n(e.ingProperties)&&this.disableTransition(),i in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[i]),i in e.onEnd){var o=e.onEnd[i];o.call(this),delete e.onEnd[i]}this.emitEvent("transitionEnd",[this])}},c.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},c._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var m={transitionProperty:"",transitionDuration:""};return c.removeTransitionStyles=function(){this.css(m)},c.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},c.remove=function(){return a&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},c.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},c.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},c.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},c.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},c.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},c.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(a&&a.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++d;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}var a=t.console,h=t.jQuery,u=function(){},d=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var l=r.prototype;return n.extend(l,e.prototype),l.option=function(t){n.extend(this.options,t)},l._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},l._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},l.reloadItems=function(){this.items=this._itemize(this.element.children)},l._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},l._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},l.getItemElements=function(){return this.items.map(function(t){return t.element})},l.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},l._init=l.layout,l._resetLayout=function(){this.getSize()},l.getSize=function(){this.size=i(this.element)},l._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},l.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},l._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},l._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},l._getItemLayoutPosition=function(){return{x:0,y:0}},l._processLayoutQueue=function(t){t.forEach(function(t){this._positionItem(t.item,t.x,t.y,t.isInstant)},this)},l._positionItem=function(t,e,i,n){n?t.goTo(e,i):t.moveTo(e,i)},l._postLayout=function(){this.resizeContainer()},l.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},l._getContainerSize=u,l._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},l._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},l.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),h)if(this.$element=this.$element||h(this.element),e){var o=h.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},l.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},l.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},l.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},l.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},l._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},l._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},l._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},l._manageStamp=u,l._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},l.handleEvent=n.handleEvent,l.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},l.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},l.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),l.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},l.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},l.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},l.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},l.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},l.reveal=function(t){this._emitCompleteOnItems("reveal",t),t&&t.length&&t.forEach(function(t){t.reveal()})},l.hide=function(t){this._emitCompleteOnItems("hide",t),t&&t.length&&t.forEach(function(t){t.hide()})},l.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},l.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},l.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},l.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},l.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},l.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i},r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");return i.compatOptions.fitWidth="isFitWidth",i.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0},i.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},i.prototype.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},i.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this._getColGroup(n),r=Math.min.apply(Math,o),s=o.indexOf(r),a={x:this.columnWidth*s,y:r},h=r+t.size.outerHeight,u=this.cols+1-o.length,d=0;u>d;d++)this.colYs[s+d]=h;return a},i.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},i.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,c=a;h>=c;c++)this.colYs[c]=Math.max(d,this.colYs[c])},i.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},i.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},i.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});
/*===========================================end Blog======================================================*/

/*===========================================Gallery======================================================*/

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */
(function(d){function e(a){var b=a||window.event,c=[].slice.call(arguments,1),f=0,e=0,g=0,a=d.event.fix(b);a.type="mousewheel";b.wheelDelta&&(f=b.wheelDelta/120);b.detail&&(f=-b.detail/3);g=f;b.axis!==void 0&&b.axis===b.HORIZONTAL_AXIS&&(g=0,e=-1*f);b.wheelDeltaY!==void 0&&(g=b.wheelDeltaY/120);b.wheelDeltaX!==void 0&&(e=-1*b.wheelDeltaX/120);c.unshift(a,f,e,g);return(d.event.dispatch||d.event.handle).apply(this,c)}var c=["DOMMouseScroll","mousewheel"];if(d.event.fixHooks)for(var h=c.length;h;)d.event.fixHooks[c[--h]]=
    d.event.mouseHooks;d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=c.length;a;)this.addEventListener(c[--a],e,false);else this.onmousewheel=e},teardown:function(){if(this.removeEventListener)for(var a=c.length;a;)this.removeEventListener(c[--a],e,false);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);

/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
        width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
        keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
            (I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
        openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
    isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,
        c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&
        k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||
    b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=
        setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;
        d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=
        a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),
        b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),
        y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;
        if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&
        (h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
        {},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,
        mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=
        !0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");
        "image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=
        this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);
        f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,
        e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,
        outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",
        g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":
        "no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?
        h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||
        h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&
    "iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();
        y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&
    !a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),
        b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=
        a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):
        (c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===
    f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,
        {duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=
        b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=
        f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?
        b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),
    p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===
        f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=
        b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,
    e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+
    ":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===
    d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);

/*===========================================end Gallery======================================================*/

/*===========================================product list 2======================================================*/
///////////////////////////// REGION: BC catalogue list dump to multilevel meny reformatter /////////////////////////////////////////
/*
 USAGE:
 $('.catalogueitemdump').reformatLinkCataloguesStructure(
 {
 removeOld          : true,
 parentNodeClass    : 'parentNode',
 nodeElementClass   : 'nodeElement',
 nodeLinkClass      : 'nodeLink',
 parentTag : 'ul',
 nodeElementTag: 'li'
 });
 */
(function(e){e.fn.reformatLinkCataloguesStructure=function(t){t=t==null?{}:t;var n=e(this);var r={cataloguesTree:{link:"",text:"",children:null},options:{},getMultiLevelList:function(t,n){this.options=e.extend({parentNodeClass:"parentNode",nodeElementClass:"nodeElement",nodeLinkClass:"nodeLink",parentTag:"ul",nodeElementTag:"li"},n);t.find("a").each(function(){var t=e(this).attr("href");var n=t.split("/");n=n.clean("");r.cataloguesTree=r.getSubNode(r.cataloguesTree,n,e(this).text())});return r.getMultiList(r.cataloguesTree,0)},getSubNode:function(e,t,n){if(e.children==null){e.children=[]}if(t.length==0){e.text=n;if(typeof e.children=="undefined"){e.children=null}return e}var i=e.link;var s=t[0];i+="/"+s;if(typeof e.children[s]=="undefined"){e.children[s]=new Object}t.shift();e.children[s].link=i;e.children[s]=r.getSubNode(e.children[s],t,n);return e},getMultiList:function(e,t){var n="";if(e.children==null){return n}var i=this.options.parentTag;var s=this.options.nodeElementTag;n+="<"+i+' class="'+this.options.parentNodeClass+" level"+t+'">';var o="";for(var u in e.children){var a=e.children[u];if(typeof a=="object"){o+="<"+s+' class="'+this.options.nodeElementClass+" level"+t+'">';o+='<a class="'+this.options.nodeLinkClass+'" href="'+a.link+'">';o+=a.text;o+="</a>";o+=r.getMultiList(a,t+1);o+="</"+s+">"}}if(o==""){return""}n+=o;n+="</"+i+">";return n}};var i=r.getMultiLevelList(n,t);n.after(i);if(t!=null&&t.removeOld!=false){n.remove()}};if(typeof Array.prototype.clean=="undefined"){Array.prototype.clean=function(e){for(var t=0;t<this.length;t++){if(this[t]==e){this.splice(t,1);t--}}return this}}})(jQuery);
///////////////////////////// ENDREGION: BC catalogue list dump to multilevel meny reformatter /////////////////////////////////////////
/*===========================================end product list 2======================================================*/

/*=========================================== Home 2, Gallery, Product Detail, web app 3 ====================================================*/
;(function($) {

    var defaults = {

        // GENERAL
        mode: 'horizontal',
        slideSelector: '',
        infiniteLoop: true,
        hideControlOnEnd: false,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: false,
        captions: false,
        ticker: false,
        tickerHover: false,
        adaptiveHeight: false,
        adaptiveHeightSpeed: 500,
        video: false,
        useCSS: true,
        preloadImages: 'visible',
        responsive: true,
        slideZIndex: 50,
        wrapperClass: 'bx-wrapper',

        // TOUCH
        touchEnabled: true,
        swipeThreshold: 50,
        oneToOneTouch: true,
        preventDefaultSwipeX: true,
        preventDefaultSwipeY: false,

        // ACCESSIBILITY
        ariaLive: true,
        ariaHidden: true,

        // KEYBOARD
        keyboardEnabled: false,

        // PAGER
        pager: true,
        pagerType: 'full',
        pagerShortSeparator: ' / ',
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,

        // CONTROLS
        controls: true,
        nextText: 'Next',
        prevText: 'Prev',
        nextSelector: null,
        prevSelector: null,
        autoControls: false,
        startText: 'Start',
        stopText: 'Stop',
        autoControlsCombine: false,
        autoControlsSelector: null,

        // AUTO
        auto: false,
        pause: 4000,
        autoStart: true,
        autoDirection: 'next',
        stopAutoOnClick: false,
        autoHover: false,
        autoDelay: 0,
        autoSlideForOnePage: false,

        // CAROUSEL
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        shrinkItems: false,

        // CALLBACKS
        onSliderLoad: function() { return true; },
        onSlideBefore: function() { return true; },
        onSlideAfter: function() { return true; },
        onSlideNext: function() { return true; },
        onSlidePrev: function() { return true; },
        onSliderResize: function() { return true; }
    };

    $.fn.bxSlider = function(options) {

        if (this.length === 0) {
            return this;
        }

        // support multiple elements
        if (this.length > 1) {
            this.each(function() {
                $(this).bxSlider(options);
            });
            return this;
        }

        // create a namespace to be used throughout the plugin
        var slider = {},
            // set a reference to our slider element
            el = this,
            // get the original window dimens (thanks a lot IE)
            windowWidth = $(window).width(),
            windowHeight = $(window).height();

        // Return if slider is already initialized
        if ($(el).data('bxSlider')) { return; }

        /**
         * ===================================================================================
         * = PRIVATE FUNCTIONS
         * ===================================================================================
         */

        /**
         * Initializes namespace settings to be used throughout plugin
         */
        var init = function() {
            // Return if slider is already initialized
            if ($(el).data('bxSlider')) { return; }
            // merge user-supplied options with the defaults
            slider.settings = $.extend({}, defaults, options);
            // parse slideWidth setting
            slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
            // store the original children
            slider.children = el.children(slider.settings.slideSelector);
            // check if actual number of slides is less than minSlides / maxSlides
            if (slider.children.length < slider.settings.minSlides) { slider.settings.minSlides = slider.children.length; }
            if (slider.children.length < slider.settings.maxSlides) { slider.settings.maxSlides = slider.children.length; }
            // if random start, set the startSlide setting to random number
            if (slider.settings.randomStart) { slider.settings.startSlide = Math.floor(Math.random() * slider.children.length); }
            // store active slide information
            slider.active = { index: slider.settings.startSlide };
            // store if the slider is in carousel mode (displaying / moving multiple slides)
            slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1 ? true : false;
            // if carousel, force preloadImages = 'all'
            if (slider.carousel) { slider.settings.preloadImages = 'all'; }
            // calculate the min / max width thresholds based on min / max number of slides
            // used to setup and update carousel slides dimensions
            slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
            slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
            // store the current state of the slider (if currently animating, working is true)
            slider.working = false;
            // initialize the controls object
            slider.controls = {};
            // initialize an auto interval
            slider.interval = null;
            // determine which property to use for transitions
            slider.animProp = slider.settings.mode === 'vertical' ? 'top' : 'left';
            // determine if hardware acceleration can be used
            slider.usingCSS = slider.settings.useCSS && slider.settings.mode !== 'fade' && (function() {
                // create our test div element
                var div = document.createElement('div'),
                    // css transition properties
                    props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                // test for each property
                for (var i = 0; i < props.length; i++) {
                    if (div.style[props[i]] !== undefined) {
                        slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
                        slider.animProp = '-' + slider.cssPrefix + '-transform';
                        return true;
                    }
                }
                return false;
            }());
            // if vertical mode always make maxSlides and minSlides equal
            if (slider.settings.mode === 'vertical') { slider.settings.maxSlides = slider.settings.minSlides; }
            // save original style data
            el.data('origStyle', el.attr('style'));
            el.children(slider.settings.slideSelector).each(function() {
                $(this).data('origStyle', $(this).attr('style'));
            });

            // perform all DOM / CSS modifications
            setup();
        };

        /**
         * Performs all DOM and CSS modifications
         */
        var setup = function() {
            var preloadSelector = slider.children.eq(slider.settings.startSlide); // set the default preload selector (visible)

            // wrap el in a wrapper
            el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
            // store a namespace reference to .bx-viewport
            slider.viewport = el.parent();

            // add aria-live if the setting is enabled and ticker mode is disabled
            if (slider.settings.ariaLive && !slider.settings.ticker) {
                slider.viewport.attr('aria-live', 'polite');
            }
            // add a loading div to display while images are loading
            slider.loader = $('<div class="bx-loading" />');
            slider.viewport.prepend(slider.loader);
            // set el to a massive width, to hold any needed slides
            // also strip any margin and padding from el
            el.css({
                width: slider.settings.mode === 'horizontal' ? (slider.children.length * 1000 + 215) + '%' : 'auto',
                position: 'relative'
            });
            // if using CSS, add the easing property
            if (slider.usingCSS && slider.settings.easing) {
                el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
                // if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
            } else if (!slider.settings.easing) {
                slider.settings.easing = 'swing';
            }
            // make modifications to the viewport (.bx-viewport)
            slider.viewport.css({
                width: '100%',
                overflow: 'hidden',
                position: 'relative'
            });
            slider.viewport.parent().css({
                maxWidth: getViewportMaxWidth()
            });
            // make modification to the wrapper (.bx-wrapper)
            if (!slider.settings.pager && !slider.settings.controls) {
                slider.viewport.parent().css({
                    margin: '0 auto 0px'
                });
            }
            // apply css to all slider children
            slider.children.css({
                float: slider.settings.mode === 'horizontal' ? 'left' : 'none',
                listStyle: 'none',
                position: 'relative'
            });
            // apply the calculated width after the float is applied to prevent scrollbar interference
            slider.children.css('width', getSlideWidth());
            // if slideMargin is supplied, add the css
            if (slider.settings.mode === 'horizontal' && slider.settings.slideMargin > 0) { slider.children.css('marginRight', slider.settings.slideMargin); }
            if (slider.settings.mode === 'vertical' && slider.settings.slideMargin > 0) { slider.children.css('marginBottom', slider.settings.slideMargin); }
            // if "fade" mode, add positioning and z-index CSS
            if (slider.settings.mode === 'fade') {
                slider.children.css({
                    position: 'absolute',
                    zIndex: 0,
                    display: 'none'
                });
                // prepare the z-index on the showing element
                slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
            }
            // create an element to contain all slider controls (pager, start / stop, etc)
            slider.controls.el = $('<div class="bx-controls" />');
            // if captions are requested, add them
            if (slider.settings.captions) { appendCaptions(); }
            // check if startSlide is last slide
            slider.active.last = slider.settings.startSlide === getPagerQty() - 1;
            // if video is true, set up the fitVids plugin
            if (slider.settings.video) { el.fitVids(); }
            if (slider.settings.preloadImages === 'all' || slider.settings.ticker) { preloadSelector = slider.children; }
            // only check for control addition if not in "ticker" mode
            if (!slider.settings.ticker) {
                // if controls are requested, add them
                if (slider.settings.controls) { appendControls(); }
                // if auto is true, and auto controls are requested, add them
                if (slider.settings.auto && slider.settings.autoControls) { appendControlsAuto(); }
                // if pager is requested, add it
                if (slider.settings.pager) { appendPager(); }
                // if any control option is requested, add the controls wrapper
                if (slider.settings.controls || slider.settings.autoControls || slider.settings.pager) { slider.viewport.after(slider.controls.el); }
                // if ticker mode, do not allow a pager
            } else {
                slider.settings.pager = false;
            }
            loadElements(preloadSelector, start);
        };

        var loadElements = function(selector, callback) {
            var total = selector.find('img:not([src=""]), iframe').length,
                count = 0;
            if (total === 0) {
                callback();
                return;
            }
            selector.find('img:not([src=""]), iframe').each(function() {
                $(this).one('load error', function() {
                    if (++count === total) { callback(); }
                }).each(function() {
                    if (this.complete) { $(this).load(); }
                });
            });
        };

        /**
         * Start the slider
         */
        var start = function() {
            // if infinite loop, prepare additional slides
            if (slider.settings.infiniteLoop && slider.settings.mode !== 'fade' && !slider.settings.ticker) {
                var slice    = slider.settings.mode === 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides,
                    sliceAppend  = slider.children.slice(0, slice).clone(true).addClass('bx-clone'),
                    slicePrepend = slider.children.slice(-slice).clone(true).addClass('bx-clone');
                if (slider.settings.ariaHidden) {
                    sliceAppend.attr('aria-hidden', true);
                    slicePrepend.attr('aria-hidden', true);
                }
                el.append(sliceAppend).prepend(slicePrepend);
            }
            // remove the loading DOM element
            slider.loader.remove();
            // set the left / top position of "el"
            setSlidePosition();
            // if "vertical" mode, always use adaptiveHeight to prevent odd behavior
            if (slider.settings.mode === 'vertical') { slider.settings.adaptiveHeight = true; }
            // set the viewport height
            slider.viewport.height(getViewportHeight());
            // make sure everything is positioned just right (same as a window resize)
            el.redrawSlider();
            // onSliderLoad callback
            slider.settings.onSliderLoad.call(el, slider.active.index);
            // slider has been fully initialized
            slider.initialized = true;
            // bind the resize call to the window
            if (slider.settings.responsive) { $(window).bind('resize', resizeWindow); }
            // if auto is true and has more than 1 page, start the show
            if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) { initAuto(); }
            // if ticker is true, start the ticker
            if (slider.settings.ticker) { initTicker(); }
            // if pager is requested, make the appropriate pager link active
            if (slider.settings.pager) { updatePagerActive(slider.settings.startSlide); }
            // check for any updates to the controls (like hideControlOnEnd updates)
            if (slider.settings.controls) { updateDirectionControls(); }
            // if touchEnabled is true, setup the touch events
            if (slider.settings.touchEnabled && !slider.settings.ticker) { initTouch(); }
            // if keyboardEnabled is true, setup the keyboard events
            if (slider.settings.keyboardEnabled && !slider.settings.ticker) {
                $(document).keydown(keyPress);
            }
        };

        /**
         * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
         */
        var getViewportHeight = function() {
            var height = 0;
            // first determine which children (slides) should be used in our height calculation
            var children = $();
            // if mode is not "vertical" and adaptiveHeight is false, include all children
            if (slider.settings.mode !== 'vertical' && !slider.settings.adaptiveHeight) {
                children = slider.children;
            } else {
                // if not carousel, return the single active child
                if (!slider.carousel) {
                    children = slider.children.eq(slider.active.index);
                    // if carousel, return a slice of children
                } else {
                    // get the individual slide index
                    var currentIndex = slider.settings.moveSlides === 1 ? slider.active.index : slider.active.index * getMoveBy();
                    // add the current slide to the children
                    children = slider.children.eq(currentIndex);
                    // cycle through the remaining "showing" slides
                    for (i = 1; i <= slider.settings.maxSlides - 1; i++) {
                        // if looped back to the start
                        if (currentIndex + i >= slider.children.length) {
                            children = children.add(slider.children.eq(i - 1));
                        } else {
                            children = children.add(slider.children.eq(currentIndex + i));
                        }
                    }
                }
            }
            // if "vertical" mode, calculate the sum of the heights of the children
            if (slider.settings.mode === 'vertical') {
                children.each(function(index) {
                    height += $(this).outerHeight();
                });
                // add user-supplied margins
                if (slider.settings.slideMargin > 0) {
                    height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
                }
                // if not "vertical" mode, calculate the max height of the children
            } else {
                height = Math.max.apply(Math, children.map(function() {
                    return $(this).outerHeight(false);
                }).get());
            }

            if (slider.viewport.css('box-sizing') === 'border-box') {
                height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
                    parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
            } else if (slider.viewport.css('box-sizing') === 'padding-box') {
                height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
            }

            return height;
        };

        /**
         * Returns the calculated width to be used for the outer wrapper / viewport
         */
        var getViewportMaxWidth = function() {
            var width = '100%';
            if (slider.settings.slideWidth > 0) {
                if (slider.settings.mode === 'horizontal') {
                    width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
                } else {
                    width = slider.settings.slideWidth;
                }
            }
            return width;
        };

        /**
         * Returns the calculated width to be applied to each slide
         */
        var getSlideWidth = function() {
            var newElWidth = slider.settings.slideWidth, // start with any user-supplied slide width
                wrapWidth      = slider.viewport.width();    // get the current viewport width
            // if slide width was not supplied, or is larger than the viewport use the viewport width
            if (slider.settings.slideWidth === 0 ||
                (slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
                slider.settings.mode === 'vertical') {
                newElWidth = wrapWidth;
                // if carousel, use the thresholds to determine the width
            } else if (slider.settings.maxSlides > 1 && slider.settings.mode === 'horizontal') {
                if (wrapWidth > slider.maxThreshold) {
                    return newElWidth;
                } else if (wrapWidth < slider.minThreshold) {
                    newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
                } else if (slider.settings.shrinkItems) {
                    newElWidth = Math.floor((wrapWidth + slider.settings.slideMargin) / (Math.ceil((wrapWidth + slider.settings.slideMargin) / (newElWidth + slider.settings.slideMargin))) - slider.settings.slideMargin);
                }
            }
            return newElWidth;
        };

        /**
         * Returns the number of slides currently visible in the viewport (includes partially visible slides)
         */
        var getNumberSlidesShowing = function() {
            var slidesShowing = 1,
                childWidth = null;
            if (slider.settings.mode === 'horizontal' && slider.settings.slideWidth > 0) {
                // if viewport is smaller than minThreshold, return minSlides
                if (slider.viewport.width() < slider.minThreshold) {
                    slidesShowing = slider.settings.minSlides;
                    // if viewport is larger than maxThreshold, return maxSlides
                } else if (slider.viewport.width() > slider.maxThreshold) {
                    slidesShowing = slider.settings.maxSlides;
                    // if viewport is between min / max thresholds, divide viewport width by first child width
                } else {
                    childWidth = slider.children.first().width() + slider.settings.slideMargin;
                    slidesShowing = Math.floor((slider.viewport.width() +
                        slider.settings.slideMargin) / childWidth);
                }
                // if "vertical" mode, slides showing will always be minSlides
            } else if (slider.settings.mode === 'vertical') {
                slidesShowing = slider.settings.minSlides;
            }
            return slidesShowing;
        };

        /**
         * Returns the number of pages (one full viewport of slides is one "page")
         */
        var getPagerQty = function() {
            var pagerQty = 0,
                breakPoint = 0,
                counter = 0;
            // if moveSlides is specified by the user
            if (slider.settings.moveSlides > 0) {
                if (slider.settings.infiniteLoop) {
                    pagerQty = Math.ceil(slider.children.length / getMoveBy());
                } else {
                    // when breakpoint goes above children length, counter is the number of pages
                    while (breakPoint < slider.children.length) {
                        ++pagerQty;
                        breakPoint = counter + getNumberSlidesShowing();
                        counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
                    }
                }
                // if moveSlides is 0 (auto) divide children length by sides showing, then round up
            } else {
                pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
            }
            return pagerQty;
        };

        /**
         * Returns the number of individual slides by which to shift the slider
         */
        var getMoveBy = function() {
            // if moveSlides was set by the user and moveSlides is less than number of slides showing
            if (slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()) {
                return slider.settings.moveSlides;
            }
            // if moveSlides is 0 (auto)
            return getNumberSlidesShowing();
        };

        /**
         * Sets the slider's (el) left or top position
         */
        var setSlidePosition = function() {
            var position, lastChild, lastShowingIndex;
            // if last slide, not infinite loop, and number of children is larger than specified maxSlides
            if (slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop) {
                if (slider.settings.mode === 'horizontal') {
                    // get the last child's position
                    lastChild = slider.children.last();
                    position = lastChild.position();
                    // set the left position
                    setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
                } else if (slider.settings.mode === 'vertical') {
                    // get the last showing index's position
                    lastShowingIndex = slider.children.length - slider.settings.minSlides;
                    position = slider.children.eq(lastShowingIndex).position();
                    // set the top position
                    setPositionProperty(-position.top, 'reset', 0);
                }
                // if not last slide
            } else {
                // get the position of the first showing slide
                position = slider.children.eq(slider.active.index * getMoveBy()).position();
                // check for last slide
                if (slider.active.index === getPagerQty() - 1) { slider.active.last = true; }
                // set the respective position
                if (position !== undefined) {
                    if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
                    else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
                }
            }
        };

        /**
         * Sets the el's animating property position (which in turn will sometimes animate el).
         * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
         *
         * @param value (int)
         *  - the animating property's value
         *
         * @param type (string) 'slide', 'reset', 'ticker'
         *  - the type of instance for which the function is being
         *
         * @param duration (int)
         *  - the amount of time (in ms) the transition should occupy
         *
         * @param params (array) optional
         *  - an optional parameter containing any variables that need to be passed in
         */
        var setPositionProperty = function(value, type, duration, params) {
            var animateObj, propValue;
            // use CSS transform
            if (slider.usingCSS) {
                // determine the translate3d value
                propValue = slider.settings.mode === 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
                // add the CSS transition-duration
                el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
                if (type === 'slide') {
                    // set the property value
                    el.css(slider.animProp, propValue);
                    if (duration !== 0) {
                        // bind a callback method - executes when CSS transition completes
                        el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                            //make sure it's the correct one
                            if (!$(e.target).is(el)) { return; }
                            // unbind the callback
                            el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
                            updateAfterSlideTransition();
                        });
                    } else { //duration = 0
                        updateAfterSlideTransition();
                    }
                } else if (type === 'reset') {
                    el.css(slider.animProp, propValue);
                } else if (type === 'ticker') {
                    // make the transition use 'linear'
                    el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
                    el.css(slider.animProp, propValue);
                    if (duration !== 0) {
                        el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                            //make sure it's the correct one
                            if (!$(e.target).is(el)) { return; }
                            // unbind the callback
                            el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
                            // reset the position
                            setPositionProperty(params.resetValue, 'reset', 0);
                            // start the loop again
                            tickerLoop();
                        });
                    } else { //duration = 0
                        setPositionProperty(params.resetValue, 'reset', 0);
                        tickerLoop();
                    }
                }
                // use JS animate
            } else {
                animateObj = {};
                animateObj[slider.animProp] = value;
                if (type === 'slide') {
                    el.animate(animateObj, duration, slider.settings.easing, function() {
                        updateAfterSlideTransition();
                    });
                } else if (type === 'reset') {
                    el.css(slider.animProp, value);
                } else if (type === 'ticker') {
                    el.animate(animateObj, duration, 'linear', function() {
                        setPositionProperty(params.resetValue, 'reset', 0);
                        // run the recursive loop after animation
                        tickerLoop();
                    });
                }
            }
        };

        /**
         * Populates the pager with proper amount of pages
         */
        var populatePager = function() {
            var pagerHtml = '',
                linkContent = '',
                pagerQty = getPagerQty();
            // loop through each pager item
            for (var i = 0; i < pagerQty; i++) {
                linkContent = '';
                // if a buildPager function is supplied, use it to get pager link value, else use index + 1
                if (slider.settings.buildPager && $.isFunction(slider.settings.buildPager) || slider.settings.pagerCustom) {
                    linkContent = slider.settings.buildPager(i);
                    slider.pagerEl.addClass('bx-custom-pager');
                } else {
                    linkContent = i + 1;
                    slider.pagerEl.addClass('bx-default-pager');
                }
                // var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
                // add the markup to the string
                pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
            }
            // populate the pager element with pager links
            slider.pagerEl.html(pagerHtml);
        };

        /**
         * Appends the pager to the controls element
         */
        var appendPager = function() {
            if (!slider.settings.pagerCustom) {
                // create the pager DOM element
                slider.pagerEl = $('<div class="bx-pager" />');
                // if a pager selector was supplied, populate it with the pager
                if (slider.settings.pagerSelector) {
                    $(slider.settings.pagerSelector).html(slider.pagerEl);
                    // if no pager selector was supplied, add it after the wrapper
                } else {
                    slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
                }
                // populate the pager
                populatePager();
            } else {
                slider.pagerEl = $(slider.settings.pagerCustom);
            }
            // assign the pager click binding
            slider.pagerEl.on('click touchend', 'a', clickPagerBind);
        };

        /**
         * Appends prev / next controls to the controls element
         */
        var appendControls = function() {
            slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
            slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
            // bind click actions to the controls
            slider.controls.next.bind('click touchend', clickNextBind);
            slider.controls.prev.bind('click touchend', clickPrevBind);
            // if nextSelector was supplied, populate it
            if (slider.settings.nextSelector) {
                $(slider.settings.nextSelector).append(slider.controls.next);
            }
            // if prevSelector was supplied, populate it
            if (slider.settings.prevSelector) {
                $(slider.settings.prevSelector).append(slider.controls.prev);
            }
            // if no custom selectors were supplied
            if (!slider.settings.nextSelector && !slider.settings.prevSelector) {
                // add the controls to the DOM
                slider.controls.directionEl = $('<div class="bx-controls-direction" />');
                // add the control elements to the directionEl
                slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
                // slider.viewport.append(slider.controls.directionEl);
                slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
            }
        };

        /**
         * Appends start / stop auto controls to the controls element
         */
        var appendControlsAuto = function() {
            slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
            slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
            // add the controls to the DOM
            slider.controls.autoEl = $('<div class="bx-controls-auto" />');
            // bind click actions to the controls
            slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
            slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
            // if autoControlsCombine, insert only the "start" control
            if (slider.settings.autoControlsCombine) {
                slider.controls.autoEl.append(slider.controls.start);
                // if autoControlsCombine is false, insert both controls
            } else {
                slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
            }
            // if auto controls selector was supplied, populate it with the controls
            if (slider.settings.autoControlsSelector) {
                $(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
                // if auto controls selector was not supplied, add it after the wrapper
            } else {
                slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
            }
            // update the auto controls
            updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
        };

        /**
         * Appends image captions to the DOM
         */
        var appendCaptions = function() {
            // cycle through each child
            slider.children.each(function(index) {
                // get the image title attribute
                var title = $(this).find('img:first').attr('title');
                // append the caption
                if (title !== undefined && ('' + title).length) {
                    $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
                }
            });
        };

        /**
         * Click next binding
         *
         * @param e (event)
         *  - DOM event object
         */
        var clickNextBind = function(e) {
            e.preventDefault();
            if (slider.controls.el.hasClass('disabled')) { return; }
            // if auto show is running, stop it
            if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
            el.goToNextSlide();
        };

        /**
         * Click prev binding
         *
         * @param e (event)
         *  - DOM event object
         */
        var clickPrevBind = function(e) {
            e.preventDefault();
            if (slider.controls.el.hasClass('disabled')) { return; }
            // if auto show is running, stop it
            if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
            el.goToPrevSlide();
        };

        /**
         * Click start binding
         *
         * @param e (event)
         *  - DOM event object
         */
        var clickStartBind = function(e) {
            el.startAuto();
            e.preventDefault();
        };

        /**
         * Click stop binding
         *
         * @param e (event)
         *  - DOM event object
         */
        var clickStopBind = function(e) {
            el.stopAuto();
            e.preventDefault();
        };

        /**
         * Click pager binding
         *
         * @param e (event)
         *  - DOM event object
         */
        var clickPagerBind = function(e) {
            var pagerLink, pagerIndex;
            e.preventDefault();
            if (slider.controls.el.hasClass('disabled')) {
                return;
            }
            // if auto show is running, stop it
            if (slider.settings.auto  && slider.settings.stopAutoOnClick) { el.stopAuto(); }
            pagerLink = $(e.currentTarget);
            if (pagerLink.attr('data-slide-index') !== undefined) {
                pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
                // if clicked pager link is not active, continue with the goToSlide call
                if (pagerIndex !== slider.active.index) { el.goToSlide(pagerIndex); }
            }
        };

        /**
         * Updates the pager links with an active class
         *
         * @param slideIndex (int)
         *  - index of slide to make active
         */
        var updatePagerActive = function(slideIndex) {
            // if "short" pager type
            var len = slider.children.length; // nb of children
            if (slider.settings.pagerType === 'short') {
                if (slider.settings.maxSlides > 1) {
                    len = Math.ceil(slider.children.length / slider.settings.maxSlides);
                }
                slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + len);
                return;
            }
            // remove all pager active classes
            slider.pagerEl.find('a').removeClass('active');
            // apply the active class for all pagers
            slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
        };

        /**
         * Performs needed actions after a slide transition
         */
        var updateAfterSlideTransition = function() {
            // if infinite loop is true
            if (slider.settings.infiniteLoop) {
                var position = '';
                // first slide
                if (slider.active.index === 0) {
                    // set the new position
                    position = slider.children.eq(0).position();
                    // carousel, last slide
                } else if (slider.active.index === getPagerQty() - 1 && slider.carousel) {
                    position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
                    // last slide
                } else if (slider.active.index === slider.children.length - 1) {
                    position = slider.children.eq(slider.children.length - 1).position();
                }
                if (position) {
                    if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
                    else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
                }
            }
            // declare that the transition is complete
            slider.working = false;
            // onSlideAfter callback
            slider.settings.onSlideAfter.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
        };

        /**
         * Updates the auto controls state (either active, or combined switch)
         *
         * @param state (string) "start", "stop"
         *  - the new state of the auto show
         */
        var updateAutoControls = function(state) {
            // if autoControlsCombine is true, replace the current control with the new state
            if (slider.settings.autoControlsCombine) {
                slider.controls.autoEl.html(slider.controls[state]);
                // if autoControlsCombine is false, apply the "active" class to the appropriate control
            } else {
                slider.controls.autoEl.find('a').removeClass('active');
                slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
            }
        };

        /**
         * Updates the direction controls (checks if either should be hidden)
         */
        var updateDirectionControls = function() {
            if (getPagerQty() === 1) {
                slider.controls.prev.addClass('disabled');
                slider.controls.next.addClass('disabled');
            } else if (!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd) {
                // if first slide
                if (slider.active.index === 0) {
                    slider.controls.prev.addClass('disabled');
                    slider.controls.next.removeClass('disabled');
                    // if last slide
                } else if (slider.active.index === getPagerQty() - 1) {
                    slider.controls.next.addClass('disabled');
                    slider.controls.prev.removeClass('disabled');
                    // if any slide in the middle
                } else {
                    slider.controls.prev.removeClass('disabled');
                    slider.controls.next.removeClass('disabled');
                }
            }
        };

        /**
         * Initializes the auto process
         */
        var initAuto = function() {
            // if autoDelay was supplied, launch the auto show using a setTimeout() call
            if (slider.settings.autoDelay > 0) {
                var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
                // if autoDelay was not supplied, start the auto show normally
            } else {
                el.startAuto();

                //add focus and blur events to ensure its running if timeout gets paused
                $(window).focus(function() {
                    el.startAuto();
                }).blur(function() {
                    el.stopAuto();
                });
            }
            // if autoHover is requested
            if (slider.settings.autoHover) {
                // on el hover
                el.hover(function() {
                    // if the auto show is currently playing (has an active interval)
                    if (slider.interval) {
                        // stop the auto show and pass true argument which will prevent control update
                        el.stopAuto(true);
                        // create a new autoPaused value which will be used by the relative "mouseout" event
                        slider.autoPaused = true;
                    }
                }, function() {
                    // if the autoPaused value was created be the prior "mouseover" event
                    if (slider.autoPaused) {
                        // start the auto show and pass true argument which will prevent control update
                        el.startAuto(true);
                        // reset the autoPaused value
                        slider.autoPaused = null;
                    }
                });
            }
        };

        /**
         * Initializes the ticker process
         */
        var initTicker = function() {
            var startPosition = 0,
                position, transform, value, idx, ratio, property, newSpeed, totalDimens;
            // if autoDirection is "next", append a clone of the entire slider
            if (slider.settings.autoDirection === 'next') {
                el.append(slider.children.clone().addClass('bx-clone'));
                // if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
            } else {
                el.prepend(slider.children.clone().addClass('bx-clone'));
                position = slider.children.first().position();
                startPosition = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
            }
            setPositionProperty(startPosition, 'reset', 0);
            // do not allow controls in ticker mode
            slider.settings.pager = false;
            slider.settings.controls = false;
            slider.settings.autoControls = false;
            // if autoHover is requested
            if (slider.settings.tickerHover) {
                if (slider.usingCSS) {
                    idx = slider.settings.mode === 'horizontal' ? 4 : 5;
                    slider.viewport.hover(function() {
                        transform = el.css('-' + slider.cssPrefix + '-transform');
                        value = parseFloat(transform.split(',')[idx]);
                        setPositionProperty(value, 'reset', 0);
                    }, function() {
                        totalDimens = 0;
                        slider.children.each(function(index) {
                            totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
                        });
                        // calculate the speed ratio (used to determine the new speed to finish the paused animation)
                        ratio = slider.settings.speed / totalDimens;
                        // determine which property to use
                        property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
                        // calculate the new speed
                        newSpeed = ratio * (totalDimens - (Math.abs(parseInt(value))));
                        tickerLoop(newSpeed);
                    });
                } else {
                    // on el hover
                    slider.viewport.hover(function() {
                        el.stop();
                    }, function() {
                        // calculate the total width of children (used to calculate the speed ratio)
                        totalDimens = 0;
                        slider.children.each(function(index) {
                            totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
                        });
                        // calculate the speed ratio (used to determine the new speed to finish the paused animation)
                        ratio = slider.settings.speed / totalDimens;
                        // determine which property to use
                        property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
                        // calculate the new speed
                        newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
                        tickerLoop(newSpeed);
                    });
                }
            }
            // start the ticker loop
            tickerLoop();
        };

        /**
         * Runs a continuous loop, news ticker-style
         */
        var tickerLoop = function(resumeSpeed) {
            var speed = resumeSpeed ? resumeSpeed : slider.settings.speed,
                position = {left: 0, top: 0},
                reset = {left: 0, top: 0},
                animateProperty, resetValue, params;

            // if "next" animate left position to last child, then reset left to 0
            if (slider.settings.autoDirection === 'next') {
                position = el.find('.bx-clone').first().position();
                // if "prev" animate left position to 0, then reset left to first non-clone child
            } else {
                reset = slider.children.first().position();
            }
            animateProperty = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
            resetValue = slider.settings.mode === 'horizontal' ? -reset.left : -reset.top;
            params = {resetValue: resetValue};
            setPositionProperty(animateProperty, 'ticker', speed, params);
        };

        /**
         * Check if el is on screen
         */
        var isOnScreen = function(el) {
            var win = $(window),
                viewport = {
                    top: win.scrollTop(),
                    left: win.scrollLeft()
                },
                bounds = el.offset();

            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();
            bounds.right = bounds.left + el.outerWidth();
            bounds.bottom = bounds.top + el.outerHeight();

            return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
        };

        /**
         * Initializes keyboard events
         */
        var keyPress = function(e) {
            var activeElementTag = document.activeElement.tagName.toLowerCase(),
                tagFilters = 'input|textarea',
                p = new RegExp(activeElementTag,['i']),
                result = p.exec(tagFilters);

            if (result == null && isOnScreen(el)) {
                if (e.keyCode === 39) {
                    clickNextBind(e);
                    return false;
                } else if (e.keyCode === 37) {
                    clickPrevBind(e);
                    return false;
                }
            }
        };

        /**
         * Initializes touch events
         */
        var initTouch = function() {
            // initialize object to contain all touch values
            slider.touch = {
                start: {x: 0, y: 0},
                end: {x: 0, y: 0}
            };
            slider.viewport.bind('touchstart MSPointerDown pointerdown', onTouchStart);

            //for browsers that have implemented pointer events and fire a click after
            //every pointerup regardless of whether pointerup is on same screen location as pointerdown or not
            slider.viewport.on('click', '.bxslider a', function(e) {
                if (slider.viewport.hasClass('click-disabled')) {
                    e.preventDefault();
                    slider.viewport.removeClass('click-disabled');
                }
            });
        };

        /**
         * Event handler for "touchstart"
         *
         * @param e (event)
         *  - DOM event object
         */
        var onTouchStart = function(e) {
            //disable slider controls while user is interacting with slides to avoid slider freeze that happens on touch devices when a slide swipe happens immediately after interacting with slider controls
            slider.controls.el.addClass('disabled');

            if (slider.working) {
                e.preventDefault();
                slider.controls.el.removeClass('disabled');
            } else {
                // record the original position when touch starts
                slider.touch.originalPos = el.position();
                var orig = e.originalEvent,
                    touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig];
                // record the starting touch x, y coordinates
                slider.touch.start.x = touchPoints[0].pageX;
                slider.touch.start.y = touchPoints[0].pageY;

                if (slider.viewport.get(0).setPointerCapture) {
                    slider.pointerId = orig.pointerId;
                    slider.viewport.get(0).setPointerCapture(slider.pointerId);
                }
                // bind a "touchmove" event to the viewport
                slider.viewport.bind('touchmove MSPointerMove pointermove', onTouchMove);
                // bind a "touchend" event to the viewport
                slider.viewport.bind('touchend MSPointerUp pointerup', onTouchEnd);
                slider.viewport.bind('MSPointerCancel pointercancel', onPointerCancel);
            }
        };

        /**
         * Cancel Pointer for Windows Phone
         *
         * @param e (event)
         *  - DOM event object
         */
        var onPointerCancel = function(e) {
            /* onPointerCancel handler is needed to deal with situations when a touchend
             doesn't fire after a touchstart (this happens on windows phones only) */
            setPositionProperty(slider.touch.originalPos.left, 'reset', 0);

            //remove handlers
            slider.controls.el.removeClass('disabled');
            slider.viewport.unbind('MSPointerCancel pointercancel', onPointerCancel);
            slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
            slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
            if (slider.viewport.get(0).releasePointerCapture) {
                slider.viewport.get(0).releasePointerCapture(slider.pointerId);
            }
        };

        /**
         * Event handler for "touchmove"
         *
         * @param e (event)
         *  - DOM event object
         */
        var onTouchMove = function(e) {
            var orig = e.originalEvent,
                touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
                // if scrolling on y axis, do not prevent default
                xMovement = Math.abs(touchPoints[0].pageX - slider.touch.start.x),
                yMovement = Math.abs(touchPoints[0].pageY - slider.touch.start.y),
                value = 0,
                change = 0;

            // x axis swipe
            if ((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX) {
                e.preventDefault();
                // y axis swipe
            } else if ((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY) {
                e.preventDefault();
            }
            if (slider.settings.mode !== 'fade' && slider.settings.oneToOneTouch) {
                // if horizontal, drag along x axis
                if (slider.settings.mode === 'horizontal') {
                    change = touchPoints[0].pageX - slider.touch.start.x;
                    value = slider.touch.originalPos.left + change;
                    // if vertical, drag along y axis
                } else {
                    change = touchPoints[0].pageY - slider.touch.start.y;
                    value = slider.touch.originalPos.top + change;
                }
                setPositionProperty(value, 'reset', 0);
            }
        };

        /**
         * Event handler for "touchend"
         *
         * @param e (event)
         *  - DOM event object
         */
        var onTouchEnd = function(e) {
            slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
            //enable slider controls as soon as user stops interacing with slides
            slider.controls.el.removeClass('disabled');
            var orig    = e.originalEvent,
                touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
                value       = 0,
                distance    = 0;
            // record end x, y positions
            slider.touch.end.x = touchPoints[0].pageX;
            slider.touch.end.y = touchPoints[0].pageY;
            // if fade mode, check if absolute x distance clears the threshold
            if (slider.settings.mode === 'fade') {
                distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
                if (distance >= slider.settings.swipeThreshold) {
                    if (slider.touch.start.x > slider.touch.end.x) {
                        el.goToNextSlide();
                    } else {
                        el.goToPrevSlide();
                    }
                    el.stopAuto();
                }
                // not fade mode
            } else {
                // calculate distance and el's animate property
                if (slider.settings.mode === 'horizontal') {
                    distance = slider.touch.end.x - slider.touch.start.x;
                    value = slider.touch.originalPos.left;
                } else {
                    distance = slider.touch.end.y - slider.touch.start.y;
                    value = slider.touch.originalPos.top;
                }
                // if not infinite loop and first / last slide, do not attempt a slide transition
                if (!slider.settings.infiniteLoop && ((slider.active.index === 0 && distance > 0) || (slider.active.last && distance < 0))) {
                    setPositionProperty(value, 'reset', 200);
                } else {
                    // check if distance clears threshold
                    if (Math.abs(distance) >= slider.settings.swipeThreshold) {
                        if (distance < 0) {
                            el.goToNextSlide();
                        } else {
                            el.goToPrevSlide();
                        }
                        el.stopAuto();
                    } else {
                        // el.animate(property, 200);
                        setPositionProperty(value, 'reset', 200);
                    }
                }
            }
            slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
            if (slider.viewport.get(0).releasePointerCapture) {
                slider.viewport.get(0).releasePointerCapture(slider.pointerId);
            }
        };

        /**
         * Window resize event callback
         */
        var resizeWindow = function(e) {
            // don't do anything if slider isn't initialized.
            if (!slider.initialized) { return; }
            // Delay if slider working.
            if (slider.working) {
                window.setTimeout(resizeWindow, 10);
            } else {
                // get the new window dimens (again, thank you IE)
                var windowWidthNew = $(window).width(),
                    windowHeightNew = $(window).height();
                // make sure that it is a true window resize
                // *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
                // are resized. Can you just die already?*
                if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
                    // set the new window dimens
                    windowWidth = windowWidthNew;
                    windowHeight = windowHeightNew;
                    // update all dynamic elements
                    el.redrawSlider();
                    // Call user resize handler
                    slider.settings.onSliderResize.call(el, slider.active.index);
                }
            }
        };

        /**
         * Adds an aria-hidden=true attribute to each element
         *
         * @param startVisibleIndex (int)
         *  - the first visible element's index
         */
        var applyAriaHiddenAttributes = function(startVisibleIndex) {
            var numberOfSlidesShowing = getNumberSlidesShowing();
            // only apply attributes if the setting is enabled and not in ticker mode
            if (slider.settings.ariaHidden && !slider.settings.ticker) {
                // add aria-hidden=true to all elements
                slider.children.attr('aria-hidden', 'true');
                // get the visible elements and change to aria-hidden=false
                slider.children.slice(startVisibleIndex, startVisibleIndex + numberOfSlidesShowing).attr('aria-hidden', 'false');
            }
        };

        /**
         * Returns index according to present page range
         *
         * @param slideOndex (int)
         *  - the desired slide index
         */
        var setSlideIndex = function(slideIndex) {
            if (slideIndex < 0) {
                if (slider.settings.infiniteLoop) {
                    return getPagerQty() - 1;
                }else {
                    //we don't go to undefined slides
                    return slider.active.index;
                }
                // if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
            } else if (slideIndex >= getPagerQty()) {
                if (slider.settings.infiniteLoop) {
                    return 0;
                } else {
                    //we don't move to undefined pages
                    return slider.active.index;
                }
                // set active index to requested slide
            } else {
                return slideIndex;
            }
        };

        /**
         * ===================================================================================
         * = PUBLIC FUNCTIONS
         * ===================================================================================
         */

        /**
         * Performs slide transition to the specified slide
         *
         * @param slideIndex (int)
         *  - the destination slide's index (zero-based)
         *
         * @param direction (string)
         *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
         */
        el.goToSlide = function(slideIndex, direction) {
            // onSlideBefore, onSlideNext, onSlidePrev callbacks
            // Allow transition canceling based on returned value
            var performTransition = true,
                moveBy = 0,
                position = {left: 0, top: 0},
                lastChild = null,
                lastShowingIndex, eq, value, requestEl;
            // store the old index
            slider.oldIndex = slider.active.index;
            //set new index
            slider.active.index = setSlideIndex(slideIndex);

            // if plugin is currently in motion, ignore request
            if (slider.working || slider.active.index === slider.oldIndex) { return; }
            // declare that plugin is in motion
            slider.working = true;

            performTransition = slider.settings.onSlideBefore.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);

            // If transitions canceled, reset and return
            if (typeof (performTransition) !== 'undefined' && !performTransition) {
                slider.active.index = slider.oldIndex; // restore old index
                slider.working = false; // is not in motion
                return;
            }

            if (direction === 'next') {
                // Prevent canceling in future functions or lack there-of from negating previous commands to cancel
                if (!slider.settings.onSlideNext.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
                    performTransition = false;
                }
            } else if (direction === 'prev') {
                // Prevent canceling in future functions or lack there-of from negating previous commands to cancel
                if (!slider.settings.onSlidePrev.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
                    performTransition = false;
                }
            }

            // check if last slide
            slider.active.last = slider.active.index >= getPagerQty() - 1;
            // update the pager with active class
            if (slider.settings.pager || slider.settings.pagerCustom) { updatePagerActive(slider.active.index); }
            // // check for direction control update
            if (slider.settings.controls) { updateDirectionControls(); }
            // if slider is set to mode: "fade"
            if (slider.settings.mode === 'fade') {
                // if adaptiveHeight is true and next height is different from current height, animate to the new height
                if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
                    slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
                }
                // fade out the visible child and reset its z-index value
                slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
                // fade in the newly requested slide
                slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex + 1).fadeIn(slider.settings.speed, function() {
                    $(this).css('zIndex', slider.settings.slideZIndex);
                    updateAfterSlideTransition();
                });
                // slider mode is not "fade"
            } else {
                // if adaptiveHeight is true and next height is different from current height, animate to the new height
                if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
                    slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
                }
                // if carousel and not infinite loop
                if (!slider.settings.infiniteLoop && slider.carousel && slider.active.last) {
                    if (slider.settings.mode === 'horizontal') {
                        // get the last child position
                        lastChild = slider.children.eq(slider.children.length - 1);
                        position = lastChild.position();
                        // calculate the position of the last slide
                        moveBy = slider.viewport.width() - lastChild.outerWidth();
                    } else {
                        // get last showing index position
                        lastShowingIndex = slider.children.length - slider.settings.minSlides;
                        position = slider.children.eq(lastShowingIndex).position();
                    }
                    // horizontal carousel, going previous while on first slide (infiniteLoop mode)
                } else if (slider.carousel && slider.active.last && direction === 'prev') {
                    // get the last child position
                    eq = slider.settings.moveSlides === 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
                    lastChild = el.children('.bx-clone').eq(eq);
                    position = lastChild.position();
                    // if infinite loop and "Next" is clicked on the last slide
                } else if (direction === 'next' && slider.active.index === 0) {
                    // get the last clone position
                    position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
                    slider.active.last = false;
                    // normal non-zero requests
                } else if (slideIndex >= 0) {
                    //parseInt is applied to allow floats for slides/page
                    requestEl = slideIndex * parseInt(getMoveBy());
                    position = slider.children.eq(requestEl).position();
                }

                /* If the position doesn't exist
                 * (e.g. if you destroy the slider on a next click),
                 * it doesn't throw an error.
                 */
                if (typeof (position) !== 'undefined') {
                    value = slider.settings.mode === 'horizontal' ? -(position.left - moveBy) : -position.top;
                    // plugin values to be animated
                    setPositionProperty(value, 'slide', slider.settings.speed);
                } else {
                    slider.working = false;
                }
            }
            if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
        };

        /**
         * Transitions to the next slide in the show
         */
        el.goToNextSlide = function() {
            // if infiniteLoop is false and last page is showing, disregard call
            if (!slider.settings.infiniteLoop && slider.active.last) { return; }
            var pagerIndex = parseInt(slider.active.index) + 1;
            el.goToSlide(pagerIndex, 'next');
        };

        /**
         * Transitions to the prev slide in the show
         */
        el.goToPrevSlide = function() {
            // if infiniteLoop is false and last page is showing, disregard call
            if (!slider.settings.infiniteLoop && slider.active.index === 0) { return; }
            var pagerIndex = parseInt(slider.active.index) - 1;
            el.goToSlide(pagerIndex, 'prev');
        };

        /**
         * Starts the auto show
         *
         * @param preventControlUpdate (boolean)
         *  - if true, auto controls state will not be updated
         */
        el.startAuto = function(preventControlUpdate) {
            // if an interval already exists, disregard call
            if (slider.interval) { return; }
            // create an interval
            slider.interval = setInterval(function() {
                if (slider.settings.autoDirection === 'next') {
                    el.goToNextSlide();
                } else {
                    el.goToPrevSlide();
                }
            }, slider.settings.pause);
            // if auto controls are displayed and preventControlUpdate is not true
            if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('stop'); }
        };

        /**
         * Stops the auto show
         *
         * @param preventControlUpdate (boolean)
         *  - if true, auto controls state will not be updated
         */
        el.stopAuto = function(preventControlUpdate) {
            // if no interval exists, disregard call
            if (!slider.interval) { return; }
            // clear the interval
            clearInterval(slider.interval);
            slider.interval = null;
            // if auto controls are displayed and preventControlUpdate is not true
            if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('start'); }
        };

        /**
         * Returns current slide index (zero-based)
         */
        el.getCurrentSlide = function() {
            return slider.active.index;
        };

        /**
         * Returns current slide element
         */
        el.getCurrentSlideElement = function() {
            return slider.children.eq(slider.active.index);
        };

        /**
         * Returns a slide element
         * @param index (int)
         *  - The index (zero-based) of the element you want returned.
         */
        el.getSlideElement = function(index) {
            return slider.children.eq(index);
        };

        /**
         * Returns number of slides in show
         */
        el.getSlideCount = function() {
            return slider.children.length;
        };

        /**
         * Return slider.working variable
         */
        el.isWorking = function() {
            return slider.working;
        };

        /**
         * Update all dynamic slider elements
         */
        el.redrawSlider = function() {
            // resize all children in ratio to new screen size
            slider.children.add(el.find('.bx-clone')).outerWidth(getSlideWidth());
            // adjust the height
            slider.viewport.css('height', getViewportHeight());
            // update the slide position
            if (!slider.settings.ticker) { setSlidePosition(); }
            // if active.last was true before the screen resize, we want
            // to keep it last no matter what screen size we end on
            if (slider.active.last) { slider.active.index = getPagerQty() - 1; }
            // if the active index (page) no longer exists due to the resize, simply set the index as last
            if (slider.active.index >= getPagerQty()) { slider.active.last = true; }
            // if a pager is being displayed and a custom pager is not being used, update it
            if (slider.settings.pager && !slider.settings.pagerCustom) {
                populatePager();
                updatePagerActive(slider.active.index);
            }
            if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
        };

        /**
         * Destroy the current instance of the slider (revert everything back to original state)
         */
        el.destroySlider = function() {
            // don't do anything if slider has already been destroyed
            if (!slider.initialized) { return; }
            slider.initialized = false;
            $('.bx-clone', this).remove();
            slider.children.each(function() {
                if ($(this).data('origStyle') !== undefined) {
                    $(this).attr('style', $(this).data('origStyle'));
                } else {
                    $(this).removeAttr('style');
                }
            });
            if ($(this).data('origStyle') !== undefined) {
                this.attr('style', $(this).data('origStyle'));
            } else {
                $(this).removeAttr('style');
            }
            $(this).unwrap().unwrap();
            if (slider.controls.el) { slider.controls.el.remove(); }
            if (slider.controls.next) { slider.controls.next.remove(); }
            if (slider.controls.prev) { slider.controls.prev.remove(); }
            if (slider.pagerEl && slider.settings.controls && !slider.settings.pagerCustom) { slider.pagerEl.remove(); }
            $('.bx-caption', this).remove();
            if (slider.controls.autoEl) { slider.controls.autoEl.remove(); }
            clearInterval(slider.interval);
            if (slider.settings.responsive) { $(window).unbind('resize', resizeWindow); }
            if (slider.settings.keyboardEnabled) { $(document).unbind('keydown', keyPress); }
            //remove self reference in data
            $(this).removeData('bxSlider');
        };

        /**
         * Reload the slider (revert all DOM changes, and re-initialize)
         */
        el.reloadSlider = function(settings) {
            if (settings !== undefined) { options = settings; }
            el.destroySlider();
            init();
            //store reference to self in order to access public functions later
            $(el).data('bxSlider', this);
        };

        init();

        $(el).data('bxSlider', this);

        // returns the current jQuery object
        return this;
    };

})(jQuery);
/*=========================================== end Home 2, Gallery, Product Detail ====================================================*/

/*web app 3*/
/*!
 * Isotope PACKAGED v3.0.3
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,n){var o,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,n);o=void 0===o?l:o}),void 0!==o?o:t}function h(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new s(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return u(this,t,e)}return h(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return n.indexOf(e)==-1&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return n!=-1&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var s=this._onceEvents&&this._onceEvents[t];o;){var r=s&&s[o];r&&(this.off(t,o),delete s[o]),o.apply(this,e),n+=r?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=u[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);s.isBoxSizeOuter=r=200==t(o.width),i.removeChild(e)}}function s(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=n(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;l<h;l++){var f=u[l],m=s[f],c=parseFloat(m);a[f]=isNaN(c)?0:c}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,I=a.borderTopWidth+a.borderBottomWidth,z=d&&r,S=t(s.width);S!==!1&&(a.width=S+(z?0:p+_));var x=t(s.height);return x!==!1&&(a.height=x+(z?0:y+I)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+I),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),s=0;s<i.length;s++)o.push(i[s])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,s=this;this[o]=setTimeout(function(){n.apply(s,e),delete s[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var s=i.toDashed(o),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,o,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=h[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],s=this.layout.size,r=n.indexOf("%")!=-1?parseFloat(n)/100*s.width:parseInt(n,10),a=o.indexOf("%")!=-1?parseFloat(o)/100*s.height:parseInt(o,10);r=isNaN(r)?0:r,a=isNaN(a)?0:a,r-=e?s.paddingLeft:s.paddingRight,a-=i?s.paddingTop:s.paddingBottom,this.position.x=r,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[o];e[s]=this.getXValue(a),e[r]="";var u=n?"paddingTop":"paddingBottom",h=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),s=parseInt(e,10),r=o===this.position.x&&s===this.position.y;if(this.setPosition(t,e),r&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,u=e-n,h={};h.transform=this.getTranslate(a,u),this.transition({to:h,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var m={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(m)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,s){return e(t,i,n,o,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function s(t,e){var i=n.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,f[o]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=c[n]||1;return i*o}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=o,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var m=s.prototype;n.extend(m,e.prototype),m.option=function(t){n.extend(this.options,t)},m._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},m._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},m.reloadItems=function(){this.items=this._itemize(this.element.children)},m._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var s=e[o],r=new i(s,this);n.push(r)}return n},m._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},m.getItemElements=function(){return this.items.map(function(t){return t.element})},m.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},m._init=m.layout,m._resetLayout=function(){this.getSize()},m.getSize=function(){this.size=i(this.element)},m._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},m.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},m._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},m._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},m._getItemLayoutPosition=function(){return{x:0,y:0}},m._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},m.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},m._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},m._postLayout=function(){this.resizeContainer()},m.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},m._getContainerSize=d,m._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},m._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){r++,r==s&&i()}var o=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,n)})},m.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),h)if(this.$element=this.$element||h(this.element),e){var o=h.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},m.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},m.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},m.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},m.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},m._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)},m._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},m._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},m._manageStamp=d,m._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),s={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return s},m.handleEvent=n.handleEvent,m.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},m.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},m.onresize=function(){this.resize()},n.debounceMethod(s,"onresize",100),m.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},m.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},m.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},m.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},m.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},m.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},m.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},m.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},m.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},m.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},m.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},m.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},m.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=n.extend({},s.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(o),n.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var c={ms:1,s:1e3};return s.Item=o,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),n=i._create;i._create=function(){this.id=this.layout.itemGUID++,n.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var n=e[i];this.sortData[i]=n(this.element,this)}}};var o=i.destroy;return i.destroy=function(){o.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var n=i.prototype,o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return o.forEach(function(t){n[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),n.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},n._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},n.getColumnWidth=function(){this.getSegmentSize("column","Width")},n.getRowHeight=function(){this.getSegmentSize("row","Height")},n.getSegmentSize=function(t,e){var i=t+e,n="outer"+e;if(this._getMeasurement(i,n),!this[i]){var o=this.getFirstItemSize();this[i]=o&&o[n]||this.isotope.size["inner"+e]}},n.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},n.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},n.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=Object.create(n),o.prototype.constructor=o,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");return i.compatOptions.fitWidth="isFitWidth",i.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0},i.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,s=o/n,r=n-o%n,a=r&&r<1?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},i.prototype.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},i.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&e<1?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this._getColGroup(n),s=Math.min.apply(Math,o),r=o.indexOf(s),a={x:this.columnWidth*r,y:s},u=s+t.size.outerHeight,h=this.cols+1-o.length,d=0;d<h;d++)this.colYs[r+d]=u;return a},i.prototype._getColGroup=function(t){if(t<2)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;n<i;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},i.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),s=o?n.left:n.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?n.top:n.bottom)+i.outerHeight,l=a;l<=u;l++)this.colYs[l]=Math.max(d,this.colYs[l])},i.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},i.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},i.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),n=i.prototype,o={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)o[s]||(n[s]=e.prototype[s]);var r=n.measureColumns;n.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=n._getOption;return n._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var n={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,n},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(i,n,o,s,r,a){return e(t,i,n,o,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope/js/item"),require("isotope/js/layout-mode"),require("isotope/js/layout-modes/masonry"),require("isotope/js/layout-modes/fit-rows"),require("isotope/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,n,o,s,r){function a(t,e){return function(i,n){for(var o=0;o<t.length;o++){var s=t[o],r=i.sortData[s],a=n.sortData[s];if(r>a||r<a){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var n=t[i];n.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?o.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&n&&o.dispatchEvent("arrangeComplete",null,[o.filteredItems])}var e,i,n,o=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){n=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],n=[],o=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?n.push(a):u||a.isHidden||o.push(a)}}return{matches:i,needReveal:n,needHide:o}},l._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return n(e.element,t)}},l.updateSortData=function(t){var e;t?(t=o.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&i<e;i++){var n=t[i];n.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),n=i[0],o=n.match(/^\[(.+)\]$/),s=o&&o[1],r=e(s,n),a=d.sortDataParsers[i[1]];
    return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){if(this.options.sortBy){var t=o.makeArray(this.options.sortBy);this._getIsSameSortBy(t)||(this.sortHistory=t.concat(this.sortHistory));var e=a(this.sortHistory,this.options.sortAscending);this.filteredItems.sort(e)}},l._getIsSameSortBy=function(t){for(var e=0;e<t.length;e++)if(t[e]!=this.sortHistory[e])return!1;return!0},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,n,o=e.length;for(i=0;i<o;i++)n=e[i],this.element.appendChild(n.element);var s=this._filter(e).matches;for(i=0;i<o;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;i<o;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var m=l.remove;return l.remove=function(t){t=o.makeArray(t);var e=this.getItems(t);m.call(this,t);for(var i=e&&e.length,n=0;i&&n<i;n++){var s=e[n];o.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var n=t.apply(this,e);return this.options.transitionDuration=i,n},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});
/*End Web App 3*/
/*Web App 3, gallery*/
/*!
 * imagesLoaded PACKAGED v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});
/*End web app 3, gallery*/
/*style guide*/
///////////////////////////////////////////// REGION: clipboard Plugin ///////////////////////////////////////////////////
/*!
 * clipboard.js v1.5.12
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,o){function i(a,c){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n?n:t)},u,u.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){var o=t("matches-selector");e.exports=function(t,e,n){for(var i=n?t:t.parentNode;i&&i!==document;){if(o(i,e))return i;i=i.parentNode}}},{"matches-selector":5}],2:[function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function i(t,e,n,o){return function(n){n.delegateTarget=r(n.target,e,!0),n.delegateTarget&&o.call(t,n)}}var r=t("closest");e.exports=o},{closest:1}],3:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},{}],4:[function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return i(t,e,n);if(c.nodeList(t))return r(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function r(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return s(document.body,t,e,n)}var c=t("./is"),s=t("delegate");e.exports=o},{"./is":3,delegate:2}],5:[function(t,e,n){function o(t,e){if(r)return r.call(t,e);for(var n=t.parentNode.querySelectorAll(e),o=0;o<n.length;++o)if(n[o]==t)return!0;return!1}var i=Element.prototype,r=i.matchesSelector||i.webkitMatchesSelector||i.mozMatchesSelector||i.msMatchesSelector||i.oMatchesSelector;e.exports=o},{}],6:[function(t,e,n){function o(t){var e;if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName)t.focus(),t.setSelectionRange(0,t.value.length),e=t.value;else{t.hasAttribute("contenteditable")&&t.focus();var n=window.getSelection(),o=document.createRange();o.selectNodeContents(t),n.removeAllRanges(),n.addRange(o),e=n.toString()}return e}e.exports=o},{}],7:[function(t,e,n){function o(){}o.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){i.off(t,o),e.apply(n,arguments)}var i=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,i=n.length;for(o;i>o;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],i=[];if(o&&e)for(var r=0,a=o.length;a>r;r++)o[r].fn!==e&&o[r].fn._!==e&&i.push(o[r]);return i.length?n[t]=i:delete n[t],this}},e.exports=o},{}],8:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","select"],r);else if("undefined"!=typeof o)r(n,e("select"));else{var a={exports:{}};r(a,i.select),i.clipboardAction=a.exports}}(this,function(t,e){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return t.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""},t.prototype.initSelection=function t(){this.text?this.selectFake():this.target&&this.selectTarget()},t.prototype.selectFake=function t(){var e=this,n="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=document.body.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[n?"right":"left"]="-9999px",this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()},t.prototype.removeFake=function t(){this.fakeHandler&&(document.body.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},t.prototype.selectTarget=function t(){this.selectedText=(0,i.default)(this.target),this.copyText()},t.prototype.copyText=function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(n){e=!1}this.handleResult(e)},t.prototype.handleResult=function t(e){e?this.emitter.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.emitter.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})},t.prototype.clearSelection=function t(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()},t.prototype.destroy=function t(){this.removeFake()},a(t,[{key:"action",set:function t(){var e=arguments.length<=0||void 0===arguments[0]?"copy":arguments[0];if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!==("undefined"==typeof e?"undefined":r(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function t(){return this._target}}]),t}();t.exports=c})},{select:6}],9:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if("undefined"!=typeof o)r(n,e("./clipboard-action"),e("tiny-emitter"),e("good-listener"));else{var a={exports:{}};r(a,i.clipboardAction,i.tinyEmitter,i.goodListener),i.clipboard=a.exports}}(this,function(t,e,n,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var l=i(e),u=i(n),f=i(o),d=function(t){function e(n,o){r(this,e);var i=a(this,t.call(this));return i.resolveOptions(o),i.listenClick(n),i}return c(e,t),e.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText},e.prototype.listenClick=function t(e){var n=this;this.listener=(0,f.default)(e,"click",function(t){return n.onClick(t)})},e.prototype.onClick=function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l.default({action:this.action(n),target:this.target(n),text:this.text(n),trigger:n,emitter:this})},e.prototype.defaultAction=function t(e){return s("action",e)},e.prototype.defaultTarget=function t(e){var n=s("target",e);return n?document.querySelector(n):void 0},e.prototype.defaultText=function t(e){return s("text",e)},e.prototype.destroy=function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)},e}(u.default);t.exports=d})},{"./clipboard-action":8,"good-listener":4,"tiny-emitter":7}]},{},[9])(9)});

///////////////////////////////////////////// ENDREGION: clipboard Plugin ///////////////////////////////////////////////////
/*end style guide*/

/*Coming Soon*/
/*
 * Author - Harshen Pandey
 * Version - 1.0.9
 * Release - 18th March 2017
 * Copyright (c) 2017 - 2020 Harshen Pandey
 */

!function(a){function b(b,m){var n=a.extend({},a.fn.countdowntimer.defaults,m),b=b;b.addClass("style");var o="",r="",s="",t="";if(o=n.size,r=n.borderColor,s=n.fontColor,t=n.backgroundColor,void 0!=m.regexpMatchFormat&&void 0!=m.regexpReplaceWith&&void 0==m.timeSeparator&&(window["regexpMatchFormat_"+b.attr("id")]=m.regexpMatchFormat,window["regexpReplaceWith_"+b.attr("id")]=m.regexpReplaceWith),void 0!=m.beforeExpiryTime){var w=n.beforeExpiryTime.split(":");"00"!=w[0]&&(window["beforeExpiryDays_"+b.attr("id")]=w[0]),"00"!=w[1]&&(window["beforeExpiryHours_"+b.attr("id")]=w[1]),"00"!=w[2]&&(window["beforeExpiryMinutes_"+b.attr("id")]=w[2]),"00"!=w[3]&&(window["beforeExpirySeconds_"+b.attr("id")]=w[3])}if(void 0!=m.borderColor||void 0!=m.fontColor||void 0!=m.backgroundColor){var x={background:t,color:s,"border-color":r};b.css(x)}else b.addClass("colorDefinition");if(void 0!=m.size)switch(o){case"xl":b.addClass("size_xl");break;case"lg":b.addClass("size_lg");break;case"md":b.addClass("size_md");break;case"sm":b.addClass("size_sm");break;case"xs":b.addClass("size_xs")}else"sm"==o&&b.addClass("size_sm");if(void 0!=m.startDate||void 0!=m.dateAndTime||void 0!=m.currentTime||void 0==m.hours&&void 0==m.minutes&&void 0==m.seconds)if(void 0!=m.startDate&&void 0!=m.dateAndTime&&void 0==m.currentTime){startDate="",endDate="",timer_startDate="",window["startDate"+b.attr("id")]=new Date(n.startDate),window["endDate"+b.attr("id")]=new Date(n.dateAndTime);var y="withStart";j(b,n,y),window["timer_startDate"+b.attr("id")]=setInterval(function(){j(b,n,y)},1e3*n.tickInterval)}else if(void 0==m.startDate&&void 0!=m.dateAndTime&&void 0==m.currentTime){startTime="",dateTime="",timer_givenDate="";var z=n.startDate.getHours()<10?"0"+n.startDate.getHours():n.startDate.getHours(),A=n.startDate.getMinutes()<10?"0"+n.startDate.getMinutes():n.startDate.getMinutes(),B=n.startDate.getSeconds()<10?"0"+n.startDate.getSeconds():n.startDate.getSeconds(),C=n.startDate.getMonth()+1<10?"0"+(n.startDate.getMonth()+1):n.startDate.getMonth()+1,D=n.startDate.getDate()<10?"0"+n.startDate.getDate():n.startDate.getDate(),E=n.startDate.getFullYear();window["startTime"+b.attr("id")]=new Date(E+"/"+C+"/"+D+" "+z+":"+A+":"+B),window["dateTime"+b.attr("id")]=new Date(n.dateAndTime);var y="withnoStart";j(b,n,y),window["timer_givenDate"+b.attr("id")]=setInterval(function(){j(b,n,y)},1e3*n.tickInterval)}else void 0!=m.currentTime?(currentTime="",timer_currentDate="",window["currentTime"+b.attr("id")]=n.currentTime,k(b,n),window["timer_currentDate"+b.attr("id")]=setInterval(function(){k(b,n)},1e3*n.tickInterval)):(countSeconds="",timer_secondsTimer="",window["countSeconds"+b.attr("id")]=n.seconds,window["timer_secondsTimer"+b.attr("id")]=setInterval(function(){l(b)},1e3));else void 0!=m.hours&&void 0==m.minutes&&void 0==m.seconds?(hours_H="",minutes_H="",seconds_H="",timer_H="",window["hours_H"+b.attr("id")]=n.hours,window["minutes_H"+b.attr("id")]=n.minutes,window["seconds_H"+b.attr("id")]=n.seconds,void 0!=m.pauseButton&&p(b,"H",n,c),void 0!=m.stopButton&&q(b,"H",n,c),c(b,n),window["timer_H"+b.attr("id")]=setInterval(function(){c(b,n)},1e3*n.tickInterval)):void 0==m.hours&&void 0!=m.minutes&&void 0==m.seconds?(hours_M="",minutes_M="",seconds_M="",timer_M="",window["hours_M"+b.attr("id")]=n.hours,window["minutes_M"+b.attr("id")]=n.minutes,window["seconds_M"+b.attr("id")]=n.seconds,void 0!=m.pauseButton&&p(b,"M",n,d),void 0!=m.stopButton&&q(b,"M",n,d),d(b,n),window["timer_M"+b.attr("id")]=setInterval(function(){d(b,n)},1e3*n.tickInterval)):void 0==m.hours&&void 0==m.minutes&&void 0!=m.seconds?(hours_S="",minutes_S="",seconds_S="",timer_S="",window["hours_S"+b.attr("id")]=n.hours,window["minutes_S"+b.attr("id")]=n.minutes,window["seconds_S"+b.attr("id")]=n.seconds,void 0!=m.pauseButton&&p(b,"S",n,e),void 0!=m.stopButton&&q(b,"S",n,e),e(b,n),window["timer_S"+b.attr("id")]=setInterval(function(){e(b,n)},1e3*n.tickInterval)):void 0!=m.hours&&void 0!=m.minutes&&void 0==m.seconds?(hours_HM="",minutes_HM="",seconds_HM="",timer_HM="",window["hours_HM"+b.attr("id")]=n.hours,window["minutes_HM"+b.attr("id")]=n.minutes,window["seconds_HM"+b.attr("id")]=n.seconds,void 0!=m.pauseButton&&p(b,"HM",n,f),void 0!=m.stopButton&&q(b,"HM",n,f),f(b,n),window["timer_HM"+b.attr("id")]=setInterval(function(){f(b,n)},1e3*n.tickInterval)):void 0==m.hours&&void 0!=m.minutes&&void 0!=m.seconds?(hours_MS="",minutes_MS="",seconds_MS="",timer_MS="",window["hours_MS"+b.attr("id")]=n.hours,window["minutes_MS"+b.attr("id")]=n.minutes,window["seconds_MS"+b.attr("id")]=n.seconds,void 0!=m.pauseButton&&p(b,"MS",n,g),void 0!=m.stopButton&&q(b,"MS",n,g),g(b,n),window["timer_MS"+b.attr("id")]=setInterval(function(){g(b,n)},1e3*n.tickInterval)):void 0!=m.hours&&void 0==m.minutes&&void 0!=m.seconds?(hours_HS="",minutes_HS="",seconds_HS="",timer_HS="",window["hours_HS"+b.attr("id")]=n.hours,window["minutes_HS"+b.attr("id")]=n.minutes,window["seconds_HS"+b.attr("id")]=n.seconds,void 0!=m.pauseButton&&p(b,"HS",n,h),void 0!=m.stopButton&&q(b,"HS",n,h),h(b,n),window["timer_HS"+b.attr("id")]=setInterval(function(){h(b,n)},1e3*n.tickInterval)):void 0!=m.hours&&void 0!=m.minutes&&void 0!=m.seconds&&(hours_HMS="",minutes_HMS="",seconds_HMS="",timer_HMS="",window["hours_HMS"+b.attr("id")]=n.hours,window["minutes_HMS"+b.attr("id")]=n.minutes,window["seconds_HMS"+b.attr("id")]=n.seconds,void 0!=m.pauseButton&&p(b,"HMS",n,i),void 0!=m.stopButton&&q(b,"HMS",n,i),i(b,n),window["timer_HMS"+b.attr("id")]=setInterval(function(){i(b,n)},1e3*n.tickInterval))}function c(a,b){var c=a.attr("id");window["minutes_H"+c]==b.minutes&&window["seconds_H"+c]==b.seconds&&window["hours_H"+c]==b.hours?(window["hours_H"+c].toString().length<2&&(window["hours_H"+c]="0"+window["hours_H"+c]),o(a,window["hours_H"+c]+b.timeSeparator+"00"+b.timeSeparator+"00"),"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_H"+c]&&n(a,b),window["seconds_H"+c]=60-b.tickInterval,window["minutes_H"+c]=59,0!=window["hours_H"+c]?window["hours_H"+c]--:(delete window["hours_H"+c],delete window["minutes_H"+c],delete window["seconds_H"+c],clearInterval(window["timer_H"+c]),m(a,b))):(window["hours_H"+c].toString().length<2&&(window["hours_H"+c]="0"+window["hours_H"+c]),window["minutes_H"+c].toString().length<2&&(window["minutes_H"+c]="0"+window["minutes_H"+c]),window["seconds_H"+c].toString().length<2&&(window["seconds_H"+c]="0"+window["seconds_H"+c]),o(a,window["hours_H"+c]+b.timeSeparator+window["minutes_H"+c]+b.timeSeparator+window["seconds_H"+c]),("undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_H"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_H"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_H"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_H"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_H"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_H"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_H"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_H"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_H"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_H"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_H"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_H"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_H"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_H"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_H"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_H"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_H"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_H"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_H"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_H"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_H"+c])&&n(a,b),window["seconds_H"+c]-=b.tickInterval,0!=window["minutes_H"+c]&&window["seconds_H"+c]<0&&(window["minutes_H"+c]--,window["seconds_H"+c]=60-b.tickInterval),0==window["minutes_H"+c]&&window["seconds_H"+c]<0&&0!=window["hours_H"+c]&&(window["hours_H"+c]--,window["minutes_H"+c]=59,window["seconds_H"+c]=60-b.tickInterval),0==window["minutes_H"+c]&&window["seconds_H"+c]<0&&0==window["hours_H"+c]&&(delete window["hours_H"+c],delete window["minutes_H"+c],delete window["seconds_H"+c],clearInterval(window["timer_H"+c]),m(a,b))),c=null}function d(a,b){var c=a.attr("id");window["minutes_M"+c]==b.minutes&&window["seconds_M"+c]==b.seconds?(window["minutes_M"+c].toString().length<2&&(window["minutes_M"+c]="0"+window["minutes_M"+c]),o(a,window["minutes_M"+c]+b.timeSeparator+"00"),"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_M"+c]&&n(a,b),window["seconds_M"+c]=60-b.tickInterval,0!=window["minutes_M"+c]?window["minutes_M"+c]--:(delete window["hours_M"+c],delete window["minutes_M"+c],delete window["seconds_M"+c],clearInterval(window["timer_M"+c]),m(a,b))):(window["minutes_M"+c].toString().length<2&&(window["minutes_M"+c]="0"+window["minutes_M"+c]),window["seconds_M"+c].toString().length<2&&(window["seconds_M"+c]="0"+window["seconds_M"+c]),o(a,window["minutes_M"+c]+b.timeSeparator+window["seconds_M"+c]),("undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_M"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_M"+c]||"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_M"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_M"+c]||"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_M"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_M"+c])&&n(a,b),window["seconds_M"+c]-=b.tickInterval,0!=window["minutes_M"+c]&&window["seconds_M"+c]<0&&(window["minutes_M"+c]--,window["seconds_M"+c]=60-b.tickInterval),0==window["minutes_M"+c]&&window["seconds_M"+c]<0&&(delete window["hours_M"+c],delete window["minutes_M"+c],delete window["seconds_M"+c],clearInterval(window["timer_M"+c]),m(a,b))),c=null}function e(a,b){var c=a.attr("id");window["seconds_S"+c].toString().length<2&&(window["seconds_S"+c]="0"+window["seconds_S"+c]),o(a,window["seconds_S"+c]+" sec"),"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_S"+c]&&n(a,b),window["seconds_S"+c]-=b.tickInterval,window["seconds_S"+c]<0&&(delete window["hours_S"+c],delete window["minutes_S"+c],delete window["seconds_S"+c],clearInterval(window["timer_S"+c]),m(a,b)),c=null}function f(a,b){var c=a.attr("id");window["minutes_HM"+c]==b.minutes&&window["hours_HM"+c]==b.hours?(window["hours_HM"+c].toString().length<2&&(window["hours_HM"+c]="0"+window["hours_HM"+c]),window["minutes_HM"+c].toString().length<2&&(window["minutes_HM"+c]="0"+window["minutes_HM"+c]),o(a,window["hours_HM"+c]+b.timeSeparator+window["minutes_HM"+c]+b.timeSeparator+"00"),"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HM"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HM"+c]&&n(a,b),0!=window["hours_HM"+c]&&0==window["minutes_HM"+c]?(window["hours_HM"+c]--,window["minutes_HM"+c]=59,window["seconds_HM"+c]=60-b.tickInterval):0==window["hours_HM"+c]&&0!=window["minutes_HM"+c]?(window["seconds_HM"+c]=60-b.tickInterval,window["minutes_HM"+c]--):(window["seconds_HM"+c]=60-b.tickInterval,window["minutes_HM"+c]--),0==window["hours_HM"+c]&&0==window["minutes_HM"+c]&&60==window["seconds_HM"+c]&&(delete window["hours_HM"+c],delete window["minutes_HM"+c],delete window["seconds_HM"+c],clearInterval(window["timer_HM"+c]),m(a,b))):(window["hours_HM"+c].toString().length<2&&(window["hours_HM"+c]="0"+window["hours_HM"+c]),window["minutes_HM"+c].toString().length<2&&(window["minutes_HM"+c]="0"+window["minutes_HM"+c]),window["seconds_HM"+c].toString().length<2&&(window["seconds_HM"+c]="0"+window["seconds_HM"+c]),o(a,window["hours_HM"+c]+b.timeSeparator+window["minutes_HM"+c]+b.timeSeparator+window["seconds_HM"+c]),("undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HM"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HM"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HM"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HM"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HM"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_HM"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_HM"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HM"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HM"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HM"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_HM"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HM"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HM"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_HM"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_HM"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_HM"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HM"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_HM"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_HM"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_HM"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HM"+c])&&n(a,b),window["seconds_HM"+c]-=b.tickInterval,0!=window["minutes_HM"+c]&&window["seconds_HM"+c]<0&&(window["minutes_HM"+c]--,window["seconds_HM"+c]=60-b.tickInterval),0==window["minutes_HM"+c]&&window["seconds_HM"+c]<0&&0!=window["hours_HM"+c]&&(window["hours_HM"+c]--,window["minutes_HM"+c]=59,window["seconds_HM"+c]=60-b.tickInterval),0==window["minutes_HM"+c]&&window["seconds_HM"+c]<0&&0==window["hours_HM"+c]&&(delete window["hours_HM"+c],delete window["minutes_HM"+c],delete window["seconds_HM"+c],clearInterval(window["timer_HM"+c]),m(a,b))),c=null}function g(a,b){var c=a.attr("id");window["minutes_MS"+c]==b.minutes&&window["seconds_MS"+c]==b.seconds?(window["minutes_MS"+c].toString().length<2&&(window["minutes_MS"+c]="0"+window["minutes_MS"+c]),window["seconds_MS"+c].toString().length<2&&(window["seconds_MS"+c]="0"+window["seconds_MS"+c]),o(a,window["minutes_MS"+c]+b.timeSeparator+window["seconds_MS"+c]),"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_MS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_MS"+c]&&n(a,b),0!=window["minutes_MS"+c]&&0==window["seconds_MS"+c]?(window["minutes_MS"+c]--,window["seconds_MS"+c]=60-b.tickInterval):0==window["minutes_MS"+c]&&0==window["seconds_MS"+c]?(delete window["hours_MS"+c],delete window["minutes_MS"+c],delete window["seconds_MS"+c],clearInterval(window["timer_MS"+c]),m(a,b)):window["seconds_MS"+c]-=b.tickInterval):(window["minutes_MS"+c].toString().length<2&&(window["minutes_MS"+c]="0"+window["minutes_MS"+c]),window["seconds_MS"+c].toString().length<2&&(window["seconds_MS"+c]="0"+window["seconds_MS"+c]),o(a,window["minutes_MS"+c]+b.timeSeparator+window["seconds_MS"+c]),("undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_MS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_MS"+c]||"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_MS"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_MS"+c]||"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_MS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_MS"+c])&&n(a,b),window["seconds_MS"+c]-=b.tickInterval,0!=window["minutes_MS"+c]&&window["seconds_MS"+c]<0&&(window["minutes_MS"+c]--,window["seconds_MS"+c]=60-b.tickInterval),0==window["minutes_MS"+c]&&window["seconds_MS"+c]<0&&(delete window["hours_MS"+c],delete window["minutes_MS"+c],delete window["seconds_MS"+c],clearInterval(window["timer_MS"+c]),m(a,b))),c=null}function h(a,b){var c=a.attr("id");window["seconds_HS"+c]==b.seconds&&window["hours_HS"+c]==b.hours?(window["hours_HS"+c].toString().length<2&&(window["hours_HS"+c]="0"+window["hours_HS"+c]),window["seconds_HS"+c].toString().length<2&&(window["seconds_HS"+c]="0"+window["seconds_HS"+c]),o(a,window["hours_HS"+c]+b.timeSeparator+"00"+b.timeSeparator+window["seconds_HS"+c]),"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HS"+c]&&n(a,b),0==window["hours_HS"+c]&&0==window["seconds_HS"+c]?(delete window["hours_HS"+c],delete window["minutes_HS"+c],delete window["seconds_HS"+c],clearInterval(window["timer_HS"+c]),m(a,b)):0!=window["hours_HS"+c]&&0==window["seconds_HS"+c]?(window["hours_HS"+c]--,window["minutes_HS"+c]=59,window["seconds_HS"+c]=60-b.tickInterval):window["seconds_HS"+c]-=b.tickInterval):(window["hours_HS"+c].toString().length<2&&(window["hours_HS"+c]="0"+window["hours_HS"+c]),window["minutes_HS"+c].toString().length<2&&(window["minutes_HS"+c]="0"+window["minutes_HS"+c]),window["seconds_HS"+c].toString().length<2&&(window["seconds_HS"+c]="0"+window["seconds_HS"+c]),o(a,window["hours_HS"+c]+b.timeSeparator+window["minutes_HS"+c]+b.timeSeparator+window["seconds_HS"+c]),("undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HS"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HS"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HS"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HS"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_HS"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_HS"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HS"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HS"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_HS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HS"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HS"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_HS"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_HS"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_HS"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HS"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_HS"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_HS"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_HS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HS"+c])&&n(a,b),window["seconds_HS"+c]-=b.tickInterval,0!=window["minutes_HS"+c]&&window["seconds_HS"+c]<0&&(window["minutes_HS"+c]--,window["seconds_HS"+c]=60-b.tickInterval),0==window["minutes_HS"+c]&&window["seconds_HS"+c]<0&&0!=window["hours_HS"+c]&&(window["hours_HS"+c]--,window["minutes_HS"+c]=59,window["seconds_HS"+c]=60-b.tickInterval),0==window["minutes_HS"+c]&&window["seconds_HS"+c]<0&&0==window["hours_HS"+c]&&(delete window["hours_HS"+c],delete window["minutes_HS"+c],delete window["seconds_HS"+c],clearInterval(window["timer_HS"+c]),m(a,b))),c=null}function i(a,b){var c=a.attr("id");window["minutes_HMS"+c]==b.minutes&&window["seconds_HMS"+c]==b.seconds&&window["hours_HMS"+c]==b.hours?(window["hours_HMS"+c].toString().length<2&&(window["hours_HMS"+c]="0"+window["hours_HMS"+c]),window["minutes_HMS"+c].toString().length<2&&(window["minutes_HMS"+c]="0"+window["minutes_HMS"+c]),window["seconds_HMS"+c].toString().length<2&&(window["seconds_HMS"+c]="0"+window["seconds_HMS"+c]),o(a,window["hours_HMS"+c]+b.timeSeparator+window["minutes_HMS"+c]+b.timeSeparator+window["seconds_HMS"+c]),"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HMS"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HMS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HMS"+c]&&n(a,b),0==window["hours_HMS"+c]&&0==window["minutes_HMS"+c]&&0==window["seconds_HMS"+c]?(delete window["hours_HMS"+c],delete window["minutes_HMS"+c],delete window["seconds_HMS"+c],clearInterval(window["timer_HMS"+c]),m(a,b)):0!=window["hours_HMS"+c]&&0==window["minutes_HMS"+c]&&0==window["seconds_HMS"+c]?(window["hours_HMS"+c]--,window["minutes_HMS"+c]=59,window["seconds_HMS"+c]=60-b.tickInterval):0==window["hours_HMS"+c]&&0!=window["minutes_HMS"+c]&&0==window["seconds_HMS"+c]?(window["minutes_HMS"+c]--,window["seconds_HMS"+c]=60-b.tickInterval):0!=window["hours_HMS"+c]&&0!=window["minutes_HMS"+c]&&0==window["seconds_HMS"+c]?(window["minutes_HMS"+c]--,window["seconds_HMS"+c]=60-b.tickInterval):window["seconds_HMS"+c]-=b.tickInterval):(window["hours_HMS"+c].toString().length<2&&(window["hours_HMS"+c]="0"+window["hours_HMS"+c]),window["minutes_HMS"+c].toString().length<2&&(window["minutes_HMS"+c]="0"+window["minutes_HMS"+c]),window["seconds_HMS"+c].toString().length<2&&(window["seconds_HMS"+c]="0"+window["seconds_HMS"+c]),o(a,window["hours_HMS"+c]+b.timeSeparator+window["minutes_HMS"+c]+b.timeSeparator+window["seconds_HMS"+c]),("undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HMS"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HMS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HMS"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HMS"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HMS"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_HMS"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_HMS"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HMS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HMS"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HMS"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_HMS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HMS"+c]||"undefined"!=typeof window["beforeExpiryHours_"+c]&&window["beforeExpiryHours_"+c]==window["hours_HMS"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_HMS"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_HMS"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_HMS"+c]&&"undefined"!=typeof window["beforeExpiryMinutes_"+c]&&window["beforeExpiryMinutes_"+c]==window["minutes_HMS"+c]&&"undefined"==typeof window["beforeExpirySeconds_"+c]&&"00"==window["seconds_HMS"+c]||"undefined"==typeof window["beforeExpiryHours_"+c]&&"00"==window["hours_HMS"+c]&&"undefined"==typeof window["beforeExpiryMinutes_"+c]&&"00"==window["minutes_HMS"+c]&&"undefined"!=typeof window["beforeExpirySeconds_"+c]&&window["beforeExpirySeconds_"+c]==window["seconds_HMS"+c])&&n(a,b),window["seconds_HMS"+c]-=b.tickInterval,0!=window["minutes_HMS"+c]&&window["seconds_HMS"+c]<0&&(window["minutes_HMS"+c]--,window["seconds_HMS"+c]=60-b.tickInterval),0==window["minutes_HMS"+c]&&window["seconds_HMS"+c]<0&&0!=window["hours_HMS"+c]&&(window["hours_HMS"+c]--,window["minutes_HMS"+c]=59,window["seconds_HMS"+c]=60-b.tickInterval),0==window["minutes_HMS"+c]&&window["seconds_HMS"+c]<0&&0==window["hours_HMS"+c]&&(delete window["hours_HMS"+c],delete window["minutes_HMS"+c],delete window["seconds_HMS"+c],clearInterval(window["timer_HMS"+c]),m(a,b))),c=null}function j(a,b,c){var d=a.attr("id"),e="withnoStart"==c?window["dateTime"+d]:window["endDate"+d],f="withnoStart"==c?window["startTime"+d]:window["startDate"+d],g=Math.floor((e-f)/864e5),h=Math.floor((e-f)%864e5/36e5),i=Math.floor((e-f)%864e5/6e4)%60,j=Math.floor((e-f)%864e5/1e3)%60%60;e-f>0?(g.toString().length<2&&(g="0"+g),h.toString().length<2&&(h="0"+h),i.toString().length<2&&(i="0"+i),j.toString().length<2&&(j="0"+j),o(a,g+b.timeSeparator+h+b.timeSeparator+i+b.timeSeparator+j),("undefined"!=typeof window["beforeExpiryDays_"+d]&&window["beforeExpiryDays_"+d]==g&&"undefined"!=typeof window["beforeExpiryHours_"+d]&&window["beforeExpiryHours_"+d]==h&&"undefined"!=typeof window["beforeExpiryMinutes_"+d]&&window["beforeExpiryMinutes_"+d]==i&&"undefined"!=typeof window["beforeExpirySeconds_"+d]&&window["beforeExpirySeconds_"+d]==j||"undefined"!=typeof window["beforeExpiryDays_"+d]&&window["beforeExpiryDays_"+d]==g&&"undefined"!=typeof window["beforeExpiryHours_"+d]&&window["beforeExpiryHours_"+d]==h&&"undefined"!=typeof window["beforeExpiryMinutes_"+d]&&window["beforeExpiryMinutes_"+d]==i&&"undefined"==typeof window["beforeExpirySeconds_"+d]&&"00"==j||"undefined"!=typeof window["beforeExpiryDays_"+d]&&window["beforeExpiryDays_"+d]==g&&"undefined"!=typeof window["beforeExpiryHours_"+d]&&window["beforeExpiryHours_"+d]==h&&"undefined"==typeof window["beforeExpiryMinutes_"+d]&&"00"==i&&"undefined"!=typeof window["beforeExpirySeconds_"+d]&&window["beforeExpirySeconds_"+d]==j||"undefined"!=typeof window["beforeExpiryDays_"+d]&&window["beforeExpiryDays_"+d]==g&&"undefined"==typeof window["beforeExpiryHours_"+d]&&"00"==h&&"undefined"!=typeof window["beforeExpiryMinutes_"+d]&&window["beforeExpiryMinutes_"+d]==i&&"undefined"!=typeof window["beforeExpirySeconds_"+d]&&window["beforeExpirySeconds_"+d]==j||"undefined"==typeof window["beforeExpiryDays_"+d]&&"00"==g&&"undefined"!=typeof window["beforeExpiryHours_"+d]&&window["beforeExpiryHours_"+d]==h&&"undefined"!=typeof window["beforeExpiryMinutes_"+d]&&window["beforeExpiryMinutes_"+d]==i&&"undefined"!=typeof window["beforeExpirySeconds_"+d]&&window["beforeExpirySeconds_"+d]==j||"undefined"!=typeof window["beforeExpiryDays_"+d]&&window["beforeExpiryDays_"+d]==g&&"undefined"!=typeof window["beforeExpiryHours_"+d]&&window["beforeExpiryHours_"+d]==h&&"undefined"==typeof window["beforeExpiryMinutes_"+d]&&"00"==i&&"undefined"==typeof window["beforeExpirySeconds_"+d]&&"00"==j||"undefined"!=typeof window["beforeExpiryDays_"+d]&&window["beforeExpiryDays_"+d]==g&&"undefined"==typeof window["beforeExpiryHours_"+d]&&"00"==h&&"undefined"==typeof window["beforeExpiryMinutes_"+d]&&"00"==i&&"undefined"!=typeof window["beforeExpirySeconds_"+d]&&window["beforeExpirySeconds_"+d]==j||"undefined"==typeof window["beforeExpiryDays_"+d]&&"00"==g&&"undefined"==typeof window["beforeExpiryHours_"+d]&&"00"==h&&"undefined"!=typeof window["beforeExpiryMinutes_"+d]&&window["beforeExpiryMinutes_"+d]==i&&"undefined"!=typeof window["beforeExpirySeconds_"+d]&&window["beforeExpirySeconds_"+d]==j||"undefined"==typeof window["beforeExpiryDays_"+d]&&"00"==g&&"undefined"!=typeof window["beforeExpiryHours_"+d]&&window["beforeExpiryHours_"+d]==h&&"undefined"!=typeof window["beforeExpiryMinutes_"+d]&&window["beforeExpiryMinutes_"+d]==i&&"undefined"==typeof window["beforeExpirySeconds_"+d]&&"00"==j||"undefined"==typeof window["beforeExpiryDays_"+d]&&"00"==g&&"undefined"!=typeof window["beforeExpiryHours_"+d]&&window["beforeExpiryHours_"+d]==h&&"undefined"==typeof window["beforeExpiryMinutes_"+d]&&"00"==i&&"undefined"!=typeof window["beforeExpirySeconds_"+d]&&window["beforeExpirySeconds_"+d]==j||"undefined"!=typeof window["beforeExpiryDays_"+d]&&window["beforeExpiryDays_"+d]==g&&"undefined"==typeof window["beforeExpiryHours_"+d]&&"00"==h&&"undefined"!=typeof window["beforeExpiryMinutes_"+d]&&window["beforeExpiryMinutes_"+d]==i&&"undefined"==typeof window["beforeExpirySeconds_"+d]&&"00"==j||"undefined"!=typeof window["beforeExpiryDays_"+d]&&window["beforeExpiryDays_"+d]==g&&"undefined"==typeof window["beforeExpiryHours_"+d]&&"00"==h&&"undefined"==typeof window["beforeExpiryMinutes_"+d]&&"00"==i&&"undefined"==typeof window["beforeExpirySeconds_"+d]&&"00"==j||"undefined"==typeof window["beforeExpiryDays_"+d]&&"00"==g&&"undefined"!=typeof window["beforeExpiryHours_"+d]&&window["beforeExpiryHours_"+d]==h&&"undefined"==typeof window["beforeExpiryMinutes_"+d]&&"00"==i&&"undefined"==typeof window["beforeExpirySeconds_"+d]&&"00"==j||"undefined"==typeof window["beforeExpiryDays_"+d]&&"00"==g&&"undefined"==typeof window["beforeExpiryHours_"+d]&&"00"==h&&"undefined"!=typeof window["beforeExpiryMinutes_"+d]&&window["beforeExpiryMinutes_"+d]==i&&"undefined"==typeof window["beforeExpirySeconds_"+d]&&"00"==j||"undefined"==typeof window["beforeExpiryDays_"+d]&&"00"==g&&"undefined"==typeof window["beforeExpiryHours_"+d]&&"00"==h&&"undefined"==typeof window["beforeExpiryMinutes_"+d]&&"00"==i&&"undefined"!=typeof window["beforeExpirySeconds_"+d]&&window["beforeExpirySeconds_"+d]==j)&&n(a,b),"withnoStart"==c?window["startTime"+d].setSeconds(window["startTime"+d].getSeconds()+b.tickInterval):window["startDate"+d].setSeconds(window["startDate"+d].getSeconds()+b.tickInterval)):(o(a,"00"+b.timeSeparator+"00"+b.timeSeparator+"00"+b.timeSeparator+"00"),"withnoStart"==c?(delete window["dateTime"+d],delete window["startTime"+d],clearInterval(window["timer_givenDate"+d])):"withStart"==c&&(delete window["startDate"+d],delete window["endDate"+d],clearInterval(window["timer_startDate"+d])),m(a,b)),d=null}function k(a,b){if(1==window["currentTime"+a.attr("id")]){
    var c=new Date,d=c.getHours(),e=c.getMinutes(),f=c.getSeconds();d.toString().length<2&&(d="0"+d),e.toString().length<2&&(e="0"+e),f.toString().length<2&&(f="0"+f),o(a,d+b.timeSeparator+e+b.timeSeparator+f)}else alert("Set Current Time option.")}function l(a){var b=a.attr("id");window["countSeconds"+b].toString().length<2&&(window["countSeconds"+b]="0"+window["countSeconds"+b]),o(a,window["countSeconds"+b]+" sec"),window["countSeconds"+b]--,window["countSeconds"+b]==-1&&(delete window["countSeconds"+b],clearInterval(window["timer_secondsTimer"+b])),b=null}function m(b,c){null!=c.timeUp&&1==a.isFunction(c.timeUp)&&c.timeUp.apply(b,[]),null!=c.expiryUrl&&(window.location=c.expiryUrl)}function n(b,c){null!=c.beforeExpiryTimeFunction&&1==a.isFunction(c.beforeExpiryTimeFunction)&&c.beforeExpiryTimeFunction.apply(b,[])}function o(a,b){var c=b;if("undefined"!=typeof window["regexpMatchFormat_"+a.attr("id")]&&"undefined"!=typeof window["regexpReplaceWith_"+a.attr("id")]){var d=new RegExp(window["regexpMatchFormat_"+a.attr("id")]);c=b.replace(d,window["regexpReplaceWith_"+a.attr("id")])}a.html(c)}function p(b,c,d,e){a("#"+d.pauseButton).click(function(){"resume"!=a(this).val()?(a("#"+d.pauseButton).val("resume").text("Resume"),clearInterval(window["timer_"+c+b.attr("id")])):"resume"==a(this).val()&&(a("#"+d.pauseButton).val("pause").text("Pause"),window["timer_"+c+b.attr("id")]=setInterval(function(){e(b,d)},1e3*d.tickInterval))})}function q(b,c,d,e){a("#"+d.stopButton).click(function(){"start"!=a(this).val()?(a("#"+d.stopButton).val("start").text("Start"),clearInterval(window["timer_"+c+b.attr("id")]),window["hours_"+c+b.attr("id")]=d.hours,window["minutes_"+c+b.attr("id")]=d.minutes,window["seconds_"+c+b.attr("id")]=d.seconds,e(b,d)):"start"==a(this).val()&&(a("#"+d.stopButton).val("stop").text("Stop"),window["timer_"+c+b.attr("id")]=setInterval(function(){e(b,d)},1e3*d.tickInterval))})}a.fn.countdowntimer=function(c){return this.each(function(){b(a(this),c)})},a.fn.countdowntimer.defaults={hours:0,minutes:0,seconds:60,startDate:new Date,dateAndTime:new Date("0000/00/00 00:00:00"),currentTime:!1,size:"sm",borderColor:"#F0068E",fontColor:"#FFFFFF",backgroundColor:"#000000",timeSeparator:":",tickInterval:1,timeUp:null,expiryUrl:null,regexpMatchFormat:null,regexpReplaceWith:null,pauseButton:null,stopButton:null,beforeExpiryTime:null,beforeExpiryTimeFunction:null}}(jQuery);
/*End Coming Soon*/
/*=========================================== ENDREGION: PLUGINS DECLARATION ====================================================*/


