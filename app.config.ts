export default defineAppConfig({
  docus: {
    /**
     * Website title.
     */
    title: 'Docus',
    /**
     * Website description.
     */
    description: 'The best place to start your documentation.',
    /**
     * Cover image.
     */
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
    /**
     * Social links.
     *
     * Will be used in Social Icons component, in AppHeader and AppFooter.
     */
    socials: {
      // twitter: '@nuxt_js',
      // github: 'https://github.com/nuxt-themes/docus',
      // facebook: '',
      // instagram: '',
      // youtube: '',
      // medium: ''
    },
    aside: {
      /**
       * The level to which the navigation should be scaled.
       *
       * Use 0 to disable all nesting.
       * Use 1 and more to display nested navigation in header and aside navigation.
       */
      level: 0,
      /**
       * Specify if default collapsibles state globally for aside navigation.
       */
      collapsed: false,
      /**
       * Paths to be excluded from aside navigation.
       */
      exclude: []
    },
    header: {
      /**
       * Title to be displayed in header.
       */
      title: '',
      /**
       * Logo configuration
       *
       * Boolean to disable or use the `Logo.vue` component.
       * String to be used as a name of a component.
       */
      logo: false,
      /**
       * Toggle links icons in the header.
       */
      showLinkIcon: false,
      /**
       * Paths to be excluded from header links.
       */
      exclude: []
    },
    footer: {
      /**
       * Credits configuration
       *
       * Object configuring the credits part of footer.
       * Boolean to disable.
       */
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.dev'
      },
      /**
       * Icons to be added to Social Icons in footer.
       */
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
