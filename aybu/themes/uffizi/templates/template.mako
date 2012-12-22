<%def name="css()">
	${parent.css()}
	${self.css_link('/css/reset.css')}
	${self.css_link('/css/common.css')}
	${self.css_link('/css/header.css')}
	${self.banner_css()}
	${self.logo_css()}
	${self.css_link('/css/footer.css')}
</%def>

<%def name="js()">
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
		<div id="wrapper">
			<%include file="/header.mako" />

			<div id="info">
				<%include file="/base/path.mako" args="final_title=self.final_title"/>
				<hr />
				<%include file="/base/user.mako" />
			</div>

			${next.body()}

			<%include file="/footer.mako"/>
		</div>
		<%include file="/add_on/analytics.mako"/>
    </body>
</html>
