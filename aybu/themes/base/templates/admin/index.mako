<%def name="js()">
	${parent.js()}
</%def>

<%def name="css()">
	${parent.css()}
</%def>

<%inherit file="/admin/admin_template.mako"/>

<h3>${_(u'Pannello di controllo')}</h3>

<p>
	${_(u'Questa sezione permette la gestione dei contenuti del sito.')}
</p>
<p>
	${_(u'Per modificare le singole pagine, è sufficiente navigare il sito fino alla pagina che si desidera cambiare, quindi premere sul bottone "Edit" appena sopra il contenuto.')}
</p>
