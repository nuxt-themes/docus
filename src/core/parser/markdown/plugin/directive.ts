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

  function toData(node) {
    const markdown = toMarkdown(node)
      // fix issue with toMarkdown autolinker
      .replace(/<(https?:[^>]*)>/g, '$1')

    const { data } = parser.parseFrontMatter(toFrontMatter(markdown))

    return data
  }

  function bindData(data, pageData) {
    const enteries = Object.entries(data).map(([key, value]) => {
      if (key.startsWith(':')) {
        return [key, value]
      }
      if (typeof value === "string") {
        return [pageData[value] ? `:${key}` : key, value]
      }
      return [`:${key}`, JSON.stringify(value)]
    })
    return Object.fromEntries(enteries)
  }

  return async (tree, { data: pageData }) => {
    const jobs = []
    visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], visitor)

    function visitor(node) {
      const directive = directives[node.name]
      const data = node.data || (node.data = {})
      const hast = h(node.name, node.attributes)

      if (dataComponents.includes(node.name) || typeof node.attributes.yml !== "undefined") {
        hast.properties = bindData({
          ...hast.properties,
          ...toData(node)
        }, pageData)
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
