export default defineAppConfig({
  docus: {
    title: 'Docus',
    description: 'The best place to start your documentation.',
    image: '/social-card-preview.png',
    socials: {
      twitter: '@docus_',
      github: 'nuxt-themes/docus'
    },
    github: {
      root: 'content',
      edit: true,
      contributors: false
    },
    footer: {
      icons: [
        {
          label: 'NuxtJS',
          href: 'https://nuxtjs.org',
          icon: 'IconNuxtLabs'
        },
        {
          label: 'Vue Telescope',
          href: 'https://vuetelescope.com',
          icon: 'IconVueTelescope'
        }
      ]
    }
  }
})
