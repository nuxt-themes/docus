import { resolve } from 'path'
import { withDocus } from 'docus'

export default withDocus({
  content: {
    liveEdit: false
  },
  buildModules: [
    'vue-plausible'
  ],
  plausible: {
    // https://github.com/moritzsternemann/vue-plausible#configuration
    domain: 'docus.dev'
  },
  windicss: {
    // required for now
    root: resolve(__dirname, '..'),
    config: resolve(__dirname, 'windi.config.js'),
    scan: {
      dirs: ['docs'],
      exclude: [
        '.github'
      ]
    }
  }
})
