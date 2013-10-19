<%def name="css()">
	${parent.css()}
	${self.css_link('/css/contacts_cylinder.css')}
</%def>

<%inherit file="/base/contacts_base_layout.mako"/>

<div id="editable_content">
	${h.literal(c.translation.content)}
</div>
<div id="contacts_form_content">
	<%include file="/base/contacts_form.mako" />
</div>
<div class="clear">&nbsp;</div>
