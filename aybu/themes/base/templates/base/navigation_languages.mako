<%page args="flags=True" />

% if len(c.languages) > 1:
<ul id="languages">
	% for language in c.languages:
	<%
		if c.rendering_type == 'static':
			qstring = (('lang', language.lang), ('country', language.country))
			url = request.current_route_path(_query=qstring)
		else:
			try:
				url = c.node[language].url + '.html'
			except:
				url = '#'
	%>
	<li>
		<a href="${url}" title="${language.locale.get_display_name().title()}"
			% if language.id == c.lang.id:
			class="active"
			% endif
		    % if flags == True:
			style="background-image: url(${h.static_url('/flags/%s.png' % (language.country.lower()))})"
			% endif
			>
			% if flags == True:
			${language.locale.get_display_name().title()}
			% else:
			${language.lang}
			% endif
		</a>
	</li>
	% endfor
</ul>
% endif
