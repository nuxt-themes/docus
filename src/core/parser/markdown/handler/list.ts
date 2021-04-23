import wrap from 'mdast-util-to-hast/lib/wrap'
import { Node } from 'unist'
import { H } from 'mdast-util-to-hast'
import all from 'mdast-util-to-hast/lib/all'

export default function list(h: H, node: Node): Node {
  const props: any = {}
  const name = `prose-${node.ordered ? 'ol' : 'ul'}`
  let items
  let index = -1
  let length

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