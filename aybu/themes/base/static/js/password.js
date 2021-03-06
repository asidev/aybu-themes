/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

jQuery.extend(jQuery.validator.messages, {
	passwords_differ : "Passwords differ."
});

function add_validator() {
	jQuery.validator.addMethod("pw_confim", function(value, element) {
		var v = jQuery('#new_password').val();
		if(value != v){
			return false;
		}
		return true;
	}, jQuery.validator.messages.passwords_differ);
}

jQuery(document).ready(function() {

	add_validator();

	jQuery('#password').validate({
		rules : {
			old_password: {
				required : true
		    },
			new_password: {
				required : true,
		    	minlength : 6,
		    	maxlength : 16
		    },
			repeat_password: {
				required : true,
				pw_confim : true
		    }
		}
	});
});
