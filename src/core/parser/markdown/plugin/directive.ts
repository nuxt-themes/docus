import visit from 'unist-util-visit'
import h from 'hastscript'
import { useMarkdownParser } from '../'

const toFrontMatter = (yamlString: string) => `---
${yamlString}
---`

export default function htmlDirectives({ directives, dataComponents }) {
  const parser = useMarkdownParser()

  function toData(raw) {
    const lines = raw.split('\n')
    const markdown = lines.slice(1, lines.length - 1).join('\n')

    const { data } = parser.parseFrontMatter(toFrontMatter(markdown))

    return data
  }

  function bindData(data, pageData) {
    const enteries = Object.entries(data).map(([key, value]) => {
      if (key.startsWith(':')) {
        return [key, value]
      }
      if (typeof value === 'string') {
        return [pageData[value] ? `:${key}` : key, value]
      }
      return [`:${key}`, JSON.stringify(value)]
    })
    return Object.fromEntries(enteries)
  }

  return async (tree, { data: pageData, contents }) => {
    const jobs = []
    visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], visitor)

    function visitor(node) {
      const directive = directives[node.name]
      const data = node.data || (node.data = {})
      const hast = h(node.name, node.attributes)

      if (dataComponents.includes(node.name) || typeof node.attributes.yml !== 'undefined') {
        const { start, end } = node.position
        hast.properties = bindData(
          {
            ...hast.properties,
            ...toData(contents.substr(start.offset, end.offset - start.offset))
          },
          pageData
        )
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
