<%def name="css()">
	${parent.css()}
	${self.css_link('/css/reset.css')}
	${self.css_link('/css/style.css')}
	${self.css_link('/css/color.css')}
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
<html lang="${c.lang.lang}">
    <%include file="/base/head.mako" args="final_title=self.final_title, css=self.css, js=self.js"/>
    <body>

		<div id="wrap">

			<div id="header">
				<div id="title">
					<h1>${c.settings.site_title}</h1>
					<h2>${c.settings.slogan}</h2>
				</div>

				<div id="headerbox">
					<%include file="/base/navigation_languages.mako" />
					<!--
					<form id="searchform">
						<fieldset>
							<input class="searchfield" type="text" value="Search..." onfocus="if (this.value == 'Search...') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Search...';}" />
							<input class="searchbutton" type="button" value="Go" />
						</fieldset>
						<div class="reset">&nbsp;</div>
					</form>
					-->
				</div>

				<div class="reset">&nbsp;</div>
			</div>

			<div id="menu">
				<%include file="/base/main_menu.mako" />
			</div>

			<div id="content_wrapper">
				${next.body()}
			</div>

			<hr />

			<div id="footer">
				<div id="footer_info">
					${h.literal(c.settings.footer_info)}
				</div>
				<div id="login">
					<%include file="/base/user.mako" />
				</div>
				<div class="reset">&nbsp;</div>
			</div>
		</div>
		<%include file="/add_on/analytics.mako"/>
    </body>
</html>
