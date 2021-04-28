import { Node } from 'unist'
import { H } from 'mdast-util-to-hast'
import all from 'mdast-util-to-hast/lib/all'

export default function heading(h: H, node: Node) {
  return h(node, 'prose-h' + node.depth, all(h, node))
}
