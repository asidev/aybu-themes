Ext.ns('Aybu.PageBanner');
Aybu.PageBanner.Window = Ext.extend(Aybu.Base.Window, {

    constructor: function (config) {
        this.page_id = config.page_id;
        Aybu.PageBanner.Window.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        var config = {
            title:'Gestione Banner Pagina',
            width: 180,
            items: {
                xtype: 'AybuBasePanel',
                id: 'images-view',
                enableDD: true,
                tbar: {
                    buttonsCfg: {
                        add: true,
                        delete_: true
                    },

                    changeDisabledButtons: function (selections) {
                        if (selections.length) {
                            this.getComponent('deleteButton').setDisabled(false);
                        } else {
                            this.getComponent('deleteButton').setDisabled(true);
                        }
                    }
                },
                items: {
                    xtype: 'AybuBaseDataView',
                    emptyText: '<div class="plupload_emptytext"><span>Nessun banner di pagina.</span></div>',
                    tpl: new Ext.XTemplate(
                        '<tpl for=".">',
                        '<tpl for="banner">',
                        '<div class="thumb-wrap default_banner_{default}" id="{id}">',
                        '<div class="thumb">',
                        '<img src="{url}" alt="{name}" title="{name}">',
                        '</div>',
                        '<span class="name x-editable"><b>{short_name}</b></span></div>',
                        '</tpl>',
                        '</tpl>',
                        '<div class="x-clear"></div>'
                    ),
                    store: {
                        xtype: 'AybuBaseStore',
                        httpProxyUrl: '/admin/pagebanner/' + this.page_id + '',
                        fields: [
                            'page',
                            'banner',
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
                addWindow: new Aybu.Banner.Window(),
                onSelectionDone: function (records) {
                    var dataview = this.getComponent(0);
                    var store = dataview.getStore();
                    var items = [];
                    for (i = 0; i < records.length; i++) {
                        var item = new store.recordType({
                            page: this.page_id,
                            banner: {
                                id: records[i].data.id,
                                name: records[i].data.name,
                                url: records[i].data.url
                            }
                        });
                        items.push(item);
                    }
                    store.add(items);
                    store.save();
                }
            }
        };
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        Aybu.PageBanner.Window.superclass.initComponent.apply(this, arguments);
    },

    onDataChange: function (store, batch, data) {
        var panel = this.getComponent(0);
        var dataview = panel.getComponent(0);
        var store = dataview.getStore();
        var records = store.getRange();
        var settings = jQuery(jQuery.aybu.pageBannerSelector).bgStretcher.settings;
        settings.images = [];
        for (var i = 0; i < records.length; i++) {
            var url = records[i].data.banner.url;
            settings.images.push(url);
        }
        jQuery(jQuery.aybu.pageBannerSelector).bgStretcher.sliderDestroy();
        jQuery(jQuery.aybu.pageBannerSelector).bgStretcher(settings);
    }
});
Ext.reg('AybuPageBannerWindow', Aybu.PageBanner.Window);
