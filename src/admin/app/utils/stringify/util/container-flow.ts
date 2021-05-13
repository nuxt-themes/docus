import repeat from 'repeat-string'

export default function flow(parent, context, separator = '\n') {
  const children = parent.children || parent.content || []
  const results = []
  let index = -1
  let child

  while (++index < children.length) {
    child = children[index]

    results.push(context.handle(child, parent, context, { before: '\n', after: '\n' }))

    if (index + 1 < children.length) {
      results.push(between(child, children[index + 1]))
    }
  }

  return results.join('')

  function between(left, right) {
    let index = -1
    let result

    while (++index < context.join.length) {
      result = context.join[index](left, right, parent, context)

      if (result === true || result === 1) {
        break
      }

      if (typeof result === 'number') {
        return repeat('\n', 1 + Number(result))
      }

      if (result === false) {
        return separator + '<!---->' + separator
      }
    }

    if (isInline(left) && isInline(right)) return ''

    return separator
  }
}

function isInline(node) {
  return ['text', 'link'].includes(node.type)
}
