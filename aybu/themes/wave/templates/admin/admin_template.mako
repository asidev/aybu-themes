
<%inherit file="/admin/base_admin_template.mako"/>

<div id="left">
	<%include file="/admin/admin_menu.mako" />
</div>
<div id="right">
		${next.body()}
</div>
<div class="clear">&nbsp;</div>
