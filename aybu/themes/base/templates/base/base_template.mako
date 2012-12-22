<%def name="background_css(selector='html')">\
	% if c.backgrounds:
		<% url = c.backgrounds[0].url %>
	% else:
		<% url = None %>
		<!-- no banner found for this page -->
	% endif

	% if url:
		<style type="text/css" media="screen, projection">
			${selector} {
				background: url(${url}) no-repeat center center fixed;
				-webkit-background-size: cover;
				-moz-background-size: cover;
				-o-background-size: cover;
				background-size: cover;
			}
		</style>
	% endif
</%def>\
<%def name="banner_css(selector='#banner')">\
	% if c.node and len(c.node.banners) > 0:
		<% url = c.node.banners[0].url %>
	% elif h.default_banner:
		<% url = h.default_banner.url %>
	% else:
		<% url = None %>
		<!-- no banner found for this page -->
	% endif

	% if url:
		<style type="text/css" media="screen, projection">
			${selector} {
				background-image: url(${url});
				background-repeat: no-repeat;
				background-position: left top;
				width:	${c.settings.banner_width}px;
				height: ${c.settings.banner_height}px;
			}
		</style>
	% endif
</%def>\
<%def name="logo_css(selector='#logo')">\
	<% url = h.default_logo.url %>
	% if url:
		<style type="text/css" media="screen, projection">
			${selector} {
				background-image: url(${h.default_logo.url});
				background-repeat: no-repeat;
				width: ${c.settings.logo_width}px;
				height: ${c.settings.logo_height}px;
                text-indent: -9999px;
			}
		</style>
	% else:
		<!-- no logo found for this page -->
	% endif
</%def>\
<%def name="banner_js(selector='#banner')">\
	% if c.node and len(c.node.banners) > 0:
		<% banners = [o.banner.url for o in c.node.banners] %>
	% elif h.default_banner:
		<% banners = [h.default_banner.url] %>
	% else:
		<% banners = [] %>
		<!-- no banner found for this page -->
	% endif
	<script type="text/javascript">
	jQuery.aybu = {};
	jQuery.aybu.pageBannerSelector = '${selector}';
	% if banners:
		jQuery(document).ready(function(){
			jQuery.aybu.pageBannerImages = [
				% for url in banners:
					'${url}',
				% endfor
			];
			//  Initialize Backgound Stretcher
			jQuery('${selector}').bgStretcher({
				images: jQuery.aybu.pageBannerImages,
				imageWidth: ${c.settings.banner_width},
				imageHeight: ${c.settings.banner_height},
				maxWidth: ${c.settings.banner_width},
				maxHeight: ${c.settings.banner_height},
				resizeProportionally: true,
				nextSlideDelay: 6000,
				slideShowSpeed: 1000,
				transitionEffect: 'superSlide',
				preloadImg: true
			});
		});
	% endif
	</script>
</%def>\
<%def name="background_js(selector='html')">\
	${self.js_link('/js/lib/jquery/jquery.vegas.min.js')}
	% if c.backgrounds:
	<script type="text/javascript">
		jQuery(document).ready(function(){
			jQuery.vegas('slideshow', {
				delay: 10000,
				preload: true,
  				backgrounds:[
				    % for background in c.backgrounds:
					{ src: '${background.url}', fade: 2500},
					% endfor
				]
			})('overlay');
		});
	</script>
	% endif
</%def>\
<%def name="set_banner_selector(selector='#banner')">\
	<script type="text/javascript">
		banner_selector = '${selector}';
	</script>
</%def>\
<%self.seen_css = set() %>\
<%def name="css_link(path, media='screen, projection', internal=True)">\
	% if path not in self.seen_css:
		% if internal:
			<% static_url = h.static_url(path) %>
			% if static_url:
			<link rel="stylesheet" type="text/css" href="${static_url}" media="${media}" />
			% endif
		% else:
		<link rel="stylesheet" type="text/css" href="${path}" media="${media}" />
		% endif
		<% self.seen_css.add(path) %>\
	% endif
</%def>\
<%def name="css()">\
	% if c.user and c.rendering_type=='dynamic':
	${css_link('/css/tynymce.css')}
	% endif
	% if c.user:
	${css_link('/css/admin.css')}
	% endif
