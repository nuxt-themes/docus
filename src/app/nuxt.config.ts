import { resolve } from 'path'
import { nuxtConfig } from 'nuxt-extend'

const r = (path: any) => resolve(__dirname, path)

export default nuxtConfig({
  name: 'docus',
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
    '@nuxt/typescript-build',
    '@nuxtjs/pwa',
    '@nuxt/image',
    '@nuxtjs/composition-api/module',
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
  typeCheck: {
    eslint: {
      files: './**/*.{ts,js,vue}'
    }
  },
  generate: {
    fallback: '404.html',
    routes: ['/']
  }
})
