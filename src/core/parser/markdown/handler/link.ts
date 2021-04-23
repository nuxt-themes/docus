import normalize from 'mdurl/encode'
import all from 'mdast-util-to-hast/lib/all'

module.exports = link

export default function link(h, node) {
  const  props: any = {
    href: normalize(node.url)
  }

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title
  }

  return h(node, 'prose-a', props, all(h, node))
}