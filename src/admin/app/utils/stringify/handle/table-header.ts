import flow from '../util/container-flow'

export default function th(node, _, context) {
  const exit = context.enter('th')
  const value = flow(node, context, '')

  exit()
  return value
}
