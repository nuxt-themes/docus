import { tryRequire, logger } from '../../util'

const { camelCase } = require('change-case')

const processPlugins = (type, markdown) => {
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
      instance = instance || tryRequire(name)

      plugins.push({ instance, name, options })
    } catch (e) {
      logger.error(e.toString())
    }
  }

  return plugins
}

export const processOptions = options => {
  options.remarkPlugins = processPlugins('remark', options)
  options.rehypePlugins = processPlugins('rehype', options)
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
