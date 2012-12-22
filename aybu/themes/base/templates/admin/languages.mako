<%def name="css()">
	${parent.css()}
	${self.css_link('/css/languages.css')}
</%def>

<%def name="js()">
	${parent.js()}
	% if c.settings.debug == True:
	${self.js_link('/js/languages.js')}
	% else:
	${self.js_link('/js/languages.min.js')}
	% endif
</%def>

<%def name="title()">
	${parent.title()}
	${self.title_part((_(u'Gestione Lingue'), request.route_path('admin', action='languages')))}
</%def>

<%inherit file="/admin/admin_template.mako"/>

<h3>${_(u'Gestione Lingue')}</h3>

<p>
	${_(u"Questa sezione permette l'aggiunta o la rimozione di una lingua al sito.")}
</p>
<div id="admin_languages">
	<ul>
	% for language in languages:
		<li>

			<input type="checkbox" id="lang_${language.id}" onchange="toggle_lang(${language.id});"
				% if language.enabled:
				   checked="checked"
				% endif
				/>

			<img src="${h.static_url('/flags/%s.png' % (language.country.lower()))}"
				alt="${language.locale.get_display_name().title()}"
				title="${language.locale.get_display_name().title()}" />

		</li>
	% endfor
	</ul>
	<div class="reset">&nbsp;</div>
</div>
