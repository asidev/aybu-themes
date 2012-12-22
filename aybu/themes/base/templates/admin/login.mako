<%def name="css()">
	${parent.css()}
	${self.css_link('/css/form.css')}
</%def>

<%def name="title()">
	${parent.title()}
	${self.title_part((_(u'Login'), request.route_path('login')))}
</%def>

<%inherit file="/inner_layout.mako"/>

<h2>${_('Area Riservata')}</h2>

<%
   messages = [message] if message else []
   messages.extend(request.session.pop_flash())
%>

% if messages:
<h3 class="error">
	% for msg in messages:
		${msg}<br />
	% endfor
</h3>
%endif

<form id="login_form" method="post" action="${request.route_path('login_post')}">
	<fieldset>
		<label for="username">${_('Username:')}</label>
		<input id="username" name="username" type="text" />
		<label for="password">${_('Password:')}</label>
		<input id="password" name="password" type="password" />

		<input name='submit' class="submit" id="submit" value="${_('Accedi')}"
		  title="${_('Accedi')}" type="submit" />
	</fieldset>
</form>
