import { resolve } from 'path'
import themeModule from './module'

const r = path => resolve(__dirname, path)

export default docusOptions => ({
  target: 'static',
  ssr: true,
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
  build: {
    transpile: [
      'docus'
    ]
  },
  css: [
    r('assets/css/main.css')
  ],
  plugins: [
    r('plugins/docus'),
    r('plugins/menu'),
    r('plugins/i18n')
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
    color: 'var(--primary-500)'
  },
  meta: {
    theme_color: 'var(--primary-500)'
  },
  content: {
    markdown: {
      prism: {
        theme: ''
      },
      remarkPlugins: [
        [r('utils/remark-prose'), {
          proseClass: 'prose dark:prose-dark'
        }],
        [r('utils/remark-tweet'), {}]
      ],
      remarkAutolinkHeadings: {
        behavior: 'wrap'
      }
    }
  },
  colorMode: {
    classSuffix: ''
  },
  i18n: {
    baseUrl: ({ $docus }) => $docus?.settings?.url || '',
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
