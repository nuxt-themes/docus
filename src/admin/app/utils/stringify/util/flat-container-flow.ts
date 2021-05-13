export default function flow(parent, context, separator = '\n') {
  const children = parent.children || parent.content || []
  const results = []
  let index = -1
  let child

  while (++index < children.length) {
    child = children[index]

    results.push(context.handle(child, parent, context, { before: '\n', after: '\n' }))
  }

  return results.filter(value => value !== '\n').join(separator)
}
