/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

Ext.ns('imgmanager')

Ext.Ajax.on("requestexception", function() {
	Ext.Msg.alert("Errore",
		"Non è possibile completare l'operazione.\n" +
		"Assicurarsi di non avere riferimenti all'immagine prima di procedere.");
});

imgmanager.image_store = new Ext.data.JsonStore({
	url : urls.list,
	root : 'data',
	storeId: 'imagestore',
	successProperty: 'success',
	totalProperty: 'datalen',
	idProperty: 'id',
	fields : [{name: 'id', type: 'int' },'name', 'url', 'thumb_url', 'used_by'],
	sortInfo : { field: "name", direction: "ASC"},
	listeners : {
		remove : function (store, record, idx) {
			Ext.Ajax.request({
				url: urls.remove,
				params: { id : record.get("id") },
				failure : function () {}
			});
		},
		update : function (store, record, idx) {
			Ext.Ajax.request({
				url: urls.update,
				params: { id : record.get("id"), name : record.get("name") },
				failure : function () {}
			});
		}
	}
});
