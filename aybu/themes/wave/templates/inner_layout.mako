
<%inherit file="/template.mako"/>


<div id="left">
	<%include file="/base/inner_menu.mako" />
</div>
<div id="right">
	<div id="content">
		${next.body()}
	</div>
</div>
<div class="clear">&nbsp;</div>
