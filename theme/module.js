import { resolve, join, relative } from 'path'
import defu from 'defu'
import gracefulFs from 'graceful-fs'

import tailwindConfig from './tailwind.config'
import { generatePosition, generateSlug, isDraft, processDocumentInfo } from './utils/document'

const fs = gracefulFs.promises
const r = (...args) => resolve(__dirname, ...args)

export default function docusModule () {
  // wait for nuxt options to be normalized
  const { nuxt, addLayout } = this
  const { options, hook } = this.nuxt

  // Inject content dir in private runtime config
  options.publicRuntimeConfig.contentDir = options.content.dir || 'content'

  // Add layouts
  hook('build:before', () => {
    addLayout({ src: r('layouts/docs.vue'), filename: 'layouts/docs.vue' })
    addLayout({ src: r('layouts/readme.vue'), filename: 'layouts/readme.vue' })
  })

  // If pages/ does not exists, disable Nuxt pages parser (to avoid warning) and watch pages/ creation for full restart
  hook('build:before', async () => {
    // To support older version of Nuxt
    const pagesDirPath = resolve(options.srcDir, options.dir.pages)
    const pagesDirExists = await fs.stat(pagesDirPath).catch(() => false)
    if (!pagesDirExists) {
      this.nuxt.options.build.createRoutes = () => ([])
      nuxt.options.watch.push(pagesDirPath)
    }
  })

  // Configure `components/` dir
  hook('components:dirs', async (dirs) => {
    dirs.push({
      path: r('components/atoms'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('components/molecules'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('components/icons'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('components/organisms'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('components/templates'),
      global: true,
      level: 3
    })
    if (options.dev) {
      dirs.push({
        path: r('components/dev-templates'),
        global: true,
        level: 2
      })
    }
    const componentsDirPath = resolve(nuxt.options.rootDir, 'components')
    const componentsDirStat = await fs.stat(componentsDirPath).catch(() => null)
    if (componentsDirStat && componentsDirStat.isDirectory()) {
      dirs.push({
        path: componentsDirPath,
        global: true
      })
    } else {
      nuxt.options.watch.push(componentsDirPath)
    }
  })
  // Configure content after each hook
  hook('content:file:beforeInsert', (document) => {
    if (document.extension !== '.md') {
      return
    }
    const regexp = new RegExp(`^/(${options.i18n.locales.map(locale => locale.code).join('|')})`, 'gi')
    const { dir, slug, category } = document
    const _dir = dir.replace(regexp, '')
    const _language = dir.replace(_dir, '').replace(/\//, '') || options.i18n.defaultLocale
    const _category = category && typeof category === 'string' ? category : ''
    const _to = `${_dir}/${slug}`.replace(/\/+/, '/')
    const position = generatePosition(_to, document)

    processDocumentInfo(document)

    document.slug = generateSlug(slug)
    document.position = position
    document.to = generateSlug(_to)
    document.language = _language
    document.category = _category
    document.draft = document.draft || isDraft(slug)
  })
  // Extend `/` route
  hook('build:extendRoutes', (routes) => {
    const hasRoute = name => routes.some(route => route.name === name)

    if (!hasRoute('index')) {
      routes.push({
        path: '/',
        name: 'index',
        component: r('pages/_.vue')
      })
    }
    if (!hasRoute('releases')) {
      routes.push({
        path: '/',
        name: 'releases',
        component: r('pages/releases.vue')
      })
    }
    if (!hasRoute('all')) {
      routes.push({
        path: '/*',
        name: 'all',
        component: r('pages/_.vue')
      })
    }
  })
  // Override editor style on dev mode
  if (options.dev) {
    options.css.push(r('assets/css/main.dev.css'))
  }
  // Configure TailwindCSS
  hook('tailwindcss:config', function (defaultTailwindConfig) {
    Object.assign(defaultTailwindConfig, defu(defaultTailwindConfig, tailwindConfig({ nuxt })))
  })
  // Update i18n langDir to relative from `~` (https://github.com/nuxt-community/i18n-module/blob/4bfa890ff15b43bc8c2d06ef9225451da711dde6/src/templates/utils.js#L31)
  options.i18n.langDir = join(relative(options.srcDir, r('i18n')), '/')
  // Docus Devtools
  if (options.dev) {
    options.plugins.push(r('plugins/docus.ui.js'))
  }
}
