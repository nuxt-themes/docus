import handlers from 'mdast-util-to-hast/lib/handlers'
import { paramCase } from 'change-case'
import { getTagName } from './utils'

export default function html(h, node) {
  const tagName = getTagName(node.value)
  // transform to kebab-case (useful for PascalCase vue components)
  if (tagName) {
    node.value = node.value.replace(tagName, paramCase(tagName))
  }

  return handlers.html(h, node)
}
