<%def name="css()">
	${parent.css()}
	${self.css_link('/css/form.css')}
	${self.css_link('/css/contacts.css')}
</%def>

<%def name="js()">
	${parent.js()}

	% if c.settings.debug == True:
	${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.js')}
	${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/additional-methods.js')}
	${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/localization/messages_it.js')}
	${self.js_link('/js/lib/jquery/jquery.form.js')}
	${self.js_link('/js/contacts.js')}
	% else:
	${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js')}
	${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/additional-methods.min.js')}
	${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/localization/messages_it.js')}
	${self.js_link('/js/lib/jquery/jquery.form.min.js')}
	${self.js_link('/js/contacts.min.js')}
	% endif
	<script type="text/javascript">
		var RecaptchaOptions = {
			% if c.lang.lang == 'it':
			custom_translations : {
				instructions_visual : "Scrivi le due parole:",
				instructions_audio : "Trascrivi ci\u00f2 che senti:",
				play_again : "Riascolta la traccia audio",
				cant_hear_this : "Scarica la traccia in formato MP3",
				visual_challenge : "Modalit\u00e0 visiva",
				audio_challenge : "Modalit\u00e0 auditiva",
				refresh_btn : "Chiedi due nuove parole",
				help_btn : "Aiuto",
				incorrect_try_again : "Scorretto. Riprova."
			},
			% endif
			lang : '${c.lang.lang}',
			theme : 'white'
		};
	</script>
</%def>

<%inherit file="/inner_layout.mako"/>

${next.body()}
