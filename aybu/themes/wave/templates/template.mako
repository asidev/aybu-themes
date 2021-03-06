<%def name="css()">
	${parent.css()}
	${self.css_link('/css/reset.css')}
	${self.css_link('/css/common.css')}
	${self.css_link('/css/color.css')}
	<style type="text/css" media="screen, projection">
		#logo {
			width:	${c.settings.logo_width}px;
			height: ${c.settings.logo_height}px;
		}
	</style>
</%def>

<%def name="js()">
	${parent.js()}
	% if c.settings.debug == True:
	${self.js_link('/js/droplinemenu.js')}
	${self.js_link('/js/common.js')}
	% else:
	${self.js_link('/js/droplinemenu.min.js')}
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
				<div>
					<%include file="/base/navigation_languages.mako" />
					<div class="clear"></div>
				</div>
				<div>
					<% logo = h.default_logo.url %>
					% if logo:
					<img id="logo" src="${logo}" alt="${c.settings.site_title}"
						 title="${c.settings.site_title}" />
					% else:
					<div id="logo">&nbsp;</div>
					% endif
					<div id="site_info">
						<h1>${c.settings.site_title}</h1>
						<h2>${c.settings.slogan}</h2>
					</div>
					<div class="clear"></div>
				</div>
				<div>
					<%include file="/base/path.mako" args="final_title=self.final_title"/>
					<%include file="/base/user.mako" />
					<div class="clear"></div>
				</div>
			</div>
			<div class="shadow_down"></div>
			<div class="shadow_up"></div>
			<div id="menu">
				<%include file="/base/main_menu.mako" />
				<div class="clear"></div>
			</div>
			<div class="shadow_down"></div>
			<div id="content_wrapper">
				${next.body()}
			</div>
			<div id="footer">
			${h.literal(c.settings.footer_info)}
				<p>Developed by: <a href="http://www.asidev.com/">Asidev</a> | Design by: <a href="http://www.ludographicdesign.com/">LudoGraphicDesign</a></p>
			</div>
		</div>
		<%include file="/add_on/analytics.mako"/>
	</body>
</html>
