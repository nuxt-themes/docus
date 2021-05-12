import flow from '../util/flat-container-flow'

export default function tr(node, _, context) {
  const exit = context.enter('tr')
  const value = '| ' + flow(node, context, ' | ') + ' |'
  exit()
  return value
}
