/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

$(document).ready(function(){
	$("A[rel='external']").attr('target', '_blank');

	dropline_menu.open_selected = false;
	dropline_menu.build("#menu > ul");
});
