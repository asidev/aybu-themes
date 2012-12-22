<%def name="title()">
	${parent.title()}
	${self.title_part((_(u'Pannello di controllo'), request.route_path('admin', action='index')))}
</%def>

<%inherit file="/inner_layout.mako"/>

<%block name="left">
<div id="left">
	<%include file="/admin/admin_menu.mako" />
</div>
</%block>

${next.body()}
