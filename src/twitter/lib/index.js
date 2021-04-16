const hasha = require('hasha')
const tweetHandler = require('./tweet-tag')
const { camelCase } = require('change-case')

const handlers = [['tweet', tweetHandler]]

async function enrichTag(node, tag, handler, documentData) {
  if (node.type === 'html' || (node.children && node.children[0] && node.children[0].type === 'html')) {
    const TAG_REGEX = new RegExp(`^\\s*<(${tag}|${camelCase(tag)})\\s+`, 'i')

    if (node.type !== 'html' && node.children[0].value.match(TAG_REGEX)) {
      node.children[0] = await enrichTag(node.children[0], tag, handler, documentData)
    }

    if (node.type === 'html' && node.value.match(TAG_REGEX)) {
      const result = await handler(node)
      if (result.node) {
        node = result.node
      }
      if (result.data) {
        const dataKey = `docus_${tag}_${hasha(JSON.stringify(result.data)).substr(0, 8)}`
        documentData[dataKey] = result.data
        node.value = node.value.replace(TAG_REGEX, `<$1 :data="${dataKey}" `)
      }
    }
  }
  return node
}

module.exports = () => {
  return async (tree, { data }) => {
    const modified = tree.children.map(async node => {
      return await handlers.reduce(async (node, [tag, handler]) => {
        const _node = await node
        return await enrichTag(_node, tag, handler, data)
      }, Promise.resolve(node))
    })
    tree.children = (await Promise.all(modified)).flat()
    return null
  }
}
