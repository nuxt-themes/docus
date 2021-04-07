import { resolve } from 'path'

import themeModule from './module'

const r = path => resolve(__dirname, path)

export default {
  alias: {
    qrcode: require.resolve('./mock/default'),
    axios: require.resolve('./mock/default'),
    nprogress: require.resolve('./mock/default'),
    jwt_decode: require.resolve('./mock/default')
  },
  target: 'static',
  ssr: true,
  privateRuntimeConfig: {
    githubToken: process.env.GITHUB_TOKEN
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' }
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
    'nuxt-windicss',
    'nuxt-vite',
    '@nuxtjs/color-mode',
    '@nuxtjs/pwa'
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
    /**
     * Default theme color
     * Will override by docus primary color
     */
    theme_color: '#06B6D4'
  },
  content: {
    markdown: {
      prism: {
        theme: r('assets/css/prism.css')
      },
      remarkPlugins: [
        [r('utils/remark-prose'), {
          proseClass: 'prose dark:prose-dark'
        }],
        [r('utils/remark-vue'), {}]
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
    baseUrl: ({ $docus }) => ($docus && $docus.settings && $docus.settings.url) || '',
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
  server: {
    port: process.env.PORT || 4000
  },
  vite: {
    optimizeDeps: {
      exclude: [
        'ohmyfetch',
        'vue-demi',
        '@vueuse/integrations'
      ],
      include: [
        'defu',
        'theme-colors',
        'lodash.groupby'
      ]
    },
    vue: {}
  }
}
