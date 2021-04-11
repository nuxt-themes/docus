import { resolve } from 'path'
import themeModule from '@docus/theme'

const r = path => resolve(__dirname, path)

export default {
  alias: {
    qrcode: () => null,
    axios: () => null,
    nprogress: () => null,
    jwt_decode: () => null
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
  plugins: [r('../engine/docus'), r('../engine/menu')],
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
  modules: [r('../../plugins/i18n/src/index'), r('../../package/core/src/index')],
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
  colorMode: {
    classSuffix: ''
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
