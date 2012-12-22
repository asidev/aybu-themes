<%page args="width=300, height=400, show_faces=True, border_color=None, stream=False, header=True" />

% if c.settings.facebook is not None and c.settings.facebook.strip()!='':
<div id="facebook">
	<script src="http://connect.facebook.net/${c.lang.lang}_${c.lang.country.upper()}/all.js#xfbml=1"></script>
	<fb:like-box href="${c.settings.facebook}"
		width="${width}" height="${height}" show_faces="${str(show_faces).lower()}"
		stream="${str(stream).lower()}" header="${str(header).lower()}"
		% if border_color:
		border_color="${border_color}"
		% endif
		>
	</fb:like-box>
</div>
% endif
