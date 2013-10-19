

<%def name="menu(tree, level, num_levels)">
	<% level = level + 1 %>
	% if len(tree.children) > 0 :
	<ul>
		% for i,node in enumerate(tree.children):
			<%
				if not node.enabled:
					continue

				classes = list()
				if c.node and node in c.node.path[1:]:
					classes.append('active')

				nodeinfo = node[c.lang]
				url = nodeinfo.url
				if not url:
					classes.append('no-link')

					if level == num_levels and len(node.pages) > 0:
						url = node.pages[0][c.lang].url
			%>
			<li>
				<a
					% if url:
					href="${url}"
					% endif

					% if len(classes) > 0:
					class="${' '.join(classes)}"
					% endif
					>

					${nodeinfo.label}

				</a>

				% if level < num_levels:
				${self.menu(node, level, num_levels)}
				% endif

				% if i < (len(tree.children)-1) and level==2:
				&nbsp;|&nbsp;
				% endif

			</li>
		% endfor
	</ul>
	% endif
</%def>

<% tree = c.menus[1] %>

${self.menu(tree, 0, c.settings.main_menu_levels)}
