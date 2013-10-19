<%def name="js()">
	${parent.js()}
	<script type="text/javascript">
		RecaptchaOptions.theme = 'white';
	</script>
</%def>

<%inherit file="/base/contacts_base_layout.mako"/>

<%block name="left">
<div id="left">
	% if c.rendering_type == 'dynamic' and len(c.node.path[1].children)>0:
	<h3>${c.node.path[1][c.lang].title}</h3>
	% endif
	<%include file="/base/inner_menu.mako" />
	<div id="content">
		<div id="editable_content">
			${h.literal(c.translation.content)}
		</div>
	</div>
	<%include file="/add_on/facebook.mako" args="width=170"/>
	<%include file="/add_on/twitter.mako" args="width=170, shell_background='#333333', tweets_background='#000000', tweets_color='#FFFFFF', tweets_links_color='#C4313B'" />
	<%include file="/add_on/addthis.mako" />
</div>
</%block>


<%block name="right">
<div id="right">
	<div id="content">
		${self.body()}
	</div>
</div>
</%block>

<%include file="/base/contacts_form.mako" />
