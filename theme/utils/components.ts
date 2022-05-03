import { isHTMLTag } from '@vue/shared'
import { pascalCase } from 'scule'
import { useRuntimeConfig } from '#imports'

export const flattenComponents = (body, flattened = []) => {
  // Grab tags list from content config
  const {
    content: { tags = {} },
  } = useRuntimeConfig().public

  for (const node of body) {
    if (node?.tag) {
      let tag = node.tag

      if (Object.keys(tags).includes(tag)) tag = pascalCase(`prose-${tag}`)

      if (!isHTMLTag(tag) && !flattened.includes(tag)) flattened.push(pascalCase(tag))
    }

    if (node.children) flattenComponents(node.children, flattened)
  }

  return flattened
}
