import { resolve } from 'path'
import { Module } from '@nuxt/types'
import { DocusDocument, DocusSettings } from '../types'
import { useDefaults } from './util/settings'
import { generatePosition, generateSlug, generateTo, isDraft, processDocumentInfo } from './util/document'
import { r } from './util'
import { useStorage } from './storage'
import { createServerMiddleware } from './server'
import useHooks from './hooks'
import { useDB } from './database'

export default <Module>async function docusModule() {
  const { nuxt, addServerMiddleware, addPlugin } = this
  const { options, hook, callHook } = nuxt

  // Inject Docus theme as ~docus
  options.alias['~docus'] = r('core/runtime')

  addPlugin({
    src: r('core/runtime/plugin.js'),
    filename: 'docus.js'
  })

  const parserOptions = { markdown: {} }
  await nuxt.callHook('docus:parserOptions', parserOptions)

  const hooks = useHooks()
  // Configure content after each hook
  hooks.hook('content:file:beforeInsert', (document: DocusDocument) => {
    if (document.path === "/data/settings") {
      Object.assign(document, useDefaults(document))
    }
    if (document.extension !== '.md') {
      return
    }

    // Locales or empty array
    let locales = options.i18n?.locales || []
    // If locales is function, resolve it
    locales = typeof locales === 'function' ? locales() : locales
    // Map locales or default to 'en'
    locales = locales.map(({ code }: { code: string }) => code).join('|') || 'en'
    // Get default locale or default to 'en'
    const defaultLocale = options.i18n?.defaultLocale || 'en'

    const regexp = new RegExp(`^/(${locales})`, 'gi')
    const { dir, slug, category } = document
    const _dir = dir.replace(regexp, '')
    const _language = dir.replace(_dir, '').replace(/\//, '') || defaultLocale
    const _category = category && typeof category === 'string' ? category : ''
    const _to = `${_dir}/${slug}`.replace(/\/+/, '/')
    const position = generatePosition(_to, document)

    processDocumentInfo(document)

    document.slug = generateSlug(slug)
    document.position = position
    document.to = generateTo(_to)
    document.language = _language
    document.category = _category
    document.draft = document.draft || isDraft(slug)
  })

  const { storage, init } = useStorage({
    drivers: [
      {
        base: resolve(options.srcDir, options.dir.pages),
        mountPoint: 'pages'
      },
      {
        base: resolve(options.srcDir, 'data'),
        mountPoint: 'data'
      }
    ]
  })

  hook('components:dirs', async (dirs: any) => {
    dirs.push({
      path: r('core/runtime/components'),
      global: true,
      level: 2
    })
  })

  hook('build:before', async () => {
    init()
  })

  hook('generate:before', async () => {
    await init()
  })

  // read docus settings
  const docusSettings = (await storage.getItem('data:settings.json')) as Partial<DocusSettings>

  // default title and description for pages
  options.meta.name = docusSettings.title
  options.meta.description = docusSettings.description

  addServerMiddleware({
    path: '/_content',
    handler: createServerMiddleware(storage)
  })

  hook('vue-renderer:context', (ssrContext: any) => {
    const { query } = useDB()
    ssrContext.docus = ssrContext.docus || {}
    ssrContext.docus.createQuery = query
  })

  callHook('docus:content:ready')
}
