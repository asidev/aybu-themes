/*
 * Copyright © 2010 Asidev s.r.l. - www.asidev.com
 */

Ext.ns('imgmanager');

imgmanager.plup_add_btn = new Ext.ux.PluploadButton({
	text: 'Aggiungi',
    iconCls: 'silk-add',
    window_width: 380,
    window_height: 300,
    clearOnClose: true,
    window_title: 'Aggiungi immagini',
    upload_config: {

		url: urls.add,
		runtimes: 'gears,flash,silverlight,html5,browserplus,html4',
		multipart: true,
		multipart_params: { param1: 1, param2: 2 },
		max_file_size: '10mb',

		flash_swf_url : '/static/js/lib/plupload/plupload.flash.swf',
		silverlight_xap_url : '/static/js/lib/plupload/plupload.silverlight.xap',

		filters: [  {title : "Image files", extensions : "jpg,JPG,gif,GIF,png,PNG"} ],

		runtime_visible: false,

		addButtonCls: 'silk-add',
		uploadButtonCls: 'silk-arrow-up',
		cancelButtonCls: 'silk-stop',
		deleteButtonCls: 'silk-cross',

		addButtonText: 'Aggiungi',
		uploadButtonText: 'Upload',
		cancelButtonText: 'Termina upload',
		deleteButtonText: 'Rimuovi dalla coda',
		deleteSelectedText: '<b>selezionati</b>',
		deleteUploadedText: 'caricati',
		deleteAllText: 'tutti',

		statusQueuedText: 'In coda',
		statusUploadingText: 'Uploading ({0}%)',
		statusFailedText: '<span style="color: red">Fallito</span>',
		statusDoneText: '<span style="color: green">Ok</span>',

		statusInvalidSizeText: 'Le dimensioni del file sono oltre il massimo consentito',
		statusInvalidExtensionText: 'Tipo di file non valido',

		emptyText: '<div class="plupload_emptytext"><span>Coda vuota</span></div>',
		emptyDropText: '<div class="plupload_emptytext"><span>Trascina i file qui</span></div>',

		progressText: '{0}/{1} ({3} falliti) ({5}/s)',

		listeners: {
			beforestart: function(uploadpanel) {
			},
			uploadstarted: function(uploadpanel) {

			},
			uploadcomplete: function(uploadpanel, success, failures) {
				if (success.length)
					imgmanager.image_store.reload();
			}
    	}
  }
});
