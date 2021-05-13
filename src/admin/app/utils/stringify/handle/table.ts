import flow from '../util/flat-container-flow'

export default function table(node, _, context) {
  const exit = context.enter('table')
  const value = flow(node, context, '\n')
  exit()
  return value
}
