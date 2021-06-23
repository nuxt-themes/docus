export default {
  title: 'Docus',
  description: 'Write in markdown, use Vue components, add style with Windi CSS and enjoy the power of Nuxt.',
  url: 'https://docus.dev',
  twitter: 'nuxtlabs',
  template: 'docs',
  credits: true,
  github: {
    repo: 'nuxtlabs/docus',
    branch: 'main',
    dir: 'docs',
    releases: true
  },
  theme: {
    header: {
      title: false,
      logo: {
        light: '/logo-light.svg',
        dark: '/logo-dark.svg'
      }
    }
  }
}
