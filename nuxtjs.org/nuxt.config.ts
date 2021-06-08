import { resolve } from 'path'
import { withDocus } from '../src'

// Learn more at https://docus.dev
export default withDocus({
  rootDir: __dirname,
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=DM+Serif+Display:ital@0;1&display=swap'
      },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' }
    ],
    bodyAttrs: {
      class: ['text-secondary dark:text-white bg-white']
    }
  },
  buildModules: ['@nuxt/typescript-build'],
  windicss: {
    root: resolve(__dirname),
    config: resolve(__dirname, 'windi.config.js')
  },
  vite: {
    optimizeDeps: {
      include: ['cookie', 'js-cookie', 'property-information', 'clipboard'],
      exclude: ['lokidb']
    }
  }
})
