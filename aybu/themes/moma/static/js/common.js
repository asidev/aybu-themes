/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

jQuery(document).ready(function(){
	jQuery("A[rel='external']").attr('target', '_blank');

	mains_li = jQuery("#menu > ul >li");
		mains_li.each(function(i){
			var cur_li = jQuery(this);
			cur_li.css('width', cur_li.width() + 'px');
	});

	jQuery(function(){
		jQuery('#menu ul').superfish();
	});

});
