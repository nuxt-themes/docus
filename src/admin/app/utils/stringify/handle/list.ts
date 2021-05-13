import flow from '../util/flat-container-flow'

export default function list(node, _, context) {
  const exit = context.enter('list')
  const value = flow(node, context, '\n')
  exit()
  return value
}
