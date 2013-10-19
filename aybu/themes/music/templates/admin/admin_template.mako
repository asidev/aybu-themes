
<%inherit file="/admin/base_admin_template.mako"/>
<div id="left">
	<div id="editable_content">
		${next.body()}
	</div>
</div>
<div id="right">
	<div id="admin_menu">
		<%include file="/admin/admin_menu.mako" />
	</div>
</div>
<div class="reset">&nbsp;</div>
