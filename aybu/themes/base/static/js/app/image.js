Ext.ns('Aybu.Image');

var minSize = 75;
var maxSize = 350;
var incSize = 50;

Aybu.Image.DataWriter = Ext.extend(Ext.data.DataWriter, {

    render: function (params, baseParams, data) {
        Ext.apply(params, baseParams);
        Ext.apply(params, data);
    },

    create: function (record) {
        return this.createRecord(record);
    },

    update: function (record) {
        return this.updateRecord(record);
    },

    destroy: function (record) {
        return this.destroyRecord(record);
    },

    createRecord: function (record) {
        return record.data;
    },

    updateRecord: function (record) {
        return {
            id: record.get('id'),
            name: record.get('name')
        };
    },

    destroyRecord: function (record) {
        return {
            id: record.get('id')
        };
    }
});

Aybu.Image.Store = new Ext.extend(Aybu.Base.Store, {

    constructor:function(config) {

        config = config || {};
        Ext.applyIf(config, {
            idProperty: 'id',
            root: 'data',
            successProperty: 'success',
            totalProperty: 'datalen',
            autoSave: true,
            fields: [
                {
                    name: 'id',
                    type: 'int'
                },
                'name',
                'url',
                'thumb_url',
                'used_by',
                {
                    name: 'thumb_width',
                    type: 'int'
                },
                {
                    name: 'thumb_height',
                    type: 'int'
                },
                {
                    name: 'width',
                    type: 'int'
                },
                {
                    name: 'height',
                    type: 'int'
                },
                'content_type',
                'path',
                {
                    name: 'size',
                    type: 'int'
                }
            ],
            sortInfo: {
                field: 'name',
                direction: 'ASC'
            },
            writer: new Aybu.Image.DataWriter(),
            proxy: new Ext.data.HttpProxy({
                api: {
                    read: {
                        url: urls.list,
                        method: 'GET'
                    },
                    create: urls.list,
                    update: {
                        url: urls.update,
                        method: 'GET'
                    },
                    destroy: {
                        url: urls.remove,
                        method: 'GET'
                    }
                },
                listeners: {
                    'exception': this.onProxyException,
                    scope: this
                }
            })
        });
        Aybu.Image.Store.superclass.constructor.call(this, config);
    },

    onProxyException: function (proxy, type, action, options, response, arg) {
        Ext.Msg.alert('Errore connessione al server.',
                      "Non e' stato possibile completare l'operazione: " + action + ".");
    }
});
Ext.reg('AybuImageStore', Aybu.Image.Store);

Aybu.Image.DataView = new Ext.extend(Aybu.Base.DataView, {

    constructor: function (config) {

        config = config || {};
        config.store = config.store || {};
        Ext.applyIf(config.store, {
            xtype: 'AybuImageStore',
            listeners: {
                'load': this.onStoreLoad,
                scope: this
            }
        });
        Ext.applyIf(config, {
            emptyText: '<div class="plupload_emptytext"><span>Nessuna immagine disponibile.</span></div>',
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
                '<div class="thumb-wrap" id="{id}">',
                '<div class="thumb"><img src="{thumb_url}" alt="{name}" title="{name} - [{size_string}]"></div>',
                '<span class="name x-editable"><b>{short_name}</b></span></div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ),
            prepareData: function (data) {
                data.short_name = Ext.util.Format.ellipsis(data.name, 15);
                data.size_string = Ext.util.Format.fileSize(data.size);
                return data;
            },
            plugins: [
                new Ext.DataView.DragSelector(),
                new Ext.DataView.LabelEditor({dataIndex: 'name'})
            ]
        });
        Aybu.Image.DataView.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Aybu.Image.DataView.superclass.initComponent.apply(this, arguments);
        this.addEvents('storeload');
        this.addListener('dblclick', this.onDoubleClick, this);
    },

    onStoreLoad: function () {
        this.fireEvent('storeload');
    },

    onDoubleClick: function (dataview, index, node, event) {
        var image = dataview.getRecord(node).json;
        var panel = new Ext.Panel({
            width: image.width,
            height: image.height,
            html: '<img src="' + image.url + '"/>'
        });
        var win = new Ext.Window({
            title: image.name,
            width: image.width + 20,
            height: image.height + 100,
            x: 25,
            y: 25,
            closeAction: 'hide',
            plain: true,
            layout:'fit',
            items: [panel]
        });
        win.show();
    }
});
Ext.reg('AybuImageDataView', Aybu.Image.DataView);

