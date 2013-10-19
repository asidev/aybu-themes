<%def name="css()">
	${parent.css()}
	${self.css_link('/css/full.css')}
</%def>

<%inherit file="/template.mako"/>

<div id="content">
	<div id="editable_content">
		${h.literal(c.translation.content)}
	</div>
</div>
