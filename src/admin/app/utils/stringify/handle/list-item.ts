import repeat from 'repeat-string'
import checkBullet from 'mdast-util-to-markdown/lib/util/check-bullet'
import checkListItemIndent from 'mdast-util-to-markdown/lib/util/check-list-item-indent'
import indentLines from 'mdast-util-to-markdown/lib/util/indent-lines'
import flow from '../util/flat-container-flow'

export default function listItem(node, parent, context) {
  let bullet = checkBullet(context)
  const listItemIndent = checkListItemIndent(context)
  let size

  if (parent && parent.ordered) {
    bullet =
      (parent.start > -1 ? parent.start : 1) +
      (context.options.incrementListMarker === false ? 0 : parent.children.indexOf(node)) +
      '.'
  }

  size = bullet.length + 1

  if (listItemIndent === 'tab' || (listItemIndent === 'mixed' && ((parent && parent.spread) || node.spread))) {
    size = Math.ceil(size / 2) * 2
  }

  const exit = context.enter('listItem')
  const value = indentLines(flow(node, context, '\n'), map)
  exit()

  return value

  function map(line, index, blank) {
    if (index) {
      return (blank ? '' : repeat(' ', size)) + line
    }

    return (blank ? bullet : bullet + repeat(' ', size - bullet.length)) + line
  }
}
