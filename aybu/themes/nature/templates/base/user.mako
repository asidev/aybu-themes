<ul id="user">
	%if c.user:
	<li>
		<a href="/">Home</a>
		|
	</li>
	<li>
		<a href="${request.route_path('admin', action='index', lang=c.lang.lang, country=c.lang.country)}">
			Area Riservata
		</a>
		|
	</li>
	<li>
		<a href="${request.route_path('logout')}">Logout</a>
	</li>
	%else:
	<li>
		<a href="${request.route_path('login', lang=c.lang.lang, country=c.lang.country)}">Area Riservata</a>
	</li>
	%endif
</ul>
