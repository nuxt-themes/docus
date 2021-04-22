import { resolve } from 'path'
import { nuxtConfig } from 'nuxt-extend'

const r = (path: any) => resolve(__dirname, path)

export default nuxtConfig({
  name: 'docus',
  rootDir: __dirname,
  extends: r('../defaultTheme'),
  /**
   * Default app config
   */
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

  /**
   * Docus config
   */
  components: true,
  loading: {
    color: 'var(--primary-500)'
  },
  meta: {
    /**
     * Default theme color.
     * Overriden by Docus primary color.
     */
    theme_color: '#06B6D4'
  },
  theme: {},

  /**
   * Modules & plugins
   */
  buildModules: [
    // Dependencies
    'nuxt-vite',
    '@nuxtjs/composition-api',
    '@nuxt/typescript-build',
    '@nuxtjs/pwa',
    // Local modules
    r('module'),
    r('../social-image'),
    r('../twitter'),
    r('../github')
  ],
  modules: [
    // Local modules
    r('../i18n'),
    r('../core')
  ],

  /**
   * Build configs
   */
  target: 'static',
  ssr: true,
  server: {
    port: process.env.PORT || 4000
  },
  vite: {
    optimizeDeps: {
      exclude: ['ohmyfetch', 'vue-demi', 'scule', '@vueuse/integrations'],
      include: ['defu', 'theme-colors', 'lodash.groupby']
    },
    vue: {}
  },
  build: {
    transpile: ['docus']
  },
  typeCheck: {
    eslint: {
      files: './**/*.{ts,js,vue}'
    }
  },
  generate: {
    fallback: '404.html',
    routes: ['/']
  },
  // Alias non-Vite compatible dependencies
  alias: {
    qrcode: r('mock/default'),
    axios: r('mock/default'),
    nprogress: r('mock/default'),
    jwt_decode: r('mock/default')
  }
})
