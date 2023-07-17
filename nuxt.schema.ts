export default defineNuxtSchema({
  appConfig: {
    /**
     * Docus theme configuration.
     *
     * @studioIcon material-symbols:docs
     */
    docus: {
      /**
       * Website title, used as header default title and meta title.
       *
       * @studioIcon material-symbols:title
       */
      title: 'Docus',
      /**
       * The website title template, to overwrite the default one.
       */
      titleTemplate: '%s · Docus',
      /**
       * Website description, used for meta description.
       *
       * @studioIcon material-symbols:description
       */
      description: 'The best place to start your documentation.',
      /**
       * Cover image.
       *
       * @example '/cover.jpg'
       *
       * @studioIcon dashicons:cover-image
       * @studioInput file
       */
      image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',

      /**
       * Social links
       *
       * Will be used in AppSocialIcons component.
       *
       * @studioIcon material-symbols:share-outline
       */
      socials: {
        /**
         * Twitter social handle
         * @example 'nuxt_js'
         * @studioIcon simple-icons:twitter
         */
        twitter: '',
        /**
         * GitHub org or repository
         * @example 'nuxt/framework'
         * @studioIcon simple-icons:github
         */
        github: '',
        /**
         * Facebook page url
         * @example https://www.facebook.com/groups/nuxtjs
         * @studioIcon simple-icons:facebook
         */
        facebook: '',
        /**
         * Instagram page url
         * @example https://www.instagram.com/wearenuxt
         * @studioIcon simple-icons:instagram
         */
        instagram: '',
        /**
         * Instagram page url
         * @example https://www.youtube.com/@NuxtLabs
         * @studioIcon simple-icons:youtube
         */
        tiktok: '',
        /**
         * TikTok page url
         * @example https://www.tiktok.com/@tiktok
         * @studioIcon simple-icons:tiktok
         */
        youtube: '',
        /**
         * Medium page url
         * @example https://medium.com/nuxt
         * @studioIcon simple-icons:medium
         */
        medium: ''
      },

      /**
       * Theme layout configuration.
       *
       * @type {'default'|'page'}
       * @studioIcon tabler:arrow-autofit-width
       */
      layout: 'default',

      /**
       * Aside navigation configuration.
       *
       * @studioIcon fluent:document-page-24-regular
       */
      aside: {
        /**
         * Aside navigation level
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
       * Header configuration.
       *
       * @studioIcon fluent:document-header-24-regular
       */
      header: {
        /**
         * Website title
         *
         * Title to be displayed in header or as aria-label if logo is defined.
         *
         * Default to docus.title
         *
         * @studioIcon material-symbols:title
         */
        title: '',
        /**
         * Logo configuration
         *
         * Boolean to disable or use the `Logo.vue` component.
         *
         * String to be used as a name of a component.
         *
         * Object that sets the light and dark logos.
         *
         * @type {boolean|string|{dark: string, light: string}}
         * @example 'MyLogo'
         * @studioInput boolean
         */
        logo: false,
        /**
         * Header links
         *
         * Toggle links icons in the header.
         */
        showLinkIcon: false,
        /**
         * Paths to be excluded from header links.
         *
         * @type {string[]}
         *
         */
        exclude: [],
        /**
         * Makes the content of the header fluid.
         */
        fluid: false
      },

      /**
       * Main content configuration.
       *
       * @studioIcon fluent:document-header-footer-24-filled
       */
      main: {
        /**
         * Makes the content of the main container fluid.
         */
        fluid: false,
        /**
         * Makes the content of the main container padded.
         */
        padded: true
      },

      /**
       * Footer configuration
       *
       * @studioIcon fluent:document-footer-24-regular
       */
      footer: {
        /**
         * Website credits configuration.
         *
         * @type {false|{icon: string, text: string, href: string}}
         *
         * @studioIcon material-symbols:copyright
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
         * Text links
         *
         * Will be added into center section of the footer.
         *
         * @studioIcon material-symbols:add-link
         */
        textLinks: {
          $schema: {
            type: 'array',
            items: {
              type: 'object',
              required: ['text', 'href'],
              properties: {
                href: {
                  type: 'string',
                  description: 'URL when clicking the link'
                },
                text: {
                  type: 'string',
                  description: 'Text of the link'
                },
                target: {
                  type: 'string',
                  description: 'Target attribute of the link'
                },
                rel: {
                  type: 'string',
                  description: 'Rel attribute of the link'
                }
              }
            }
          }
        },
        /**
         * Icon links
         *
         * Icons to be added to Social Icons in footer.
         *
         * @studioIcon material-symbols:add-link
         */
        iconLinks: {
          $schema: {
            type: 'array',
            items: {
              type: 'object',
              required: ['icon', 'href'],
              properties: {
                icon: {
                  type: 'string',
                  description: 'Icon name'
                },
                href: {
                  type: 'string',
                  description: 'Link when clicking on the icon'
                },
                label: {
                  type: 'string',
                  description: 'Label of the icon'
                },
                rel: {
                  type: 'string',
                  description: 'Rel attribute of the link'
                }
              }
            }
          }
        },
        /**
         * Makes the content of the footer fluid.
         */
        fluid: true
      },

      /**
       * GitHub integration
       *
       * Configure the Edit on Github integration.
       *
       * @studioIcon simple-icons:github
       */
      github: {
        /**
         * Base URL
         *
         * You can use this to link to GitHub Enterprise.
         */
        baseUrl: 'https://github.com',
        /**
         * Directory
         *
         * Your GitHub repository root directory.
         */
        dir: '',
        /**
         * Branch
         *
         * Your GitHub repository branch.
         */
        branch: '',
        /**
         * Repository
         *
         * Your GitHub repository name.
         */
        repo: '',
        /**
         * Owner
         *
         * Your GitHub repository owner.
         */
        owner: '',
        /**
         * EditOnGithub
         *
         * Display EditOnGithub button.
         */
        edit: false
      }
    }
  }
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function defineNuxtSchema(_arg0: {
  appConfig: {
    /**
     * Docus theme configuration.
     *
     * @studioIcon material-symbols:docs
     */
    docus: {
      /**
       * Website title, used as header default title and meta title.
       *
       * @studioIcon material-symbols:title
       */
      title: string;
      /**
       * The website title template, to overwrite the default one.
       */
      titleTemplate: string;
      /**
       * Website description, used for meta description.
       *
       * @studioIcon material-symbols:description
       */
      description: string;
      /**
       * Cover image.
       *
       * @example '/cover.jpg'
       *
       * @studioIcon dashicons:cover-image
       * @studioInput file
       */
      image: string;
      /**
       * Social links
       *
       * Will be used in AppSocialIcons component.
       *
       * @studioIcon material-symbols:share-outline
       */
      socials: {
        /**
         * Twitter social handle
         * @example 'nuxt_js'
         * @studioIcon simple-icons:twitter
         */
        twitter: string;
        /**
         * GitHub org or repository
         * @example 'nuxt/framework'
         * @studioIcon simple-icons:github
         */
        github: string;
        /**
         * Facebook page url
         * @example https://www.facebook.com/groups/nuxtjs
         * @studioIcon simple-icons:facebook
         */
        facebook: string;
        /**
         * Instagram page url
         * @example https://www.instagram.com/wearenuxt
         * @studioIcon simple-icons:instagram
         */
        instagram: string;
        /**
         * Instagram page url
         * @example https://www.youtube.com/@NuxtLabs
         * @studioIcon simple-icons:youtube
         */
        tiktok: string;
        /**
         * TikTok page url
         * @example https://www.tiktok.com/@tiktok
         * @studioIcon simple-icons:tiktok
         */
        youtube: string;
        /**
         * Medium page url
         * @example https://medium.com/nuxt
         * @studioIcon simple-icons:medium
         */
        medium: string;
      };
      /**
       * Theme layout configuration.
       *
       * @type {'default'|'page'}
       * @studioIcon tabler:arrow-autofit-width
       */
      layout: string;
      /**
       * Aside navigation configuration.
       *
       * @studioIcon fluent:document-page-24-regular
       */
      aside: {
        /**
         * Aside navigation level
         *
         * Use 0 to disable all nesting.
         * Use 1 and more to display nested navigation in header and aside navigation.
         */
        level: number;
        /**
         * Specify if default collapsibles state globally for aside navigation.
         */
        collapsed: boolean;
        /**
         * Paths to be excluded from aside navigation.
         *
         * @type {string[]}
         */
        exclude: never[];
      };
      /**
       * Header configuration.
       *
       * @studioIcon fluent:document-header-24-regular
       */
      header: {
        /**
         * Website title
         *
         * Title to be displayed in header or as aria-label if logo is defined.
         *
         * Default to docus.title
         *
         * @studioIcon material-symbols:title
         */
        title: string;
        /**
         * Logo configuration
         *
         * Boolean to disable or use the `Logo.vue` component.
         *
         * String to be used as a name of a component.
         *
         * Object that sets the light and dark logos.
         *
         * @type {boolean|string|{dark: string, light: string}}
         * @example 'MyLogo'
         * @studioInput boolean
         */
        logo: boolean;
        /**
         * Header links
         *
         * Toggle links icons in the header.
         */
        showLinkIcon: boolean;
        /**
         * Paths to be excluded from header links.
         *
         * @type {string[]}
         *
         */
        exclude: never[];
        /**
         * Makes the content of the header fluid.
         */
        fluid: boolean;
      };
      /**
       * Main content configuration.
       *
       * @studioIcon fluent:document-header-footer-24-filled
       */
      main: {
        /**
         * Makes the content of the main container fluid.
         */
        fluid: boolean;
        /**
         * Makes the content of the main container padded.
         */
        padded: boolean;
      };
      /**
       * Footer configuration
       *
       * @studioIcon fluent:document-footer-24-regular
       */
      footer: {
        /**
         * Website credits configuration.
         *
         * @type {false|{icon: string, text: string, href: string}}
         *
         * @studioIcon material-symbols:copyright
         */
        credits: {
          /**
           * Icon to show on credits
           * @formtype Icon
           */
          icon: string; text: string; href: string;
        };
        /**
         * Text links
         *
         * Will be added into center section of the footer.
         *
         * @studioIcon material-symbols:add-link
         */
        textLinks: { $schema: { type: string; items: { type: string; required: string[]; properties: { href: { type: string; description: string; }; text: { type: string; description: string; }; target: { type: string; description: string; }; rel: { type: string; description: string; }; }; }; }; };
        /**
         * Icon links
         *
         * Icons to be added to Social Icons in footer.
         *
         * @studioIcon material-symbols:add-link
         */
        iconLinks: { $schema: { type: string; items: { type: string; required: string[]; properties: { icon: { type: string; description: string; }; href: { type: string; description: string; }; label: { type: string; description: string; }; rel: { type: string; description: string; }; }; }; }; };
        /**
         * Makes the content of the footer fluid.
         */
        fluid: boolean;
      };
      /**
       * GitHub integration
       *
       * Configure the Edit on Github integration.
       *
       * @studioIcon simple-icons:github
       */
      github: {
        /**
         * Base URL
         *
         * You can use this to link to GitHub Enterprise.
         */
        baseUrl: string;
        /**
         * Directory
         *
         * Your GitHub repository root directory.
         */
        dir: string;
        /**
         * Branch
         *
         * Your GitHub repository branch.
         */
        branch: string;
        /**
         * Repository
         *
         * Your GitHub repository name.
         */
        repo: string;
        /**
         * Owner
         *
         * Your GitHub repository owner.
         */
        owner: string;
        /**
         * EditOnGithub
         *
         * Display EditOnGithub button.
         */
        edit: boolean;
      };
    };
  };
}) {
  throw new Error('Function not implemented.')
}

