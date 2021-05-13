import flow from '../util/container-flow'

export default function root(node, _, context) {
  return flow(node, context, '\n')
}
