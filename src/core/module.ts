import { resolve, join } from 'path'
import gracefulFs from 'graceful-fs'
import { pascalCase } from 'scule'
import { Module } from '@nuxt/types'
import hash from 'hasha'
import mkdirp from 'mkdirp'
import { DocusDocument, ParserOptions } from '../types'
import { generatePosition, generateSlug, generateTo, isDraft, isHidden } from './utils/document'
import { destroyStorage, initStorage, useNuxtIgnoreList } from './storage'
import { destroyDB, useDB } from './database'
import { createServerMiddleware } from './server'
import { initParser } from './parser'
import { destroyHooks } from './hooks'
import { updateNavigation } from './utils/navigation'
import { useHooks, logger } from './'

const fs = gracefulFs.promises

function isUrl(string) {
  try {
    // quick test if the string is an URL
    // eslint-disable-next-line no-new
    new URL(string)
  } catch (_) {
    return false
  }
  return true
}

export default <Module>async function docusModule() {
  // Wait for nuxt options to be normalized
  const { nuxt, addServerMiddleware, addPlugin, addModule, $docus } = this
  const { options } = nuxt
  const isSSG = options.dev === false && (options.target === 'static' || options._generate || options.mode === 'spa')

  // Inject Docus Admin module in development
  if (!isSSG) addModule(require.resolve('@docus/admin/src/index.ts'))

  const pluginOptions = {
    apiBase: '_docus',
    watch: options.dev,
    isSSG,
    dbPath: ''
  }

  // Setup docus cache
  options.alias['~docus-cache'] = join(options.srcDir, 'node_modules/.cache/docus')

  /**
   * Inject static dir into process that will be used by `link` handler
   *  to detect static files
   */
  process.env.NUXT_STATIC_DIR = join(options.rootDir, options.dir.static)

  // Inject Docus theme as ~docus
  options.alias['~docus'] = resolve(__dirname, 'runtime')

  // extend parser options
  const parserOptions: Partial<ParserOptions> = { markdown: {} }
  await nuxt.callHook('docus:parserOptions', parserOptions)
  initParser(parserOptions)

  const coreHooks = useHooks()

  // Configure content after each hook
  // Locales or empty array
  let locales = options.i18n?.locales || []
  // If locales is function, resolve it
  locales = typeof locales === 'function' ? locales() : locales
  // Map locales or default to 'en'
  locales = locales.map(({ code }: { code: string }) => code).join('|') || 'en'
  // Get default locale or default to 'en'
  const defaultLocale = options.i18n?.defaultLocale || 'en'
  const regexp = new RegExp(`^/(${locales})`, 'gi')

  coreHooks.hook('docus:storage:beforeInsert', (document: DocusDocument) => {
    if (document.extension !== '.md') {
      return
    }

    const { dir, slug } = document
    const _dir = dir.replace(regexp, '')
    const _language = dir.replace(_dir, '').replace(/\//, '') || defaultLocale
    const _to = `${_dir}/${slug}`.replace(/\/+/, '/')
    const position = generatePosition(_to, document)

    /**
     * Disable document navigation if it is marked as `page = false`
     * This will prevent showing non-pages in navigation menus
     */
    if (document.page === false) {
      document.navigation = false
    }

    if (isHidden(_to)) {
      // Do not show document on navigation menus
      document.navigation = false
      // Do not render document as standalone page
      document.page = false
    }

    document.slug = generateSlug(slug)
    document.position = position
    document.to = generateTo(_to)
    document.path = document.to
    document.language = _language
    document.draft = document.draft || isDraft(slug)

    /**
     * Generate title from page slug
     */
    if (!document.title) {
      document.title = document.to.split('/').pop().split(/[\s-]/g).map(pascalCase).join(' ')
    }
  })

  // Initiate storage
  const { storage, lazyIndex } = initStorage({
    drivers: [
      {
        base: resolve(options.srcDir, $docus.settings.contentDir),
        // mount point of driver
        mountPoint: 'pages',
        // List of Nuxt ignore rules
        ignore: await useNuxtIgnoreList(nuxt)
      },
      {
        base: resolve(options.srcDir, 'data'),
        mountPoint: 'data'
      }
    ]
  })

  addServerMiddleware(createServerMiddleware({ storage, base: pluginOptions.apiBase }))

  if (options.dev) {
    nuxt.hook('listen', server => server.on('upgrade', (...args) => coreHooks.callHook('upgrade', ...args)))

    storage.watch((event, key) => {
      updateNavigation(nuxt)
      logger.info(`File ${event}: ${key}`)
    })
  }

  nuxt.hook('build:before', () => {
    ;(async () => {
      await lazyIndex()
      await updateNavigation(nuxt)
    })()
  })

  nuxt.hook('generate:before', async () => {
    await lazyIndex()
    await updateNavigation(nuxt)
  })

  if (isSSG) {
    let publicPath = this.options.build.publicPath // can be an url
    let routerBasePath = this.options.router.base

    /* istanbul ignore if */
    if (publicPath[publicPath.length - 1] !== '/') {
      publicPath += '/'
    }
    if (routerBasePath[routerBasePath.length - 1] === '/') {
      routerBasePath = routerBasePath.slice(0, -1)
    }
    pluginOptions.dbPath = isUrl(publicPath)
      ? `${publicPath}${pluginOptions.apiBase}`
      : `${routerBasePath}${publicPath}${pluginOptions.apiBase}`
    nuxt.hook('generate:distRemoved', async () => {
      const { items, db } = useDB()
      // Create a hash to fetch the database
      const dbHash = hash(JSON.stringify(items._data)).substr(0, 8)
      if (this.options.publicRuntimeConfig) {
        ;(this.options.publicRuntimeConfig as any).docusDbHash = dbHash
      } else {
        this.nuxt.hook('vue-renderer:ssr:context', renderContext => {
          renderContext.nuxt.docusDbHash = dbHash
        })
      }

      const dir = resolve(this.options.buildDir, 'dist', 'client', pluginOptions.apiBase)

      await mkdirp(dir)
      await fs.writeFile(join(dir, `db-${dbHash}.json`), db.serialize(), 'utf-8')
    })
  }

  // Add global components plugin
  addPlugin({
    src: resolve(__dirname, 'runtime', 'components', 'plugin.js'),
    filename: 'docus_components.js'
  })

  // Add Docus runtime plugin
  addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    filename: 'docus.js',
    options: pluginOptions
  })

  nuxt.hook('vue-renderer:context', (ssrContext: any) => {
    const { query } = useDB()
    ssrContext.docus = ssrContext.docus || {}
    ssrContext.docus.createQuery = query
  })

  // If pages/ does not exists, disable Nuxt pages parser (to avoid warning) and watch pages/ creation for full restart
  nuxt.hook('build:before', async () => {
    // To support older version of Nuxt
    const pagesDirPath = resolve(options.srcDir, options.dir.pages)
    const pagesDirExists = await fs.stat(pagesDirPath).catch(() => false)
    if (!pagesDirExists) {
      options.build.createRoutes = () => []
      options.watch.push(pagesDirPath)
    }
  })

  nuxt.callHook('docus:storage:ready')

  // Watch Docus while DOCUS_DEV is set
  if (process.env.DOCUS_DEV) options.watch.push(resolve(__dirname, '../'))

  nuxt.hook('close', () => {
    destroyHooks()
    destroyDB()
    destroyStorage()
  })
}
