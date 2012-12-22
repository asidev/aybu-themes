/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

Ext.ns('settings')

settings.SettingForm = Ext.extend(Ext.form.FormPanel, {

	constructor : function(config){
        this.win = config.win;
		this.setting = config.setting
		config.defaults = {
			anchor: "90%",
		};
		this.waitMsg = "Salvo...";
		this.submit_url = urls.create;
		this.related = [];
		settings.SettingForm.superclass.constructor.call(this, config);
	},

	initComponent: function(){

		var config = {
			layout: 'form',
			padding : 10,
			labelWidth : 80
		};

		var name = new Ext.form.TextField({
			id : "name",
			name : "name",
			readOnly : true,
			fieldLabel : "Nome",
			allowBlank : false
		});

		var value = null;
		if(this.setting.setting_type_name == 'html') {
			value = new Ext.form.HtmlEditor({
				id : "value",
				name : "value",
				fieldLabel : "Valore",
				allowBlank : false,
				enableLists : false
			});
		} else if(this.setting.raw_type == 'int') {
			value = new Ext.form.NumberField({
				id : "value",
				name : "value",
				fieldLabel : "Valore",
				allowBlank : false
			});
		} else if(this.setting.setting_type_name == 'txt' ||
				  this.setting.setting_type_name == 'image' ||
				  this.setting.setting_type_name == 'email') {
			value = new Ext.form.TextField({
				id : "value",
				name : "value",
				fieldLabel : "Valore",
				allowBlank : true
			});
		} else if (this.setting.setting_type_name == 'checkbox') {
			value = new Ext.form.Checkbox({
				id : "value",
				name : "value",
				fieldLabel : "Valore",
				allowBlank : false
			});
		} else {
            value = new Ext.form.TextField({
				id : "value",
				name : "value",
				fieldLabel : "Valore",
				allowBlank : false,
			});
        }

		this.items = [
			name,
			value
		];

		this.buttons = [
			{ id: "reset", text : "Reset", handler : this.reset, scope : this },
			{ id: "submit", text : "Salva", handler : this.submit, scope : this }
		];

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		settings.SettingForm.superclass.initComponent.call(this, arguments);
	},
	reset : function() {
		this.getForm().reset();
		if (this.original_setting)
			this.getForm().setValues({name: this.original_setting.name,
									  value: this.original_setting.value});
	},
	submit: function() {
		this.getForm().submit({
			url : this.submit_url,
			success : this.submit_success,
			failure : this.submit_failure,
			scope: this,
			clientValidation: true,
			waitMsg : this.waitMsg
		});
	},
	submit_success : function(form, action){
        Ext.Msg.show({
            title : 'Impostazione Salvata',
            msg : "Impostazione salvata con successo.",
            icon : Ext.MessageBox.INFO,
            buttons : Ext.Msg.OK,
			fn: this.reload_window
        });
	},
	reload_window: function() {
		window.location.reload(true);
	},
	submit_failure: function(form, action){
		switch (action.failureType) {
			case Ext.form.Action.CLIENT_INVALID:
				Ext.Msg.alert('Validazione', 'Errore di validazione dei campi');
				break;
			default:
				Ext.Msg.alert('Richiesta fallita', action.result.errors.exception);
				break;
		}
	},
	load : function(setting){
		this.name = setting.name;
        this.setting = setting;
		this.original_setting = setting;
		this.getForm().setValues({name: setting.name, value: setting.value});
	},
	setUpdate : function(username) {
		this.waitMsg = "Aggiorno...";
		this.submit_url = urls.update;
		this.enable();
	}
});
