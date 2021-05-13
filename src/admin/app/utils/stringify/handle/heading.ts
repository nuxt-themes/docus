import repeat from 'repeat-string'
import formatHeadingAsSetext from 'mdast-util-to-markdown/lib/util/format-heading-as-setext'
import phrasing from '../util/container-phrasing'

export default function heading(node, _, context) {
  const props = node.attrs || node.props || {}
  const rank = Math.max(Math.min(6, node.depth || props.level || 1), 1)
  let exit
  let subexit
  let value

  if (formatHeadingAsSetext(node, context)) {
    exit = context.enter('headingSetext')
    subexit = context.enter('phrasing')
    value = phrasing(node, context, { before: '\n', after: '\n' })
    subexit()
    exit()

    return (
      value +
      '\n' +
      repeat(
        rank === 1 ? '=' : '-',
        // The whole size…
        value.length -
          // Minus the position of the character after the last EOL (or
          // 0 if there is none)…
          (Math.max(value.lastIndexOf('\r'), value.lastIndexOf('\n')) + 1)
      )
    )
  }

  const sequence = repeat('#', rank)
  exit = context.enter('headingAtx')
  subexit = context.enter('phrasing')
  value = phrasing(node, context, { before: '# ', after: '\n' })
  value = value ? sequence + ' ' + value : sequence
  if (context.options.closeAtx) {
    value += ' ' + sequence
  }

  subexit()
  exit()

  return value
}
