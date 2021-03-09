const path = require('path')
const fs = require('fs')
const {
  parse
} = require('vue-docgen-api')

const directories = [
  path.resolve('./docs/components'), // components directory of project docs
  path.resolve('./components'), // components directory of project docs
  path.resolve(__dirname, '../../components') // components directory of Docus
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

module.exports = async function propsHandler (node) {
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
  return await parse(componentFile)
}
