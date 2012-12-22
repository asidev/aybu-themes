Ext.ns('Aybu.Base');
Aybu.Base.Store = Ext.extend(Ext.data.JsonStore, {

    constructor: function (config) {
        config = config || {};
        config.writer = config.writer || {};
        Ext.applyIf(config.writer, {
            encode: true,
            writeAllFields: true
            // write all fields, not just those that changed
        });
        Ext.applyIf(config, {
            autoLoad: true,
            autoSave: false,
            proxy: new Ext.data.HttpProxy({
                url: config.httpProxyUrl,
                restful: true
            }),
            root: 'dataset'
        });
        Aybu.Base.Store.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Aybu.Base.Store.superclass.initComponent.apply(this, arguments);
        this.addEvents('datachanged');
    }
});
Ext.reg('AybuBaseStore', Aybu.Base.Store);

Aybu.Base.DataView = Ext.extend(Ext.DataView, {

    constructor: function (config) {
        config = config || {};
        Ext.applyIf(config, {
            itemId: 'dataview',
            autoHeight: true,
            multiSelect: true,
            overClass: 'x-view-over',
            itemSelector: 'div.thumb-wrap',
            store: {
                xtype: 'AybuBaseStore'
            },
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
                '<div class="thumb-wrap" id="item_{id}">',
                    '<tpl for="file">',
                            '<div class="thumb"><img src="{thumb_url}"></div>',
                    '</tpl>',
                '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ),
            plugins: [
                new Ext.DataView.DragSelector()
            ],
            emptyText: '<div class="plupload_emptytext"><span>Nessun elemento.</span></div>',
            prepareData: function (data) {
                data.short_label = Ext.util.Format.ellipsis(data.label, 15);
                return data;
            }
        });
        Aybu.Base.DataView.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Aybu.Base.DataView.superclass.initComponent.apply(this, arguments);
        this.addEvents('datachange', 'deleteselected');
        this.getStore().addListener('save', this.onSave, this);
        this.getStore().addListener('exception', this.onException, this);
    },

    onSave: function (store, batch, data) {
        this.fireEvent('datachange');
    },

    onException: function (proxy, type, action, options, response, record) {
        if (action == 'create' && !record) {
            this.getStore().load();
        } else if (action == 'create' && record) {
            this.getStore().remove(record);
        } else if (action == 'update') {
            this.getStore().load();
        }
        this.fireEvent('datachanged');
    },

    deleteSelected: function (dataview) {
        Ext.Msg.confirm(
            'Conferma rimozione',
            'Sei sicuro di voler rimuovere gli elementi selezionati?',
            function (btn) {
                if (btn == "yes") {
                    var records = dataview.getSelectedRecords();
                    var store = dataview.getStore();
                    for (var i = 0; i < records.length; i++) {
                        store.remove(records[i]);
                        store.save();
                    }
                    dataview.fireEvent('deleteselected');
                }
            }
        );
    }
});
Ext.reg('AybuBaseDataView', Aybu.Base.DataView);

