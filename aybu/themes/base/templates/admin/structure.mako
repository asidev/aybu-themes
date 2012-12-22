<%def name="css()">
	${parent.css()}
	${self.css_link('/js/lib/extjs/resources/css/ext-all-notheme.css')}
	${self.css_link('/js/lib/extjs/resources/css/xtheme-gray.css')}
	${self.css_link('/js/lib/extjs/ux/treegrid/treegrid.css')}
	${self.css_link('/js/lib/extjs/ux/ext.ux.plupload.css')}
	${self.css_link('/css/structure.css')}
</%def>

<%def name="js()">
	${parent.js()}
	<script type="text/javascript">
		var urls = {
			tree : "${request.route_path('structure', action='tree')}",
			list : "${request.route_path('structure', action='list')}",
			info : "${request.route_path('structure', action='info')}",
			create : "${request.route_path('structure', action='create')}",
			update : "${request.route_path('structure', action='update')}",
			move : "${request.route_path('structure', action='move')}",
			destroy : "${request.route_path('structure', action='destroy')}",
			types : "${request.route_path('views', action='list')}",
			max_pages : ${c.settings.max_pages}
		}
	</script>
	% if c.settings.debug == True:
	${self.js_link('/js/lib/extjs/adapter/ext-jquery-adapter-debug.js')}
	${self.js_link('/js/lib/extjs/ext-all-debug.js')}
	${self.js_link('/js/lib/extjs/locale/ext-lang-it.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGridSorter.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGridColumnResizer.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGridNodeUI.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGridLoader.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGridColumns.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGrid.js')}
	${self.js_link('/js/structure/BaseStore.js')}
	${self.js_link('/js/structure/MenuItem.List.js')}
	${self.js_link('/js/structure/Page.Type.js')}
	${self.js_link('/js/structure/urlfy.js')}
	${self.js_link('/js/structure/Page.Form.js')}
	${self.js_link('/js/structure/FormWindow.js')}
	${self.js_link('/js/structure/Tree.Grid.js')}
	${self.js_link('/js/structure/main.js')}
	% else:
	${self.js_link('/js/lib/extjs/adapter/ext-jquery-adapter.js')}
	${self.js_link('/js/lib/extjs/ext-all.js')}
	${self.js_link('/js/lib/extjs/locale/ext-lang-it.min.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGridSorter.min.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGridColumnResizer.min.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGridNodeUI.min.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGridLoader.min.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGridColumns.min.js')}
	${self.js_link('/js/lib/extjs/ux/treegrid/TreeGrid.min.js')}
	${self.js_link('/js/structure/BaseStore.min.js')}
	${self.js_link('/js/structure/MenuItem.List.min.js')}
	${self.js_link('/js/structure/Page.Type.min.js')}
	${self.js_link('/js/structure/urlfy.min.js')}
	${self.js_link('/js/structure/Page.Form.min.js')}
	${self.js_link('/js/structure/FormWindow.min.js')}
	${self.js_link('/js/structure/Tree.Grid.min.js')}
	${self.js_link('/js/structure/main.min.js')}
	% endif
</%def>

<%def name="title()">
	${parent.title()}
	${self.title_part((_(u'Gestione Pagine'), request.route_path('admin', action='structure')))}
</%def>

<%inherit file="/admin/admin_template.mako"/>

<h3>${_(u'Gestione Pagine')}</h3>

<p>
	${_(u"Questa sezione permette la gestione delle pagine e la loro organizzazione nel sito.")}
</p>

<div id="extjs-main-panel-div"></div>
