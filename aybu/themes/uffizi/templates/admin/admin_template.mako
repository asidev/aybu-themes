<%def name="title()">
	${parent.title()}
</%def>

<%def name="set_editable()">
	## don't want tinymce to kick in
	<% self.editable = False %>
</%def>

<%inherit file="/inner_layout.mako"/>

<%block name="left">
<div id="left">
	<%include file="/admin/admin_menu.mako" />
</div>
</%block>

${next.body()}
