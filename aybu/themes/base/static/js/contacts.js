/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */


jQuery.extend(jQuery.validator.messages, {
	sender_name : "Digits or special character are not valid.",
	phone : "Please insert a valid phone number."
});

function onSubmit(form) {
	var data = jQuery('#form').formSerialize();
	var url = jQuery("#form").attr('action');

	jQuery("#result").remove();
	jQuery("label[for=captcha].error").remove();

	jQuery.ajax({
		type: "POST",
		url: url,
		data: data,
		success: function(response) {
			jQuery('#form').before('<div id="result"><h4>' + response.message+ '</h4></div>');

			Recaptcha.reload ();

			if(response.success){
				jQuery('#result > h4').addClass('success');
				jQuery('#form').clearForm();
			} else{
				jQuery('#result > h4').addClass('error');
				for(var err in response.errors){
					if(err == 'captcha'){
						elem = jQuery('#recaptcha_widget_div');
					}else{
						elem = jQuery('input[name=' + err + ']');
					}
					elem.after('<label for="'+ err + '" generated="true" class="error">' + response.errors[err] + '</label>');
				}
			}

			var targetOffset = jQuery('#result').offset().top - 10
			jQuery('html, body').animate({scrollTop:targetOffset}, 1000);
		}
	});

}


function highlight_elements(element, errorClass) {
	/*
    jQuery(element).fadeOut(function() {
      jQuery(element).fadeIn()
    })
	*/
}

function onInvalid(form, validator) {
  /*
  jQuery(document).find("input.error").each(function () {
		alert(jQuery(this).offset().top);
  });
  */
}

function add_validator() {
	jQuery.validator.addMethod("sender_name", function(value, element) {
		var user = /[(0-9\@\*\(\)\[\]\+\.\,\/\?\:\;\"\`\~\\#\$\%\^\&\<\>)+]/;
		if (!value.match(user)) {
			return true;
		} else {
			return false;
		}
	}, jQuery.validator.messages.sender_name);

	jQuery.validator.addMethod("phone", function(value, element) {
		var phone = /^(\+){0,1}([0-9-()]|( ))+$/;
		if (value.match(phone)) {
			return true;
		} else {
			return false;
		}
	}, jQuery.validator.messages.phone);
}



jQuery(document).ready(function() {
	add_validator();
	jQuery('#form').validate({
		submitHandler: onSubmit,
		invalidHandler: onInvalid,
		highlight: highlight_elements,
		rules : {
			name: {
				required: true,
				sender_name: true,
				minlength: 2
		    },
			surname: {
				required: true,
				sender_name: true,
				minlength: 2
		    },
		    phone: {
		    	required: true,
		    	phone: true
		    },
		    message: {
				required: true,
				minlength: 10
		   	},
		    email: {
				required: true,
				email: true
		   	},
		    agreement: {
				required: true
		    },
			recaptcha_response_field: {
				required: true
		    }
		}
	});
});
