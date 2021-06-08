import { resolve } from 'path'
import { nuxtConfig } from 'nuxt-extend'

const r = (path: any) => resolve(__dirname, path)

export default nuxtConfig({
  /**
   * Name for nuxt-extend
   */
  name: 'docus',
  /**
   * RootDir
   */
  rootDir: __dirname,

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
    ],
    bodyAttrs: {
      class: ['antialiased tracking-semitight text-gray-900 bg-red-500 dark:text-gray-50 dark:bg-gray-900']
    }
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
   * Disable suffix from color-mode
   */
  colorMode: {
    classSuffix: ''
  },

  /**
   * Modules & plugins
   */
  buildModules: [
    // Dependencies
    'nuxt-vite',
    '@nuxtjs/pwa',
    '@nuxt/image',
    '@nuxtjs/composition-api/module',
    '@nuxt/postcss8',
    // Local modules
    r('./module'),
    r('../settings'),
    r('../social-image'),
    r('../twitter'),
    r('../github')
  ],
  modules: [
    // Local modules
    r('../i18n'),
    r('../core/module')
  ],

  /**
   * Build configs
   */
  target: 'static',
  server: {
    port: process.env.PORT || 4000
  },
  vite: {
    experimentWarning: false,
    optimizeDeps: {
      exclude: ['ohmyfetch', 'vue-demi', 'scule', '@vueuse/integrations', 'lokidb'],
      include: [
        'defu',
        'theme-colors',
        'cookie',
        'js-cookie',
        'property-information',
        'clipboard',
        'qrcode',
        'axios',
        'nprogress'
      ]
    }
  },
  build: {
    transpile: ['docus']
  },
  typescript: {
    // TODO: Re-enable typeCheck
    // Waiting for better support from nuxt-vite / nuxt 3
    typeCheck: false
  },
  generate: {
    fallback: '404.html',
    routes: ['/']
  }
})
