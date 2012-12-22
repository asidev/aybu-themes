/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

function cacheError(){
	alert('Errore nella richiesta.');
}

function cacheToggled(d){
	jQuery('#toggle_cache > p > strong').html(d.state);
	jQuery('#toggle_cache > form > fieldset > input').attr('value', d.command);
	if(d.purge_enabled){
		jQuery('#purge_cache').css('display','block');
	}else{
		jQuery('#purge_cache').css('display','none');
	}
}

function toggleCache(url) {
	jQuery.ajax({
		error : cacheError,
		success : cacheToggled,
		type : "POST",
		url : url
	});
	return false;
}

function cachePurged(d){
	if(d.success){
		alert('Cache Purged');
	}else{
		cacheError();
	}
}

function purgeCache(url) {
	jQuery.ajax({
		error : cacheError,
		success : cachePurged,
		type : "POST",
		url : url
	});
	return false;
}
