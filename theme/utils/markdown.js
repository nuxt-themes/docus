import marked from 'marked'

const renderer = new marked.Renderer()

renderer.link = function (href, title, text) {
  return title
    ? '<a target="_blank" rel="noopener" href="' + href + '" title="' + title + '">' + text + '</a>'
    : '<a target="_blank" rel="noopener" href="' + href + '">' + text + '</a>'
}

export function compile (markdown = '') {
  return marked(markdown, { renderer })
}
