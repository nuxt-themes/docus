import phrasing from '../util/container-phrasing'

export default function paragraph(node, _, context) {
  const exit = context.enter('paragraph')
  const subexit = context.enter('phrasing')
  const value = phrasing(node, context, { before: '\n', after: '\n' })
  subexit()
  exit()
  return value
}
