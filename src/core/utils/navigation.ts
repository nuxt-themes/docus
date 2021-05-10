import { pascalCase } from 'scule'
import { withoutTrailingSlash } from 'ufo'
import { useDB } from '../database'
import { useStorage } from '../storage'
import { NavItem } from '../../types/core'

const findLink = (links: NavItem[], to: string) => links.find(link => link.to === to)
const slugToTitle = title => title && title.replace(/-/g, ' ').split(' ').map(pascalCase).join(' ')

const getPageLink = (page: any): NavItem => {
  const slug = (page.slug || page.to).split('/').pop()
  const to = withoutTrailingSlash(page.to || `/${slug}`)
  let navigation = typeof page.navigation === 'string' ? { slot: page.navigation } : page.navigation
  if (navigation !== false) {
    navigation = {
      title: page.title || slugToTitle(to.split('/').pop()) || '',
      slot: '',
      nested: true,
      ...navigation
    }
  }

  const template =
    typeof page.template === 'string' ? { self: page.template, nested: `${page.template}-post` } : page.template

  return {
    slug,
    to,
    title: page.title,
    draft: page.draft,
    template,
    meta: {
      icon: page.icon,
      description: page.description
    },
    navigation,
    children: []
  }
}

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
  const pages = await query('/page', { deep: true }).where(where).only(fields).sortBy('position', 'asc').fetch()

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

function createNav(pages: any[]) {
  const links: NavItem[] = []

  // Add each page to navigation
  pages.forEach((_page: any) => {
    // TODO: Ignore files directly from core
    if (_page.slug.startsWith('_')) {
      return
    }
    const $page = getPageLink(_page)

    // To: '/docs/guide/hello.md' -> dirs: ['docs', 'guide']
    let dirs = $page.to.split('/').filter(_ => _)

    // Remove the file part (except if index.md)
    if (_page.slug !== '') {
      dirs = dirs.slice(0, -1)
    }

    if (!dirs.length) {
      if ($page.navigation) {
        $page.navigation.slot = $page.navigation.slot || 'header'
      }
      return links.push($page)
    }

    let currentLinks = links
    let lastLink: NavItem

    dirs.forEach((dir: string, index: number) => {
      // If children has been disabled (nav.children = false)
      if (!currentLinks) return

      let link: NavItem = findLink(currentLinks, '/' + dirs.slice(0, index + 1).join('/'))

      if (!link) {
        link = getPageLink({
          slug: dir
        })
        currentLinks.push(link)
      }
      currentLinks = link.children
      lastLink = link
    })

    if (!currentLinks) return

    // If index page, merge also with parent for metadata
    if (!_page.slug) {
      if (dirs.length === 1 && $page.navigation) {
        $page.navigation.slot = $page.navigation.slot || 'header'
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
