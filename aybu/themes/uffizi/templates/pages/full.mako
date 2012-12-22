<%inherit file="/inner_layout.mako"/>

<%block name="left">
<div id="left">
	<%include file="/base/inner_menu.mako" />
	<%include file="/add_on/addthis.mako" />
	<%include file="/add_on/facebook.mako" args="width=275"/>
	<%include file="/add_on/twitter.mako" args="width=275" />
</div>
</%block>

<div id="editable_content">
	${h.literal(c.translation.content)}
</div>