Aybu.Base.Toolbar = Ext.extend(Ext.Toolbar, {

    constructor: function (config) {
        config = config || {};
        Ext.applyIf(config, {
            itemId: 'toolbar',
            items: []
        });
        var items = [];
        config.buttonsCfg = config.buttonsCfg || {};
        if (config.buttonsCfg.select) {
            var btn = {
                text: 'Usa',
                itemId : 'selectButton',
                disabled: 'true',
                iconCls : 'silk-attach',
                listeners: {
                    'click': function (event, button) {
                        this.fireEvent('selectclick');
                    },
                    scope: this
                }
            };
            btn = config.buttonsCfg.select.cfg || btn;
            items.push(btn);
        }

        if (config.buttonsCfg.add) {
            var btn = {
                text: 'Aggiungi',
                itemId: 'addButton',
                iconCls: 'silk-add',
                listeners: {
                    'click': function (event, button) {
                        this.fireEvent('addclick');
                    },
                    scope: this
                }
            };
            btn = config.buttonsCfg.add.cfg || btn;
            items.push(btn);
        }

        if (config.buttonsCfg.edit) {
            var btn = {
                text: 'Modifica',
                itemId: 'editButton',
                iconCls: 'silk-edit',
                disabled: true,
                listeners: {
                    'click': function () {
                        this.fireEvent('editclick');
                    },
                    scope: this
                }
            };
            btn = config.buttonsCfg.edit.cfg || btn;
            items.push(btn);
        }

        if (config.buttonsCfg.delete_) {
            var btn = {
                text: 'Rimuovi',
                itemId: 'deleteButton',
                iconCls: 'silk-cross',
                disabled: true,
                listeners: {
                    'click': function () {
                        this.fireEvent('deleteclick');
                    },
                    scope: this
                }
            };
            btn = config.buttonsCfg.delete_.cfg || btn;
            items.push(btn);
        }
        config.items.unshift(items);
        Aybu.Base.Toolbar.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Aybu.Base.Toolbar.superclass.initComponent.apply(this, arguments);
        this.addEvents('selectclick', 'addclick', 'editclick', 'deleteclick');
    },

    changeDisabledButtons: function (selections) {
        selectButton = this.getComponent('selectButton');
        editButton = this.getComponent('editButton');
        deleteButton = this.getComponent('deleteButton');
        if (selections.length) {
            selectable = false;
            if (selections.length == 1) {
                editable = false;
            } else {
                editable = true;
            }
            deletable = false;
        } else {
            deletable = true;
            editable = true;
            selectable = true;
        }
        if (selectButton) {
            selectButton.setDisabled(selectable);
        }
        if (editButton) {
            editButton.setDisabled(editable);
        }
        if (deleteButton) {
            deleteButton.setDisabled(deletable);
        }
    }
});
Ext.reg('AybuBaseToolbar', Aybu.Base.Toolbar);

