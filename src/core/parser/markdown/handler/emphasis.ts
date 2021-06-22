import all from 'mdast-util-to-hast/lib/all'

export default function emphasis(h, node) {
  return h(node, 'prose-em', node.attributes, all(h, node))
}
