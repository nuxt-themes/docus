const logger = require('consola').withScope('@docus')
const { camelCase } = require('change-case')

const processTocDepth = ({ depth }) => {
  const tocTags = []

  if (depth < 1) {
    logger.info(`toc.depth is set as ${depth}. Table of contents of markdown files will be empty.`)
    return tocTags
  }

  if (depth > 6) {
    logger.info(`toc.depth is set as ${depth}. Table of contents of markdown files will include all the headings.`)
  }

  for (let i = 2; i <= depth; i++) {
    tocTags.push(`h${i}`)
  }

  return tocTags
}

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
      [name, options] = plugin
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
  options.toc.tags = processTocDepth(options.toc)
  options.remarkPlugins = processPlugins('remark', options, resolvePath)
  options.rehypePlugins = processPlugins('rehype', options, resolvePath)
}

export function flattenNodeText (node) {
  if (node.type === 'text') {
    return node.value
  } else {
    return node.children.reduce((text, child) => {
      return text.concat(flattenNodeText(child))
    }, '')
  }
}

export function flattenNode (node, maxDepth = 2, _depth = 0) {
  if (!Array.isArray(node.children) || _depth === maxDepth) {
    return [node]
  }
  return [
    node,
    ...node.children.reduce((acc, child) => acc.concat(flattenNode(child, maxDepth, _depth + 1)), [])
  ]
}
