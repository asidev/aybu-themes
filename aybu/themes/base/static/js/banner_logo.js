/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

jQuery(document).ready(function() {
	jQuery('#banner_logo').validate({
		rules : {
			banner_image: {
				accept : true
		    },
			logo_image: {
				accept : true
		    }
		}
	});
});
