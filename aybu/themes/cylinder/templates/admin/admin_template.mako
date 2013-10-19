
<%inherit file="/admin/base_admin_template.mako"/>

<div id="left">
	${next.body()}
</div>
<div id="right">
	<%include file="/admin/admin_menu.mako" />
</div>
<div class="clear">&nbsp;</div>
