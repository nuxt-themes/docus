import flow from '../util/flat-container-flow'

export default function doc(node, _, context) {
  return flow(node, context, '\n\n')
}
