import u from 'unist-builder'

export default function inlineCode(h, node) {
  return h(node, 'prose-code-inline', [u('text', node.value.replace(/\r?\n|\r/g, ' '))])
}
