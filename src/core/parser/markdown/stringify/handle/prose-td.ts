import flow from '../util/container-flow'

export default function td(node, _, context) {
  const exit = context.enter('td')
  const value = flow(node, context, '').replace('|', '\\|')

  exit()
  return value
}
