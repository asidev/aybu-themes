<%page args="node, language, img_width=146, img_height=146" />

<ol id="MediaCollectionPage_${node.id}">
% for item in node.children:
<%
    translation = item.get_translation(language)
%>
<li id="MediaItemPage_${item.id}">
    <a href="${item.file.url}"
       title="${translation.title}"
       style="display:block; width:${img_width}px; height:${img_height}px; background: url('${item.file.url}') no-repeat center center; text-indent: -9000px; background-size:cover;">
        <img src="${item.file.thumbnails['thumb'].url}" alt="${translation.title}" />
    </a>
</li>
% endfor
<li class="reset"></li>
</ol>
