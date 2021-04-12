import { resolve } from 'path'
import { withDocus } from '../src'

export default withDocus({
  content: {
    liveEdit: false
  },
  buildModules: ['vue-plausible'],
  plausible: {
    // https://github.com/moritzsternemann/vue-plausible#configuration
    domain: 'docus.dev'
  },
  socialImage: {
    baseUrl: 'https://docus.dev',
    chrome: {
      browserWSEndpoint: 'wss://chrome.browserless.io/'
    }
  },
  windicss: {
    root: resolve(__dirname, '..'),
    config: resolve(__dirname, 'windi.config.js')
  }
})
