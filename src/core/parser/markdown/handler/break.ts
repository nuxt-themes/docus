import u from 'unist-builder'

export default function hardBreak(h, node) {
  return [h(node, 'prose-br'), u('text', '\n')]
}
