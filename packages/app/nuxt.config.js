import { resolve } from 'path'
import themeModule from '../core/module'

const r = path => resolve(__dirname, path)

export default {
  alias: {
    qrcode: require.resolve('./mock.js'),
    axios: require.resolve('./mock.js'),
    nprogress: require.resolve('./mock.js'),
    jwt_decode: require.resolve('./mock.js')
  },
  target: 'static',
  ssr: true,
  privateRuntimeConfig: {
    githubToken: process.env.GITHUB_TOKEN
  },
  head: {
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
      },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' }
    ]
  },
  generate: {
    fallback: '404.html',
    routes: ['/']
  },
  build: {
    transpile: ['docus']
  },
  css: [r('../theme/assets/css/main.css')],
  plugins: [r('../engine/i18n'), r('../engine/docus'), r('../engine/menu')],
  buildModules: [
    themeModule,
    'nuxt-vite',
    '@nuxt/typescript-build',
    'nuxt-windicss',
    '@nuxtjs/color-mode',
    '@nuxtjs/pwa',
    r('../../plugins/social-image/module'),
    r('../../plugins/twitter/module'),
    '@nuxtjs/composition-api'
  ],
  modules: ['nuxt-i18n', '@nuxt/content'],
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
        theme: r('../theme/assets/css/prism.css')
      },
      remarkPlugins: [
        [
          r('../engine/utils/remark-prose'),
          {
            proseClass: 'prose dark:prose-dark'
          }
        ],
        [r('../engine/utils/remark-vue'), {}]
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
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: r('./i18n/en-US.js'),
        name: 'English'
      }
    ],
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
      exclude: ['ohmyfetch', 'vue-demi', 'scule', '@vueuse/integrations'],
      include: ['defu', 'theme-colors', 'lodash.groupby']
    },
    vue: {}
  }
}
