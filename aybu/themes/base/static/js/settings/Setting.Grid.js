/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

Ext.ns('settings')

settings.SettingsGrid = Ext.extend(Ext.grid.EditorGridPanel, {

    initComponent : function() {
		var selectionmodel = new Ext.grid.CheckboxSelectionModel({
			listeners : {
				selectionchange : {
					fn : this.onselectionchange,
					scope : this
				}
			}
		});

		var config = {
			title : "Impostazioni",
			id : "SettingsGrid",
			loadMask : true,
			viewConfig : {
				forceFit: true
			},
			columnLines : true,
			stripeRows: true,
			cm : new Ext.grid.ColumnModel([
				selectionmodel,
				{
					id : "name",
					header : "Nome",
					dataIndex : "name",
					sortable : true,
					width : 80
				},
				{
					id : 'value',
					header : 'Valore',
					dataIndex : 'value',
					sortable : true,
					width : 80
				}
			]),
			bbar : new Ext.PagingToolbar({
				pageSize: this.getStore().pageSize,
				store : this.getStore(),
				displayInfo : true,
				displayMsg: 'Impostazioni {0} - {1} di {2}',
				emptyMsg : 'Nessuna impostazione trovata'
			}),
			tbar : [{
				text : "Modifica",
				tooltip : "Modifica l'impostazione selezionata",
				iconCls: 'silk-edit',
				ref : "../editButton",
				handler : this.show_page_form,
				scope : this,
				disabled: true
			}],
			sm : selectionmodel
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		settings.SettingsGrid.superclass.initComponent.call(this);
	},
	onselectionchange : function(sm) {
		if (sm.getCount()) {
			if (sm.getCount() > 1) {
				this.editButton.disable();
			} else {
				this.editButton.enable();
			}
		} else {
			this.editButton.disable();
		}
	},
	show_page_form : function(btn, ev) {
		sm = this.getSelectionModel();
		if(btn == this.editButton){
			setting = sm.getSelected().data;
			this.win = new settings.SettingFormWin({title: "Modifica impostazione", 
													animateTarget: btn, setting : setting});
			this.win.show(setting, btn);
		}
	}
});
