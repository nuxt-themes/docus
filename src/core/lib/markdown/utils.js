const { camelCase } = require('change-case')

export const logger = require('consola').withScope('@docus')

const processPlugins = (type, markdown, resolvePath) => {
  const plugins = []

  for (const plugin of markdown[`${type}Plugins`]) {
    let name
    let options
    let instance

    if (typeof plugin === 'string') {
      name = plugin
      options = markdown[camelCase(name)]
    } else if (Array.isArray(plugin)) {
      ;[name, options] = plugin
    } else if (typeof plugin === 'object') {
      instance = plugin.instance
      name = plugin.name
      options = plugin.options
    }

    try {
      instance = instance || require(resolvePath(name))

      plugins.push({ instance, name, options })
    } catch (e) {
      logger.error(e.toString())
    }
  }

  return plugins
}

export const processOptions = (options, resolvePath) => {
  if (!resolvePath) {
    resolvePath = path => path
  }
  options.remarkPlugins = processPlugins('remark', options, resolvePath)
  options.rehypePlugins = processPlugins('rehype', options, resolvePath)
}

export function flattenNodeText(node) {
  if (node.type === 'text') {
    return node.value
  } else {
    return node.children.reduce((text, child) => {
      return text.concat(flattenNodeText(child))
    }, '')
  }
}

export function flattenNode(node, maxDepth = 2, _depth = 0) {
  if (!Array.isArray(node.children) || _depth === maxDepth) {
    return [node]
  }
  return [node, ...node.children.reduce((acc, child) => acc.concat(flattenNode(child, maxDepth, _depth + 1)), [])]
}