Aybu.Image.UploadButton = new Ext.extend(Ext.ux.PluploadButton, {

    constructor: function (config) {

        config = config || {};
        config.upload_config = config.upload_config || {};
        Ext.applyIf(config.upload_config, {
            url: urls.add,
            runtimes: 'gears,flash,silverlight,html5,browserplus,html4',
            multipart: true,
            multipart_params: { param1: 1, param2: 2 },
            max_file_size: '10mb',
            flash_swf_url: '/static/js/lib/plupload/plupload.flash.swf',
            silverlight_xap_url: '/static/js/lib/plupload/plupload.silverlight.xap',
            filters: [{title: "Image files", extensions: "jpg,JPG,gif,GIF,png,PNG"}],
            runtime_visible: false,
            addButtonCls: 'silk-add',
            uploadButtonCls: 'silk-arrow-up',
            cancelButtonCls: 'silk-stop',
            deleteButtonCls: 'silk-cross',
            addButtonText: 'Aggiungi',
            uploadButtonText: 'Upload',
            cancelButtonText: 'Termina upload',
            deleteButtonText: 'Rimuovi dalla coda',
            deleteSelectedText: '<b>selezionati</b>',
            deleteUploadedText: 'caricati',
            deleteAllText: 'tutti',
            statusQueuedText: 'In coda',
            statusUploadingText: 'Uploading ({0}%)',
            statusFailedText: '<span style="color: red">Fallito</span>',
            statusDoneText: '<span style="color: green">Ok</span>',
            statusInvalidSizeText: 'Le dimensioni del file sono oltre il massimo consentito',
            statusInvalidExtensionText: 'Tipo di file non valido',
            emptyText: '<div class="plupload_emptytext"><span>Coda vuota</span></div>',
            emptyDropText: '<div class="plupload_emptytext"><span>Trascina i file qui</span></div>',
            progressText: '{0}/{1} ({3} falliti) ({5}/s)',
            listeners: {
                'uploadcomplete': this.onUploadComplete,
                scope: this
            }
        });
        Ext.applyIf(config, {
            text: 'Aggiungi',
            itemId: 'addButton',
            iconCls: 'silk-add',
            window_width: 380,
            window_height: 300,
            clearOnClose: true,
            window_title: 'Carica Immagini'
        });
        Aybu.Image.UploadButton.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Aybu.Image.UploadButton.superclass.initComponent.apply(this, arguments);
        this.addEvents('uploadsuccessful');
    },

    onUploadComplete: function (uploadpanel, success, failures) {
        if (success.length && !failures.length) {
            this.fireEvent('uploadsuccessful');
            this.window.hide();
        }
    }
});
Ext.reg('AybuImageUploadButton', Aybu.Image.UploadButton);

