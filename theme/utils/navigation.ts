import type { NavItem } from '@nuxt/content/dist/runtime/types'

/**
 * Find first child link from a navigation node.
 */
export const findBottomLink = (link: NavItem) => {
  for (const child of link.children) {
    if (!child.children) return child.slug
  }

  for (const child of link.children) {
    const result = findBottomLink(child)
    if (result) return result
  }
}

/**
 * Find current navigation directory from a path.
 */
export const navFromPath = (path: string, tree: NavItem[]) => {
  for (const file of tree) {
    if (file.slug === path && !file.id) return file.children

    if (file.children) {
      const result = navFromPath(path, file.children)
      if (result) return result
    }
  }
}

/**
 * Find a navigation node from a path.
 */
export const fileFromPath = (path: string, tree: NavItem[]) => {
  for (const file of tree) {
    if (file.slug === path) return file

    if (file.children) {
      const result = fileFromPath(path, file.children)
      if (result) return result
    }
  }
}
