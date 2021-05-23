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
  buildModules: [
    // 'vue-plausible',
    '@nuxt/typescript-build'
  ],
  /**
   * Modules config
   */
  plausible: {
    // https://github.com/moritzsternemann/vue-plausible#configuration
    domain: 'docus.dev'
  },
  /**
   * Add image domains for nuxt-image
   */
  hooks: {
    generate: {
      async done() {
        try {
          if (!process.env.VERCEL) return

          const { copy } = await import('fs-extra').then(r => r.default || r)
          const src = resolve(__dirname, '.vercel_build_output')
          const dest = resolve(__dirname, '../.vercel_build_output')
          await copy(src, dest)
        } catch {
          // eslint-disable-next-line no-console
          console.log('Issue copying `.vercel_build_output` to project root.')
        }
      }
    }
  },
  image: {
    screens: {
      avatarSm: 24,
      avatarLg: 48,
      logo: 32,
      migration: 536,
      blogImage: 864
    },
    domains: [
      'strapi.nuxtjs.org',
      'tailwindcss.nuxtjs.org',
      'storybook.nuxtjs.org',
      'firebase.nuxtjs.org',
      'pwa.nuxtjs.org',
      'image.nuxtjs.org',
      'http.nuxtjs.org',
      'cloudinary.nuxtjs.org',
      'i18n.nuxtjs.org',
      'snipcart.nuxtjs.org',
      'prismic.nuxtjs.org',
      'google-analytics.nuxtjs.org',
      'color-mode.nuxtjs.org',
      'mdx.nuxtjs.org',
      'sanity.nuxtjs.org',
      'speedcurve.nuxtjs.org',
      'pbs.twimg.com',
      'source.unsplash.com',
      'user-images.githubusercontent.com',
      'abs.twimg.com'
    ]
  }
})
