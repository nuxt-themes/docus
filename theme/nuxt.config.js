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