Aybu.Base.Panel = Ext.extend(Ext.Panel, {

    constructor: function (config) {
        config = config || {};
        config.tbar = config.tbar || {};
        Ext.applyIf(config.tbar, {
            xtype: 'AybuBaseToolbar',
            buttonsCfg: {
                select: true,
                add: true,
                edit: true,
                delete_: true
            }
        });
        Ext.applyIf(config, {
            itemId: 'panel',
            autoScroll: true,
            items: {
                xtype: 'AybuBaseDataView'
            },
            addWindow: new Ext.Window({closeAction: 'hide'}),
            editWindow: new Ext.Window({closeAction: 'hide'})
        });
        this.addWindow = config.addWindow;
        this.editWindow = config.editWindow;
        this.enableDD = config.enableDD || false;
        Aybu.Base.Panel.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Aybu.Base.Panel.superclass.initComponent.apply(this, arguments);
        this.addEvents('datachange');
        this.addEvents('selectiondone');
        this.getTopToolbar().addListener('selectclick', this.onSelectClick, this);
        this.getTopToolbar().addListener('addclick', this.onAddClick, this);
        this.getTopToolbar().addListener('editclick', this.onEditClick, this);
        this.getTopToolbar().addListener('deleteclick', this.onDeleteClick, this);
        this.getComponent(0).addListener('selectionchange',
                                         this.onSelectionChange, this);
        this.getComponent(0).addListener('dblclick', this.onDoubleClick, this);
        this.getComponent(0).addListener('datachange', this.onDataChange, this);
        this.getComponent(0).addListener('deleteselected', this.onDeleteSelected, this);
        if (this.enableDD) {
            this.getComponent(0).addListener('render', this.initializeDragZone, this);
            this.getComponent(0).addListener('render', this.initializeDropZone, this);
        }
        if (this.addWindow) {
            this.addWindow.addListener('selectiondone', this.onSelectionDone, this);
        }
        if (this.editWindow) {
            this.editWindow.addListener('editdone', this.onEditDone, this);
        }
    },

    onSelectClick: function (event, button) {
        var dataview = this.getComponent(0);
        this.fireEvent('selectiondone', dataview.getSelectedRecords());
        dataview.clearSelections();
    },

    onAddClick: function (event, button) {
        this.addWindow.show();
    },

    onEditClick: function (event, button) {
        var records = this.getComponent(0).getSelectedRecords();
        if (records.length > 1) {
            Ext.Msg.alert('Errore',
                          'La modifica multipla non è supportata.');
        } else {
            this.editWindow.setRecord(records[0]);
            this.editWindow.show();
        }
    },

    onDeleteClick: function () {
        var dataview = this.getComponent(0);
        dataview.deleteSelected(dataview);
    },

    onSelectionDone: function (records) {
        Ext.Msg.alert(
            'Seleziona Elementi',
            'La funzionalità non è implementata.'
        );
    },

    onSelectionChange: function (dataview, selections) {
        this.getTopToolbar().changeDisabledButtons(selections);
    },

    onDoubleClick: function (dataview, index, node, event) {
        this.editWindow.setRecord(dataview.getRecord(node));
        this.editWindow.show();
    },

    onDataChange: function () {
        this.fireEvent('datachange');
    },

    onEditDone: function () {
        this.editWindow.hide();
        this.getComponent(0).store.save();
    },
    
    onDeleteSelected: function () {
        Ext.Msg.alert(
            'Elimina Elementi',
            'La funzionalità non è implementata.'
        );
    },

    initializeDragZone: function (v) {
        v.dragZone = new Ext.dd.DragZone(v.getEl(), {
            // On entry into a target node, highlight that node.
            onDrag: function(e){ 
                v.clearSelections();
            },
            // On receipt of a mousedown event, see if it is within a draggable element.
            // Return a drag data object if so. The data object can contain arbitrary application
            // data, but it should also contain a DOM element in the ddel property to provide
            // a proxy to drag.
            getDragData: function(e) {
                var sourceEl = e.getTarget(v.itemSelector, 10);
                if (sourceEl) {
                    d = sourceEl.cloneNode(true);
                    var record = v.getRecord(sourceEl);
                    /*
                    var html = '<img src="{url}" width="100"/>';
                    var tpl = new Ext.DomHelper.createTemplate(html);
                    tpl.overwrite(d, {
                        url: record.data.url,
                    });
                    */
                    d.id = Ext.id();
                    return v.dragData = {
                        sourceEl: sourceEl,
                        repairXY: Ext.fly(sourceEl).getXY(),
                        ddel: d,
                        record: record,
                        store: v.getStore()
                    }
                }
            },
            // Provide coordinates for the proxy to slide back to on failed drag.
            // This is the original XY coordinates of the draggable element.
            getRepairXY: function() {
                return this.dragData.repairXY;
            }
        });
    },

    initializeDropZone: function (v) {
        v.dropZone = new Ext.dd.DropZone(v.getEl(), {
            // If the mouse is over a target node, return that node. This is
            // provided as the "target" parameter in all "onNodeXXXX" node event handling functions
            getTargetFromEvent: function(e) {
                return e.getTarget('div.thumb-wrap');
            },
            // On entry into a target node, highlight that node.
            onNodeEnter : function(target, dd, e, data){ 
                Ext.fly(target).addClass('dd-target-hover');
            },
            // On exit from a target node, unhighlight that node.
            onNodeOut : function(target, dd, e, data){ 
                Ext.fly(target).removeClass('dd-target-hover');
            },
            // While over a target node, return the default drop allowed class which
            // places a "tick" icon into the drag proxy.
            onNodeOver : function(target, dd, e, data){
                return Ext.dd.DropZone.prototype.dropAllowed;
            },
            // On node drop, we can interrogate the target node to find the underlying
            // application object that is the real target of the dragged data.
            // In this case, it is a Record in the GridPanel's Store.
            // We can use the data set up by the DragZone's getDragData method to read
            // any data we decided to attach.
            onNodeDrop : function(target, dd, e, data) {
                var record = v.getRecord(target);
                var store = v.getStore();
                var src = store.indexOf(data.record);
                var dst = store.indexOf(record);
                var weight = record.data.weight;
                var n = store.getCount();
                if (dst == 0) {
                    weight -= 1;
                } else if (dst == n - 1) {
                    weight += 1;
                } else if (src < dst) {
                    for (var i = n - 1; i > -1; i--) {
                        if (i > dst) {
                            var r = store.getAt(i);
                            r.set('weight', r.data.weight + 1);
                        }
                    }
                    weight += 1;
                } else if (src > dst) {
                    for (var i = 0; i < n; i++) {
                        if (i < dst) {
                            var r = store.getAt(i);
                            r.set('weight', r.data.weight - 1);
                        }
                    }
                    weight -= 1;
                }
                data.record.set('weight', weight);
                store.sort('weight', 'ASC');
                store.save();
                return true;
            }
        });
    }
});
Ext.reg('AybuBasePanel', Aybu.Base.Panel);

