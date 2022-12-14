export default defineNuxtConfigSchema({
  appConfig: {
    docus: {
      /**
       * Website title, used as header default title and meta title.
       */
      title: 'Docus',
      /**
       * Website description, used for meta description.
       */
      description: 'The best place to start your documentation.',
      /**
       * Cover image.
       *
       * @example '/cover.jpg'
       */
      image:
        'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
      /**
       * Social links.
       *
       * Will be used in Social Icons component, in AppHeader and AppFooter.
       */
      socials: {
        /**
         * Twitter social handle
         * @example 'nuxt_js'
         */
        twitter: '',
        /**
         * GitHub org or repository
         * @example 'nuxt/framework'
         */
        github: '',
        facebook: '',
        instagram: '',
        youtube: '',
        medium: ''
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
         *
         * @type {string[]}
         */
        exclude: []
      },
      header: {
        /**
         * Title to be displayed in header or as aria-label if logo is defined
         *
         * Default to docus.title
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
         */
        exclude: []
      },
      footer: {
        /**
         * Credits configuration
         *
         * Object configuring the credits part of footer.
         *
         * @type {false|object}
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
                label: { type: 'number', description: 'Label of the icon' }
              }
            }
          }
        }
      }
    }
  }
})
