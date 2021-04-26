import all from 'mdast-util-to-hast/lib/all'

export default function strong(h, node) {
  return h(node, 'prose-strong', all(h, node))
}
