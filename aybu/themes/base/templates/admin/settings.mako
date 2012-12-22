<%def name="css()">
	${parent.css()}
	${self.css_link('/js/lib/extjs/resources/css/ext-all-notheme.css')}
	${self.css_link('/js/lib/extjs/resources/css/xtheme-gray.css')}
</%def>

<%def name="js()">
	${parent.js()}
	<script type="text/javascript">
		var urls = {
			list : "${request.route_path('settings', action='list')}",
			create : "${request.route_path('settings', action='create')}",
			update : "${request.route_path('settings', action='update')}",
			destroy : "${request.route_path('settings', action='destroy')}",
			info : "${request.route_path('settings', action='info')}",
			types : "${request.route_path('settings', action='types')}"
		}
	</script>
	% if c.settings.debug == True:
	${self.js_link('/js/lib/extjs/adapter/ext-jquery-adapter-debug.js')}
	${self.js_link('/js/lib/extjs/ext-all-debug.js')}
	${self.js_link('/js/lib/extjs/locale/ext-lang-it.js')}
	${self.js_link('/js/lib/extjs/ux/CheckColumn.js')}
	${self.js_link('/js/lib/extjs/ux/RowExpander.js')}
	${self.js_link('/js/settings/BaseStore.js')}
	${self.js_link('/js/settings/Setting.Type.js')}
	${self.js_link('/js/settings/Setting.Store.js')}
	${self.js_link('/js/settings/Setting.Form.js')}
	${self.js_link('/js/settings/Setting.FormWindow.js')}
	${self.js_link('/js/settings/Setting.Grid.js')}
	${self.js_link('/js/settings/main.js')}
	% else:
	${self.js_link('/js/lib/extjs/adapter/ext-jquery-adapter.js')}
	${self.js_link('/js/lib/extjs/ext-all.js')}
	${self.js_link('/js/lib/extjs/locale/ext-lang-it.min.js')}
	${self.js_link('/js/lib/extjs/ux/CheckColumn.js')}
	${self.js_link('/js/lib/extjs/ux/RowExpander.js')}
	${self.js_link('/js/settings/BaseStore.min.js')}
	${self.js_link('/js/settings/Setting.Type.min.js')}
	${self.js_link('/js/settings/Setting.Store.min.js')}
	${self.js_link('/js/settings/Setting.Form.min.js')}
	${self.js_link('/js/settings/Setting.FormWindow.min.js')}
	${self.js_link('/js/settings/Setting.Grid.min.js')}
	${self.js_link('/js/settings/main.min.js')}
	% endif
	${self.css_link('/css/settings.css')}
</%def>


<%def name="title()">
	${parent.title()}
	${self.title_part((_(u'Impostazioni'), request.route_path('admin', action='settings')))}
</%def>

<%inherit file="/admin/admin_template.mako"/>

<div id="extjs-main-panel-div"></div>
