
% if c.rendering_type=='dynamic' and c.settings.twitter is not None and c.settings.twitter.strip()!='':
<% 
  if c.lang.lang.lower() == 'it':
    text = "Segui {}".format(c.settings.twitter)
  else:
    text = "Follow {}".format(c.settings.twitter)
%>
<a href="https://twitter.com/${c.settings.twitter}" class="twitter-follow-button" data-show-count="false" data-lang="${c.lang.lang.lower()}" data-show-screen-name="false">${text}</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
% endif