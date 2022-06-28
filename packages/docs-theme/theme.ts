export const themeConfig = {
  layout: 'docs',
  socials: [
    {
      label: 'Twitter',
      href: 'https://twitter.com/@docus_',
      icon: 'fa-brands:twitter',
    },
    {
      label: 'Github',
      href: 'https://github.com/nuxtlabs/docus',
      icon: 'fa-brands:github',
    },
  ],
  github: {
    root: 'content',
    edit: true,
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
      icon: 'IconDocus',
      text: 'Powered by Docus',
      href: 'https://docus.com',
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
