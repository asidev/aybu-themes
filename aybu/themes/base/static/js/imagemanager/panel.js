/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

Ext.ns('imgmanager')

var minSize = 75;
var maxSize = 350;
var incSize = 50;

var slider = new Ext.slider.SingleSlider({
	width: 100,
	value: 100,
	animate : false,
	increment: incSize,
	minValue: minSize,
	maxValue: maxSize,
	listeners: { changecomplete : resize_thumbs }
});

var search_field = new Ext.form.TextField({
	emptyText : "Cerca (nel nome)",
	id : "search",
	width: 100,
	enableKeyEvents : true
});

search_field.on(
	"specialkey",
	function(field, e) { filter_dataview(this.getValue()); },
	search_field,
	{ buffer: 50 }
);

search_field.on(
	"keypress",
	function(field, e) { filter_dataview(this.getValue()); },
	search_field,
	{ buffer: 50 }
);

function resize_thumbs(sld) {
	if ( sld == undefined )
		sld = slider;
	width = sld.getValue();
	height = width * 0.8;
	jQuery("#images-view .thumb img").css("width", width);
	jQuery("#images-view .thumb img").css("height",height);
	inc = imgmanager.image_panel.getTopToolbar().getComponent("sizeinc");
	dec = imgmanager.image_panel.getTopToolbar().getComponent("sizedec");
	( width == minSize ) ? dec.disable() : dec.enable();
	( width == maxSize ) ? inc.disable() : inc.enable();
}

imgmanager.image_panel = new Ext.Panel({
	id: 'images-view',
	autoScroll : true,
	//layout: 'border',
	region: 'center',
	tbar : new Ext.Toolbar({
		items : [ { text: "Seleziona",
				    itemId : 'select',
					disabled: 'true',
					iconCls : 'silk-attach',
					handler: function() { imgmanager.select_image();}
				}," ",
				imgmanager.plup_add_btn,
				{ text: 'Rimuovi',
				   itemId: 'delete',
				   disabled: true,
				   iconCls : "silk-cross",
				   handler: function () {
						selected = imgmanager.dataview.getSelectedRecords();
						removable = new Array();
						used = 0;
						for (i=0; i < imgmanager.dataview.getSelectionCount(); i++) {
							if ( selected[i].data.used_by.length > 0) {
								used++;
							} else {
								removable.push(selected[i]);
							}
						}
						if (removable.length > 0 ) {

							msg = "Rimuovere " + removable.length + " immagini?";
							if (used > 0)
								msg += " ( <b>" + used + "</b> immagini non possono essere rimosse in quanto sono in uso)";

							Ext.Msg.confirm("Conferma rimozione", msg,
											function (btn) {
												if (btn == "yes")
													imgmanager.dataview.store.remove(removable);
											}
										   )
						} else {
							Ext.Msg.alert("Immagini in uso", "Le immagini selezionate non possono essere rimosse in quanto in uso");
						}

				   }
				}, new imgmanager.EditButton({
					text: 'Modifica',
					iconCls : 'silk-edit',
					disabled : true,
					itemId : 'edit'
				}), '->',	search_field,
				{ text: "",
				  itemId : 'clearsearch',
				  iconCls: 'silk-clear',
				  handler: function() {
					search_field.setValue("");
					filter_dataview("");
					resize_thubs(slider);
				  }
				},"-",
				{ text : "",
				  iconCls: 'silk-zoomout',
				  itemId: "sizedec",
				  handler: function () {
					v = slider.getValue();
					if (v > minSize)
						slider.setValue(v - incSize);
					resize_thumbs(slider);
				  }
				},
				slider,
				{ text : "",
				  iconCls: 'silk-zoomin',
				  itemId: "sizeinc",
				  handler: function () {
					v = slider.getValue();
					if (v < maxSize)
						slider.setValue(v + incSize);
					resize_thumbs(slider);
				  }
				}]
	}),
	items: [ imgmanager.dataview ]
});
