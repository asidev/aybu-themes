<%page args="final_title, css, js" />

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="${c.lang.lang}">
	% if c.rendering_type=='dynamic':
	<meta name="description" content="${c.translation.meta_description}" />
	% endif
	% if c.rendering_type == 'dynamic' and c.translation.head_content:
	${h.literal(c.translation.head_content)}
	% elif not c.settings.head_info is None:
	${h.literal(c.settings.head_info)}
	% endif
	<%include file="/base/title.mako" args="final_title=final_title"/>
	<link rel="shortcut icon" href="/favicon.ico" type="image/icon" />
	${css()}
	${js()}
</head>
