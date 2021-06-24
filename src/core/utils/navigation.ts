import { pascalCase } from 'scule'
import { withoutTrailingSlash } from 'ufo'
import { useDB } from '../database'
import { useStorage } from '../storage'
import { NavItem } from '../../types/core'

/**
 * Find a link from a vue-router to path
 */
const findLink = (links: NavItem[], to: string) => links.find(link => link.to === to)

/**
 * Transform a page slug into natural language title
 */
const slugToTitle = title => title && title.replace(/-/g, ' ').split(' ').map(pascalCase).join(' ')

/**
 * Get navigation link for a page
 */
const getPageLink = (page: any): NavItem => {
  const slug = (page.slug || page.to).split('/').pop()

  const to = withoutTrailingSlash(page.to || `/${slug}`)

  const template =
    typeof page.template === 'string' ? { self: page.template, nested: `${page.template}-post` } : page.template

  const item: NavItem = {
    slug,
    to,
    page: !!page.dir,
    children: [],
    title: page.title || slugToTitle(to.split('/').pop()) || '',
    ...page.navigation
  }

  if (page.draft) {
    item.draft = true
  }

  if (page.icon) {
    item.icon = page.icon
  }

  if (template) {
    item.template = template.nested
  }

  // set `hidden = true` if navigation is disabled for the page
  if (page.navigation === false) {
    item.hidden = true
  }

  return item
}

/**
 * Fetch and update navigation with latest changes
 */
export async function updateNavigation(nuxt) {
  const defaultLocale = nuxt.options.i18n?.defaultLocale || 'en'
  const { query } = useDB()
  const { storage } = useStorage()
  // Get fields
  const fields = ['title', 'language', 'dir', 'navigation', 'slug', 'version', 'to', 'icon', 'description', 'template']
  const where: any = {
    // Fetch all
    // nav: { $ne: false }
  }
  if (nuxt.options.dev) {
    fields.push('draft')
  } else {
    where.draft = false
  }

  // Query pages
  const pages = await query('/pages', { deep: true }).where(where).only(fields).sortBy('position', 'asc').fetch()

  const languages: { [key: string]: any[] } = pages.reduce((map, page) => {
    const language = page.language || defaultLocale
    map[language] = map[language] || []
    map[language].push(page)
    return map
  }, {})

  const navigationArray = Object.entries(languages).map(([language, pages]) => {
    const body = createNav(pages)

    return [language, body]
  })

  const navigation = Object.fromEntries(navigationArray)

  await nuxt.callHook('docus:navigation', navigation)

  const tasks = Object.entries(navigation).map(async ([language, body]) => {
    await storage.setItem(`data:docus:navigation:${language}.json`, {
      body
    })
  })

  await Promise.all(tasks)
}

/**
 * Create NavItem array to be consumed from runtime plugin.
 */
function createNav(pages: any[]) {
  const links: NavItem[] = []

  // Add each page to navigation
  pages.forEach((_page: any) => {
    if (_page.slug.startsWith('_')) {
      return
    }

    const $page = getPageLink(_page)

    // To: '/docs/guide/hello.md' -> dirs: ['docs', 'guide']
    let dirs = $page.to.split('/').filter(_ => _)

    // Remove the file part (except if index.md)
    if (_page.slug !== '') dirs = dirs.slice(0, -1)

    if (!dirs.length) {
      return links.push($page)
    }

    let currentLinks = links
    let lastLink: NavItem

    dirs.forEach((dir: string, index: number) => {
      const to = '/' + dirs.slice(0, index + 1).join('/')

      // If children has been disabled (nav.children = false)
      if (!currentLinks) return

      let link: NavItem = findLink(currentLinks, to)

      if (!link) {
        link = getPageLink({
          slug: dir,
          to,
          shadow: true
        })

        currentLinks.push(link)
      }
      currentLinks = link.children
      lastLink = link
    })

    if (!currentLinks) return

    // If index page, merge also with parent for metadata
    if (!_page.slug) {
      if (dirs.length === 1) {
        $page.exclusive = $page.exclusive || false
      }

      mergeLinks(lastLink, $page)
    } else {
      // Push page
      currentLinks.push($page)
    }
  })

  return links
}

function mergeLinks(to: NavItem, from: NavItem) {
  Object.assign(to, from, {
    children: [...to.children, ...from.children]
  })
}
