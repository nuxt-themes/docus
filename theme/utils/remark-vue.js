const propsHandler = require('./tag-handlers/props')

const handlers = [
  ['props', propsHandler]
]

async function enrichTag (node, tag, handler) {
  if (node.type === 'html' || (node.children && node.children[0] && node.children[0].type === 'html')) {
    const TAG_REGEX = new RegExp(`\\s*<${tag}\\s+`, 'i')
    let _node
    if (node.type === 'html' && node.value.match(TAG_REGEX)) {
      _node = node
    }
    if (node.type !== 'html' && node.children[0].value.match(TAG_REGEX)) {
      _node = node.children[0]
    }
    if (_node) {
      const data = await handler(_node)
      _node.value = _node.value.replace(TAG_REGEX, `<${tag} data="${encodeURI(JSON.stringify(data))}" `)
    }
  }
  return node
}

module.exports = () => {
  return async (tree, file) => {
    const modified = tree.children.map(async (node, i) => {
      return await handlers.reduce(async (node, [tag, handler]) => {
        return await enrichTag(node, tag, handler)
      }, node)
    })
    tree.children = (await Promise.all(modified)).flat()
    return null
  }
}
