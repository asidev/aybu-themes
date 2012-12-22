<%def name="css()">
	${parent.css()}
	${self.css_link('/css/form.css')}
</%def>

<%def name="js()">
	${parent.js()}

	% if c.settings.debug == True:
	${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.js')}
	${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/additional-methods.js')}
	${self.js_link('/js/password.js')}
	% else:
	${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js')}
	${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/additional-methods.min.js')}
	${self.js_link('/js/password.min.js')}
	% endif
	${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/localization/messages_it.js')}
</%def>

<%def name="title()">
	${parent.title()}
	${self.title_part((_(u'Cambio Password'), request.route_path('admin', action='password')))}
</%def>

<%inherit file="/admin/admin_template.mako"/>

<h3>${_(u'Cambio Password')}</h3>

<p>
	${_(u"Questa sezione permette di cambiare la tua password per l'accesso all'area di ammnistrazione del sito.")}
</p>

<div>
	%if result_message :
	%if success :
	<h4 class="success">
	%else:
	<h4 class="error">
	%endif
		${result_message}
	</h4>
	%endif

	<form id="password" method="post" action="${request.route_path('admin_post', action='password')}" name="password" >
		<fieldset>
			<label for="old_password">${_(u"Vecchia Password:")}</label>
			<input id="old_password" name="old_password" type="password" />
			% if errors['old_password']:
			<label for="old_password" class="error" generated="true">${errors['old_password']}</label>
			% endif

			<label for="new_password">${_(u"Nuova Password:")} </label>
			<input id="new_password" name="new_password" type="password" />

			<label for="repeat_password">${_(u"Ripeti Nuova Password:")}</label>
			<input id="repeat_password" name="repeat_password" type="password" />

			% if errors['repeat_password']:
			<label for="repeat_password" class="error" generated="true">${errors['repeat_password']}</label>
			% endif

			<input class="submit" id="submit" name="submitted"
				   value="${_(u'Invia')}" title="${_(u'Cambia la password')}" type="submit" />
		</fieldset>
	</form>
</div>
