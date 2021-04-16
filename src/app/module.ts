import { resolve } from 'path'
import gracefulFs from 'graceful-fs'
import { Module } from '@nuxt/types'
import { glob } from 'siroc'

const fs = gracefulFs.promises
const r = (...args: any[]) => resolve(__dirname, ...args)

export default <Module>function docusAppModule() {
  const { addLayout, nuxt } = this
  const { hook, options } = nuxt

  // Add layouts
  hook('build:before', async () => {
    // Add default error page if not defined
    const errorPagePath = resolve(options.srcDir, options.dir.layouts, 'error.vue')
    const errorPageExists = await fs.stat(errorPagePath).catch(() => false)
    if (!errorPageExists) {
      options.ErrorPage = options.ErrorPage || r('layouts/error.vue')
    }
  })

  // Extend `/` route
  hook('build:extendRoutes', (routes: any[]) => {
    const hasRoute = (name: string) => routes.some(route => route.name === name)

    if (!hasRoute('all')) {
      routes.push({
        path: '/*',
        name: 'all',
        component: r('pages/_.vue')
      })
    }
  })

  // Configure `components/` dir
  hook('components:dirs', async (dirs: any) => {
    // Atoms
    dirs.push({
      path: r('../components/atoms'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('../components/atoms/icons'),
      global: true,
      level: 2
    })

    // Molecules
    dirs.push({
      path: r('../components/molecules'),
      global: true,
      level: 2
    })

    // Organisms
    dirs.push({
      path: r('../components/organisms'),
      global: true,
      level: 2
    })
    dirs.push({
      path: r('../components/organisms/slots'),
      global: true,
      level: 3
    })
    if (options.dev) {
      dirs.push({
        path: r('../components/organisms/dev-slots'),
        global: true,
        level: 2
      })
    }

    // Templates
    dirs.push({
      path: r('../components/templates'),
      global: true,
      level: 2
    })

    // Get the user root `components` folder
    const componentsDirPath = resolve(nuxt.options.rootDir, 'components')
    const componentsDirStat = await fs.stat(componentsDirPath).catch(() => null)

    if (componentsDirStat && componentsDirStat.isDirectory()) {
      // Register the root `components` directory
      dirs.push({
        path: componentsDirPath,
        global: true
      })
      // Check for sub directories
      const subDirs = await glob(componentsDirPath + '/*/')
      // Register each subdirectories
      subDirs.forEach((path: string) => dirs.push({ path, global: true }))
    } else {
      // Watch existence of root `components` directory
      nuxt.options.watch.push(componentsDirPath)
    }
  })

  // Inject Admin UI
  if (options.dev) {
    options.plugins.push(r('../admin/index'))

    // Disable SSR in dev
    options.ssr = false
    options.build.ssr = false
    options.render.ssr = false
  }
}
