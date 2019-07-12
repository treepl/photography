var sectionsSimpleObject = {
    section_1 : {
        html : `<section class="banner" >
				<div class="wrap" style="background-image: url({{content.image_1}})">
					<div class="container">
						<div class="holder">
							<div class="text">
								<h1 class="page-heading">{{content.title_1}}</h1>
								<p>{{content.short_description}}</p>
							</div>
							<div class="form-holder">
								<form class="banner-form">
									<div class="title-hold">
										<h2 class="h1">{{content.form_title}}</h2>
										<p>{{content.form_short_description}}</p>
									</div>
									<input type="text" />
									<input type="email"  />
									<input type="text"  />
									<textarea  id="" cols="30" rows="10"></textarea>
									<input type="submit" onclick="return false;" class="button" value="{{content.form_btn_title}}" />
								</form>
							</div>
						</div>
					</div>
                    <span class="overlay" style="opacity : {{content.overlay_opacity}}"></span>
				</div>
				<div class="info">
					<span class="text-block">{{content.btn_description}}</span>
					<a href="#" class="button light">{{content.btn_title}}</a>
				</div>
			</section>
        <div class="popup-holder">
            <div class="popupForm">
                <div class="edit-content">
                    <strong class="heading">Edit Content</strong>
                    <section>
                        <div class="input-row">
                            <label  for="input-1">Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.title_1" id="input-1"/>
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-1">Body Text</label>
                            <div class="holder">
                                <textarea  ng-model="content.short_description" ></textarea>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div class="input-row">
                            <label  for="input-1">Form Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.form_title"/>
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-1">Form Text</label>
                            <div class="holder">
                                <textarea  ng-model="content.form_short_description" ></textarea>
                            </div>
                        </div>
                         <div class="input-row">
                            <label  for="input-1">Form Button</label>
                            <div class="holder">
                                <input type="text" ng-model="content.form_btn_title"/>
                            </div>
                        </div>
                    </section>
                     <section>
                        <div class="input-row">
                            <label for="textarea-1">Bottom Section Text</label>
                            <div class="holder">
                                <textarea  ng-model="content.btn_description" ></textarea>
                            </div>
                        </div>
                         <div class="input-row">
                            <label  for="input-1">Bottom Section Button</label>
                            <div class="holder">
                                <input type="text" ng-model="content.btn_title"/>
                            </div>
                        </div>
                    </section>
                    <section>
                        <ul class="image-list">
                            <li>
                                <strong class="title">Background Image</strong>
                                <span class="info-text">* Recommended resolution: 1980x900 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_1}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_12" data-width="1980" data-height="900" filereadcontent="content.image_1" data-jcf='{"placeholderText": "Upload"}'>
                                    <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                                <input class="value-opacity" type="text" ng-model="content.overlay_opacity" />
							    <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                            </li>
                        </ul>
                    </section>
                    <div class="content-save-holder" style="display:none" ><a href="javascript:" ng-click="vm.editContentFancyClose();" class="content-save-button">Save</a></div>
                </div>
            </div>
        </div>`,
        image_1 : '/images/img4.jpg',
        title_1 : 'lorem ipsum dolor sit amet',
        short_description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolotre magna aliqua. Ut enim ad minim veniam.',
        form_title : 'Get Consultation',
        form_short_description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        form_btn_title : 'Submit',
        btn_description : 'Looking for Something? Click Here to Find it',
        btn_title : 'Button',
        overlay_opacity : '0.1'
    },
    section_2 : {
        html : `<section class="section-info">
				<div class="container">
					<div class="heading">
						<h1 class="page-title">
							<span>{{content.title}}</span>
						</h1>
						<p>{{content.sub_title_text}}</p>
					</div>
					<div class="row-holder">
						<div class="col-4">
							<div class="img-block">
								<img src="{{content.image_1}}" alt="image description">
							</div>
							<div class="text">
								<h2 class="h3">{{content.title_1}}</h2>
								<p>{{content.content_1}}</p>
								<a href="#" class="button" ng-show="content.btn_title_1">{{content.btn_title_1}}</a>
							</div>
						</div>
						<div class="col-4">
							<div class="img-block">
								<img src="{{content.image_2}}" alt="image description">
							</div>
							<div class="text">
								<h2 class="h3">{{content.title_2}}</h2>
								<p>{{content.content_2}}</p>
								<a href="#" class="button" ng-show="content.btn_title_2">{{content.btn_title_2}}</a>
							</div>
						</div>
						<div class="col-4">
							<div class="img-block">
								<img src="{{content.image_3}}" alt="image description">
							</div>
							<div class="text">
								<h2 class="h3">{{content.title_3}}</h2>
								<p>{{content.content_3}}</p>
								<a href="#" class="button" ng-show="content.btn_title_3">{{content.btn_title_3}}</a>
							</div>
						</div>
					</div>
				</div>
			</section>
            <div class="popup-holder">
                <div class="popupForm">
                    <div class="edit-content">
                        <strong class="heading">Edit Heading Section</strong>
                        <section>
                            <div class="input-row">
                                <label>Title</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.title"/>
                                </div>
                            </div>
                            <div class="input-row">
                                <label for="textarea-1">Heading Text</label>
                                <div class="holder">
                                    <textarea  ng-model="content.sub_title_text" ></textarea>
                                </div>
                            </div>
                        </section>
                        <strong class="heading">Edit Section 1</strong>
                        <section>
                            <ul class="image-list">
                                <li>
                                    <strong class="title">Image</strong>
                                    <span class="info-text">* Recommended resolution: 367x225 px</span>
                                    <div class="img-block">
                                        <img src="{{content.image_1}}" alt="image description">
                                    </div>
                                    <div class="file-holder">
                                        <input type="file" fileread="content.image_12" data-width="367" data-height="225" filereadcontent="content.image_1" data-jcf='{"placeholderText": "Upload"}'>
                                        <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                    </div>
                                </li>
                            </ul>
                             <div class="input-row">
                                <label>Title</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.title_1"/>
                                </div>
                            </div>
                            <div class="input-row">
                                <label>Text</label>
                                <div class="holder">
                                    <textarea ng-model="content.content_1" ></textarea>
                                </div>
                            </div>
                            <div class="input-row">
                                <label>Button text</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.btn_title_1"/>
                                    <span class="info-text">*Make this field blank for the button to disappear from the layout</span>
                                </div>
                            </div>
                        </section>
                         <strong class="heading">Edit Section 2</strong>
                        <section>
                            <ul class="image-list">
                                <li>
                                    <strong class="title">Image</strong>
                                    <span class="info-text">* Recommended resolution: 367x225 px</span>
                                    <div class="img-block">
                                        <img src="{{content.image_2}}" alt="image description">
                                    </div>
                                    <div class="file-holder">
                                        <input type="file" fileread="content.image_22" data-width="367" data-height="225" filereadcontent="content.image_2" data-jcf='{"placeholderText": "Upload"}'>
                                        <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                    </div>
                                </li>
                            </ul>
                             <div class="input-row">
                                <label>Title</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.title_2"/>
                                </div>
                            </div>
                            <div class="input-row">
                                <label>Text</label>
                                <div class="holder">
                                    <textarea ng-model="content.content_2" ></textarea>
                                </div>
                            </div>
                            <div class="input-row">
                                <label>Button text</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.btn_title_2"/>
                                    <span class="info-text">*Make this field blank for the button to disappear from the layout</span>
                                </div>
                            </div>
                        </section>
                         <strong class="heading">Edit Section 3</strong>
                        <section>
                            <ul class="image-list">
                                <li>
                                    <strong class="title">Image</strong>
                                    <span class="info-text">* Recommended resolution: 367x225 px</span>
                                    <div class="img-block">
                                        <img src="{{content.image_3}}" alt="image description">
                                    </div>
                                    <div class="file-holder">
                                        <input type="file" fileread="content.image_32" data-width="367" data-height="225" filereadcontent="content.image_3" data-jcf='{"placeholderText": "Upload"}'>
                                        <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                    </div>
                                </li>
                            </ul>
                             <div class="input-row">
                                <label>Title</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.title_3"/>
                                </div>
                            </div>
                            <div class="input-row">
                                <label>Text</label>
                                <div class="holder">
                                    <textarea ng-model="content.content_3" ></textarea>
                                </div>
                            </div>
                            <div class="input-row">
                                <label>Button text</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.btn_title_3"/>
                                    <span class="info-text">*Make this field blank for the button to disappear from the layout</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>`,
       title : 'Headline',
       sub_title_text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet elit eget leo accumsan.',
       image_1 : '/images/img106.jpg',
       title_1 : 'Column Headline',
       content_1 : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet elit eget leo accumsan, pellentesque sollicitudin lacus.',
       btn_title_1 : 'Read More',
       image_2 : '/images/item-img-01.jpg',
       title_2 : 'Column Headline',
       content_2 : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet elit eget leo accumsan, pellentesque sollicitudin lacus.',
       btn_title_2 : 'Read More',
       image_3 : '/images/item-img-02.jpg',
       title_3 : 'Column Headline',
       content_3 : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet elit eget leo accumsan, pellentesque sollicitudin lacus.',
       btn_title_3 : 'Read More',
   },
    section_3 : {
        html : `<section class="visual-wrap" style="background-image: url({{content.image_1}});">
				<div class="container">
					<h1 class="page-title">{{content.title_1}}</h1>
					<p>{{content.content_1}}</p>
					<a href="#" class="button light" ng-show="content.btn_title_1">{{content.btn_title_1}}</a>
				</div>
				<span class="overlay" style="opacity : {{content.overlay_opacity}}"></span>
			</section>
            <div class="popup-holder">
                <div class="popupForm">
                    <div class="edit-content">
                        <strong class="heading">Edit Content</strong>
                        <section>
                            <div class="input-row">
                                <label  for="input-10">Title</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.title_1" id="input-10"/>
                                </div>
                            </div>
                            <div class="input-row">
                                <label for="textarea-4">Body Text</label>
                                <div class="holder">
                                    <textarea  id="textarea-4" ng-model="content.content_1" ></textarea>
                                </div>
                            </div>
                            <div class="input-row">
                                <label  for="input-11">Button text</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.btn_title_1" id="input-11"/>
                                    <span class="info-text">*Make this field blank for the button to disappear from the layout</span>
                                </div>
                            </div>
                            <ul class="image-list">
                                <li>
                                    <strong class="title">Background Image</strong>
                                    <span class="info-text">* Recommended resolution: 1980x525px</span>
                                    <div class="img-block">
                                        <img src="{{content.image_1}}" alt="image description">
                                    </div>
                                    <div class="file-holder">
                                        <input type="file" fileread="content.image_12" data-width="1980" data-height="525" filereadcontent="content.image_1" data-jcf='{"placeholderText": "Upload"}'>
                                        <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                    </div>
                                    <input class="value-opacity" type="text" ng-model="content.overlay_opacity" />
                                    <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>`,
        title_1 : 'Heading',
        content_1 : 'Orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
        btn_title_1 : 'See Portfolio',
        image_1 : '/images/img16-1.jpg',
        overlay_opacity : '0.64'
    },
    section_4 : {
        html : `<section class="information-container">
				<div class="container">
					<div class="row-holder">
						<div class="col-6">
							<div class="img-block" style="background-image: url({{content.image_1}}"></div>
						</div>
						<div class="col-6">
							<div class="holder">
								<div class="heading">
									<h1 class="page-title"><span>{{content.title}}</span></h1>
									<p>{{content.content}}</p>
								</div>
								<ul class="info-list">
									<li>
										<div ng-bind-html="content.icon_1 | unsafe"></div>
										<p>{{content.content_1}}</p>
									</li>
									<li>
										<div ng-bind-html="content.icon_2 | unsafe"></div>
										<p>{{content.content_2}}</p>
									</li>
									<li>
										<div ng-bind-html="content.icon_3 | unsafe"></div>
										<p>{{content.content_3}}</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
            <div class="popup-holder">
                <div class="popupForm">
                    <div class="edit-content">
                        <strong class="heading">Edit Image</strong>
                        <section>
                            <ul class="image-list">
                                <li>
                                    <strong class="title">Image</strong>
                                    <span class="info-text">* Recommended resolution: 914x621 px</span>
                                    <div class="img-block">
                                        <img src="{{content.image_1}}" alt="image description">
                                    </div>
                                    <div class="file-holder">
                                        <input type="file" fileread="content.image_12" data-width="914" data-height="621" filereadcontent="content.image_1" data-jcf='{"placeholderText": "Upload"}'>
                                    <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <strong class="heading">Edit Heading Section</strong>
                        <section>
                            <div class="input-row">
                                <label>Title</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.title"/>
                                </div>
                            </div>
                            <div class="input-row">
                                <label>Heading Text</label>
                                <div class="holder">
                                    <textarea ng-model="content.content" ></textarea>
                                </div>
                            </div>
                        </section>
                        <strong class="heading">Edit Section 1</strong>
                        <section>
                            <div class="input-row">
                                <label>Icon</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.icon_1" />
                                    <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                                </div>
                            </div>
                            <div class="input-row">
                                <label>Body Text</label>
                                <div class="holder">
                                    <textarea ng-model="content.content_1" ></textarea>
                                </div>
                            </div>
                        </section>
                        <strong class="heading">Edit Section 2</strong>
                        <section>
                            <div class="input-row">
                                <label>Icon</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.icon_2" />
                                    <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                                </div>
                            </div>
                            <div class="input-row">
                                <label>Body Text</label>
                                <div class="holder">
                                    <textarea ng-model="content.content_2" ></textarea>
                                </div>
                            </div>
                        </section>
                        <strong class="heading">Edit Section 3</strong>
                        <section>
                            <div class="input-row">
                                <label>Icon</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.icon_3" />
                                    <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                                </div>
                            </div>
                            <div class="input-row">
                                <label>Body Text</label>
                                <div class="holder">
                                    <textarea ng-model="content.content_3" ></textarea>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>`,
        image_1 : '/images/img108.jpg',
        title : 'Headline',
        content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet elit eget leo accumsan, pellentesque sollicitudin lacus consectetur donec.',
        icon_1 : '<i class="far fa-id-card" aria-hidden="true"></i>',
        content_1 : 'Quis autem velis reprehenderit et quis voluptate velit esse quam nihil et illum consequatur quia voluptas sit',
        icon_2 : '<i class="fa fa-car" aria-hidden="true"></i>',
        content_2 : 'Quis autem velis reprehenderit et quis voluptate velit esse quam nihil et illum consequatur quia voluptas sit',
        icon_3 : '<i class="fa fa-info" aria-hidden="true"></i>',
        content_3 : 'Quis autem velis reprehenderit et quis voluptate velit esse quam nihil et illum consequatur quia voluptas sit'
    },
    section_5 : {
        html : `<aside class="item-holder three-columns">
                        <section class="item-block bg-block" style="background-image: url({{content.image_1}});">
                            <div class="description">
                                <div class="holder">
                                    <h1>{{content.title_1}}</h1>
                                    <p>{{content.content_1}}</p>
                                    <a href="#" class="more">{{content.btn_title_1}}</a>
                                </div>
                                <span class="overlay" style="opacity: {{content.overlay_opacity_1}}"></span>
                            </div>
                        </section>
                        <section class="item-block bg-block" style="background-image: url({{content.image_2}});">
                            <div class="description">
                                <div class="holder">
                                    <h1>{{content.title_2}}</h1>
                                    <p>{{content.content_2}}</p>
                                    <a href="#" class="more">{{content.btn_title_2}}</a>
                                </div>
                                <span class="overlay" style="opacity: {{content.overlay_opacity_2}}"></span>
                            </div>
                        </section>
                        <section class="item-block bg-block" style="background-image: url({{content.image_3}});">
                            <div class="description">
                                <div class="holder">
                                    <h1>{{content.title_3}}</h1>
                                    <p>{{content.content_3}}</p>
                                    <a href="#" class="more">{{content.btn_title_3}}</a>
                                </div>
                                <span class="overlay" style="opacity: {{content.overlay_opacity_3}}"></span>
                            </div>
                        </section>
                    </aside>
                    <div class="popup-holder">
                        <div class="popupForm">
                            <div class="edit-content">
                                <strong class="heading">Edit Section 1</strong>
                                <section>
                                    <ul class="image-list">
                                        <li>
                                            <strong class="title">Image</strong>
                                            <span class="info-text">* Recommended resolution: 620x421 px</span>
                                            <div class="img-block">
                                                <img src="{{content.image_1}}" alt="image description">
                                            </div>
                                            <div class="file-holder">
                                                <input type="file" fileread="content.image_12" data-width="620" data-height="421" filereadcontent="content.image_1" data-jcf='{"placeholderText": "Upload"}'>
                                           <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                            </div>
                                             <input class="value-opacity" type="text" ng-model="content.overlay_opacity_1" />
                                        <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                                        </li>

                                    </ul>
                                    <div class="input-row">
                                        <label  for="input-35">Title</label>
                                        <div class="holder">
                                            <input type="text" ng-model="content.title_1" id="input-35"/>
                                        </div>
                                    </div>
                                    <div class="input-row">
                                        <label for="textarea-16">Body Text</label>
                                        <div class="holder">
                                            <textarea  id="textarea-16" ng-model="content.content_1" ></textarea>
                                        </div>
                                    </div>
                                    <div class="input-row">
                                        <label  for="input-36">Button text</label>
                                        <div class="holder">
                                            <input type="text" ng-model="content.btn_title_1" id="input-36"/>
                                        </div>
                                    </div>
                                </section>
                                <strong class="heading">Edit Section 2</strong>
                                <section>
                                    <ul class="image-list">
                                        <li>
                                            <strong class="title">Image</strong>
                                            <span class="info-text">* Recommended resolution: 620x421 px</span>
                                            <div class="img-block">
                                                <img src="{{content.image_2}}" alt="image description">
                                            </div>
                                            <div class="file-holder">
                                                <input type="file" fileread="content.image_22" data-width="620" data-height="421" filereadcontent="content.image_2" data-jcf='{"placeholderText": "Upload"}'>
                                            <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                            </div>
                                            <input class="value-opacity" type="text" ng-model="content.overlay_opacity_2" />
                                        <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                                        </li>
                                    </ul>
                                    <div class="input-row">
                                        <label  for="input-37">Title</label>
                                        <div class="holder">
                                            <input type="text" ng-model="content.title_2" id="input-37"/>
                                        </div>
                                    </div>
                                    <div class="input-row">
                                        <label for="textarea-17">Body Text</label>
                                        <div class="holder">
                                            <textarea  id="textarea-17" ng-model="content.content_2" ></textarea>
                                        </div>
                                    </div>
                                    <div class="input-row">
                                        <label  for="input-38">Button text</label>
                                        <div class="holder">
                                            <input type="text" ng-model="content.btn_title_2" id="input-38"/>
                                        </div>
                                    </div>
                                </section>
                                <strong class="heading">Edit Section 3</strong>
                                <section>
                                    <ul class="image-list">
                                        <li>
                                            <strong class="title">Image</strong>
                                            <span class="info-text">* Recommended resolution: 620x421 px</span>
                                            <div class="img-block">
                                                <img src="{{content.image_3}}" alt="image description">
                                            </div>
                                            <div class="file-holder">
                                                <input type="file" fileread="content.image_32" data-width="620" data-height="421" filereadcontent="content.image_3" data-jcf='{"placeholderText": "Upload"}'>
                                            <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                            </div>
                                            <input class="value-opacity" type="text" ng-model="content.overlay_opacity_3" />
                                        <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                                        </li>
                                    </ul>
                                    <div class="input-row">
                                        <label  for="input-39">Title</label>
                                        <div class="holder">
                                            <input type="text" ng-model="content.title_3" id="input-39"/>
                                        </div>
                                    </div>
                                    <div class="input-row">
                                        <label for="textarea-18">Body Text</label>
                                        <div class="holder">
                                            <textarea  id="textarea-18" ng-model="content.content_3" ></textarea>
                                        </div>
                                    </div>
                                    <div class="input-row">
                                        <label  for="input-40">Button text</label>
                                        <div class="holder">
                                            <input type="text" ng-model="content.btn_title_3" id="input-40"/>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>`,
        image_1 : '/images/img17.jpg',
        title_1 : 'Quisque ligulas',
        content_1 : 'ipsum, euismod atras vulputate iltricies etri elit. Class aptent taciti sociosqu ad litora torquent',
        btn_title_1 : 'More',
        image_2 : '/images/img18.jpg',
        title_2 : 'Quisque ligulas',
        content_2 : 'Quisque ligulas ipsum, euismod atras vulputate iltricies etri elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra euismod atras iltricies.',
        btn_title_2 : 'More',
        image_3 : '/images/img19.jpg',
        title_3 : 'Quisque ligulas',
        content_3 : 'ipsum, euismod atras vulputate iltricies etri elit. Class aptent taciti sociosqu ad litora torquent',
        btn_title_3 : 'More',
        overlay_opacity_1 : '0.5',
        overlay_opacity_2 : '0.5',
        overlay_opacity_3 : '0.5'
    },
    section_6 : {
        html : `<section class="latest-blog section">
            <div class="container">
                <h1 class="page-title">{{content.title}}</h1>
                <div class="row-holder post-holder">
                    <article class="post">
                        <div class="wrap">
                            <div class="top-holder">
                                <time class="date" datetime="2013-12-24">{{content.date_1}}</time>
                                <div class="image-block">
                                    <img src="{{content.image_1}}" width="376" height="240" alt="image description">
                                </div>
                            </div>
                            <div class="holder">
                                <div class="text">
                                    <h1><a href="#">{{content.title_1}}</a></h1>
                                    <p>{{content.description_1}}</p>
                                </div>
                                <footer class="meta">
                                    <a href="#" class="button btn-xsmall">{{content.btn_title_1}}</a>
                                    <div class="frame">
                                        <div class="share-block">
                                            <strong class="title">Share This</strong>
                                            <ul class="social-networks">
                                                <li class="facebook"><a href="#">Facebook</a></li>
                                                <li class="twitter"><a href="#">Twitter</a></li>
                                            </ul>
                                        </div>
                                        <a href="#" class="link-comments">18 comments</a>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </article>
                    <article class="post">
                        <div class="wrap">
                            <div class="top-holder">
                                <time class="date" datetime="2013-12-24">{{content.date_2}}</time>
                                <div class="image-block">
                                    <img src="{{content.image_2}}" width="376" height="240" alt="image description">
                                </div>
                            </div>
                            <div class="holder">
                                <div class="text">
                                    <h1><a href="#">{{content.title_2}}</a></h1>
                                    <p>{{content.description_2}}</p>
                                </div>
                                <footer class="meta">
                                    <a href="#" class="button btn-xsmall">{{content.btn_title_2}}</a>
                                    <div class="frame">
                                        <div class="share-block">
                                            <strong class="title">Share This</strong>
                                            <ul class="social-networks">
                                                <li class="facebook"><a href="#">Facebook</a></li>
                                                <li class="twitter"><a href="#">Twitter</a></li>
                                            </ul>
                                        </div>
                                        <a href="#" class="link-comments">18 comments</a>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </article>
                    <article class="post">
                        <div class="wrap">
                            <div class="top-holder">
                                <time class="date" datetime="2013-12-24">{{content.date_3}}</time>
                                <div class="image-block">
                                    <img src="{{content.image_3}}" width="376" height="240" alt="image description">
                                </div>
                            </div>
                            <div class="holder">
                                <div class="text">
                                    <h1><a href="#">{{content.title_3}}</a></h1>
                                    <p>{{content.description_3}}</p>
                                </div>
                                <footer class="meta">
                                    <a href="#" class="button btn-xsmall">{{content.btn_title_3}}</a>
                                    <div class="frame">
                                        <div class="share-block">
                                            <strong class="title">Share This</strong>
                                            <ul class="social-networks">
                                                <li class="facebook"><a href="#">Facebook</a></li>
                                                <li class="twitter"><a href="#">Twitter</a></li>
                                            </ul>
                                        </div>
                                        <a href="#" class="link-comments">18 comments</a>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
        <div class="popup-holder">
            <div class="popupForm">
                <div class="edit-content">
                    <strong class="heading">Edit Content</strong>
                    <section>
                        <div class="input-row">
                            <label>Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.title"/>
                            </div>
                        </div>
                    </section>
                    <strong class="heading">Post 1</strong>
                    <section>
                        <ul class="image-list">
                            <li>
                                <strong class="title">Image</strong>
                                <span class="info-text">* Recommended resolution: 367x228 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_1}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_12" data-width="367" data-height="228" filereadcontent="content.image_1" data-jcf='{"placeholderText": "Upload"}'>
                                <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                            </li>
                        </ul>
                        <div class="input-row">
                            <label>Date</label>
                            <div class="holder">
                                <input type="text" ng-model="content.date_1"/>
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.title_1"/>
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Text</label>
                            <div class="holder">
                                <textarea  ng-model="content.description_1" ></textarea>
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Button Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.btn_title_1"/>
                            </div>
                        </div>
                    </section>
                    <strong class="heading">Post 2</strong>
                    <section>
                        <ul class="image-list">
                            <li>
                                <strong class="title">Image</strong>
                                <span class="info-text">* Recommended resolution: 367x228 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_2}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_22" data-width="367" data-height="228" filereadcontent="content.image_2" data-jcf='{"placeholderText": "Upload"}'>
                                <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                            </li>
                        </ul>
                        <div class="input-row">
                            <label>Date</label>
                            <div class="holder">
                                <input type="text" ng-model="content.date_2"/>
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.title_2"/>
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Text</label>
                            <div class="holder">
                                <textarea  ng-model="content.description_2" ></textarea>
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Button Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.btn_title_2"/>
                            </div>
                        </div>
                    </section>
                    <strong class="heading">Post 3</strong>
                    <section>
                        <ul class="image-list">
                            <li>
                                <strong class="title">Image</strong>
                                <span class="info-text">* Recommended resolution: 367x228 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_3}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_32" data-width="367" data-height="228" filereadcontent="content.image_3" data-jcf='{"placeholderText": "Upload"}'>
                                <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                            </li>
                        </ul>
                        <div class="input-row">
                            <label>Date</label>
                            <div class="holder">
                                <input type="text" ng-model="content.date_3"/>
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.title_3"/>
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Text</label>
                            <div class="holder">
                                <textarea  ng-model="content.description_3" ></textarea>
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Button Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.btn_title_3"/>
                            </div>
                        </div>
                    </section>
                    <div class="content-save-holder" style="display:none" ><a href="javascript:" ng-click="vm.editContentFancyClose();" class="content-save-button">Save</a></div>
                </div>
            </div>
        </div>`,
        title : 'LATEST FROM OUR BLOG',
        date_1 : 'December 24, 2017',
        image_1 : '/images/img23.jpg',
        title_1 : 'Lorem ipsum is dolor',
        description_1 : 'Orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        btn_title_1 : 'Learn More',
        date_2 : 'December 24, 2017',
        image_2 : '/images/img22.jpg',
        title_2 : 'Lorem ipsum is dolor',
        description_2 : 'Orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        btn_title_2 : 'Learn More',
        date_3 : 'December 24, 2017',
        image_3 : '/images/img27.jpg',
        title_3 : 'Lorem ipsum is dolor',
        description_3 : 'Orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        btn_title_3 : 'Learn More'
    },
    section_7 : {
        html : `<aside class="item-holder">
            <section ng-hide="content.hide_section_1" class="item-block">
                <img src="{{content.image_1}}" height="482" alt="image description">
                <div class="description">
                    <div class="holder">
                        <div class="image-block" ng-bind-html="content.icon_1 | unsafe"></div>
                        <p>{{content.content_1}}</p>
                    </div>
                    <span class="overlay" style="opacity : {{content.overlay_opacity_1}}"></span>
                </div>
            </section>
            <section ng-hide="content.hide_section_2" class="item-block">
                <img src="{{content.image_2}}" width="480" height="482" alt="image description">
                <div class="description">
                    <div class="holder">
                        <div class="image-block" ng-bind-html="content.icon_2 | unsafe"></div>
                        <p>{{content.content_2}}</p>
                    </div>
                    <span class="overlay" style="opacity : {{content.overlay_opacity_2}}"></span>
                </div>
            </section>
            <section ng-hide="content.hide_section_3" class="item-block">
                <img src="{{content.image_3}}" width="480" height="482" alt="image description">
                <div class="description">
                    <div class="holder">
                        <div class="image-block" ng-bind-html="content.icon_3 | unsafe"></div>
                        <p>{{content.content_3}}</p>
                    </div>
                    <span class="overlay" style="opacity : {{content.overlay_opacity_3}}"></span>
                </div>
            </section>
            <section ng-hide="content.hide_section_4" class="item-block">
                <img src="{{content.image_4}}" width="480" height="482" alt="image description">
                <div class="description">
                    <div class="holder">
                        <div class="image-block" ng-bind-html="content.icon_4 | unsafe"></div>
                        <p>{{content.content_4}}</p>
                    </div>
                    <span class="overlay" style="opacity : {{content.overlay_opacity_4}}"></span>
                </div>
            </section>
            <section ng-hide="content.hide_section_5" class="item-block">
                <img src="{{content.image_5}}" width="480" height="482" alt="image description">
                <div class="description">
                    <div class="holder">
                        <div class="image-block" ng-bind-html="content.icon_5 | unsafe"></div>
                        <p>{{content.content_5}}</p>
                    </div>
                    <span class="overlay" style="opacity : {{content.overlay_opacity_5}}"></span>
                </div>
            </section>
            <section ng-hide="content.hide_section_6" class="item-block">
                <img src="{{content.image_6}}" width="480" height="482" alt="image description">
                <div class="description">
                    <div class="holder">
                        <div class="image-block" ng-bind-html="content.icon_6 | unsafe"></div>
                        <p>{{content.content_6}}</p>
                    </div>
                    <span class="overlay" style="opacity : {{content.overlay_opacity_6}}"></span>
                </div>
            </section>
            <section ng-hide="content.hide_section_7" class="item-block">
                <img src="{{content.image_7}}" width="480" height="482" alt="image description">
                <div class="description">
                    <div class="holder">
                        <div class="image-block" ng-bind-html="content.icon_7 | unsafe"></div>
                        <p>{{content.content_7}}</p>
                    </div>
                    <span class="overlay" style="opacity : {{content.overlay_opacity_7}}"></span>
                </div>
            </section>
            <section ng-hide="content.hide_section_8" class="item-block">
                <img src="{{content.image_8}}" width="480" height="482" alt="image description">
                <div class="description">
                    <div class="holder">
                        <div class="image-block" ng-bind-html="content.icon_8 | unsafe"></div>
                        <p>{{content.content_8}}</p>
                    </div>
                    <span class="overlay" style="opacity : {{content.overlay_opacity_8}}"></span>
                </div>
            </section>
        </aside>
        <div class="popup-holder">
            <div class="popupForm">
                <div class="edit-content">
                    <strong class="heading">Edit Item 1</strong>
                    <div class="inputs-row">
                        <input type="checkbox" ng-model="content.hide_section_1" />
                        <label>Hide section</label>
                    </div>
                    <section ng-class="content.hide_section_1 ? 'hide-section' : ''">
                        <ul class="image-list">
                            <li>
                                <strong class="title">Image</strong>
                                <span class="info-text">* Recommended resolution: 480x482 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_1}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_12" data-width="480" data-height="482" filereadcontent="content.image_1" data-jcf='{"placeholderText": "Upload"}'>
                                    <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                                <input class="value-opacity" type="text" ng-model="content.overlay_opacity_1" />
                                <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                            </li>
                        </ul>
                        <div class="input-row">
                            <label  for="input-12">Icon</label>
                            <div class="holder">
                                <input type="text" ng-model="content.icon_1" id="input-12"/>
                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-5">Body Text</label>
                            <div class="holder">
                                <textarea  id="textarea-5" ng-model="content.content_1" ></textarea>
                            </div>
                        </div>
                    </section>
                    <strong class="heading">Edit Item 2</strong>
                    <div class="inputs-row">
                        <input type="checkbox" ng-model="content.hide_section_2" />
                        <label>Hide section</label>
                    </div>
                    <section ng-class="content.hide_section_2 ? 'hide-section' : ''">
                        <ul class="image-list">
                            <li>
                                <strong class="title">Image</strong>
                                <span class="info-text">* Recommended resolution: 480x482 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_2}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_22" data-width="480" data-height="482" filereadcontent="content.image_2" data-jcf='{"placeholderText": "Upload"}'>
                                    <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                                <input class="value-opacity" type="text" ng-model="content.overlay_opacity_2" />
                                <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                            </li>
                        </ul>
                        <div class="input-row">
                            <label  for="input-13">Icon</label>
                            <div class="holder">
                                <input type="text" ng-model="content.icon_2" id="input-13"/>
                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-6">Body Text</label>
                            <div class="holder">
                                <textarea  id="textarea-6" ng-model="content.content_2" ></textarea>
                            </div>
                        </div>
                    </section>
                    <strong class="heading">Edit Item 3</strong>
                    <div class="inputs-row">
                        <input type="checkbox" ng-model="content.hide_section_3" />
                        <label>Hide section</label>
                    </div>
                    <section ng-class="content.hide_section_3 ? 'hide-section' : ''">
                        <ul class="image-list">
                            <li>
                                <strong class="title">Image</strong>
                                <span class="info-text">* Recommended resolution: 480x482 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_3}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_32" data-width="480" data-height="482" filereadcontent="content.image_3" data-jcf='{"placeholderText": "Upload"}'>
                                    <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                                <input class="value-opacity" type="text" ng-model="content.overlay_opacity_3" />
                                <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                            </li>
                        </ul>
                        <div class="input-row">
                            <label  for="input-14">Icon</label>
                            <div class="holder">
                                <input type="text" ng-model="content.icon_3" id="input-14"/>
                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-7">Body Text</label>
                            <div class="holder">
                                <textarea  id="textarea-7" ng-model="content.content_3" ></textarea>
                            </div>
                        </div>
                    </section>
                    <strong class="heading">Edit Item 4</strong>
                    <div class="inputs-row">
                        <input type="checkbox" ng-model="content.hide_section_4" />
                        <label>Hide section</label>
                    </div>
                    <section ng-class="content.hide_section_4 ? 'hide-section' : ''">
                        <ul class="image-list">
                            <li>
                                <strong class="title">Image</strong>
                                <span class="info-text">* Recommended resolution: 480x482 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_4}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_42" data-width="480" data-height="482" filereadcontent="content.image_4" data-jcf='{"placeholderText": "Upload"}'>
                                    <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                                <input class="value-opacity" type="text" ng-model="content.overlay_opacity_4" />
                                <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                            </li>
                        </ul>
                        <div class="input-row">
                            <label  for="input-15">Icon</label>
                            <div class="holder">
                                <input type="text" ng-model="content.icon_4" id="input-15"/>
                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-8">Body Text</label>
                            <div class="holder">
                                <textarea  id="textarea-8" ng-model="content.content_4" ></textarea>
                            </div>
                        </div>
                    </section>
                    <strong class="heading">Edit Item 5</strong>
                    <div class="inputs-row">
                        <input type="checkbox" ng-model="content.hide_section_5" />
                        <label>Hide section</label>
                    </div>
                    <section ng-class="content.hide_section_5 ? 'hide-section' : ''">
                        <ul class="image-list">
                            <li>
                                <strong class="title">Image</strong>
                                <span class="info-text">* Recommended resolution: 480x482 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_5}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_52" data-width="480" data-height="482" filereadcontent="content.image_5" data-jcf='{"placeholderText": "Upload"}'>
                                    <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                                <input class="value-opacity" type="text" ng-model="content.overlay_opacity_5" />
                                <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                            </li>
                        </ul>
                        <div class="input-row">
                            <label  for="input-16">Icon</label>
                            <div class="holder">
                                <input type="text" ng-model="content.icon_5" id="input-16"/>
                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-9">Body Text</label>
                            <div class="holder">
                                <textarea  id="textarea-9" ng-model="content.content_5" ></textarea>
                            </div>
                        </div>
                    </section>
                    <strong class="heading">Edit Item 6</strong>
                    <div class="inputs-row">
                        <input type="checkbox" ng-model="content.hide_section_6" />
                        <label>Hide section</label>
                    </div>
                    <section ng-class="content.hide_section_6 ? 'hide-section' : ''">
                        <ul class="image-list">
                            <li>
                                <strong class="title">Image</strong>
                                <span class="info-text">* Recommended resolution: 480x482 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_6}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_62" data-width="480" data-height="482" filereadcontent="content.image_6" data-jcf='{"placeholderText": "Upload"}'>
                                    <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                                <input class="value-opacity" type="text" ng-model="content.overlay_opacity_6" />
                                <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                            </li>
                        </ul>
                        <div class="input-row">
                            <label  for="input-17">Icon</label>
                            <div class="holder">
                                <input type="text" ng-model="content.icon_6" id="input-17"/>
                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-10">Body Text</label>
                            <div class="holder">
                                <textarea  id="textarea-10" ng-model="content.content_6" ></textarea>
                            </div>
                        </div>
                    </section>
                    <strong class="heading">Edit Item 7</strong>
                    <div class="inputs-row">
                        <input type="checkbox" ng-model="content.hide_section_7" />
                        <label>Hide section</label>
                    </div>
                    <section ng-class="content.hide_section_7 ? 'hide-section' : ''">
                        <ul class="image-list">
                            <li>
                                <strong class="title">Image</strong>
                                <span class="info-text">* Recommended resolution: 480x482 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_7}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_72" data-width="480" data-height="482" filereadcontent="content.image_7" data-jcf='{"placeholderText": "Upload"}'>
                                    <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                                <input class="value-opacity" type="text" ng-model="content.overlay_opacity_7" />
                                <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                            </li>
                        </ul>
                        <div class="input-row">
                            <label  for="input-18">Icon</label>
                            <div class="holder">
                                <input type="text" ng-model="content.icon_7" id="input-18"/>
                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-11">Body Text</label>
                            <div class="holder">
                                <textarea  id="textarea-11" ng-model="content.content_7" ></textarea>
                            </div>
                        </div>
                    </section>
                    <strong class="heading">Edit Item 8</strong>
                    <div class="inputs-row">
                        <input type="checkbox" ng-model="content.hide_section_8" />
                        <label>Hide section</label>
                    </div>
                    <section ng-class="content.hide_section_8 ? 'hide-section' : ''">
                        <ul class="image-list">
                            <li>
                                <strong class="title">Image</strong>
                                <span class="info-text">* Recommended resolution: 480x482 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_8}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_82" data-width="480" data-height="482" filereadcontent="content.image_8" data-jcf='{"placeholderText": "Upload"}'>
                                    <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                                <input class="value-opacity" type="text" ng-model="content.overlay_opacity_8" />
                                <span class="info-text">Enter opacity value for the overlay. From 0 (transparent) to 1 (solid color fill)</span>
                            </li>
                        </ul>
                        <div class="input-row">
                            <label  for="input-19">Icon</label>
                            <div class="holder">
                                <input type="text" ng-model="content.icon_8" id="input-19"/>
                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-12">Body Text</label>
                            <div class="holder">
                                <textarea  id="textarea-12" ng-model="content.content_8" ></textarea>
                            </div>
                        </div>
                    </section>
                    <div class="content-save-holder" style="display:none" ><a href="javascript:" ng-click="vm.editContentFancyClose();" class="content-save-button">Save</a></div>
                </div>
            </div>
        </div>`,
        image_1 : '/images/img8.jpg',
        icon_1 : '<i class="fa fa-bicycle" aria-hidden="true"></i>',
        content_1 : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
        image_2 : '/images/img9.jpg',
        icon_2 : '<i class="fa fa-anchor" aria-hidden="true"></i>',
        content_2 : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
        image_3 : '/images/img10.jpg',
        icon_3 : '<i class="fab fa-instagram" aria-hidden="true"></i>',
        content_3 : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
        image_4 : '/images/img11.jpg',
        icon_4 : '<i class="fa fa-bicycle" aria-hidden="true"></i>',
        content_4 : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
        image_5 : '/images/img12.jpg',
        icon_5 : '<i class="fa fa-anchor" aria-hidden="true"></i>',
        content_5 : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
        image_6 : '/images/img13.jpg',
        icon_6 : '<i class="fab fa-instagram" aria-hidden="true"></i>',
        content_6 : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
        image_7 : '/images/img14.jpg',
        icon_7 : '<i class="fa fa-bicycle" aria-hidden="true"></i>',
        content_7 : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
        image_8 : '/images/img15.jpg',
        icon_8 : '<i class="fa fa-anchor" aria-hidden="true"></i>',
        content_8 : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
        overlay_opacity_1 : '0.5',
        overlay_opacity_2 : '0.5',
        overlay_opacity_3 : '0.5',
        overlay_opacity_4 : '0.5',
        overlay_opacity_5 : '0.5',
        overlay_opacity_6 : '0.5',
        overlay_opacity_7 : '0.5',
        overlay_opacity_8 : '0.5',
        hide_section_1 : false,
        hide_section_2 : false,
        hide_section_3 : false,
        hide_section_4 : false,
        hide_section_5 : false,
        hide_section_6 : false,
        hide_section_7 : false,
        hide_section_8 : false
    },
    section_8 : {
        html : `<section class="section text-section">
				<div class="container">
					<div class="row-holder">
						<div class="col-6">
							<div class="heading">
								<h1 class="page-title"><span>{{content.title_1}}</span></h1>
								<p>{{content.content_1}}</p>
							</div>
							<p>{{content.content_2}}</p>
						</div>
						<div class="col-6">
							<div class="video-container" ng-bind-html="content.video_frame | unsafe"></div>
						</div>
					</div>
				</div>
			</section>
            <div class="popup-holder">
                <div class="popupForm">
                    <div class="edit-content">
                        <strong class="heading">Edit Content</strong>
                        <section>
                            <div class="input-row">
                                <label  for="input-55">Title</label>
                                <div class="holder">
                                    <input type="text" ng-model="content.title_1" id="input-55"/>
                                </div>
                            </div>
                            <div class="input-row">
                                <label for="textarea-26">Strong Text</label>
                                <div class="holder">
                                    <textarea  id="textarea-26" ng-model="content.content_1" ></textarea>
                                </div>
                            </div>
                             <div class="input-row">
                                <label >Text</label>
                                <div class="holder">
                                    <textarea  ng-model="content.content_2" ></textarea>
                                </div>
                            </div>
                            <div class="input-row">
                                <label for="textarea-27">Video Frame</label>
                                <div class="holder">
                                    <textarea  id="textarea-27" ng-model="content.video_frame" ></textarea>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>`,
        video_frame : '<iframe src="https://player.vimeo.com/video/162449046?byline=0&title=0&badge=0&portrait=0" width="560" height="337" frameborder="0" byline="0" title="0" badge="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        title_1 : 'HEADLINE',
        content_1 : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet elit eget.',
        content_2 : 'Donec commodo rhoncus dolor, posuere enim pretium sed. Integer eu orci nunc. dolor, posuere enim pretium sed. Integer eu orci nunc. honcus dolor, posuere enim pretium sed. Integer eu orci nunc. dolor, posuere enim pretium sed. Integer eu orci.'
    },
    section_9 : {
        html : `<aside class="content-holder background-block">
                            <div class="container">
                                <div class="row-holder">
                                    <div class="col-4">
                                        <div class="image-block" ng-bind-html="content.icon_1 | unsafe"></div>
                                        <div class="holder">
                                            <p>{{content.content_1}}</p>
                                            <a href="#">{{content.btn_title_1}}</a>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="image-block" ng-bind-html="content.icon_2 | unsafe"></div>
                                        <div class="holder">
                                            <p>{{content.content_2}}</p>
                                            <a href="#">{{content.btn_title_2}}</a>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="image-block" ng-bind-html="content.icon_3 | unsafe"></div>
                                        <div class="holder">
                                            <p>{{content.content_3}}</p>
                                            <a href="#">{{content.btn_title_3}}</a>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="image-block" ng-bind-html="content.icon_4 | unsafe"></div>
                                        <div class="holder">
                                            <p>{{content.content_4}}</p>
                                            <a href="#">{{content.btn_title_4}}</a>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="image-block" ng-bind-html="content.icon_5 | unsafe"></div>
                                        <div class="holder">
                                            <p>{{content.content_5}}</p>
                                            <a href="#">{{content.btn_title_5}}</a>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="image-block" ng-bind-html="content.icon_6 | unsafe"></div>
                                        <div class="holder">
                                            <p>{{content.content_6}}</p>
                                            <a href="#">{{content.btn_title_6}}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <div class="popup-holder">
                            <div class="popupForm">
                                <div class="edit-content">
                                    <strong class="heading">Edit Section 1</strong>
                                    <section>
                                        <div class="input-row">
                                            <label for="input-43">Icon</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.icon_1" id="input-43"/>
                                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label for="textarea-20">Body Text</label>
                                            <div class="holder">
                                                <textarea  id="textarea-20" ng-model="content.content_1" ></textarea>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label  for="input-44">Link text</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.btn_title_1" id="input-44"/>
                                            </div>
                                        </div>
                                    </section>
                                    <strong class="heading">Edit Section 2</strong>
                                    <section>
                                        <div class="input-row">
                                            <label for="input-45">Icon</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.icon_2" id="input-45"/>
                                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label for="textarea-21">Body Text</label>
                                            <div class="holder">
                                                <textarea  id="textarea-21" ng-model="content.content_2" ></textarea>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label  for="input-46">Link text</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.btn_title_2" id="input-46"/>
                                            </div>
                                        </div>
                                    </section>
                                    <strong class="heading">Edit Section 3</strong>
                                    <section>
                                        <div class="input-row">
                                            <label for="input-47">Icon</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.icon_3" id="input-47"/>
                                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label for="textarea-22">Body Text</label>
                                            <div class="holder">
                                                <textarea  id="textarea-22" ng-model="content.content_3" ></textarea>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label  for="input-48">Link text</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.btn_title_3" id="input-48"/>
                                            </div>
                                        </div>
                                    </section>
                                    <strong class="heading">Edit Section 4</strong>
                                    <section>
                                        <div class="input-row">
                                            <label for="input-49">Icon</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.icon_4" id="input-49"/>
                                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label for="textarea-23">Body Text</label>
                                            <div class="holder">
                                                <textarea  id="textarea-23" ng-model="content.content_4" ></textarea>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label  for="input-50">Link text</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.btn_title_4" id="input-50"/>
                                            </div>
                                        </div>
                                    </section>
                                    <strong class="heading">Edit Section 5</strong>
                                    <section>
                                        <div class="input-row">
                                            <label for="input-51">Icon</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.icon_5" id="input-51"/>
                                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label for="textarea-24">Body Text</label>
                                            <div class="holder">
                                                <textarea  id="textarea-24" ng-model="content.content_5" ></textarea>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label  for="input-52">Link text</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.btn_title_5" id="input-52"/>
                                            </div>
                                        </div>
                                    </section>
                                    <strong class="heading">Edit Section 6</strong>
                                    <section>
                                        <div class="input-row">
                                            <label for="input-53">Icon</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.icon_6" id="input-53"/>
                                                <span class="info-text">* Go to <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a> and copy any icon code. Example: &lt;i class="fas fa-car"&gt;&lt;/i&gt;. Feel free to paste the icon code in any text field. If you use <a href="https://fontawesome.com/icons?d=gallery&amp;m=pro" target="_blank">Pro icons</a>, you are obliged to have a <a href="https://fontawesome.com/pro#license" target="_blank">Pro License</a> after the site transfer.</span>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label for="textarea-25">Body Text</label>
                                            <div class="holder">
                                                <textarea  id="textarea-25" ng-model="content.content_6" ></textarea>
                                            </div>
                                        </div>
                                        <div class="input-row">
                                            <label  for="input-54">Link text</label>
                                            <div class="holder">
                                                <input type="text" ng-model="content.btn_title_6" id="input-54"/>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>`,
        icon_1 : '<i class="fa fa-camera-retro" aria-hidden="true"></i>',
        content_1 : 'ipsum, euismod atras vulputate iltricies etri elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
        btn_title_1 : 'https://site.com',
        icon_2 : '<i class="fa fa-book" aria-hidden="true"></i>',
        content_2 : 'ipsum, euismod atras vulputate iltricies etri elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
        btn_title_2 : 'https://site.com',
        icon_3 : ' <i class="fab fa-instagram" aria-hidden="true"></i>',
        content_3 : 'ipsum, euismod atras vulputate iltricies etri elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
        btn_title_3 : 'https://site.com',
        icon_4 : '<i class="fa fa-car" aria-hidden="true"></i>',
        content_4 : 'ipsum, euismod atras vulputate iltricies etri elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
        btn_title_4 : 'https://site.com',
        icon_5 : '<i class="fa fa-home" aria-hidden="true"></i>',
        content_5 : 'ipsum, euismod atras vulputate iltricies etri elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
        btn_title_5 : 'https://site.com',
        icon_6 : '<i class="fa fa-globe" aria-hidden="true"></i>',
        content_6 : 'ipsum, euismod atras vulputate iltricies etri elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
        btn_title_6 : 'https://site.com',
    },
    section_10 : {
        html : `<section class="logo-section">
				<div class="container">
					<div class="logo-slider">
						<div class="slideset initHomeLogoCarousel">
							<div class="slide">
								<div class="img-block">
									<a href="#"><img src="{{content.image_1}}" alt="image description"></a>
								</div>
							</div>
							<div class="slide">
								<div class="img-block">
									<a href="#"><img src="{{content.image_2}}" alt="image description"></a>
								</div>
							</div>
							<div class="slide">
								<div class="img-block">
									<a href="#"><img src="{{content.image_3}}" alt="image description"></a>
								</div>
							</div>
							<div class="slide">
								<div class="img-block">
									<a href="#"><img src="{{content.image_4}}" alt="image description"></a>
								</div>
							</div>
							<div class="slide">
								<div class="img-block">
									<a href="#"><img src="{{content.image_5}}" alt="image description"></a>
								</div>
							</div>
							<div class="slide">
								<div class="img-block">
									<a href="#"><img src="{{content.image_6}}" alt="image description"></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
            <div class="popup-holder">
                <div class="popupForm">
                    <div class="edit-content">
                        <strong class="heading">Edit Logo 1</strong>
                        <section>
                            <ul class="image-list">
                                <li>
                                    <strong class="title">Background Image</strong>
                                    <span class="info-text">* Recommended resolution: 190x85 px</span>
                                    <div class="img-block">
                                        <img src="{{content.image_1}}" alt="image description">
                                    </div>
                                    <div class="file-holder">
                                        <input type="file" fileread="content.image_12" data-width="190" data-height="85" filereadcontent="content.image_1" data-jcf='{"placeholderText": "Upload"}'>
                                        <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <strong class="heading">Edit Logo 2</strong>
                        <section>
                            <ul class="image-list">
                                <li>
                                    <strong class="title">Background Image</strong>
                                    <span class="info-text">* Recommended resolution: 190x85 px</span>
                                    <div class="img-block">
                                        <img src="{{content.image_2}}" alt="image description">
                                    </div>
                                    <div class="file-holder">
                                        <input type="file" fileread="content.image_22" data-width="190" data-height="85" filereadcontent="content.image_2" data-jcf='{"placeholderText": "Upload"}'>
                                        <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <strong class="heading">Edit Logo 3</strong>
                        <section>
                            <ul class="image-list">
                                <li>
                                    <strong class="title">Background Image</strong>
                                    <span class="info-text">* Recommended resolution: 190x85 px</span>
                                    <div class="img-block">
                                        <img src="{{content.image_3}}" alt="image description">
                                    </div>
                                    <div class="file-holder">
                                        <input type="file" fileread="content.image_32" data-width="190" data-height="85" filereadcontent="content.image_3" data-jcf='{"placeholderText": "Upload"}'>
                                        <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <strong class="heading">Edit Logo 4</strong>
                        <section>
                            <ul class="image-list">
                                <li>
                                    <strong class="title">Background Image</strong>
                                    <span class="info-text">* Recommended resolution: 190x85 px</span>
                                    <div class="img-block">
                                        <img src="{{content.image_4}}" alt="image description">
                                    </div>
                                    <div class="file-holder">
                                        <input type="file" fileread="content.image_42" data-width="190" data-height="85" filereadcontent="content.image_4" data-jcf='{"placeholderText": "Upload"}'>
                                        <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <strong class="heading">Edit Logo 5</strong>
                        <section>
                            <ul class="image-list">
                                <li>
                                    <strong class="title">Background Image</strong>
                                    <span class="info-text">* Recommended resolution: 190x85 px</span>
                                    <div class="img-block">
                                        <img src="{{content.image_5}}" alt="image description">
                                    </div>
                                    <div class="file-holder">
                                        <input type="file" fileread="content.image_52" data-width="190" data-height="85" filereadcontent="content.image_5" data-jcf='{"placeholderText": "Upload"}'>
                                        <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <strong class="heading">Edit Logo 6</strong>
                        <section>
                            <ul class="image-list">
                                <li>
                                    <strong class="title">Background Image</strong>
                                    <span class="info-text">* Recommended resolution: 190x85 px</span>
                                    <div class="img-block">
                                        <img src="{{content.image_6}}" alt="image description">
                                    </div>
                                    <div class="file-holder">
                                        <input type="file" fileread="content.image_62" data-width="190" data-height="85" filereadcontent="content.image_6" data-jcf='{"placeholderText": "Upload"}'>
                                        <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>`,
        image_1 : '/images/logotype-01.png',
        image_2 : '/images/logotype-02.png',
        image_3 : '/images/logotype-03.png',
        image_4 : '/images/logotype-04.png',
        image_5 : '/images/logotype-05.png',
        image_6 : '/images/logotype-06.png'
    },
    section_11 : {
        html : `<section class="testimonials-slide-section">
            <div class="container">
                <div class="slider testimonialsSliderHolder">
                    <div class="slideset">
                        <div class="slide">
                            <blockquote>
                                <q>{{content.text_1}}</q>
                                <cite>— <strong>{{content.name_1}},</strong> {{content.title_1}}, {{content.company_1}}</cite>
                            </blockquote>
                        </div>
                         <div class="slide">
                            <blockquote>
                                <q>{{content.text_2}}</q>
                                <cite>— <strong>{{content.name_2}},</strong> {{content.title_2}}, {{content.company_2}}</cite>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="popup-holder">
            <div class="popupForm">
                <div class="edit-content">
                    <strong class="heading">Edit Slide 1</strong>
                    <section>
                        <div class="input-row">
                            <label>Name</label>
                            <div class="holder">
                                <input type="text" ng-model="content.name_1" />
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.title_1" />
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Company Name</label>
                            <div class="holder">
                                <input type="text" ng-model="content.company_1" />
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-1">Text</label>
                            <div class="holder">
                                <textarea  ng-model="content.text_1" ></textarea>
                            </div>
                        </div>
                    </section>
                    <strong class="heading">Edit Slide 2</strong>
                    <section>
                        <div class="input-row">
                            <label>Name</label>
                            <div class="holder">
                                <input type="text" ng-model="content.name_2" />
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.title_2" />
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Company Name</label>
                            <div class="holder">
                                <input type="text" ng-model="content.company_2" />
                            </div>
                        </div>
                        <div class="input-row">
                            <label for="textarea-1">Text</label>
                            <div class="holder">
                                <textarea  ng-model="content.text_2" ></textarea>
                            </div>
                        </div>
                    </section>
                    <div class="content-save-holder" style="display:none" ><a href="javascript:" ng-click="vm.editContentFancyClose();" class="content-save-button">Save</a></div>
                </div>
            </div>
        </div>`,
        name_1 : 'Jonathan Doe',
        title_1 : 'Title',
        company_1 : 'Company',
        text_1 : 'em ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet elit eget leo accumsan, pellentesque sollicitudin lacus consectetur. Donec commodo rhoncus dolor, posuere enim pretium sed. Integer eu orci nunc. Fusce euismod at erat quis blandit. Fusce euismod at erat quis blandit.',
        name_2 : 'Jonathan Doe',
        title_2 : 'Title',
        company_2 : 'Company',
        text_2 : 'em ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet elit eget leo accumsan, pellentesque sollicitudin lacus consectetur. Donec commodo rhoncus dolor, posuere enim pretium sed. Integer eu orci nunc. Fusce euismod at erat quis blandit. Fusce euismod at erat quis blandit.'
    },
    section_12 : {
        html : ` <section class="map-section" data-lat="{{content.lat}}" data-lng="{{content.lng}}" id="contactMapHolder" style="width:1920px; height:450px"></section>
                    <div class="popup-holder">
                        <div class="popupForm">
                            <div class="edit-content">
                                <strong class="heading">Edit Coordinates</strong>
                                <section>
                                    <div class="input-row">
                                        <label for="input-22">lat</label>
                                        <div class="holder">
                                            <input type="text" ng-model="content.lat" class="coordinatesInput" id="input-22"/>
                                        </div>
                                    </div>
                                    <div class="input-row">
                                        <label  for="input-23">lng</label>
                                        <div class="holder">
                                            <input type="text" ng-model="content.lng" class="coordinatesInput" id="input-23"/>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>`,
        lat : '40.458273',
        lng : '-74.306862'
    },
    section_13 : {
        html : `<aside class="aside-section" style="background-image: url({{content.image_1}});">
            <div class="container">
                <div class="heading">
                    <h1 class="page-title">{{content.form_title}}</h1>
                    <p>{{content.form_short_description}}</p>
                </div>
                <form action="#" class="signup-form">
                    <div class="row-holder">
                        <div class="input-holder">
                            <input type="text" placeholder=""/>
                        </div>
                        <div class="input-holder">
                            <input type="email" placeholder=""/>
                        </div>
                        <button class="button light">{{content.form_btn_title}}</button>
                    </div>
                </form>
            </div>
        </aside>
        <div class="popup-holder">
            <div class="popupForm">
                <div class="edit-content">
                    <strong class="heading">Edit Content</strong>
                    <section>
                        <div class="input-row">
                            <label>Title</label>
                            <div class="holder">
                                <input type="text" ng-model="content.form_title"/>
                            </div>
                        </div>
                        <div class="input-row">
                            <label>Text</label>
                            <div class="holder">
                                <textarea  ng-model="content.form_short_description" ></textarea>
                            </div>
                        </div>
                         <div class="input-row">
                            <label>Form Button</label>
                            <div class="holder">
                                <input type="text" ng-model="content.form_btn_title"/>
                            </div>
                        </div>
                    </section>
                    <section>
                        <ul class="image-list">
                            <li>
                                <strong class="title">Background Image</strong>
                                <span class="info-text">* Recommended resolution: 1980x315 px</span>
                                <div class="img-block">
                                    <img src="{{content.image_1}}" alt="image description">
                                </div>
                                <div class="file-holder">
                                    <input type="file" fileread="content.image_12" data-width="1980" data-height="315" filereadcontent="content.image_1" data-jcf='{"placeholderText": "Upload"}'>
                                    <img src="/images/loading-img.gif" class="loader-img" style="display: none;">
                                </div>
                            </li>
                        </ul>
                    </section>
                    <div class="content-save-holder" style="display:none" ><a href="javascript:" ng-click="vm.editContentFancyClose();" class="content-save-button">Save</a></div>
                </div>
            </div>
        </div>`,
        image_1 : '/images/img109.jpg',
        form_title : 'EMAIL SIGNUP',
        form_short_description : 'Quis autem velis reprehenderit etims quiste voluptate velit esse quam nihil ets illum sedit consequatur quia voluptas sit aspernatura.',
        form_btn_title : 'signup'
    }
};