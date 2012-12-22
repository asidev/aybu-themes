Ext.ns('Aybu.MediaCollection.MediaItemPage');
Aybu.MediaCollection.MediaItemPage.Window = Ext.extend(Aybu.Base.Window, {

    constructor: function (config) {

        this.collectionSelector = config.collectionSelector;
        this.lightBoxSelector = config.lightBoxSelector;
        Aybu.MediaCollection.MediaItemPage.Window.superclass.constructor.call(this, config);
    },

    initComponent: function () {

        var config = {
            title:'Gestione Galleria',
            width: 220,
            items: {
                xtype: 'AybuBasePanel',
                cls: 'images-view',
                enableDD: true,
                tbar: {
                    buttonsCfg: {
                        add: true,
                        edit: true,
                        delete_: true
                    }
                },
                items: {
                    xtype: 'AybuBaseDataView',
                    emptyText: '<div class="plupload_emptytext"><span>Galleria vuota.</span></div>',
                    tpl: new Ext.XTemplate(
                        '<tpl for=".">',
                        '<div class="thumb-wrap" id="MediaItemPage{id}">',
                            '<tpl for="file">',
                                    '<div class="thumb"><img src="{thumb_url}"></div>',
                            '</tpl>',
                            '<tpl for="translations">',
                            '<span class="label"><b>{label}</b></span></div>',
                            '</tpl>',
                        '</div>',
                        '</tpl>',
                        '<div class="x-clear"></div>'
                    ),
                    store: {
                        xtype: 'AybuBaseStore',
                        idProperty: 'id',
                        baseParams: {
                            parent_url: document.URL
                        },
                        httpProxyUrl: '/admin/mediaitempage',
                        fields: [
                            {
                                name: 'id',
                                type: 'int'
                            },
                            'file',
                            'parent_url',
                            'translations',
                            {
                                name: 'weight',
                                type: 'int'
                            }
                        ],
                        sortInfo: {
                            field: 'weight',
                            direction: 'ASC'
                        }
                    }
                },
                addWindow: new Aybu.Image.Window({modal: true}),
                editWindow: new Aybu.Base.EditWindow({
                    modal: true,
                    width: 520,
                    items: {
                        xtype: 'AybuBaseEditPanel',
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'labelField',
                                width: 350,
                                name: 'label',
                                fieldLabel: 'Titolo',
                                allowBlank: false,
                                labelStyle: 'font-weight: bold'
                            },
                            {
                                xtype: 'textarea',
                                itemId: 'contentField',
                                width: 350,
                                height: 250,
                                name: 'content',
                                fieldLabel: 'Descrizione',
                                allowBlank: true,
                                labelStyle: 'font-weight: bold'
                            },
                            {
                                xtype: 'hidden',
                                itemId: 'idField',
                                name: 'id',
                                allowBlank: false
                            }
                        ],
                        getValues: function () {
                            return {
                                id: this.getComponent('idField').getValue(),
                                label: this.getComponent('labelField').getValue(),
                                content: this.getComponent('contentField').getValue()
                            };
                        },
                    },
                    setRecord: function (record) {
                        this.getComponent(0).getForm().setValues({
                            'id': record.data.id,
                            'label': record.data.translations[0].label,
                            'content': record.data.translations[0].content
                        });
                    }
                }),
                onDeleteSelected: function () {
                    // do nothing
                    //console.log('ON DELETE SELECTED');
                },
                onSelectionDone: function (records) {
                    var dataview = this.getComponent('dataview');
                    var store = dataview.getStore();
                    var n = store.getTotalCount();
                    store.sort('weight', 'ASC');
                    var record = store.getAt(n - 1);
                    var weight = 1;
                    if (record) {
                        weight += record.data.weight;
                    }
                    var items = [];
                    for (i = 0; i < records.length; i++) {
                        var item = {
                            file: {
                                id: records[i].data.id,
                                url: records[i].data.url,
                                thumb_url: records[i].data.thumb_url
                            },
                            parent_url: document.URL,
                            translations: [{
                                label: '',
                                content: ''
                            }],
                            weight: weight + i
                        };
                        item = new store.recordType(item);
                        items.push(item);
                    };
                    store.add(items);
                    store.save();
                },
                onEditDone: function (values) {
                    var store = this.getComponent('dataview').getStore();
                    if (values) {
                        var record = store.getById(values.id);
                        record.set('translations', [{
                            id: record.data.translations[0].id,
                            label: values.label,
                            content: values.content
                        }]);
                    }
                    store.save();
                    this.editWindow.hide();
                }
            }
        };
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        Aybu.MediaCollection.MediaItemPage.Window.superclass.initComponent.apply(this, arguments);
    },

    onDataChange: function () {
        Ext.Ajax.request({
            url: mcp_urls['show_html_view'],
            params: {
                response_format: 'html',
            },
            method: 'GET',
            failure: function () {
                Ext.Msg.alert(
                    'Errore: refresh non riuscito.',
                    "Non è stato possibile aggiornare " +
                    "il contenuto della galleria " +
                    "visualizzato all'interno della pagina del sito."
                );
            },
            success: function (response, opts) {
                jQuery(this.collectionSelector).replaceWith(response.responseText);
                jQuery(this.lightBoxSelector).lightBox();
            },
            scope: this
        });
     },
});
Ext.reg('MediaItemPageWindow', Aybu.MediaCollection.MediaItemPage.Window);
