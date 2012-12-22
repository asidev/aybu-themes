<%page args="style=''" />

% if c.rendering_type=='dynamic' and c.settings.addthis is not None and c.settings.addthis.strip()!='':
<!-- AddThis Button BEGIN -->
<div id="addthisbox" class="addthis_toolbox addthis_default_style ${style}"
	% if c.settings.addthis_url is not None and c.settings.addthis_url.strip()!='':
	addthis:url="${c.settings.addthis_url}"
	% endif
	>
		<nobr><a class="addthis_button_facebook"></a>
		<a class="addthis_button_twitter"></a>
        <!--
		<a class="addthis_button_google_plusone"
		   % if style=="addthis_32x32_style":
		   g:plusone:size="standard"
		   % else:
		   g:plusone:size="medium"
		   % endif
		   g:plusone:count="false"></a>
        -->
		<a class="addthis_button_email"></a>
		<a class="addthis_button_rss"></a>
		<a class="addthis_button_compact"></a>
		<a class="addthis_counter addthis_bubble_style"></a></nobr>

</div>

<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=${c.settings.addthis}"></script>
<!-- AddThis Button END -->
% endif
