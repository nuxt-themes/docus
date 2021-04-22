import { withDocus } from '../src'

export default withDocus({
  /**
   * Has to specify rootDir as we use nuxt-extend
   */
  rootDir: __dirname,
  /**
   * Modules
   */
  buildModules: ['vue-plausible'],
  /**
   * Modules config
   */
  plausible: {
    // https://github.com/moritzsternemann/vue-plausible#configuration
    domain: 'docus.dev'
  },
  socialImage: {
    baseUrl: 'https://docus.dev',
    chrome: {
      browserWSEndpoint: 'wss://chrome.browserless.io/'
    }
  }
})
