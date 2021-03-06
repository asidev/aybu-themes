Ext.ns('Aybu.Banner');
Aybu.Banner.Window = Ext.extend(Aybu.Image.Window, {

    initComponent: function () {
        var config = {
            title:'Gestione Banner',
            items: {
                xtype: 'AybuImagePanel',
                tbar: {
                    xtype: 'AybuImageToolbar',
                    buttonsCfg: {
                        add: {
                            cfg: {
                                upload_config: {
                                    url: '/admin/banner'
                                }
                            }
                        }
                    }
                },
                items: {
                    xtype: 'AybuImageDataView',
                    emptyText: '<div class="plupload_emptytext"><span>Nessun banner disponibile.</span></div>',
                    tpl: new Ext.XTemplate(
                        '<tpl for=".">',
                        '<div class="thumb-wrap default_banner_{default}" id="{id}">',
                        '<div class="thumb">',
                        '<img src="{url}" alt="{name}" title="{name} - [{size_string}]">',
                        '</div>',
                        '<span class="name x-editable"><b>{short_name}</b></span></div>',
                        '</tpl>',
                        '<div class="x-clear"></div>'
                    ),
                    store: {
                        xtype: 'AybuBaseStore',
                        httpProxyUrl: '/admin/banner',
                        idProperty: 'id',
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
                            }
                        ]
                    }
                }
            }
        };
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        Aybu.Banner.Window.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('AybuBannerWindow', Aybu.Banner.Window);