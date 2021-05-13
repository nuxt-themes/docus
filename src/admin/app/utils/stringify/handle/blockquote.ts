import indentLines from 'mdast-util-to-markdown/lib/util/indent-lines'
import flow from '../util/flat-container-flow'

export default function blockquote(node, _, context) {
  const exit = context.enter('blockquote')
  const value = indentLines(flow(node, context, ''), map)
  exit()
  return value
}

function map(line, _, blank) {
  return '>' + (blank ? '' : ' ') + line
}
