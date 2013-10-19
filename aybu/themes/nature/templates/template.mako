<%def name="css()">
	${parent.css()}
	${self.css_link('/css/reset.css')}
	${self.css_link('http://fonts.googleapis.com/css?family=Ubuntu&v1', internal=False ) }
	${self.css_link('/css/common.css')}
	${self.css_link('/css/color.css')}
	${self.css_link('/css/decorations.css')}
	${self.banner_css()}
</%def>

<%def name="js()">
	${parent.js()}
	% if c.settings.debug == True:
	${self.js_link('/js/jquery.hoverIntent.js')}
	${self.js_link('/js/superfish.js')}
	${self.js_link('/js/common.js')}
	% else:
	${self.js_link('/js/jquery.hoverIntent.min.js')}
	${self.js_link('/js/superfish.min.js')}
	${self.js_link('/js/common.min.js')}
	% endif
</%def>

<%inherit file="/base/base_template.mako"/>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <%include file="/base/head.mako" args="final_title=self.final_title, css=self.css, js=self.js"/>
    <body>
		<div id="all">
			<div id="header">
				<div id="tools">
					<%include file="/base/user.mako" />
					<%include file="/base/path.mako" args="final_title=self.final_title"/>
				</div>
				<%include file="/base/navigation_languages.mako" />
			</div>
			<div id="banner">
				<h1>${c.settings.site_title}</h1>
			</div>
			<div id="content_wrapper">
				${next.body()}
			</div>
			<div id="footer">
				<div>
					${h.literal(c.settings.footer_info)}
				</div>
				<div>
					<p>Developed by: <a href="http://www.asidev.com/">Asidev</a> | Design by: <a href="http://www.ludographicdesign.com/">LudoGraphicDesign</a></p>
				</div>
			</div>
		</div>
		<%include file="/add_on/analytics.mako"/>
    </body>
</html>
