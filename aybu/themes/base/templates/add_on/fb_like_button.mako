<%page args="width=150, show_faces='false', layout='button_count', stream='false', color='light'" />

% if c.rendering_type=='dynamic' and c.settings.facebook is not None and c.settings.facebook.strip()!='':
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/it_IT/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<div class="fb-like"
    data-href="${c.settings.facebook}"
    data-send="${stream}"
    data-layout="${layout}"
    data-width="${width}"
    data-show-faces="${show_faces}"
    data-colorscheme="${color}"></div>
% endif