</%def>\
\
<%self.seen_js = set() %>\
<%def name="js_link(path)">\
	% if path not in self.seen_js:
		% if not path.startswith("http"):
			<% static_url = h.static_url(path) %>
			% if static_url:
			<script type="text/javascript" src="${static_url}"></script>
			% endif
		% else:
			<script type="text/javascript" src="${path}"></script>
		% endif
		<% self.seen_js.add(path) %>
	% endif
</%def>\
<%def name="js()">\
	${js_link('https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js')}
	% if c.user and c.rendering_type=='dynamic':

		${js_link('https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js')}

		<script type="text/javascript">
			var editableContentWidth = 600;
		</script>
		${js_link('/js/lib/tiny_mce/jquery.tinymce.js')}

		% if c.settings.debug == True:
		${js_link('/js/lib/tiny_mce/tiny_mce_src.js')}
		${js_link('/js/lib/jquery/jquery.blockUI.js')}
		% else:
		${js_link('/js/lib/tiny_mce/tiny_mce.js')}
		${js_link('/js/lib/jquery/jquery.blockUI.min.js')}
		% endif


		<script type="text/javascript">

			var admin = true;

			var c = {
				translation: { id : ${c.translation.id} },

				lang : "${c.lang.lang}",
				country : "${c.lang.country}",
				language : "${c.lang.locale.get_display_name().title()}",

				urls : {
					edit: '${request.route_path("edit")}',
					tinymce : '/js/lib/tiny_mce/tiny_mce.js',
					spellchecker: '${request.route_path("spellchecker")}',
					images: {
						list: '${request.route_path("images", action="list")}',
						add : '${request.route_path("images", action="add")}',
						remove : '${request.route_path("images", action="remove")}',
						index : '${request.route_path("images", action="index")}' + '?tiny=true'
					},
					files: {
						index : '${request.route_path("files", action="index")}' + '?tiny=true'
					},

					link_list : '${request.route_path("structure", action="link_list")}',

					page_banners : '${request.route_path("admin_post", action="page_banners")}',
					remove_page_banners : '${request.route_path("admin_post", action="remove_page_banners")}'

				}

			};

		</script>
	<script type="text/javascript">
	var urls = {
		add: "${request.route_path('images', action='add')}",
		list: "${request.route_path('images', action='list')}",
		remove: "${request.route_path('images', action='remove')}",
		update: "${request.route_path('images', action='update')}"
	};
    var mcp_urls = {
        show_html_view: "${request.route_path('MediaCollectionPage.show', action='show_html_view', id=c.translation.node.id)}"
    };
    </script>
	% if c.settings.debug == True:
		<%include file="/admin/extjs-debug.mako"/>
		${self.js_link('/js/app/base.js')}
		${self.js_link('/js/app/image.js')}
		${self.js_link('/js/app/banner.js')}
		${self.js_link('/js/app/pagebanner.js')}
		${self.js_link('/js/app/mediacollection.js')}
		${js_link('/js/tinymce.js')}
		${js_link('/js/content.js')}
		${js_link('/js/image.js')}
		${js_link('/js/files.js')}
		${js_link('/js/block_ui.js')}
		${js_link('/js/banner.js')}
		${js_link('/js/main.js')}
	% else:
		<%include file="/admin/extjs.mako"/>
		${self.js_link('/js/app/base.min.js')}
		${self.js_link('/js/app/image.min.js')}
		${self.js_link('/js/app/banner.min.js')}
		${self.js_link('/js/app/pagebanner.min.js')}
		${self.js_link('/js/app/mediacollection.min.js')}
		${js_link('/js/tinymce.min.js')}
		${js_link('/js/content.min.js')}
		${js_link('/js/image.min.js')}
		${js_link('/js/files.min.js')}
		${js_link('/js/block_ui.min.js')}
		${js_link('/js/banner.min.js')}
		${js_link('/js/main.min.js')}
	% endif

% endif
</%def>\
\
\
<%self.final_title = [] %>\
<%def name="title_part(t)">\
	<% self.final_title.append(t) %>\
</%def>\
<%def name="title()">\
	${self.title_part((c.settings.site_title, '/'))}
</%def>\
${self.title()}
\
\
<%self.final_keywords = [] %>\
<%def name="keywords_part(k)">\
	% if k not in self.final_keywords:
		<% self.final_keywords.append(k.title()) %>\
	% endif
</%def>
<%def name="keywords()" >\
	${self.keywords_part(u'')}
</%def>\
${self.keywords()}\
\
${next.body()}
\