Aybu.Image.Toolbar = Ext.extend(Aybu.Base.Toolbar, {

    constructor: function (config) {
        config = config || {};
        config.buttonsCfg = config.buttonsCfg || {};
        Ext.applyIf(config.buttonsCfg, {
            select: true,
            edit: true,
            delete_: true
        });
        config.buttonsCfg.add = config.buttonsCfg.add || {};
        config.buttonsCfg.add.cfg = config.buttonsCfg.add.cfg || {};
        Ext.applyIf(config.buttonsCfg.add.cfg, {
            xtype: 'AybuImageUploadButton',
            listeners: {
                'uploadsuccessful': this.onUploadSuccessful,
                scope: this
            }
        });
        Ext.applyIf(config, {
            items: [
                '->',
                {
                    xtype: 'textfield',
                    emptyText : "Cerca per nome",
                    id : "search",
                    width: 100,
                    enableKeyEvents : true,
                    listeners: {
                        'specialkey': function (field, event) {
                            this.fireEvent('search', field.getValue());
                        },
                        'keyup': function (field, event) {
                            this.fireEvent('search', field.getValue());
                        },
                        scope: this
                    }
                },
                '  ',
                {
                    text: '',
                    itemId: 'clearsearch',
                    iconCls: 'silk-clear',
                    handler: this.onClearSearch,
                    scope: this
                },
                ' ',
                ' ',
                '-',
                ' ',
                ' ',
                {
                    text : '',
                    iconCls: 'silk-zoomout',
                    itemId: 'sizeDec',
                    listeners: {
                        'click': this.onZoomOut,
                        scope: this
                    }
                },
                new Ext.slider.SingleSlider({
                    itemId: 'resizer',
                    width: 100,
                    value: 100,
                    animate : false,
                    value: minSize,
                    increment: incSize,
                    minValue: minSize,
                    maxValue: maxSize,
                    listeners: {
                        change: this.onResizeComplete,
                        scope: this
                    }
                }),
                {
                    text : '',
                    iconCls: 'silk-zoomin',
                    itemId: 'sizeInc',
                    listeners: {
                        'click': this.onZoomIn,
                        scope: this
                    }
                }
            ]
        });
        Aybu.Image.Toolbar.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Aybu.Image.Toolbar.superclass.initComponent.apply(this, arguments);
        this.addEvents('uploadsuccessful', 'zoom', 'search');
    },

    onUploadSuccessful: function () {
        this.fireEvent('uploadsuccessful');
    },

    onClearSearch: function() {
        var field = this.getComponent('search');
        field.setValue('');
        this.fireEvent('search', field.getValue());
    },

    onResizeComplete: function () {
        var value = this.getComponent('resizer').getValue();
        var zoomOut = this.getComponent('sizeDec');
        var zoomIn = this.getComponent('sizeInc');
        if (value <= minSize) {
            zoomOut.disable();
        } else {
            zoomOut.enable();
        }
        if (value >= maxSize) {
            zoomIn.disable();
        } else {
            zoomIn.enable();
        }
        this.fireEvent('zoom', value);
    },

    onZoomOut: function () {
        slider = this.getComponent('resizer');
        value = slider.getValue();
        if (value > minSize)
            slider.setValue(value - incSize);
    },

    onZoomIn: function () {
        slider = this.getComponent('resizer');
        value = slider.getValue();
        if (value < maxSize)
            slider.setValue(value + incSize);
    }
});
Ext.reg('AybuImageToolbar', Aybu.Image.Toolbar);

Aybu.Image.Panel = Ext.extend(Aybu.Base.Panel, {

    constructor: function (config) {
        config = config || {};
        Ext.applyIf(config, {
            id: 'images-view',
            autoScroll: true,
            tbar: {
                xtype: 'AybuImageToolbar',
                buttonsCfg: {
                    select: true,
                    add: {
                        cfg: {
                            xtype: 'AybuImageUploadButton',
                            listeners: {
                                'uploadsuccessful': this.onUploadSuccessful,
                                scope: this
                            }
                        }
                    },
                    edit: true,
                    delete_: true
                }
            },
            items: {
                xtype: 'AybuImageDataView'
            }
        });
        Aybu.Image.Panel.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Aybu.Image.Panel.superclass.initComponent.apply(this, arguments);
        this.getTopToolbar().addListener('uploadsuccessful',
                                         this.onUploadSuccessful, this);
        this.getTopToolbar().addListener('zoom', this.onZoom, this);
        this.getTopToolbar().addListener('search', this.onSearch, this);
        this.getComponent(0).addListener('storeload', this.onStoreLoad, this);
    },

    onUploadSuccessful: function () {
        this.getComponent(0).store.reload();
    },

    onEditSelected: function () {
        var dataview = this.getComponent('dataview');
        this.editWindow.show();
        this.editWindow.setRecord(dataview.getSelectedRecords()[0]);
    },

    onZoom: function (value) {
        if (value) {
            jQuery("#images-view .thumb img").css("width", value);
            jQuery("#images-view .thumb img").css("height", value * 0.8);
        }
    },

    onSearch: function (value) {
        var dataview = this.getComponent('dataview');
        dataview.getStore().filter('name', value, true, false);
        this.getTopToolbar().getComponent('resizer').setValue(100);
    },

    onStoreLoad: function () {
        this.getTopToolbar().getComponent('search').setValue('');
    }
});
Ext.reg('AybuImagePanel', Aybu.Image.Panel);

Aybu.Image.Window = Ext.extend(Aybu.Base.Window, {

    constructor: function (config) {
        config = config || {};
        Ext.applyIf(config, {
            title: 'Gestione Immagini',
            width: 640,
            height: 320,
            items: {
                xtype: 'AybuImagePanel'
            }
        });
        Aybu.Image.Window.superclass.constructor.call(this, config);
    },
});
Ext.reg('AybuImageWindow', Aybu.Image.Window);
