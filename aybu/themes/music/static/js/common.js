/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

$(document).ready(function(){
	$("A[rel='external']").attr('target', '_blank');

	dropline_menu.build("#main_menu > ul");
});
