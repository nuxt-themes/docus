import all from 'mdast-util-to-hast/lib/all'

export default function heading (h, node) {
  return h(node, 'prose-h' + node.depth, all(h, node))
}