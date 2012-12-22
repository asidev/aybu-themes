<%page args="width=300, height=400, shell_background='#CCCCCC', shell_color='#FFFFFF', tweets_background='#FFFFFF', tweets_color='#000000', tweets_links_color='#555555'" />

% if c.settings.twitter is not None and c.settings.twitter.strip()!='':
<div id="twitter_posts">
	<script src="http://widgets.twimg.com/j/2/widget.js"></script>
	<script>
		new TWTR.Widget({
			version : 2,
			type : 'profile',
			rpp : 4,
			interval : 6000,
			width : ${width},
			height : ${height},
			theme : {
				<%
					shell = dict(background=shell_background, color=shell_color)
				%>
				shell : {
					${h.literal(',\n'.join("%s : '%s'" % (k,v) for (k,v) in shell.items() if v))}
				},

				<%
					tweets = dict(background=tweets_background, color=tweets_color, links=tweets_links_color)
				%>
				tweets : {
					${h.literal(',\n'.join("%s : '%s'" % (k,v) for (k,v) in tweets.items() if v))}
				}
			},
			features: {
				scrollbar : false,
				loop : false,
				live : false,
				hashtags : true,
				timestamp : true,
				avatars : false,
				behavior : 'all'
			}
		}).render().setUser('${c.settings.twitter}').start();
	</script>
</div>
% endif
