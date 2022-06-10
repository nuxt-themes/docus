import type { NavItem } from '@nuxt/content/dist/runtime/types'

/**
 * Find first child link from a navigation node.
 */
const findBottomLink = (link: NavItem) => {
  if (!link.children) return link._path

  for (const child of link?.children || []) {
    const result = findBottomLink(child)
    if (result) return result
  }
}

/**
 * Find current navigation directory from a path.
 */
const navFromPath = (path: string, tree: NavItem[]) => {
  for (const file of tree) {
    if (file._path === path && !file._id) return file.children

    if (file.children) {
      const result = navFromPath(path, file.children)
      if (result) return result
    }
  }
}

/**
 * Find a navigation node from a path.
 */
const fileFromPath = (path: string, tree: NavItem[]) => {
  for (const file of tree) {
    if (file._path === path) return file

    if (file.children) {
      const result = fileFromPath(path, file.children)
      if (result) return result
    }
  }
}

/**
 * Find a nav field node from a path.
 */
const navKeyFromPath = (path: string, key: string, tree: NavItem[]) => {
  let value
  const goDeep = (path: string, tree: NavItem[]) => {
    for (const file of tree) {
      if (path.startsWith(file._path) && file[key]) {
        value = file[key]
      }
      if (file._path === path) return
      if (file.children) {
        goDeep(path, file.children)
      }
    }
  }
  goDeep(path, tree)
  return value
}

export const useDocusHelpers = () => {
  return {
    findBottomLink,
    navFromPath,
    fileFromPath,
    navKeyFromPath,
  }
}
