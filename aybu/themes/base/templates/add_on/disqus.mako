% if c.rendering_type=='dynamic' and c.settings.disqus is not None and c.settings.disqus.strip()!='':
<!-- DISQUS BEGIN -->
<div>
	<div id="disqus_thread"></div>
	<script type="text/javascript">
		% if c.settings.debug == True:
		var disqus_developer = 1;
		% endif
		var disqus_shortname = '${c.settings.disqus}'; // required: replace example with your forum shortname
		var disqus_identifier = '${c.translation.id}';
		var disqus_url = '${request.host_url}${request.environ.get("PATH_INFO")}';

		/* * * DON'T EDIT BELOW THIS LINE * * */
		(function() {
			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
			dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		})();
	</script>
	<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
	<!--
	<a href="http://disqus.com" class="dsq-brlink">blog comments powered by <span class="logo-disqus">Disqus</span></a>
	-->
</div>
<!-- DISQUS END -->
% endif
