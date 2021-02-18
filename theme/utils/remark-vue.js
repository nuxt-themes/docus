const path = require('path')
const fs = require('fs')
const {
  parse
} = require('vue-docgen-api')

const directories = [
  path.resolve('./docs/components'),
  path.resolve('./components'),
  path.resolve(__dirname, '../components')
]

function fileName (file) {
  if (!file.match(/\.vue$/)) {
    return file + '.vue'
  }
  return file
}

function resolvePath (file) {
  file = fileName(file)
  if (fs.existsSync(path.resolve(file))) {
    return path.resolve(file)
  }
  for (const dir of directories) {
    if (fs.existsSync(path.join(dir, file))) {
      return path.join(dir, file)
    }
  }
  return null
}

async function modifyNode (node) {
  const match = node.value.match(/of=['"]([^'"]*)['"]/)
  if (!match) {
    // eslint-disable-next-line no-console
    console.error('Invalid component')
    return { type: 'html', value: '<!-- Invalid component -->' }
  }
  const componentFile = resolvePath(match[1])
  if (!componentFile) {
    // eslint-disable-next-line no-console
    console.error('Component not find. ' + match[1])
    return { type: 'html', value: '<!-- Invalid component -->' }
  }
  const docs = await parse(componentFile)
  node.value = node.value.replace(/^\s*<props\s+/, `<props json="${encodeURI(JSON.stringify(docs))}" `)
  return node
}

module.exports = () => {
  return async (tree, file) => {
    const TAG_REGEX = /^\s*<[p|P]rops\s+/
    const modified = tree.children.map(async (node, i) => {
      if (node.type === 'html' && node.value && node.value.match(TAG_REGEX)) {
        return await modifyNode(node)
      }
      if (node.children && node.children[0] && node.children[0].type === 'html' && node.children[0].value.match(TAG_REGEX)) {
        node.children[0] = await modifyNode(node.children[0])
      }
      return Promise.resolve(node)
    })
    tree.children = (await Promise.all(modified)).flat()
    return null
  }
}
