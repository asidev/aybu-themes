/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

Ext.ns('TreeManager')

TreeManager.BaseForm = Ext.extend(Ext.form.FormPanel, {

	constructor : function(config){
		this.win = config.win;
		this.type = config.type
		this.submit_url = urls.create;
		config.defaults = {
			anchor: "90%",
			xtype: "textfield"
		};
		TreeManager.BaseForm.superclass.constructor.call(this, config);
		this.isUpdate = false;
		this.waitMsg = "Salvo...";
	},


	makeTitle : function(f,e){},

	initComponent : function(){
		var config = {
			layout: 'form',
			padding : 10,
			labelWidth : 180
		};

		var button_label = new Ext.form.TextField({
			id : this.type + "_button_label",
			name : "button_label",
			fieldLabel : "Etichetta Bottone",
			allowBlank : false,
			enableKeyEvents : true,
			listeners: {
				keyup : this.makeTitle
			}
		});

		var enabled = new Ext.form.Checkbox({
			id : this.type + "_enabled",
			name : "enabled",
			fieldLabel : "Abilitato",
			originalValue : true
		});

		this.items = [
			{ id : this.type + "_id", name : "id", xtype : "hidden" },
			enabled,
			button_label
		].concat(this.items);


		this.buttons = [
			{ id: this.type + "_reset", text : "Reset", handler : this.reset, scope : this },
			{ id: this.type + "_submit", text : "Salva", handler : this.submit, scope : this }
		];

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		TreeManager.BaseForm.superclass.initComponent.call(this);
	},

	reset : function(){
		if(this.isUpdate){
			this.load(this.menu_item_id);
		} else {
			this.getForm().reset();
		}
	},
	submit: function(){
		this.getForm().submit({
			url : this.submit_url,
			params: {
				type : this.type,
				parent_id : this.parent_id
			},
			success : this.submit_success,
			failure : this.submit_failure,
			scope: this,
			clientValidation: true,
			waitMsg : this.waitMsg
		});
	},
	reload_window: function() {
		//this.win.close();
		window.location.reload(true);
	},
	submit_failure: function(form, action){
        switch (action.failureType) {
            case Ext.form.Action.CLIENT_INVALID:
                Ext.Msg.alert('Failure',
                              'Il form non è stato compilato correttamente.');
                break;
            case Ext.form.Action.CONNECT_FAILURE:
                Ext.Msg.alert('Failure', 'Ajax communication failed');
                break;
            case Ext.form.Action.SERVER_INVALID:
               Ext.Msg.alert('Failure', action.result.msg);
       }
	},
	load : function(menu_item_id){
		this.waitMessage = Ext.Msg.wait("Caricamento", "Caricamento informazioni in corso... ");
		this.menu_item_id = menu_item_id;
		options = {
			url : urls.info,
			params : { id : this.menu_item_id },
			success : this.load_success,
			failure : this.load_error,
			scope : this,
			waitMsg : "Carico..."
		}
		this.getForm().load(options);
	},
	setUpdate : function(id) {
		this.isUpdate = true;
		this.waitMsg = "Aggiorno...";
		this.submit_url = urls.update;
		this.enable();
	}
});

TreeManager.PageSectionBaseForm = Ext.extend(TreeManager.BaseForm, {
	constructor : function(config){
		TreeManager.PageSectionBaseForm.superclass.constructor.call(this, config);
	},



	initComponent: function(){
		var config = {};
		Ext.apply(this, Ext.apply(this.initialConfig, config));

		this.makeTitle = function(f,e){
			value = f.getValue();
			title.setValue(value);
			url = urlfy(value.trim());
			url_part.setValue(url);
		};

		this.makeurl = function(f,e){
			value = f.getValue().trim();
			url = urlfy(value);
			url_part.setValue(url);
		};

		var url_part = new Ext.form.TextField({
			id : this.type + "_url_part",
			name : "url_part",
			fieldLabel : "URL",
			allowBlank : false,
			enableKeyEvents : true,
			listeners: {
				keyup : this.makeurl
			}
		});

		var title = new Ext.form.TextField({
			id : this.type + "_title",
			name :"title",
			fieldLabel : "Titolo",
			allowBlank : false,
			enableKeyEvents : true,
			listeners: {
				keyup : this.makeurl
			}
		});

		//var keywords = null;

		this.items = [
			title,
			url_part/*,
			keywords
			*/
		].concat(this.items);

		TreeManager.PageSectionBaseForm.superclass.initComponent.call(this);

	}
});


