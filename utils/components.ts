import { isHTMLTag } from '@vue/shared'

export const flattenComponents = (body, flattened = []) => {
  for (const node of body) {
    if (node?.tag) {
      let tag = node.tag

      if (isHTMLTag(node.tag))
        tag = `prose-${node.tag}`

      if (!flattened.includes(tag))
        flattened.push(tag)
    }

    if (node.children)
      flattenComponents(node.children, flattened)
  }

  return flattened
}
