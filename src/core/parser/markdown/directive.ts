import hastToMarkdown from 'mdast-util-to-markdown'
import visit from 'unist-util-visit'
import h from 'hastscript'
import { useMarkdownParser } from '.'

const toFrontMatter = (yamlString: string) => `---
${yamlString}
---`

const dataComponents = ['list']

export default function htmlDirectives() {
  const toMarkdownExtensions = this.data().toMarkdownExtensions
  const parser = useMarkdownParser()

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
    const { data } = parser.parseFrontMatter(toFrontMatter(markdown))

    return Object.keys(data).reduce((acc, key) => {
      acc[`:${key}`] = JSON.stringify(data[key])
      return acc
    }, {})
  }

  function visitDirective(node) {
    const data = node.data || (node.data = {})
    const hast = h(node.name, node.attributes)
    if (dataComponents.includes(node.name)) {
      hast.properties = {
        ...hast.properties,
        ...toData(node)
      }
    }
    data.hName = hast.tagName
    data.hProperties = hast.properties
  }

  return tree => {
    visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], visitDirective)
  }
}
