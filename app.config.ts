export default defineAppConfig({
  docus: {
    title: 'Docus',
    description: 'The best place to start your documentation.',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
    socials: {
      // twitter: '@nuxt_js',
      // github: 'https://github.com/nuxt-themes/docus',
      // facebook: '',
      // instagram: '',
      // youtube: '',
      // medium: ''
    },
    aside: {
      level: 0,
      exclude: []
    },
    header: {
      title: '',
      logo: false, // TODO: handle logo as string for component
      showLinkIcon: false, // Toggle links icons in the header
      exclude: []
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

declare module '@nuxt/schema' {
  interface AppConfigInput {
    docus?: {
      title?: string
      description?: string
      image?: string
      socials?: {
        twitter?: string
        github?: string
        facebook?: string
        instagram?: string
        youtube?: string
        medium?: string
      },
      aside?: {
        level: number
        exclude?: string[]
      },
      header?: {
        title?: string,
        logo?: boolean
        showLinkIcon?: boolean
        exclude?: string[]
      },
      footer?: {
        credits?: boolean
        iconLinks?: IconLink[]
      }
    }
  }
}

interface IconLink {
  href: string
  icon: string
  label?: string
}