Aybu.Base.Window = Ext.extend(Ext.Window, {

    constructor: function (config) {
        config = config || {};
        Ext.applyIf(config, {
            title: 'Window Title',
            width: 270,
            height: Ext.getBody().getViewSize().height,
            layout: 'fit',
            closable: true,
            collapsible: true,
            expandOnShow: false,
            closeAction: 'hide',
            x: 0,
            y: 0,
            items: {
                xtype: 'AybuBasePanel'
            }
        });
        Aybu.Base.Window.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Aybu.Base.Window.superclass.initComponent.apply(this, arguments);
        this.addEvents('selectiondone');
        this.getComponent(0).addListener('datachange', this.onDataChange, this);
        this.getComponent(0).addListener('selectiondone', this.onSelectionDone, this);
    },

    onDataChange: function (store, batch, data) {
        // do stuff.
    },

    onSelectionDone: function (records) {
        this.fireEvent('selectiondone', records);
        this.hide();
    }
});
Ext.reg('AybuBaseWindow', Aybu.Base.Window);

Aybu.Base.EditPanel = Ext.extend(Ext.form.FormPanel, {

    constructor: function (config) {
        config = config || {};
        Ext.applyIf(config, {
            bodyStyle: 'padding: 15px',
            items: [],
            buttons: [
                {
                    text: "Salva",
                    handler: this.submit,
                    scope: this
                },
                {
                    text: "Esci",
                    handler: this.onExit,
                    scope: this
                }
            ]
        });
        Aybu.Base.EditPanel.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Aybu.Base.EditPanel.superclass.initComponent.apply(this, arguments);
        this.addEvents('editend');
    },

    getValues: function () {
        return null;
    },

    submit: function(button, event) {
        this.fireEvent('editend', this.getValues());
    },

    onExit: function(button, event) {
        this.fireEvent('editend', null);
    }
});
Ext.reg('AybuBaseEditPanel', Aybu.Base.EditPanel);

Aybu.Base.EditWindow = Ext.extend(Ext.Window, {

    constructor: function (config) {
        config = config || {};
        this.setRecord = config.setRecord || undefined;
        Ext.applyIf(config, {
            title: 'Edit Window Title',
            width: 320,
            height: Ext.getBody().getViewSize().height,
            layout: 'fit',
            closable: false,
            collapsible: false,
            expandOnShow: false,
            closeAction: 'hide',
            items: {
                xtype: 'AybuBaseEditPanel'
            },
            modal: true
        });
        Aybu.Base.EditWindow.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Aybu.Base.EditWindow.superclass.initComponent.apply(this, arguments);
        this.getComponent(0).addListener('editend', this.onEditEnd, this);
        this.addEvents('editdone');
    },

    onEditEnd: function (values) {
        this.fireEvent('editdone', values);
    }
});
Ext.reg('AybuBaseEditWindow', Aybu.Base.EditWindow);