<%def name="css()">
	${parent.css()}
	${self.css_link('/js/lib/jquery/lightbox/jquery.lightbox.css')}
	${self.css_link('/css/mediacollectionpage.css')}
</%def>
<%def name="js()">
	${parent.js()}
% if c.settings.debug == True:
    ${self.js_link('/js/lib/jquery/lightbox/jquery.lightbox.js')}
% else:
    ${self.js_link('/js/lib/jquery/lightbox/jquery.lightbox.min.js')}
% endif
<script type="text/javascript">
% if c.user:
Ext.ns('Aybu.MediaCollection.MediaItemPage');
var collectionSelector = '#MediaCollectionPage_${c.translation.node.id}';
var config = {
    collectionSelector: collectionSelector,
    lightBoxSelector: collectionSelector + ' > li > a'
};
Ext.onReady(
    function () {
    	Aybu.MediaCollection.MediaItemPage.window = new Aybu.MediaCollection.MediaItemPage.Window(config);
        item = Ext.get('mediacollectionpage_children');
        button = new Ext.Button({
            text: 'Gestione Galleria',
            style: {
                marginTop: '10px',
            },
            handler: function () {
                Aybu.MediaCollection.MediaItemPage.window.show();
            },
        });
        button.render(item.parent, 'mediacollectionpage_children');
        jQuery(config.lightBoxSelector).lightBox();
    }
);
% else:
jQuery(document).ready(function () {
	jQuery('#MediaCollectionPage_${c.translation.node.id} > li > a').lightBox();
});
% endif
</script>
</%def>
<%inherit file="/inner_layout.mako"/>
<div id="editable_content">
	${h.literal(c.translation.content)}
</div>
<div id="mediacollectionpage_children">
<%include file="/plugins/mediacollection/mediacollectionpage.mako" args="node=c.translation.node, language=c.translation.lang"/>
</div>
