<%inherit file="/template.mako"/>

<%block name="content_wrapper">
<div id="content_wrapper">
	<%block name="left">
	<div id="left">
		<%include file="/base/inner_menu.mako" />
		<%include file="/add_on/addthis.mako" />
		<%include file="/add_on/facebook.mako" args="width=275"/>
		<%include file="/add_on/twitter.mako" args="width=275" />
	</div>
	</%block>
	<%block name="right">
	<div id="right">
		<div id="content">
			${next.body()}
		</div>
		<%include file="/add_on/disqus.mako" />
	</div>
	</%block>
	<div class="reset"></div>
</div>
</%block>
