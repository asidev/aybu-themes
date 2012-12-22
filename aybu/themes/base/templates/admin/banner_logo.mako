<%def name="css()">
	${parent.css()}
	${self.css_link('/css/form.css')}
	${self.css_link('/css/banner_logo.css')}
</%def>

<%def name="js()">
	${parent.js()}
	% if c.settings.debug == True:
		${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.js')}
		${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/additional-methods.js')}
		${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/localization/messages_it.js')}
		${self.js_link('/js/banner_logo.js')}
	% else:
		${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js')}
		${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/additional-methods.min.js')}
		${self.js_link('http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/localization/messages_it.js')}
		${self.js_link('/js/banner_logo.min.js')}
	% endif
</%def>

<%def name="title()">
	${parent.title()}
	${self.title_part((_(u'Gestione Banner & Logo'),request.route_path('admin', action='banner_logo')))}
</%def>

<%inherit file="/admin/admin_template.mako"/>

<h3>${_(u'Gestione Banner & Logo')}</h3>

<p>
	${_(u"Questa sezione permette di inserire il proprio logo, cambiare il banner presente in testata ed inserire il testo per il piè di pagina")}
</p>

<div>

	<form id="banner_logo" method="post" action="${request.route_path('banner_logo')}"
		  enctype="multipart/form-data">

		<fieldset>

			<div>
				<label for="banner_image">
					${_(u"Carica l'immagine per il banner")}
				</label>
				<p class="size">
					${_(u"Attenzione l'immagine verrà ridimenzionata a %sx%s px." % (c.settings.banner_width, c.settings.banner_height))}
				</p>
				<p class="size">
					${_(u"Assicurarsi di inserire un'immagine che abbia le adeguate proporzioni perchè non subisca distorsioni.")}
				</p>
				<input type="file" id="banner_image" name="banner_image" />
				% if errors['banner']:
				<label for="banner_image" class="error" generated="true">
					${errors['banner']}
				</label>
				% endif
				% if messages['banner']:
				<label for="banner_image" class="success" generated="true">
					${messages['banner']}
				</label>
				% endif
			</div>

			<div class="remove">
				<label for="remove_banner">
					${_(u"Rimuovi il banner")}
				</label>
				<input type="checkbox" id="remove_banner" name="remove_banner" />
				% if errors['remove_banner']:
				<label for="remove_banner" class="error" generated="true">
					${errors['remove_banner']}
				</label>
				% endif
				% if messages['remove_banner']:
				<label for="remove_banner" class="success" generated="true">
					${messages['remove_banner']}
				</label>
				% endif
			</div>

			<div>
				<label for="logo_image">${_(u"Carica l'immagine del logo")}</label>
				<p class="size">
					${_(u"Attenzione l'immagine verrà ridimenzionata a %sx%s px." % (c.settings.logo_width, c.settings.logo_height))}
				</p>
				<p class="size">
					${_(u"Assicurarsi di inserire un'immagine che abbia le adeguate proporzioni perchè non subisca distorsioni.")}
				</p>
				<input type="file" id="logo_image" name="logo_image"/>
				% if errors['logo']:
				<label for="logo_image" class="error" generated="true">
					${errors['logo']}
				</label>
				% endif
				% if messages['logo']:
				<label for="logo_image" class="success" generated="true">
					${messages['logo']}
				</label>
				% endif
			</div>

			<div class="remove">
				<label for="remove_logo">
					${_(u"Rimuovi il logo")}
				</label>
				<input type="checkbox" id="remove_logo" name="remove_logo" />
				% if errors['remove_logo']:
				<label for="remove_logo" class="error" generated="true">
					${errors['remove_logo']}
				</label>
				% endif
				% if messages['remove_logo']:
				<label for="remove_logo" class="success" generated="true">
					${messages['remove_logo']}
				</label>
				% endif
			</div>

			<input class="submit" id="submit" name="submitted" type="submit"
				   value="${_(u'Salva')}" title="${_(u'Salva Immagini')}" />

		</fieldset>
	</form>

</div>
