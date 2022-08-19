export default defineAppConfig({
  docus: {
    title: 'Docus',
    description: 'The best place to start your documentation.',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
    socials: {
      twitter: '@docus_',
      github: 'nuxtlabs/docus'
    },
    github: {
      root: 'content',
      edit: true
    },
    aside: {
      level: 1,
      filter: []
    },
    header: {
      title: false,
      logo: true
    },
    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.dev'
      },
      icons: []
    }
  }
})
