<%inherit file="/template.mako"/>

<div id="content">
	<div id="editable_content">
		${h.literal(c.translation.content)}
	</div>
	<%include file="/add_on/addthis.mako" />
	<%include file="/add_on/disqus.mako" />
</div>
