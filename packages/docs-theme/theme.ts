export const themeConfig = {
  layout: 'docs',
  socials: {
    twitter: '@docus_',
  },
  github: {
    showVersion: true,
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
