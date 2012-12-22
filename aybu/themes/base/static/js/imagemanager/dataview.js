/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

Ext.ns('imgmanager')

var image_tpl = new Ext.XTemplate(
'<tpl for=".">',
	'<div class="thumb-wrap" id="{id}">',
	'<div class="thumb"><img src="{thumb_url}" alt="{name}" title="{name} - [{size_string}]"></div>',
	'<span class="name x-editable"><b>{short_name}</b></span></div>',
'</tpl>',
'<div class="x-clear"></div>'
);

function filter_dataview(search_text) {
	search_field.enable();
	imgmanager.dataview.getStore().filter('name', search_text, true, false);
	resize_thumbs();
}

imgmanager.dataview = new Ext.DataView({
			region: 'center',
			multiSelect : true,
			overClass : 'x-view-over',
			autoHeight : true,
			itemSelector : 'div.thumb-wrap',
			emptyText : "<div class='plupload_emptytext'><span>Nessuna immagine disponibile</span></div>",
			store : imgmanager.image_store,
			tpl : image_tpl,
			plugins: [
                new Ext.DataView.DragSelector(),
                new Ext.DataView.LabelEditor({dataIndex: 'name'})
            ],
			prepareData: function(data) {
				data.short_name = Ext.util.Format.ellipsis(data.name, 15);
				data.size_string = Ext.util.Format.fileSize(data.size);
				return data;
			},
			listeners : {
				selectionChange: function (dv, selections) {
					if (selections.length) {
						toolbar = imgmanager.image_panel.getTopToolbar();
						if (selections.length == 1) {
							toolbar.getComponent('edit').setDisabled(false);
							toolbar.getComponent('select').setDisabled(false);
						} else {
							toolbar.getComponent('edit').setDisabled(true);
							toolbar.getComponent('select').setDisabled(true);
						}
						toolbar.getComponent('delete').setDisabled(false);
					} else {
						toolbar.getComponent('delete').setDisabled(true);
						toolbar.getComponent('edit').setDisabled(true);
						toolbar.getComponent('select').setDisabled(true);
					}
				},
				dblclick : function (dv, idx, node, evtObj) {
					var image = this.getSelectedRecords()[0].json;
					var win = new Ext.Window({
						closeAction: 'hide',
						plain: true,
						layout:'fit',
						width: image.width + 20,
						height: image.height + 100,
						items: [
							new Ext.Panel({
								title: image.name,
								width: image.width,
								height: image.height,
								html: '<img src="' + image.url + '"/>'
							})
						]
					});
					win.show();
				}
			}
});

imgmanager.keymap = new Ext.KeyMap(document,{
	key : 'a',
	ctrl : true,
	stopEvent: true,
	scope : imgmanager.dataview,
	handler: function() {
		this.selectRange(0, this.getNodes().length);
	}
});
