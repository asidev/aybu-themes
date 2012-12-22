<%def name="css()">
	${parent.css()}
	${self.css_link('/css/reset.css')}
	${self.banner_css()}
	${self.logo_css()}
	${self.background_css()}
</%def>

<%def name="js()">
	${self.set_banner_selector()}
	${parent.js()}
	% if c.settings.debug == True:
	${self.js_link('/js/common.js')}
	${self.js_link('/js/lib/bgstretcher.js')}
	% else:
	${self.js_link('/js/common.min.js')}
	% endif
</%def>

<%inherit file="/base/base_template.mako"/>

<!DOCTYPE html>
<html lang="${c.lang.lang}">
    <%include file="/base/head.mako" args="final_title=self.final_title, css=self.css, js=self.js"/>
    <body>
		<h1>${c.settings.site_title}</h1>

		<div>
			<%include file="/base/path.mako" args="final_title=self.final_title"/>
		</div>

		<div>
			<%include file="/base/navigation_languages.mako" />
		</div>

		<div>
			<%include file="/base/main_menu.mako" />
		</div>

		<div id="banner">&nbsp;</div>

		<div id="logo">&nbsp;</div>

		${next.body()}

		<div id="login">
			<%include file="/base/user.mako" />
		</div>

		<div id="info">
			${h.literal(c.settings.footer_info)}
		</div>
		<%include file="/add_on/analytics.mako"/>
    </body>
</html>
