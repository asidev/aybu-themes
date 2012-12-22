Ext.ns('Aybu.Background');
Aybu.Background.Panel = Ext.extend(Aybu.Image.Panel, {

    initComponent: function () {
        var background_url = '/admin/background';
        var config = {
            title:'Gestione Sfondo',
            xtype: 'AybuImagePanel',
            enableDD: true,
            tbar: {
                xtype: 'AybuImageToolbar',
                buttonsCfg: {
                    select: false,
                    add: {
                        cfg: {
                            upload_config: {
                                url: background_url
                            }
                        }
                    },
                    edit: false
                }
            },
            items: {
                xtype: 'AybuImageDataView',
                emptyText: '<div class="plupload_emptytext"><span>Nessuno sfondo disponibile.</span></div>',
                tpl: new Ext.XTemplate(
                    '<tpl for=".">',
                    '<div class="thumb-wrap default_{default}" id="{id}">',
                    '<div class="thumb">',
                    '<img src="{url}" alt="{name}" title="{name} - [{size_string}]">',
                    '</div>',
                    '<span class="name x-editable"><b>{short_name}</b></span></div>',
                    '</tpl>',
                    '<div class="x-clear"></div>'
                ),
                plugins: [
                    new Ext.DataView.LabelEditor({dataIndex: 'name'})
                ],
                store: {
                    xtype: 'AybuBaseStore',
                    httpProxyUrl: background_url,
                    idProperty: 'id',
                    autoSave: true,
                    fields: [
                        {
                            name: 'id',
                            type: 'int'
                        },
                        'name',
                        'url',
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
                        },
                        {
                            name: 'default',
                            type: 'boolean'
                        },
                        {
                            name: 'weight',
                            type: 'int'
                        },
                    ],
                    sortInfo: {
                        field: 'weight',
                        direction: 'ASC'
                    }
                }
            }
        };
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        Aybu.Background.Panel.superclass.initComponent.apply(this, arguments);
    },

    onUploadSuccessful: function () {
        Aybu.Background.Panel.superclass.onUploadSuccessful.call(this);
        this.disable();
        window.location.reload(true);
    },

    onDeleteSelected: function () {
        this.disable();
        window.location.reload(true);
    },

    onDataChange: function () {
        jQuery.vegas('stop');
        var backgrounds = [];
        var store = this.getComponent(0).getStore();
        var n = store.getCount();
        for (var i = 0; i < n; i++) {
            var record = store.getAt(i);
            backgrounds.push({ src: record.data.url, fade: 2500})
        }
        jQuery.vegas('slideshow', {
                delay: 10000,
                preload: true,
                backgrounds: backgrounds,
            })('overlay');
    },
});
Ext.reg('AybuBackgroundPanel', Aybu.Background.Panel);