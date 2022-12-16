export default defineNuxtConfigSchema({
  appConfig: {
    /**
     * Docus theme configuration.
     *
     * @studio-icon material-symbols:docs
     */
    docus: {
      /**
       * Website title, used as header default title and meta title.
       *
       * @studio-icon material-symbols:title
       */
      title: 'Docus',
      /**
       * Website description, used for meta description.
       *
       * @studio-icon material-symbols:description
       */
      description: 'The best place to start your documentation.',
      /**
       * Cover image.
       *
       * @example '/cover.jpg'
       *
       * @studio-icon dashicons:cover-image
       */
      image:
        'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
      /**
       * Social links.
       *
       * Will be used in Social Icons component, in AppHeader and AppFooter.
       *
       * @studio-icon material-symbols:share-outline
       */
      socials: {
        /**
         * Twitter social handle
         * @example 'nuxt_js'
         * @studio-icon simple-icons:twitter
         */
        twitter: '',
        /**
         * GitHub org or repository
         * @example 'nuxt/framework'
         * @studio-icon simple-icons:github
         */
        github: '',
        /**
         * Facebook page url
         * @example https://www.facebook.com/groups/nuxtjs
         * @studio-icon simple-icons:facebook
         */
        facebook: '',
        /**
         * Instagram page url
         * @example https://www.instagram.com/wearenuxt
         * @studio-icon simple-icons:instagram
         */
        instagram: '',
        /**
         * Instagram page url
         * @example https://www.youtube.com/@NuxtLabs
         * @studio-icon simple-icons:youtube
         */
        youtube: '',
        /**
         * Medium page url
         * @example https://medium.com/nuxt
         * @studio-icon simple-icons:medium
         */
        medium: ''
      },
      /**
       * Aside navigation configuration
       *
       * @studio-icon fluent:document-page-24-regular
       */
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
         *
         * @type {string[]}
         */
        exclude: []
      },
      /**
       * Header configuration
       *
       * @studio-icon fluent:document-header-24-regular
       */
      header: {
        /**
         * Title to be displayed in header or as aria-label if logo is defined
         *
         * Default to docus.title
         *
         * @studio-icon material-symbols:title
         */
        title: '',
        /**
         * Logo configuration
         *
         * Boolean to disable or use the `Logo.vue` component.
         *
         * String to be used as a name of a component.
         *
         * @example 'MyLogo'
         */
        logo: false,
        /**
         * Toggle links icons in the header.
         */
        showLinkIcon: false,
        /**
         * Paths to be excluded from header links.
         *
         * @type {string[]}
         *
         */
        exclude: []
      },
      /**
       * Footer configuration
       *
       * @studio-icon fluent:document-footer-24-regular
       */
      footer: {
        /**
         * Credits configuration
         *
         * Object configuring the credits part of footer.
         *
         * @type {false|object}
         *
         * @studio-icon material-symbols:copyright
         */
        credits: {
          /**
           * Icon to show on credits
           * @formtype Icon
           */
          icon: 'IconDocus',
          text: 'Powered by Docus',
          href: 'https://docus.dev'
        },
        /**
         * Icons to be added to Social Icons in footer.
         *
         * @studio-icon material-symbols:add-link
         */
        iconLinks: {
          $schema: {
            type: 'array',
            items: {
              type: 'object',
              required: ['icon', 'href'],
              properties: {
                icon: { type: 'string', description: 'Icon name' },
                href: {
                  type: 'string',
                  description: 'Link when clicking on the icon'
                },
                label: { type: 'string', description: 'Label of the icon' }
              }
            }
          }
        }
      }
    }
  }
})
