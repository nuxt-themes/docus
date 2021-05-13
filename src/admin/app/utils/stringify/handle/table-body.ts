import flow from '../util/flat-container-flow'

export default function proseTbody(node, _, context) {
  const exit = context.enter('proseTbody')
  const value = flow(node, context, '\n')
  exit()
  return value
}
