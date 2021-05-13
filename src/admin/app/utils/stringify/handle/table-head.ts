import repeat from 'repeat-string'
import flow from '../util/flat-container-flow'

export default function proseThead(node, _, context) {
  const exit = context.enter('proseThead')
  let value = flow(node, context, '')

  value += '\n'
  value += value
    .split('|')
    .map(part => (part.length ? ' ' + repeat('-', part.length - 2) + ' ' : ''))
    .join('|')

  exit()
  return value
}
