import 'prismjs/plugins/diff-highlight/prism-diff-highlight'
import Prism from 'prismjs'
import u from 'unist-builder'
import escapeHtml from 'escape-html'

import themeModule from './module'

export default docusOptions => ({
  target: 'static',
  ssr: true,
  srcDir: __dirname,
  privateRuntimeConfig: {
    githubToken: process.env.GITHUB_TOKEN
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  generate: {
    fallback: '404.html',
    routes: ['/']
  },
  transpile: [
    __dirname // transpile node_modules/docus
  ],
  css: [
    '~/assets/css/main.css'
  ],
  plugins: [
    '@/plugins/markdown',
    '@/plugins/init',
    '@/plugins/i18n.client',
    '@/plugins/menu.client'
  ],
  buildModules: [
    themeModule,
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/pwa',
    '@nuxtjs/google-fonts'
  ],
  modules: [
    'nuxt-i18n',
    '@nuxt/content'
  ],
  components: true,
  loading: {
    color: docusOptions.colors.primary
  },
  meta: {
    theme_color: docusOptions.colors.primary
  },
  content: {
    markdown: {
      prism: {
        theme: ''
      },
      highlighter: (rawCode, language, { lineHighlights, fileName }, { h, node }) => {
        let lang = language === 'vue' ? 'html' : language
        let grammer = Prism.languages[lang]
        const diffWithLanguageHightlighting = lang.match(/diff-(.*)/)
        if (diffWithLanguageHightlighting) {
          grammer = Prism.languages.diff
        }

        let code = grammer
          ? Prism.highlight(rawCode, grammer, lang)
          : rawCode

        if (!lang || !grammer) {
          lang = 'text'
          code = escapeHtml(code)
        }

        const props = {
          className: [
            `language-${lang}`,
            'line-numbers',
            diffWithLanguageHightlighting ? 'diff-highlight' : '' // highlight diff lines if language highlighting is enable
          ]
        }

        if (lineHighlights) {
          props.dataLine = lineHighlights
        }

        const childs = []

        /**
         * If filename, then set span as a first child
         */
        if (fileName) {
          childs.push(h(node, 'span', { className: ['filename'] }, [u('text', fileName)]))
        }

        /**
         * Set pre as a child
         */
        childs.push(h(node, 'pre', props, [
          h(node, 'code', [u('raw', code)])
        ]))

        return h(node.position, 'div', { className: ['nuxt-content-highlight'] }, childs)
      }
    }
  },
  colorMode: {
    classSuffix: ''
  },
  i18n: {
    locales: [{
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
    }],
    defaultLocale: 'en',
    parsePages: false,
    lazy: true,
    seo: false,
    langDir: 'i18n/',
    vueI18n: {
      fallbackLocale: 'en',
      dateTimeFormats: {
        en: {
          long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short'
          }
        },
        fr: {
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short'
          }
        }
      }
    }
  },
  googleFonts: {
    families: {
      Inter: true
    }
  },
  tailwindcss: {},
  server: {
    port: 4000
  }
})
