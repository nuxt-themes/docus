import hastToMarkdown from 'mdast-util-to-markdown'
import matter from 'gray-matter'
import visit from 'unist-util-visit'
import h from 'hastscript'

export default function htmlDirectives() {
  const toMarkdownExtensions = this.data().toMarkdownExtensions

  function toMarkdown(node) {
    return node.children
      .map(child =>
        hastToMarkdown(child, {
          bullet: '-',
          extensions: toMarkdownExtensions
        })
      )
      .join('')
  }

  function toData(node) {
    const markdown = toMarkdown(node)
    const { data } = matter(`---\n${markdown}\n---`)
    return Object.keys(data).reduce((acc, key) => {
      acc[`:${key}`] = JSON.stringify(data[key])
      return acc
    }, {})
  }
  return transform
  function transform(tree) {
    visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], ondirective)
  }

  function ondirective(node) {
    const data = node.data || (node.data = {})
    const hast = h(node.name, node.attributes)
    if (node.name === 'list') {
      hast.properties = {
        ...hast.properties,
        ...toData(node)
      }
    }
    data.hName = `d-${hast.tagName}`
    data.hProperties = hast.properties
  }
}
