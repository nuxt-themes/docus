interface Icon {
  label: string
  href: string
  component: string
}

export interface ThemeConfig {
  title: string
  twitter: string
  github: string
  header: {
    title: false | string
    logo: boolean | string
  }
  footer: {
    credits: false | {
      icon: string
      text: string
    }
    icons: Icon[]
  }
}

export const defaultThemeConfig: ThemeConfig = {
  title: 'Docus',
  twitter: '@docus_',
  github: 'nuxtlabs/docus',
  header: {
    title: false,
    logo: true,
  },
  footer: {
    credits: {
      icon: 'IconNuxtLabs',
      text: 'Made by Nuxt Labs',
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
}
