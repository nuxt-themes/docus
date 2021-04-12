const unified = require('unified')
const parse = require('rehype-parse')

function rehypeMinify() {
  function minifyAst(ast) {
    if (Array.isArray(ast)) {
      return ast.reduce((nodes, node) => {
        const n = minifyAst(node)
        // Empty new lines aren't required
        const isNoise = n === '\n' && nodes[nodes.length - 1] && nodes[nodes.length - 1].tag !== 'span'

        if (!isNoise) {
          nodes.push(n)
        }

        return nodes
      }, [])
    }
    // Handle the root ast
    if (!ast.tagName && ast.children) {
      return minifyAst(ast.children)
    }
    if (ast.type === 'text') {
      return ast.value
    }
    if (ast.type === 'element') {
      const node = { tag: ast.tagName }
      const children = ast.children && ast.children.length ? minifyAst(ast.children) : []

      if (ast.properties && Object.keys(ast.properties).length) {
        node.props = ast.properties
      }
      if (ast.data) {
        node.data = ast.data
      }
      if (children.length) {
        node.nodes = children
      }

      return node
    }

    throw new Error(`Unable to handle the following AST: ${JSON.stringify(ast, null, 2)}`)
  }
  this.Compiler = tree => minifyAst(tree)
}

let _processor
module.exports = async function parseHtml(file) {
  if (!_processor) {
    _processor = unified().use(parse).use(rehypeMinify).freeze()()
  }
  try {
    const { result } = await _processor.process(file)
    return result.pop()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`HTML to AST error: ${error}`)
    throw error
  }
}
