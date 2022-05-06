export interface ThemeIcon {
  label: string
  href: string
  component: string
}

export interface ThemeCoverConfig {
  src: string
  alt: string
}

export interface DocusDebugConfig {
  page: boolean
  navigation: boolean
  theme: boolean
}

export interface ThemeGitHubConfig {
  repository: string
  branch: string
  dir: string
  releases: boolean
}

export interface ThemeHeaderConfig {
  title: false | string
  logo: boolean | string
}

export interface ThemeAsideConfig {
  level: number
  filter: string[]
}

export interface ThemeFooterConfig {
  credits:
    | false
    | {
        icon: string
        text: string
      }
  icons: ThemeIcon[]
}

export interface ThemeSocialsConfig {
  twitter: string
}

export interface ThemeConfig {
  socials: ThemeSocialsConfig
  header: ThemeHeaderConfig
  footer: ThemeFooterConfig
  cover: ThemeCoverConfig
  github: ThemeGitHubConfig
  aside: ThemeAsideConfig
}

export const themeConfig: ThemeConfig = {
  socials: {
    twitter: '@docus_',
  },
  github: {
    repository: 'nuxtlabs/docus',
    branch: 'dev',
    dir: '',
    releases: true,
  },
  aside: {
    level: 0,
    filter: [],
  },
  header: {
    title: false,
    logo: true,
  },
  cover: {
    src: 'https://user-images.githubusercontent.com/904724/105075054-872fac80-5a89-11eb-8aab-46dd254ad986.png',
    alt: 'A screenshot of a website built with Docus with the Docus logo on top of it.',
  },
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
}
