<%def name="css()">
	${parent.css()}
	${self.css_link('/css/news.css')}
</%def>

<%inherit file="/template.mako"/>

<div id="content_wrapper">
	<div id="left">
		<div id="news_menu">
			<%include file="/news/list.mako" />
		</div>
	</div>
	<div id="right">
		<div id="content">
			${next.body()}
		</div>
	</div>
	<div class="reset"></div>
</div>
