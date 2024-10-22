export default defineAppConfig({
  nuxtIcon: {
    aliases: {
      'type:primary': 'tabler:info-square-rounded-filled',
      'type:secondary': 'tabler:info-square-rounded-filled',
      'type:info': 'tabler:info-square-rounded-filled',
      'type:success': 'tabler:square-rounded-check-filled',
      'type:warning': 'tabler:alert-triangle-filled',
      'type:danger': 'tabler:alert-circle-filled',
      'type:neutral': 'tabler:info-square-rounded-filled',
      'list:primary': 'heroicons-outline:check',
      'list:secondary': 'heroicons-outline:check',
      'list:neutral': 'heroicons-outline:check',
      'list:info': 'ion:information',
      'list:success': 'heroicons-outline:check',
      'list:warning': 'bi:exclamation-lg',
      'list:danger': 'octicon:x-16'
    }
  },
  docus: {
    title: 'Docus',

    description: 'The best place to start your documentation.',

    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',

    socials: {},

    layout: 'default',

    rtl: false,

    header: {
      title: '',
      logo: false,
      showLinkIcon: false,
      exclude: []
    },

    aside: {
      level: 0,
      collapsed: false,
      collapsible: true,
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
