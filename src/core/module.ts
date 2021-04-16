import { resolve } from 'path'
import { Module } from '@nuxt/types'
import { DocusDocument } from '../types'
import { useDefaults } from './util/settings'
import { generatePosition, generateSlug, generateTo, isDraft, processDocumentInfo } from './util/document'
import { useJSONParser, useMarkdownParser } from './parser'
import { exists, r, readFile } from './util'

export default <Module>async function docusModule() {
  const { nuxt, requireModule, addPlugin } = this
  const { options, hook, callHook } = nuxt

  // Inject Docus theme as ~docus
  options.alias['~docus'] = r('core/runtime')

  // Inject content dir in private runtime config
  const contentDir = options?.content?.dir || 'content'
  options.publicRuntimeConfig.contentDir = contentDir

  // read docus settings
  let docusSettings
  try {
    const content = await readFile(resolve(options.srcDir, contentDir, 'settings.json'))
    const userSettings = useJSONParser().parse(content)
    docusSettings = useDefaults(userSettings)

    // default title and description for pages
    options.meta.name = docusSettings.title
    options.meta.description = docusSettings.description
    // if (settings.colors && settings.colors.primary) {
    //   options.meta.theme_color = settings.colors.primary
    // }
  } catch (err) {
    /* settings not found */
  }

  // If pages/ does not exists, disable Nuxt pages parser (to avoid warning) and watch pages/ creation for full restart
  hook('build:before', async () => {
    // To support older version of Nuxt
    const pagesDirPath = resolve(options.srcDir, options.dir.pages)
    const pagesDirExists = await exists(pagesDirPath)
    if (!pagesDirExists) {
      options.build.createRoutes = () => []
      options.watch.push(pagesDirPath)
    }
  })
  // Configure content after each hook
  hook('content:file:beforeInsert', (document: DocusDocument) => {
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

  addPlugin({
    src: r('core/runtime/plugin.js'),
    filename: 'docus.js'
  })

  const parserOptions = { markdown: {} }
  await nuxt.callHook('docus:parserOptions', parserOptions)

  const markdownParser = useMarkdownParser(parserOptions.markdown)

  hook('content:ready', $content => {
    callHook('docus:content:ready', { $content, settings: docusSettings})
  })

  await requireModule([
    '@nuxt/content',
    {
      extendParser: {
        '.md': (content: string) => markdownParser.parse(content)
      },
      markdown: {
        prism: {
          theme: ''
        }
      }
    }
  ])
}
