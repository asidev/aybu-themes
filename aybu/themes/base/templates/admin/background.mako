<%def name="js()">
	${parent.js()}
	<script type="text/javascript">
		var urls = {
			add : "${request.route_path('images', action='add')}",
			list : "${request.route_path('images', action='list')}",
			remove : "${request.route_path('images', action='remove')}",
			update : "${request.route_path('images', action='update')}"
		}
	</script>
	% if c.settings.debug == True:
	<%include file="/admin/extjs-debug.mako"/>
	${self.js_link('/js/app/base.js')}
	${self.js_link('/js/app/image.js')}
	${self.js_link('/js/app/background.js')}
	% else:
	<%include file="/admin/extjs.mako"/>
	${self.js_link('/js/app/base.min.js')}
	${self.js_link('/js/app/image.min.js')}
	${self.js_link('/js/app/background.min.js')}
	% endif
	<script type="text/javascript">
	Ext.onReady(function() {
		var panel = new Aybu.Background.Panel();
		panel.render('extjs-main-panel-div');
	});
	</script>
</%def>

<%def name="title()">
	${parent.title()}
	${self.title_part((_(u'Gestione Sfondo'),
	                  request.route_path('admin', action='background')))}
</%def>

<%inherit file="/admin/admin_template.mako"/>

<h3>${_(u'Gestione Sfondo')}</h3>
<p>
	${_(u"Questa sezione permette la gestione dello sfondo del tema.")}
</p>

<p>
	<strong>
	${_(u"Le dimensioni massime dell'immagine sono 2560 pixel x 2560 pixel. Oltre queste dimensioni l'immagine verrà ridimensionata automaticamente dal sistema (mantenendo le proporzioni originali).")}
	</strong>
</p>

<p>
	${_(u"Puoi fare l'upload al massimo di %s immagini." % c.settings['max_images'])}
</p>

<p>
	${_(u"Il tentativo di caricamento di immagini aggiuntive fallirà.")}
</p>
<p>
	<strong>${_(u"Il tema deve supportare la funzionalità altrimenti gli sfondi caricati non verranno visualizzati.")}</strong>
</p>
<div>&nbsp;</div>
<div id="extjs-main-panel-div"></div>
<div>&nbsp;</div>
<div>&nbsp;</div>