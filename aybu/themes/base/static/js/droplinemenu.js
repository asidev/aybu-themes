/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

var dropline_menu = {
	open_selected : true,
	open_menu_up : false,
	animate_time : {
		over : 0,
		out : 0
	}, //duration of slide in/ out animation, in milliseconds

	build : function(menu_selector) {
		jQuery(window).bind('load', function(){

			jQuery(menu_selector + ">li").each(function(i){
				var a = jQuery(this).find('a');
				new_width = a.outerWidth();
				jQuery(this).width(new_width + 10);
			});

			var headers = jQuery(menu_selector).find("ul").parent();
			headers.each(function(i){
				var sub_ul = jQuery(this).find('ul:eq(0)');
				new_width = sub_ul.outerWidth();
				if(new_width < jQuery(this).outerWidth()){
					new_width = jQuery(this).outerWidth();
				}
				sub_ul.width(new_width*2);
				if(dropline_menu.open_menu_up){
					sub_ul.css('top', '-' + (sub_ul.outerHeight()) + 'px' );
				}
				jQuery(this).hover(
					function(e){
						var displayed_ul = jQuery(menu_selector + ">li>a.active+ul");
						displayed_ul.addClass('displayed');
						var sub_ul = jQuery(this).find('ul:eq(0)');

						if(!sub_ul.hasClass('displayed')){
							jQuery(this).children('a').addClass('active coded');
							displayed_ul.slideUp(dropline_menu.animate_time.out);
							sub_ul.slideDown(dropline_menu.animate_time.over);
						}
						else if(!dropline_menu.open_selected) {
							sub_ul.slideDown(dropline_menu.animate_time.over);
						}
						displayed_ul.removeClass('displayed');
					},
					function(e){
						if(jQuery(this).children('a').hasClass('coded')){
							jQuery(this).children('a').removeClass('active coded');
						}
						var displayed_ul = jQuery(menu_selector + ">li>a.active+ul");
						displayed_ul.addClass('displayed');
						var sub_ul = jQuery(this).children("ul:eq(0)");
						sub_ul.slideUp(dropline_menu.animate_time.out);
						if(dropline_menu.open_selected){
							displayed_ul.slideDown(dropline_menu.animate_time.over);
						}
						displayed_ul.removeClass('displayed');
					}
				);
			});
			if (dropline_menu.open_selected) {
				jQuery(menu_selector + ">li>a.active+ul").slideDown(0);
			}
		});
	}
}