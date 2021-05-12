import repeat from 'repeat-string'
import streak from 'longest-streak'
import formatCodeAsIndented from 'mdast-util-to-markdown/lib/util/format-code-as-indented'
import checkFence from 'mdast-util-to-markdown/lib/util/check-fence'
import indentLines from 'mdast-util-to-markdown/lib/util/indent-lines'
import safe from 'mdast-util-to-markdown/lib/util/safe'

export default function code(node, _, context) {
  const marker = checkFence(context)
  const raw = node.value || ''
  const suffix = marker === '`' ? 'GraveAccent' : 'Tilde'
  let value
  let sequence
  let exit
  let subexit

  if (formatCodeAsIndented(node, context)) {
    exit = context.enter('codeIndented')
    value = indentLines(raw, map)
  } else {
    sequence = repeat(marker, Math.max(streak(raw, marker) + 1, 3))
    exit = context.enter('codeFenced')
    value = sequence

    if (node.props.language) {
      subexit = context.enter('codeFencedLang' + suffix)
      value += safe(context, node.props.language, {
        before: '`',
        after: ' ',
        encode: ['`']
      })
      subexit()
    }

    if (node.props.title) {
      subexit = context.enter('codeFencedTitle' + suffix)
      value += ' [' + safe(context, node.props.title, {}) + ']'
      subexit()
    }

    value += '\n'

    if (raw) {
      value += raw
    }

    value += sequence
  }

  exit()
  return value
}

function map(line, _, blank) {
  return (blank ? '' : '    ') + line
}
