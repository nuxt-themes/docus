import { resolve } from 'path'
import { withDocus } from '../src'

// Learn more at https://docus.dev
export default withDocus({
  rootDir: __dirname,
  head: {
    title: 'NuxtJS',
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=DM+Serif+Display:ital@0;1&display=swap'
      },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' }
    ],
    meta: [
      { hid: 'og:site_name', property: 'og:site_name', content: 'Nuxt.js' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@nuxt_js' },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://nuxtjs.org/preview.png'
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://nuxtjs.org/preview.png'
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Nuxt.js'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://nuxtjs.org/preview.png'
      }
    ],
    bodyAttrs: {
      class: ['min-w-xs']
    }
  },
  buildModules: ['@nuxt/typescript-build'],
  plugins: ['~/plugins/adblock.client'],
  windicss: {
    root: resolve(__dirname),
    config: resolve(__dirname, 'windi.config.js')
  },
  /**
   * Add image domains for nuxt-image on Vercel
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
  vite: {
    optimizeDeps: {
      include: ['cookie', 'js-cookie', 'property-information', 'clipboard'],
      exclude: ['lokidb']
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
      'images.unsplash.com',
      'unsplash.com',
      'user-images.githubusercontent.com',
      'abs.twimg.com',
      'https://res.cloudinary.com/nuxt/'
    ]
  }
})
