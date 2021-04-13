import { resolve } from 'path'
import gracefulFs from 'graceful-fs'

const fs = gracefulFs.promises
const r = (...args) => resolve(__dirname, ...args)

export default function docusAppModule() {
  const { addLayout, nuxt } = this
  const { hook, options } = nuxt

  // Add layouts
  hook('build:before', async () => {
    addLayout({ src: r('layouts/docs.vue'), filename: 'layouts/docs.vue' })
    addLayout({ src: r('layouts/readme.vue'), filename: 'layouts/readme.vue' })
    addLayout({ src: r('layouts/blog.vue'), filename: 'layouts/blog.vue' })

    // Add default error page if not defined
    const errorPagePath = resolve(options.srcDir, options.dir.layouts, 'error.vue')
    const errorPageExists = await fs.stat(errorPagePath).catch(() => false)
    if (!errorPageExists) {
      options.ErrorPage = options.ErrorPage || r('layouts/error.vue')
    }
  })

  // Extend `/` route
  hook('build:extendRoutes', routes => {
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
        path: '/releases',
        name: 'releases',
        component: r('pages/releases.vue')
      })
    }
    if (!hasRoute('blog')) {
      routes.push({
        path: '/blog',
        name: 'blog',
        component: r('pages/blog/index.vue')
      })
    }
    if (!hasRoute('blog-post')) {
      routes.push({
        path: '/blog/:post',
        name: 'blog-post',
        component: r('pages/blog/_post.vue')
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

  // Configure `components/` dir
  hook('components:dirs', async dirs => {
    dirs.push({
      path: r('../components/atoms'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('../components/molecules'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('../components/icons'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('../components/logos'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('../components/organisms'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('../components/templates'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('../components/slots'),
      global: true,
      level: 3
    })
    if (options.dev) {
      dirs.push({
        path: r('../components/dev'),
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
}
