<%def name="css()">
	${parent.css()}
	${self.css_link('/css/reset.css')}
	${self.css_link('/css/common.css')}
	${self.css_link('/css/color.css')}
	<style type="text/css" media="screen, projection">
		#logo {
			<% logo = h.default_logo.url %>
			% if logo:
			background-image: url(${logo});
			% endif
			width:	${c.settings.logo_width}px;
			height: ${c.settings.logo_height}px;
			margin: 0px 250px;
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
			<div id="top">
				<%include file="/base/user.mako" />
				<%include file="/base/navigation_languages.mako" />
				<div class="clear">&nbsp;</div>
			</div>
			<div id="banner">
				<h1>
					<div id="logo">&nbsp;</div>
				</h1>
				<%include file="/base/path.mako" args="final_title=self.final_title"/>
			</div>
			<div id="menu">
				<%include file="/base/main_menu.mako" />
				<div class="clear">&nbsp;</div>
			</div>
			<div id="wrapper">
				${next.body()}
			</div>
			<div id="footer">
				${h.literal(c.settings.footer_info)}
				<p>Developed by: <a href="http://www.asidev.com/">Asidev</a> | Design by: <a href="http://www.ludographicdesign.com/">LudoGraphicDesign</a></p>
			</div>
		</div>
	</body>
</html>
