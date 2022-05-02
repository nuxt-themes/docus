import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt'
import colors from 'tailwindcss/colors.js'
import { resolve } from 'pathe'
import { defineNuxtModule } from '@nuxt/kit'
import consola from 'consola'
import { version } from '../package.json'

const themeDir = fileURLToPath(new URL('./', import.meta.url))
const resolveThemeDir = (path: string) => resolve(themeDir, path)

const plugins = []

const components = [
  {
    prefix: '',
    path: './components/app',
    global: true,
  },
  {
    prefix: '',
    path: './components/docs',
    global: true,
  },
  {
    prefix: '',
    path: './components/prose',
    global: true,
  },
  {
    prefix: '',
    path: './components/globals',
    global: true,
  },
  {
    prefix: '',
    path: './components/content',
    global: true,
  },
  {
    prefix: '',
    path: './components/icons',
    global: true,
  },
  {
    prefix: '',
    path: './components/icons',
    global: true,
  },
]

// Only register the plugin in development as it's not needed in production
if (process.env.NODE_ENV === 'development') {
  // Dev plugin
  plugins.push({
    src: resolveThemeDir('utils/plugin.ts'),
  })
}

// Dev components
components.push({
  prefix: '',
  path: './components/dev',
  global: true,
})

export default defineNuxtConfig({
  /*
  runtimeConfig: {
    public: {
      plausible: {
        domain: process.env.PLAUSIBLE_DOMAIN,
      },
    },
  },
  */
  plugins,
  head: {
    title: 'Docus',
    link: [
      /*
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
      },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      */
    ],
    meta: [
      { hid: 'og:site_name', property: 'og:site_name', content: 'Nuxt 3' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
    ],
  },
  loading: {
    color: '#00DC82',
  },
  /**
   * Components
   */
  // To enable for `components` middleware
  //
  // components: [
  //   './components/app',
  //   './components/docs',
  //   './components/prose',
  //   './components/globals',
  //   './components/content',
  //   './components/dev',
  //   {
  //     prefix: '',
  //     path: './components/icons',
  //     global: true,
  //   },
  // ],
  // To enable for working build
  components,
  css: [
    resolveThemeDir('assets/css/fonts.css'),
  ],
  tailwindcss: {
    viewer: false,
    cssPath: resolveThemeDir('assets/css/main.css'),
    config: {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            gray: colors.gray,
            primary: colors.indigo,
          },
          fontFamily: {
            sans: 'Inter, sans-serif',
          },
          spacing: {
            base: '320px',
            header: 'var(--header-height)',
          },
          maxWidth: {
            '8xl': '90rem',
          },
        },
      },
      plugins: [
        require('@tailwindcss/typography'),
        // Gives errors in console (color-adjust)
        // require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
      ],
      content: [
        '~/content/**/*.{md,yml,json,json5,csv}',
        resolveThemeDir('assets/**/*.{mjs,vue,js,ts}'),
        resolveThemeDir('components/**/*.{mjs,vue,js,ts}'),
        resolveThemeDir('layouts/**/*.{mjs,vue,js,ts}'),
        resolveThemeDir('pages/**/*.{mjs,vue,js,ts}'),
      ],
      safelist: [24, 36, 48, 60, 72, 84, 96, 108, 120].map(number => `pl-[${number}px]`),
    },
  },
  content: {
    highlight: {
      theme: 'one-dark-pro',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash'],
    },
  },
  colorMode: {
    classSuffix: '',
  },
  github: {
    repo: 'nuxt/framework',
  },
  /**
   * Modules
   */
  modules: [
    '@docus/github',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxthq/admin',
    // 'vue-plausible',
    '@vueuse/nuxt',
    // Docus module
    defineNuxtModule({
      meta: {
        name: 'docus',
      },
      setup(_, nuxt) {
        nuxt.hook('modules:done', () => {
          consola.success(`Using Docus v${version}`)
        })
      },
    }),
  ],
})
