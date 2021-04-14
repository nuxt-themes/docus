import path from 'path'
import fs from 'fs'
import { parse } from 'vue-docgen-api'
import { DocusMakrdownNode } from 'src/types'
import { r } from '../../../util'

const directories = [
  path.resolve('./docs/components'), // components directory of project docs
  path.resolve('./components'), // components directory of project docs
  r('components') // components directory of Docus
]

function fileName(file) {
  if (!file.match(/\.vue$/)) {
    return file + '.vue'
  }
  return file
}

function resolvePath(file: string) {
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

export default async function propsHandler(node: DocusMakrdownNode) {
  const match = node.value.match(/of=['"]([^'"]*)['"]/)
  if (!match) {
    // eslint-disable-next-line no-console
    console.error('Invalid component')
    return {
      node: { type: 'html', value: '<!-- Invalid component -->' }
    }
  }
  const componentFile = resolvePath(match[1])
  if (!componentFile) {
    // eslint-disable-next-line no-console
    console.error('Component not find. ' + match[1])
    return {
      node: { type: 'html', value: '<!-- Invalid component -->' }
    }
  }
  return {
    data: await parse(componentFile)
  }
}
