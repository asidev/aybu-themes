% if len(c.languages) > 1:
<ul id="languages">
	% for language in c.languages:
	<%
		if c.rendering_type!='dynamic':
			url = request.current_route_path(lang=language.lang,
							 country=language.country)
		else:
			try:
				url = c.node[language].url
			except:
				url = '#'
	%>
	<li>
		<a href="${url}"
			% if language.id == c.lang.id:
			class="active"
			% endif
			>
			<img src="${h.static_url('/flags/%s.png' % (language.country.lower()))}"
				 alt="${language.locale.get_display_name().title()}"
				 title="${language.locale.get_display_name().title()}" />
		</a>
	</li>
	% endfor
</ul>
% endif
