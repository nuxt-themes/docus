import flow from '../util/container-flow'

export default function element(node, _, context) {
  const props = node.attrs || node.props || {}
  const tagName = props._tag || ''

  // remove tag props
  delete props._tag

  const exit = context.enter('element')

  const attrs = Object.keys(props)
    .sort()
    .map(key => {
      if (props[key] === null || typeof props[key] === 'undefined') {
        return ''
      }
      if (props[key] === '') {
        return key
      }
      return `${key}="${props[key]}"`
    })
    .filter(Boolean)
    .join(' ')
  const value = `:::${tagName}{${attrs}}\n` + flow(node, context, '\n\n') + '\n:::'

  exit()
  return value
}
