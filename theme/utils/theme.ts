export interface ThemeIcon {
  label: string
  href: string
  component: string
}

export interface ThemeDebugConfig {
  page: boolean
  navigation: boolean
  theme: boolean
}

export interface ThemeConfig {
  title: string
  url: string
  description: string
  twitter: string
  github: string
  cover: string
  coverAlt: string
  header: {
    title: false | string
    logo: boolean | string
  }
  footer: {
    credits:
      | false
      | {
          icon: string
          text: string
        }
    icons: ThemeIcon[]
  }
  debug: boolean | ThemeDebugConfig
}

export const defaultThemeConfig: ThemeConfig = {
  title: 'Docus',
  url: 'https://docus.dev',
  twitter: '@docus_',
  github: 'nuxtlabs/docus',
  description: 'Write pages in markdown, use Vue components and enjoy the power of Nuxt with a blazing fast developer experience.',
  header: {
    title: false,
    logo: true,
  },
  cover: 'https://user-images.githubusercontent.com/904724/105075054-872fac80-5a89-11eb-8aab-46dd254ad986.png',
  coverAlt: 'A screenshot of a website built with Docus with the Docus logo on top of it.',
  footer: {
    credits: {
      icon: 'IconNuxtLabs',
      text: 'Made by NuxtLabs',
    },
    icons: [
      {
        label: 'NuxtJS',
        href: 'https://nuxtjs.org',
        component: 'IconNuxtLabs',
      },
      {
        label: 'Vue Telescope',
        href: 'https://vuetelescope.com',
        component: 'IconVueTelescope',
      },
    ],
  },
  debug: true,
}
