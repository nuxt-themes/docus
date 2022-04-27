import { isHTMLTag } from '@vue/shared'
import { pascalCase } from 'scule'

export const flattenComponents = (body, flattened = []) => {
  for (const node of body) {
    if (node?.tag) {
      let tag = node.tag

      if (isHTMLTag(tag))
        tag = pascalCase(`prose-${tag}`)

      if (!flattened.includes(tag))
        flattened.push(pascalCase(tag))
    }

    if (node.children)
      flattenComponents(node.children, flattened)
  }

  return flattened
}
