<%def name="css()">
	${parent.css()}
	${self.css_link('/css/reset.css')}
	${self.css_link('/css/style.css')}
	${self.css_link('/css/color.css')}
	<style type="text/css" media="screen, projection">
		#logo {
			<% logo = h.default_logo.url %>
			% if logo:
			background-image: url(${logo});
			% endif
			width:	${c.settings.logo_width}px;
			height: ${c.settings.logo_height}px;
		}
	</style>
</%def>

<%def name="js()">
	${parent.js()}
	% if c.settings.debug == True:
	${self.js_link('/js/common.js')}
	${self.js_link('/js/droplinemenu.js')}
	% else:
	${self.js_link('/js/common.min.js')}
	${self.js_link('/js/droplinemenu.min.js')}
	% endif
</%def>

<%inherit file="/base/base_template.mako"/>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" >
    <%include file="/base/head.mako" args="final_title=self.final_title, css=self.css, js=self.js"/>
    <body>
		<div id="all">
			<div id="wrap">
				<div id="topheader">
					% if logo:
					<img id="logo" src="${logo}" alt="${c.settings.site_title}"
						 title="${c.settings.site_title}" />
					% else:
					<div id="logo">&nbsp;</div>
					% endif
					<div id="search">
						<ul>
							<li class="facebook">
								<a href="#" title="Seguici su Facebook">Seguici su Facebook</a>
							</li>
							<li class="twitter">
								<a href="#" title="Seguici su Twitter">Seguici su Twitter</a>
							</li>
							<li class="linkedin">
								<a href="#" title="Seguici su Linkedin">Seguici su Linkedin</a>
							</li>
						</ul>
						<form>
							<input id="search_input" type="text"
								   value="Search..."
								   onfocus="if (this.value == 'Search...') {this.value = '';}"
								   onblur="if (this.value == '') {this.value = 'Search...';}" />
						</form>
						<div class="reset">&nbsp;</div>
					</div>
					<div class="reset">&nbsp;</div>
				</div>
				<div class="menu" id="main_menu">
					<%include file="/base/main_menu.mako" />
					<div class="reset">&nbsp;</div>
				</div>
				<div id="content">
					${next.body()}
				</div>
				<div class="menu">
					<%include file="/base/menu.mako"  args="start_level=0, num_levels=1"/>
					<div class="reset">&nbsp;</div>
				</div>
				<div id="footer_wrapper">
					<div id="footer">
						${h.literal(c.settings.footer_info)}
					</div>
					<%include file="/base/user.mako" />
					<div class="reset">&nbsp;</div>
				</div>
				<p id="copyright">
					<a href="#">
							Designed by Chiara Bertin
					</a>
					<a href="http://www.asidev.com/">
							Developed by Asidev
					</a>
				</p>

			</div>
		</div>
		<%include file="/add_on/analytics.mako"/>
    </body>
</html>
