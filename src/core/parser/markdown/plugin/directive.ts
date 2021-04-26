import hastToMarkdown from 'mdast-util-to-markdown'
import visit from 'unist-util-visit'
import h from 'hastscript'
import { useMarkdownParser } from '../'

const toFrontMatter = (yamlString: string) => `---
${yamlString}
---`

export default function htmlDirectives({ directives, dataComponents }) {
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

  function toData(node, pageData) {
    const markdown = toMarkdown(node)
    const { data } = parser.parseFrontMatter(toFrontMatter(markdown))

    return Object.entries(data).reduce((acc, [key, value]) => {
      acc[`:${key}`] = typeof value === 'string' && pageData[value] ? value : JSON.stringify(value)
      return acc
    }, {})
  }

  return async (tree, { data: pageData }) => {
    const jobs = []
    visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], visitor)

    function visitor(node) {
      const directive = directives[node.name]
      const data = node.data || (node.data = {})
      const hast = h(node.name, node.attributes)

      if (dataComponents.includes(node.name) || typeof node.attributes.yml !== 'undefined') {
        hast.properties = {
          ...hast.properties,
          ...toData(node, pageData)
        }
      }

      data.hName = hast.tagName
      data.hProperties = hast.properties

      if (directive) {
        jobs.push(directive(node, pageData))
      }
    }

    await Promise.all(jobs)
    return tree
  }
}
