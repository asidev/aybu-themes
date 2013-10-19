
<%inherit file="/admin/base_admin_template.mako"/>

<div id="left">
	<%include file="/admin/admin_menu.mako" />
</div>
<div id="right">
	<div id="content">
		${next.body()}
	</div>
</div>
<div class="reset">&nbsp;</div>
