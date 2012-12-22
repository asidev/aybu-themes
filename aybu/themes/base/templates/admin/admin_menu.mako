<ul>
	<li>
		<a href="${request.route_path('admin', action='index')}"
		   % if page == 'index':
		   class="active"
		   % endif
		>
			${_(u'Pannello di controllo')}
		</a>
	</li>
	<li>
		<a href="${request.route_path('admin', action='languages')}"
		   % if page == 'languages':
		   class="active"
		   % endif
		>
			${_(u'Gestione Lingue')}
		</a>
	</li>
	<li>
		<a href="${request.route_path('admin', action='structure')}"
		   % if page == 'structure':
		   class="active"
		   % endif
		>
			${_(u'Gestione Menu & Pagine')}
		</a>
	</li>
	<li>
		<a href="${request.route_path('admin', action='images')}"
		   % if page == 'images':
		   class="active"
		   % endif
		>
			${_(u'Gestione Immagini')}
		</a>
	</li>
	<li>
		<a href="${request.route_path('admin', action='files')}"
		   % if page == 'files':
		   class="active"
		   % endif
		>
			${_(u'Gestione Files')}
		</a>
	</li>
	<li>
		<a href="${request.route_path('admin', action='settings')}"
		   % if page == 'settings':
		   class="active"
		   % endif
		>
			${_(u'Gestione Impostazioni')}
		</a>
	</li>
	<li>
		<a href="${request.route_path('admin', action='banner_logo')}"
		   % if page == 'banner_logo':
		   class="active"
		   % endif
		>
			${_(u'Gestione Banner & Logo')}
		</a>
	</li>
	<li>
		<a href="${request.route_path('admin', action='background')}"
		   % if page == 'background':
		   class="active"
		   % endif
		>
			${_(u'Gestione Sfondo')}
		</a>
	</li>
	<li>
		<a href="${request.route_path('admin', action='password')}"
		   % if page == 'password':
		   class="active"
		   % endif
		>
			${_(u'Cambio Password')}
		</a>
	</li>
	<li>
		<a href="${request.route_path('logout')}">${_(u'Esci')}</a>
	</li>
</ul>