TreeManager.PageForm = Ext.extend(TreeManager.PageSectionBaseForm, {

	constructor : function(config){
		TreeManager.PageForm.superclass.constructor.call(this, config);
	},

	initComponent: function(){
		var config = {};
		Ext.apply(this, Ext.apply(this.initialConfig, config));

		var meta_description = new Ext.form.TextArea({
			id : this.type + "_meta_description",
			name : "meta_description",
			fieldLabel : "Descrizione",
			allowBlank : true
		});

		var head_content = new Ext.form.TextArea({
			id : this.type + "_head_content",
			name : "head_content",
			fieldLabel : "Header Tags",
			allowBlank : true
		});

        this.combo_type = new TreeManager.PageTypeCombo({allowBlank: false});

		var home = new Ext.form.Checkbox({
			id : this.type + "_home",
			name : "home",
			fieldLabel : "Homepage",
			originalValue : false,
		});

		this.items = [
			this.combo_type,
			meta_description,
			head_content,
			home,
		];

		TreeManager.PageForm.superclass.initComponent.call(this);
	},

	submit_success : function(form, action){
        Ext.Msg.show({
            title : 'Pagina Salvata',
            msg : "Pagina Salvata con successo. Naviga il sito per modificare il contenuto della pagina",
            icon : Ext.MessageBox.INFO,
            buttons : Ext.Msg.OK,
			fn: this.reload_window
        });
		// this.win.close();
	},

	load_success : function(form, action) {
		this.page = action.result.data;
        var combo = this.combo_type;
        this.combo_type.getStore().load();
        this.combo_type.setValue(this.page.page_type_id);
		this.waitMessage.hide();
	}
});


TreeManager.MediaPageForm = Ext.extend(TreeManager.PageForm, {

	constructor : function(config){
        // FIXME: remove 'combo_type' from this form!!!
		TreeManager.MediaPageForm.superclass.constructor.call(this, config);
	},

	initComponent: function(){
		var config = {};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		TreeManager.MediaPageForm.superclass.initComponent.call(this);
        // FIXME: remove 'combo_type' from this form!!!
        this.combo_type.destroy();
        //this.combo_type.setValue('0');
	},

	submit_success : function(form, action){
        Ext.Msg.show({
            title : 'Pagina Salvata',
            msg : "Pagina Salvata con successo. Naviga il sito per modificare il contenuto della pagina",
            icon : Ext.MessageBox.INFO,
            buttons : Ext.Msg.OK,
			fn: this.reload_window
        });
		// this.win.close();
	},

	load_success : function(form, action) {
        TreeManager.MediaPageForm.superclass.load_success.call(this, form, action);
        // FIXME: remove 'combo_type' from this form!!!
        this.combo_type.setValue(0);
	}
});


TreeManager.SectionForm = Ext.extend(TreeManager.PageSectionBaseForm, {

	constructor : function(config){
		TreeManager.SectionForm.superclass.constructor.call(this, config);
	},

	initComponent: function(){
		var config = {};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.items = [];
		TreeManager.SectionForm.superclass.initComponent.call(this);
	},

	submit_success : function(form, action){
        Ext.Msg.show({
            title : 'Sezione Salvata',
            msg : "Sezione Salvata con successo.",
            icon : Ext.MessageBox.INFO,
            buttons : Ext.Msg.OK,
			fn: this.reload_window
        });
		// this.win.close();
	}
});


TreeManager.ExternalLinkForm = Ext.extend(TreeManager.BaseForm, {
	constructor : function(config){
		TreeManager.ExternalLinkForm.superclass.constructor.call(this, config);
	},

	initComponent: function(){
		var config = {};
		Ext.apply(this, Ext.apply(this.initialConfig, config));

		var url = new Ext.form.TextField({
			id : this.type + "_url",
			name : "external_url",
			fieldLabel : "URL",
			allowBlank : false
		});

		this.items = [
			url
		];
		TreeManager.ExternalLinkForm.superclass.initComponent.call(this);
	},

	submit_success : function(form, action){
        Ext.Msg.show({
            title : 'Link Esterno Salvato',
            msg : "Link Esterno salvato con successo.",
            icon : Ext.MessageBox.INFO,
            buttons : Ext.Msg.OK,
			fn: this.reload_window
        });
		// this.win.close();
	}

});


TreeManager.InternalLinkForm = Ext.extend(TreeManager.BaseForm, {
	constructor : function(config){
		TreeManager.InternalLinkForm.superclass.constructor.call(this, config);
	},

	initComponent: function(){
		var config = {};
		Ext.apply(this, Ext.apply(this.initialConfig, config));

		this.linked_to = new TreeManager.MenuItemListCombo({allowBlank: false});

		this.items = [
			this.linked_to
		];

		TreeManager.InternalLinkForm.superclass.initComponent.call(this);
	},

	submit_success : function(form, action){
        Ext.Msg.show({
            title : 'Link Interno Salvato',
            msg : "Link Interno salvato con successo.",
            icon : Ext.MessageBox.INFO,
            buttons : Ext.Msg.OK,
			fn: this.reload_window
        });
		// this.win.close();
	}
});
