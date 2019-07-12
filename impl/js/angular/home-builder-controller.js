(function() {
    var homeBuilderApp = angular.module('homeBuilderApp');

    homeBuilderApp.controller('homeBuilderController', ['$http','sendGetRequest', 'sendPostRequest', '$scope', '$filter', function($http, sendGetRequest, sendPostRequest, $scope, $filter) {
        var vm = this;
        vm._domain = getURLParam('domain') || '';
        vm._templateID = getURLParam('templateId') || '';
        vm._userId = getURLParam('userId') || '';
        vm._preview_mode = getURLParam('preview_mode') || '';
        vm.customTemplateId = getURLParam('customTemplateId') || '';
        vm.cssLink = '//' + vm._domain + '/template_styles_factory/css/' + vm.customTemplateId + '/' + vm._templateID + '/css/main.css';
        vm.reloadHash = '';
        vm.watchFlag = 0;

        vm.sectionsObject = {};

        ///////////////////////////////// REGION: actions /////////////////////////////////

        vm.initAction = function() {
            var _url ='//' + vm._domain + '/api/v3/template_service/getCustomTemplateInfo/' + vm.customTemplateId;

            initCustomHomeBuilder();

            if(vm.customTemplateId) {
                vm.preselectedOptions();
                sendGetRequest(_url,'',function(data){
                    vm.page = data.result;
                    console.log(vm.page)
                    if(!$.isEmptyObject(vm.page.pagesSetup)) {
                        vm.sectionsObject = JSON.parse(vm.page.pagesSetup);
                    } else {
                        vm.sectionsObject = sectionsSimpleObject;
                    }

                    vm.refresh();

                    vm.createShoppingCartLink();
                    var _date = new Date();

                    _date = _date.getTime();
                    var newStyle = '<link class="newStyle" media="all" rel="stylesheet" href="' + vm.cssLink + '?ver=' + _date +'">';
                    var linkCss = $('.oldStyle');

                    linkCss.after(newStyle);

                    $('.newStyle').load(function() {
                        linkCss.remove();
                        $('.newStyle').addClass('oldStyle').removeClass('newStyle');
                    });
                    setTimeout(function() {
                        $('.loaded-block').fadeOut();
                        vm.reloadPage();
                        initTouchNav();
                        initHome2PageSlider();
                        initContactGoogleMaps();
                        initCustomForms();
                        initMobileNav();
                        initBgVideo();
                        initSubMenuToSidebar();
                        initHomeLogoCarousel();
                        initTestimonialsSlider();
                        initCaseStudyDetailSlider();
                        if($('.builderItemsHolder').length && !vm._preview_mode) {
                            vm.saveHomeBuilder();
                        }

                        if(vm._preview_mode)  $('.hideItem').hide();
                    },500);
                });
            } else {
                vm.sectionsObject = sectionsSimpleObject;

                vm.refresh();
                $('.builder-active').removeClass('builder-active');
                setTimeout(function() {
                    initTouchNav();
                    initHome2PageSlider();
                    initCustomForms();
                    initBgVideo();
                    initContactGoogleMaps();
                    initMobileNav();
                    initSubMenuToSidebar();
                    initHomeLogoCarousel();
                    initTestimonialsSlider();
                    initCaseStudyDetailSlider();
                    $('.loaded-block').fadeOut();
                },500);
            }
        };

        vm.hideSection = function(key) {
            if(vm.sectionsObject[key].hideClass == 'hideItem') vm.sectionsObject[key].hideClass = '';
            else vm.sectionsObject[key].hideClass = 'hideItem';

            vm.watchFlag++;
        }

        vm.reloadPage = function() {
            var _url ='//' + vm._domain + '/api/v3/template_service/getCustomTemplateInfo/' + vm.customTemplateId;
            var _hashUrl = '//' + vm._domain + '/api/v3/template_service/getCustomTemplateChecksum/' + vm.customTemplateId;

            setTimeout(function() {
                sendGetRequest(_hashUrl,'',function(data){
                    if(data.result.checksum != vm.reloadHash) {
                        vm.reloadHash = data.result.checksum;
                        sendGetRequest(_url,'',function(data){
                            delete vm.page.customSitemap;
                            delete vm.page.systemSitemap;
                            var _date = new Date();


                            _date = _date.getTime();
                            vm.page.customSitemap = data.result.customSitemap;
                            vm.page.systemSitemap = data.result.systemSitemap;
                            vm.page.customStylesContentVars.image['header-logo']['default-value'] = data.result.customStylesContentVars.image['header-logo']['default-value'];
                            //vm.page.customStylesContentVars.text_multiline['footerAddress']['default-value'] = data.result.customStylesContentVars.text_multiline['footerAddress']['default-value'];
                            vm.page.customStylesContentVars.text['headerPhone']['default-value'] = data.result.customStylesContentVars.text['headerPhone']['default-value'];
                            vm.page.customStylesContentVars.text['footerFax']['default-value'] = data.result.customStylesContentVars.text['footerFax']['default-value'];
                            vm.page.customStylesContentVars.text['footerPhone']['default-value'] = data.result.customStylesContentVars.text['footerPhone']['default-value'];
                            //vm.page.customStylesContentVars.text['footerEmail']['default-value'] = data.result.customStylesContentVars.text['footerEmail']['default-value'];
                            //vm.page.customStylesContentVars.image['footer-logo']['default-value'] = data.result.customStylesContentVars.image['footer-logo']['default-value'];
                            vm.page.customStylesContentVars.text_multiline['footerCompanyName']['default-value'] = data.result.customStylesContentVars.text_multiline['footerCompanyName']['default-value'];

                            var newStyle = '<link class="newStyle" media="all" rel="stylesheet" href="' + vm.cssLink + '?ver=' + _date +'">';
                            var linkCss = $('.oldStyle');

                            linkCss.after(newStyle);

                            vm.refresh();
                            setTimeout(function() {
                                initTouchNav();
                                initMobileNav();
                                $('[href^="' + location.pathname + '"]').parents('li').addClass('selected');
                            },500);

                            $('.newStyle').load(function() {
                                linkCss.remove();
                                $('.newStyle').addClass('oldStyle').removeClass('newStyle');
                            });

                            setTimeout(function() {
                                vm.reloadPage();
                            },1000);
                        });
                    } else {
                        setTimeout(function() {
                            vm.reloadPage();
                        },1000);
                    }
                });
            },1000);
        }

        vm.pageZoomOut = function() {
            if(vm.zoomOutActive) {
                $('body').removeAttr('style');
                vm.zoomOutActive = 0;
            } else {
                $('body').attr('style','height:' + ($('body').height() / 2) + 'px');
                vm.zoomOutActive = 1;
            }

            vm.refresh();
        }

        $scope.$watch('vm.sectionsObject', function() {
            vm.watchFlag++;
        },true);

        vm.saveHomeBuilder = function() {
            var timeout = setTimeout(function() {
                if(vm.watchFlag) {
                    var sendObj = {};

                    $('.builderItem').each(function(){
                        var _this = $(this);

                        sendObj[_this.attr('id')] = vm.sectionsObject[_this.attr('id')];
                    });

                    var pageObjStr = JSON.stringify(sendObj);
                    var _url = '//' + vm._domain + '/api/v1/template_service/addCustomTemplatePagesSetup';
                    var data = {
                        customTemplateId : vm.customTemplateId,
                        pagesSetup : pageObjStr
                    }
                    vm.watchFlag = 0;
                    sendPostRequest(_url,data,function(data){
                        vm.saveHomeBuilder();
                    });
                } else {
                    vm.saveHomeBuilder();
                }
            },1000);
        }

        vm.preselectedOptions = function() {
            initSubMenuToSidebar();
            initWebApp3DetailPaging();
            $('#main a[href], .side-navigation a[href], #nav a[href], .login-nav a').each(function() {
                var _this = $(this);

                if(_this.attr('href').indexOf('#') != 0 && _this.attr('href').indexOf('http') == -1) {
                    _this.attr('href',_this.attr('href') + '?customTemplateId=' + vm.customTemplateId  + '&templateId=' + vm._templateID + '&domain=' + vm._domain + '&userId=' + vm._userId + '&preview_mode=' + vm._preview_mode);
                }
            });

            $('form').submit(function() {
                return false;
            });
            $('form').removeAttr('action');
            $('form').removeAttr('onsubmit');

            $('#header .logo a').attr('href','javascript:');
        }

        vm.getPageLink = function(item) {
            var choicesItem = item.choicesItem;
            var choicesLayouts = item.choicesLayouts;
            var _link = '';

            if($.isArray(choicesLayouts)) {
                _link = vm.page.layoutData[choicesItem].link;
            } else {
                choicesLayouts = vm.getFirstObjEl(choicesLayouts);
                _link = vm.page.layoutData[choicesItem].layouts[choicesLayouts[0]][choicesLayouts[1]].link;
            }
            
            if(_link != 'javascript:' && _link != '#') _link += '?customTemplateId=' + vm.customTemplateId + '&domain=' + vm._domain + '&userId=' + vm._userId + '&templateId=' + vm._templateID + '&preview_mode=' + vm._preview_mode;
            
            return _link;
        }

        vm.createShoppingCartLink = function() {
            function searchLink(arr) {
                for(var i = 0; i < arr.length; i++) {
                    var _this = arr[i];

                    if(_this.choicesItem == 'ecommerce') {
                        vm.shoppingCartLink = vm.page.layoutData[_this.choicesItem].layouts['Shopping Cart Layouts'][_this.choicesLayouts['Shopping Cart Layouts']].link + '?customTemplateId=' + vm.customTemplateId + '&domain=' + vm._domain + '&userId=' + vm._userId + '&templateId=' + vm._templateID + '&preview_mode=' + vm._preview_mode;
                        break;
                    }

                    if(_this.nodes.length) {
                        searchLink(_this.nodes);
                    }
                }
            }

            searchLink(vm.page.customSitemap);
        }

        ///////////////////////////////// ENDREGION: actions /////////////////////////////////

        //========================== REGION: GENERAL ==================//
        vm.refresh = function() {
            setTimeout(function() {
                $scope.$apply();
            },0);
        };

        vm.getFirstObjEl = function(obj) {
            for (var i in obj) {
                return [i,obj[i]];
                break;
            }
        };

        vm.isObjectEmpty = function(card){
            if(card) {
                return Object.keys(card).length === 0;
            }
        }
        //========================== ENDREGION: GENERAL ==================//

        angular.element(document).ready(function () {
            vm.initAction();
        });

        function initCustomHomeBuilder() {
            var condition = $('.customHomeBuilderPage').size()
                // && false
            ;init(condition);

            function init(condition) {
                if(condition || condition == null) {
                    $(document).on('click', '.builderItem .moveDown', function() {
                        var holder = $(this).closest('.builderItem');
                        var holderNext = holder.next('.builderItem');
                        var holderOffset = holder.offset().top;

                        vm.watchFlag++;

                        holder.addClass('changedItem');
                        changesCountFunction();

                        if(holderNext.length) {
                            var holderHeight = holder.height();
                            var holderNextHeight =  holderNext.height();

                            holder.css('zIndex', 999999);

                            holderNext.animate({'top' : -holderHeight},500);
                            holder.animate({'top' : holderNextHeight},500, function() {
                                holderNext.after(holder);
                                holder.removeAttr('style');
                                holderNext.removeAttr('style');
                            });

                            $('body,html').animate({
                                scrollTop: holderOffset + holderNextHeight - 111
                            }, 500);
                        }

                        return false;
                    });

                    $(document).on('click', '.builderItem .moveBottom', function() {
                        var holder = $(this).closest('.builderItem');
                        vm.watchFlag++;

                        holder.addClass('changedItem');
                        changesCountFunction();

                        $('.builderItemsHolder').append(holder);

                        return false;
                    });

                    $(document).on('click', '.builderItem .moveTop', function() {
                        var holder = $(this).closest('.builderItem');
                        vm.watchFlag++;

                        holder.addClass('changedItem');
                        changesCountFunction();

                        $('.builderItemsHolder').prepend(holder);
                        $('body,html').animate({
                            scrollTop: 0
                        }, 500);

                        return false;
                    });

                    $(document).on('click', '.builderItem .hideItem', function() {
                        var holder = $(this).closest('.builderItem');
                        vm.watchFlag++;

                        holder.addClass('changedItem');
                        changesCountFunction();
                    });

                    $(document).on('click', '.builderItem .moveUp', function() {
                        var holder = $(this).closest('.builderItem');
                        var holderPrev = holder.prev('.builderItem');
                        var holderOffset = holder.offset().top;
                        vm.watchFlag++;

                        holder.addClass('changedItem');
                        changesCountFunction();

                        if(holderPrev.length) {
                            var holderHeight = holder.height();
                            var holderPrevHeight =  holderPrev.height();

                            holder.css('zIndex', 999999);

                            holderPrev.animate({'top' : holderHeight},500);
                            holder.animate({'top' : -holderPrevHeight},500, function() {
                                holderPrev.before(holder);
                                holder.removeAttr('style');
                                holderPrev.removeAttr('style');
                            });

                            $('body,html').animate({
                                scrollTop: holderOffset - holderPrevHeight - 111
                            }, 500);
                        }

                        return false;
                    });

                    $(document).on('click', '.openEditPopup', function() {
                        var popup = $(this).closest('.builderItem').find('.popupForm');

                        $.fancybox.open(popup,{
                            wrapCSS : 'home-builder-lightbox'
                        });

                        return false;
                    });

                    $(document).on('change','.videoLinkInput', function() {
                        $('.videoBgHolder').YTPChangeMovie({videoURL: $('.videoLinkInput').attr('data-new_link')});
                    });

                    $(document).on('change','.popupForm input, .popupForm textarea', function() {
                        $(this).addClass('changedItem');
                        changesCountFunction();
                    });

                    if(getURLParam('preview_mode') == 1) $('.build-switcher').remove();

                    function changesCountFunction() {
                        $('body').addClass('build-changes-active');
                        $('.applyWidgetButton .editCounter').html($('.changedItem').length);
                    }
                }
            }
        }
    }]);

    homeBuilderApp.directive('contentItem', function ($compile) {
        var linker = function(scope, element, attrs) {
            element.html(scope.content.html).show();
            $compile(element.contents())(scope);
        }
        return {
            restrict: "A",
            link: linker,
            scope: {
                content:'='
            }
        };

    });

    homeBuilderApp.directive("fileread", [function () {
        return {
            scope: {
                fileread: "=",
                filereadcontent: "="
            },
            link: function (scope, element, attributes) {
                var loader = $(element).closest('.file-holder').find('.loader-img');

                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            loader.show();

                            var userId = getURLParam('userId');
                            var _domain = getURLParam('domain');

                            if(userId) {
                                var form = new FormData();
                                form.append("userId", userId);
                                form.append("image", changeEvent.target.files[0]);
                                form.append("maxWidth",  +element[0].attributes['data-width'].nodeValue);
                                form.append("maxHeight", +element[0].attributes['data-height'].nodeValue);

                                $.ajax({
                                    method: "POST",
                                    crossDomain : true,
                                    mimeType: "multipart/form-data",
                                    dataType: "JSON",
                                    processData: false,
                                    contentType: false,
                                    url: '//' + _domain + '/api/v1/template_service/addCustomTemplatePagesSetupImage',
                                    data: form,
                                    success : function(data) {
                                        if(data.result.success) {
                                            scope.filereadcontent = data.result.filePath;
                                            scope.$apply();
                                        } else {
                                            alert('Oops! There was an error loading your image. Please try again.');
                                        }

                                        loader.hide();
                                    }
                                });

                            } else {
                                scope.filereadcontent = loadEvent.target.result;
                                loader.hide();
                            }

                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);

    function expansion(str) {
        if(str.indexOf('jpg') != -1) {
            return 'jpg';
        } else if(str.indexOf('jpeg') != -1) {
            return 'jpeg';
        } else if(str.indexOf('gif') != -1) {
            return 'gif';
        } else if(str.indexOf('png') != -1) {
            return 'png';
        }
    }
})();

function initContactGoogleMaps() {
    var condition = $('#contactMapHolder').size()
        // && false
        ;
    init(condition);

    function init(condition) {
        if (condition || condition == null) {
            var lat = $('#contactMapHolder').data('lat');
            var lng = $('#contactMapHolder').data('lng');
            var myLatLng = {
                lat: lat,
                lng: lng
            };
            var mapOptions = {
                zoom: 12,
                center: myLatLng,
                scrollwheel: false,
                styles: [{
                    "stylers": [{
                        "saturation": -100
                    }]
                }],
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var mapElement = document.getElementById('contactMapHolder');
            var map = new google.maps.Map(mapElement, mapOptions);
            var _markers = [
                ['Weme', lat, lng]
            ];
            var _markers2 = [ ];

            var latlngbounds = new google.maps.LatLngBounds();

            for (var i = 0; i < _markers.length; i++) {
                var _marker = _markers[i];
                var myLatLng = new google.maps.LatLng(_marker[1], _marker[2]);
                var marker = new google.maps.Marker({
                    position: {
                        lat: _marker[1],
                        lng: _marker[2]
                    },
                    icon: "/images/settings_image/marker.png",
                    title: _marker[0]
                });
                _markers2.push(marker);
                marker.setMap(map);

                latlngbounds.extend(myLatLng);
            }

            if (_markers.length > 1) {
                map.setCenter(latlngbounds.getCenter(), map.fitBounds(latlngbounds));
            }

            $(document).on('change', '.coordinatesInput', function() {
                setTimeout(function(){
                    var newMyLatLng = {
                        lat: (+$('#contactMapHolder').attr('data-lat')),
                        lng: (+$('#contactMapHolder').attr('data-lng'))
                    };


                    _markers2[0].setMap(null);
                    _markers2 = [];
                    var marker = new google.maps.Marker({
                        position: newMyLatLng,
                        map: map,
                        icon: "/images/settings_image/marker.png",
                    });
                    _markers2.push(marker);
                    _markers2[0].setMap(map);
                    map.setOptions({
                        zoom: 12,
                        center: newMyLatLng,
                    });
                },0);
            });
        }
    }
}