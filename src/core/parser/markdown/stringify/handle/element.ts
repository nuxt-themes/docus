import flow from '../util/container-flow'

export default function list(node, _, context) {
  const exit = context.enter('list')
  const props = node.props
  // remove tag props
  delete props._tag

  const attrs = Object.keys(props)
    .sort()
    .map(key => {
      if (props[key] === null || typeof props[key] === 'undefined') {
        return ''
      }
      return props[key] === '' ? key : `${key}="${props[key]}"`
    })
    .join(' ')
  const value = `:::${node.tagName}{${attrs}}\n` + flow(node, context, '\n') + '\n:::'

  exit()
  return value
}
