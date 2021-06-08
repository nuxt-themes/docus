import { resolve } from 'path'
import { withDocus } from '../src'

// Learn more at https://docus.dev
export default withDocus({
  rootDir: __dirname,
  head: {
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' }
    ]
  },
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
