import normalize from 'mdurl/encode'
import { Node } from 'unist'
import { H } from 'mdast-util-to-hast'
import all from 'mdast-util-to-hast/lib/all'

export default function link(h: H, node: Node) {
  const props: any = {
    href: normalize(node.url)
  }

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title
  }

  return h(node, 'prose-a', props, all(h, node))
}
