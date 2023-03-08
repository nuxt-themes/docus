export default defineAppConfig({
  docus: {
    title: 'Docus',

    description: 'The best place to start your documentation.',

    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',

    socials: {},

    layout: 'default',

    // textDirection: 'rtl',

    header: {
      title: '',
      logo: false,
      showLinkIcon: false,
      fluid: false,
      exclude: []
    },

    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },

    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.dev'
      },
      textLinks: [],
      iconLinks: [],
      fluid: false
    },

    github: {
      dir: undefined,
      branch: undefined,
      repo: undefined,
      owner: undefined,
      edit: false
    }
  }
})
