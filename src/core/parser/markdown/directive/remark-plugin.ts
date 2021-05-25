import visit from 'unist-util-visit'
import h from 'hastscript'
import { useMarkdownParser } from '..'

const toFrontMatter = (yamlString: string) => `---
${yamlString}
---`

export default function htmlDirectives({ directives }) {
  const parser = useMarkdownParser()

  function getNodeData(node) {
    if (!node.rawData) {
      return {}
    }

    const yaml = node.rawData
    const { data } = parser.parseFrontMatter(toFrontMatter(yaml))

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

  return async (tree, { data: pageData }) => {
    const jobs = []
    visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], visitor)

    function visitor(node) {
      const directive = directives[node.name]
      const data = node.data || (node.data = {})
      const hast = h(node.name, node.attributes)

      const nodeData = getNodeData(node)

      data.hName = hast.tagName
      data.hProperties = bindData(
        {
          ...hast.properties,
          ...nodeData
        },
        pageData
      )
      if (directive) {
        jobs.push(directive(node, pageData))
      }
    }

    await Promise.all(jobs)
    return tree
  }
}
