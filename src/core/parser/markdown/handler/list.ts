import wrap from 'mdast-util-to-hast/lib/wrap'
import all from 'mdast-util-to-hast/lib/all'

export default function list(h, node) {
  var props: any = {}
  var name = `prose-${node.ordered ? 'ol' : 'ul'}`
  var items
  var index = -1
  var length

  if (typeof node.start === 'number' && node.start !== 1) {
    props.start = node.start
  }

  items = all(h, node)
  length = items.length

  // Like GitHub, add a class for custom styling.
  while (++index < length) {
    if (
      items[index].properties.className &&
      items[index].properties.className.indexOf('task-list-item') !== -1
    ) {
      props.className = ['contains-task-list']
      break
    }
  }

  return h(node, name, props, wrap(items, true))
}