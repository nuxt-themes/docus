const { resolve } = require('path')
const defu = require('defu')
const tailwindConfig = require('./tailwind.config')

module.exports = function () {
  const { nuxt } = this

  // Configure `content/` dir
  nuxt.options.content.dir = resolve(nuxt.options.rootDir, nuxt.options.content.dir || 'content')

  // Configure `static/ dir
  nuxt.options.dir.static = resolve(nuxt.options.rootDir, nuxt.options.dir.static || 'static')

  // Configure user `components/` dir
  nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      level: 0,
      path: resolve(nuxt.options.rootDir, 'components/global'),
      global: true
    })
  })

  // Configure content after each hook
  nuxt.hook('content:file:beforeInsert', (document) => {
    const regexp = new RegExp(`^/(${nuxt.options.i18n.locales.map(locale => locale.code).join('|')})`, 'gi')
    const dir = document.dir.replace(regexp, '')
    const slug = document.slug.replace(/^index/, '')
    document.to = `${dir}/${slug}`
  })

  // Extend `/` route
  nuxt.hook('build:extendRoutes', (routes) => {
    routes.push({
      ...routes.find(route => route.name === 'all'),
      path: '/',
      name: 'index'
    })
  })

  // Override editor style on dev mode
  if (nuxt.options.dev) {
    nuxt.options.css.push(resolve(__dirname, 'assets/css/main.dev.css'))
  }

  // Configure `tailwind.config.js` path
  nuxt.options.tailwindcss.configPath = nuxt.options.tailwindcss.configPath || resolve(nuxt.options.rootDir, 'tailwind.config.js')
  nuxt.options.tailwindcss.cssPath = nuxt.options.tailwindcss.cssPath || resolve(nuxt.options.rootDir, nuxt.options.dir.assets, 'css', 'tailwind.css')

  // Configure TailwindCSS
  nuxt.hook('tailwindcss:config', function (defaultTailwindConfig) {
    Object.assign(defaultTailwindConfig, defu(defaultTailwindConfig, tailwindConfig({ nuxt })))
  })

  // Default value for loading.color and meta.theme_color
  nuxt.options.loading.color = nuxt.options.loading.color || nuxt.options.docs.primaryColor
  nuxt.options.meta.theme_color = nuxt.options.meta.theme_color || nuxt.options.docs.primaryColor

  if (nuxt.options.env && nuxt.options.env.GITHUB_TOKEN) {
    // eslint-disable-next-line no-console
    console.warn('[security] Avoid passing `env.GITHUB_TOKEN` directly in `nuxt.config`. Use `.env` file instead!')
    nuxt.options.privateRuntimeConfig.GITHUB_TOKEN = nuxt.options.env.GITHUB_TOKEN
    delete nuxt.options.env.GITHUB_TOKEN
  }
}
