export default {
  title: 'Docus',
  description: 'Write in markdown, use Vue components, add style with Windi CSS and enjoy the power of Nuxt.',
  url: 'https://docus.dev',
  twitter: 'nuxtlabs',
  template: 'docs',
  credits: true,
  logo: {
    light: '/logo-light.svg',
    dark: '/logo-dark.svg'
  },
  theme: {
    header: {
      logo: true,
      title: false
    }
  },
  github: {
    repo: 'nuxtlabs/docus',
    branch: 'main',
    dir: 'docs',
    releases: true
  }
}
