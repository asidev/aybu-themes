/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */
function banner() {
	jQuery.getJSON('/admin/PageInfo/search', {url: document.URL}, function(data) {
		var page_id = data.dataset[0].node_id;
  		var p = jQuery(banner_selector).position();
		//FIXME: Global variables sucks! Use a function argument instead.
		var el = Ext.get(jQuery(banner_selector).attr('id'));
		var button = new Ext.Button({
		    text: 'Gestione Banner Pagina',
		    style: {
		    	position: 'absolute',
		    	zIndex: '100',
		        top: '' + p.top + 'px',
		        left: '' + p.left + 'px',
		    },
		    win: new Aybu.PageBanner.Window({page_id: page_id}),
		    handler: function () {
		        this.win.show();
		    },
		});
		button.render(el);
		button.hide();
		jQuery(banner_selector).mouseenter(function() {
			jQuery(banner_selector).css('opacity', '0.5');
			button.show();
		});
		jQuery(banner_selector).mouseleave(function() {
			jQuery(banner_selector).css('opacity', '1');
			button.hide();
		});
	});
}