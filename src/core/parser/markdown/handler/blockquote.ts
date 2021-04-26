import wrap from 'mdast-util-to-hast/lib/wrap'
import all from 'mdast-util-to-hast/lib/all'

export default function blockquote(h, node) {
  return h(node, 'prose-blockquote', wrap(all(h, node), true))
}
