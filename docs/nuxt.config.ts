import { resolve } from 'path'
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
  },
  windicss: {
    root: resolve(__dirname, '..')
  },
  /**
   * Add image domains for nuxt-image
   */
  image: {
    domains: [
      'https://strapi.nuxtjs.org',
      'https://tailwindcss.nuxtjs.org',
      'https://storybook.nuxtjs.org',
      'https://firebase.nuxtjs.org',
      'https://pwa.nuxtjs.org',
      'https://image.nuxtjs.org',
      'https://http.nuxtjs.org',
      'https://cloudinary.nuxtjs.org',
      'https://i18n.nuxtjs.org',
      'https://snipcart.nuxtjs.org',
      'https://prismic.nuxtjs.org',
      'https://google-analytics.nuxtjs.org',
      'https://color-mode.nuxtjs.org',
      'https://mdx.nuxtjs.org',
      'https://sanity.nuxtjs.org',
      'https://speedcurve.nuxtjs.org',
      'https://pbs.twimg.com',
      'https://source.unsplash.com',
      'https://user-images.githubusercontent.com'
    ]
  }
})
