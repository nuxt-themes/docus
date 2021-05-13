import safe from 'mdast-util-to-markdown/lib/util/safe'
import flow from '../util/container-flow'

export default function text(node, _, context, safeOptions) {
  const leaf = {
    ...node,
    marks: undefined
  }
  const marks = node.marks || []
  if (marks.length) {
    const root = {
      content: []
    }
    let tree = root
    marks.forEach(mark => {
      const _node = {
        content: [],
        ...node,
        marks: undefined,
        ...mark
      }
      tree.content = tree.content || []
      tree.content.push(_node)
      tree = _node
    })
    tree.content.push(leaf)

    return flow(root, context, '\n')
  } else {
    return safe(context, node.text || node.value, safeOptions)
  }
}
