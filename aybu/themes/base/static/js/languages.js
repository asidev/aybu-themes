/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

function toggle_lang(id) {

	var checkbox;
	var url;
	var checked;
	var action;

	checkbox = jQuery('#lang_' + id);
	checked = checkbox.is(':checked');
	action = (checked == true) ? "aggiungere" : "rimuovere";
	action = action + " la lingua " + jQuery("#lang_" + id + " + img").attr("title");
	url = (checked) ? "/admin/language/enable.html" : "/admin/language/disable.html";

	confirmed = confirm("Sei sicuro di voler " + action )

	if(confirmed) {
		jQuery.ajax({
			type: "POST",
			url: url,
			data: {
				"lang_id" : id
			},
			success: function(response) {
				alert(response.msg);
				if(!response.success) {
					checkbox.attr('checked', (!checked));
				} else {
					window.location.reload(true);
				}
			},
			error: function() {
				alert("Non è stato possibile " + action );
				checkbox.attr('checked', (!checked));
			}
		});

	} else {
		checked.attr('checked', (!checked));
	}
}
