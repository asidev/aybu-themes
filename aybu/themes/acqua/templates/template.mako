<%def name="css()">
	${parent.css()}
	${self.css_link('/css/reset.css')}
	${self.css_link('/css/common.css')}
	${self.css_link('/css/color.css')}
	${self.banner_css()}
	<style type="text/css" media="screen, projection">
		#logo_box {
			<% logo = h.default_logo.url %>
			% if logo:
			background-image: url(${logo});
			background-position: left top;
			background-repeat:	no-repeat;
			% endif
			width:	${c.settings.logo_width}px;
			height: ${c.settings.logo_height}px;
		}
	</style>
</%def>

<%def name="js()">
	${self.set_banner_selector()}
	${parent.js()}
	% if c.settings.debug == True:
	${self.js_link('/js/common.js')}
	% else:
	${self.js_link('/js/common.min.js')}
	% endif
</%def>

<%inherit file="/base/base_template.mako"/>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" >
    <%include file="/base/head.mako" args="final_title=self.final_title, css=self.css, js=self.js"/>
    <body>

		<div id="wrap">
			<div id="header">
				<h1>${c.settings.site_title}</h1>
				<h2>${c.settings.slogan}</h2>
				<div id="nav_bar">
					<div>
						<%include file="/base/user.mako" />
						<div class="reset">&nbsp;</div>
					</div>
					<%include file="/base/navigation_languages.mako" />
					<div class="reset">&nbsp;</div>
				</div>
				<div class="reset">&nbsp;</div>
			</div>

			<div id="all_content">
				<div id="logo_box">&nbsp;</div>
				<div id="content_wrapper">
					<%include file="/base/path.mako" args="final_title=self.final_title"/>
					<div>
						% if c.rendering_type!='dynamic' and c.page!='login':
						<div id="admin_menu">
							<%include file="/admin/admin_menu.mako" />
						</div>
						% else:
						<div id="banner">
							&nbsp;
						</div>
						% endif
						<div id="content">
							${next.body()}
						</div>
						<div class="reset">&nbsp;</div>
					</div>
					<div id="menu">
						<%include file="/base/main_menu.mako" />
						<div class="reset">&nbsp;</div>
					</div>
					<div id="footer">
						<div id="info">
							${h.literal(c.settings.footer_info)}
						</div>
						<div id="developer">
							<a href="http://www.asidev.com/" rel="external">
								Developed by Asidev
							</a>
							<a href="#">
								Designed by Chiara Bertin
							</a>
						</div>
						<div class="reset">&nbsp;</div>
					</div>
				</div>
				<div class="reset">&nbsp;</div>
			</div>
		</div>

		<%include file="/add_on/analytics.mako"/>
    </body>
</html>
