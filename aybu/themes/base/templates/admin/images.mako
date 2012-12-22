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
	${self.js_link('/js/imagemanager/store.js')}
	${self.js_link('/js/imagemanager/edit_win.js')}
	${self.js_link('/js/imagemanager/dataview.js')}
	${self.js_link('/js/imagemanager/uploader.js')}
	${self.js_link('/js/imagemanager/panel.js')}
	${self.js_link('/js/imagemanager/main.js')}
	% else:
	<%include file="/admin/extjs.mako"/>
	${self.js_link('/js/imagemanager/store.min.js')}
	${self.js_link('/js/imagemanager/edit_win.min.js')}
	${self.js_link('/js/imagemanager/dataview.min.js')}
	${self.js_link('/js/imagemanager/uploader.min.js')}
	${self.js_link('/js/imagemanager/panel.min.js')}
	${self.js_link('/js/imagemanager/main.min.js')}
	% endif
	## application code
	% if tiny:
	## this is needed to get reference to the tinyMCE instance that opened us.
	${self.js_link('/js/lib/tiny_mce/tiny_mce_popup.js')}
	% else:
	## this is to avoid unreference errors
	<script type="text/javascript">
		var tinyMCE = null;
	</script>
	%endif
</%def>

<%def name="title()">
	${parent.title()}
	${self.title_part((_(u'Gestione Immagini'),request.route_path('admin', action='images')))}
</%def>

<%inherit file="/admin/admin_template.mako"/>


<h3>${_(u'Gestione Immagini')}</h3>

<p>
	${_(u"Questa sezione permette la gestione delle immagini da inserire come contenuto del sito.")}
</p>

<p>
	${_(u"Puoi fare l'upload al massimo di %s immagini." % c.settings['max_images'])}
</p>

<p>
	${_(u"Il tentativo di upload di immagini aggiuntive fallirà.")}
</p>

<div id="extjs-main-panel-div"></div>
