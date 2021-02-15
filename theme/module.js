import path from 'path'
import defu from 'defu'
import gracefulFs from 'graceful-fs'

import tailwindConfig from './tailwind.config'

const fs = gracefulFs.promises

export default function docusModule () {
  // wait for nuxt options to be normalized
  const { nuxt } = this
  const { options, hook } = this.nuxt

  // Configure `content/` dir
  options.content.dir = path.resolve(options.rootDir, options.content.dir || 'content')
  // Configure `static/ dir
  options.dir.static = path.resolve(options.rootDir, options.dir.static || 'static')
  // Configure `components/` dir
  hook('components:dirs', async (dirs) => {
    dirs.push({
      path: '~/components/atoms',
      global: true
    })
    dirs.push({
      path: '~/components/molecules',
      global: true
    })
    dirs.push({
      path: '~/components/icons',
      global: true
    })
    dirs.push({
      path: '~/components/templates',
      global: true
    })
    dirs.push({
      path: '~/components/organisms',
      global: true
    })
    const componentsDirPath = path.resolve(nuxt.options.rootDir, 'components')
    const componentsDirStat = await fs.stat(componentsDirPath).catch(() => null)
    if (componentsDirStat && componentsDirStat.isDirectory()) {
      dirs.push({
        path: componentsDirPath
      })
    } else {
      nuxt.options.watch.push(componentsDirPath)
    }

    const globalComponentsDirPath = path.resolve(nuxt.options.rootDir, 'components/global')
    const globalComponentsDirStat = await fs.stat(globalComponentsDirPath).catch(() => null)
    if (globalComponentsDirStat && globalComponentsDirStat.isDirectory()) {
      dirs.push({
        path: globalComponentsDirPath,
        global: true
      })
    } else {
      nuxt.options.watch.push(globalComponentsDirPath)
    }
  })
  // Configure content after each hook
  hook('content:file:beforeInsert', (document) => {
    const regexp = new RegExp(`^/(${options.i18n.locales.map(locale => locale.code).join('|')})`, 'gi')
    const { dir, slug, category } = document
    const _dir = dir.replace(regexp, '')
    const _slug = slug.replace(/^index/, '')
    const _category = category && typeof category === 'string' ? category : ''

    document.to = `${_dir}/${_slug}`
    document.category = _category
  })
  // Extend `/` route
  hook('build:extendRoutes', (routes) => {
    const allRoute = routes.find(route => route.name === 'all')

    routes.push({
      ...allRoute,
      path: '/',
      name: 'index'
    })
  })
  // Override editor style on dev mode
  if (options.dev) {
    options.css.push(path.resolve(__dirname, 'assets/css/main.dev.css'))
  }
  // Configure `tailwind.config.js` path
  options.tailwindcss.configPath = options.tailwindcss.configPath || path.resolve(options.rootDir, 'tailwind.config.js')
  options.tailwindcss.cssPath = options.tailwindcss.cssPath || path.resolve(options.rootDir, options.dir.assets, 'css', 'tailwind.css')
  // Configure TailwindCSS
  hook('tailwindcss:config', function (defaultTailwindConfig) {
    Object.assign(defaultTailwindConfig, defu(defaultTailwindConfig, tailwindConfig({ nuxt })))
  })
}
