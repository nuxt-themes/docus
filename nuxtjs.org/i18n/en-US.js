export default {
  common: {
    an_error_occurred: 'An error occurred',
    page_not_found: 'Page not found',
    please_define_title: 'Please define a title in the front matter',
    please_define_description:
      'Please define a description in the front matter',
    search: 'Search ("/" to focus)',
    version: 'Version'
  },
  iso: 'en',

  links: {
    download: 'Download',
    live_edit: 'Live Edit'
  },
  header: {
    links: [
      {
        name: 'Docs',
        icon: 'books',
        slug: 'docs-2.x-book-slug'
      },
      {
        name: 'Examples',
        icon: 'code',
        slug: 'examples'
      },
      {
        name: 'Resources',
        icon: 'resources',
        slug: 'resources'
      },
      {
        name: 'Blog',
        icon: 'blog',
        slug: 'blog'
      },
      {
        name: 'Video Courses',
        icon: 'video',
        href: 'https://masteringnuxt.com/?utm_source=nuxt&utm_medium=link&utm_campaign=navbar_link'
      }
    ],
    search: {
      placeholder: 'Search ("/" to focus)'
    }
  },
  homepage: {
    meta: {
      title: 'Nuxt.js - The Intuitive Vue Framework',
      description:
        'Build your next Vue.js application with confidence using NuxtJS. An open source framework making web development simple and powerful.'
    },
    welcome: {
      title: 'The Intuitive {br} {frameworkType} Framework',
      description:
        'Build your next Vue.js application with confidence using NuxtJS. An {openSource} framework making web development simple and powerful.',
      openSource: 'open source',
      get_started: 'get started',
      get_updates: 'Get NuxtJS updates to your inbox each month',
      video: 'Video produced by {company}, download their free {cheatSheet}',
      cheatSheet: 'Nuxt Cheat Sheet.'
    },
    why: {
      title: 'Why {nuxt}',
      try_nuxtjs_online: 'Try NuxtJS Online',
      enjoyable: {
        title: 'Enjoyable',
        description:
          'Our main focus is the Developer Experience. We love Nuxt.js and continuously improve the framework so you love it too! {break} Expect appealing solutions, descriptive error messages, powerful defaults and detailed documentation. If questions or problems come up, our helpful community will help you out.'
      },
      modular: {
        title: 'Modular',
        description:
          "Nuxt is based on a powerful modular architecture. You can choose from more than 50 modules to make your development faster and easier. You don't have to reinvent the wheel to get PWA benefits, add Google Analytics to your page or generate a sitemap."
      },
      performant: {
        title: 'Performant',
        description:
          'With Nuxt.js, your application will be optimized out of the box. We do our best to build performant applications by utilizing Vue.js and Node.js best practices. To squeeze every unnecessary bit out of your app Nuxt includes a bundle analyzer and lots of opportunities to fine-tune your app.'
      }
    },
    companies: {
      title: "Who's using {nuxt}"
    },
    modes: {
      title: '{nuxt} rendering',
      ssr: {
        title: 'Server Side Rendered',
        description:
          'The most popular mode for Nuxt. With SSR, also called "universal" or "isomorphic" mode, a Node.js server will be used to deliver HTML based on your Vue components to the client instead of the pure javascript. Using SSR will lead to a large SEO boost, better UX and more opportunities (compared to a traditional Vue SPA).{break}Because implementing SSR on your own can be really tedious, Nuxt.js gives you full support out of the box and will take care of common pitfalls.'
      },
      ssg: {
        title: 'Statically Generated',
        description:
          'Static Site Generation is a very hot topic right now (aka JAMStack). Instead of switching to another framework and spending time to get used to it, why not kill two birds with one stone? {proverbial} Nuxt.js supports generating a static website based on your Vue application. It is the "best of both worlds" as you don\'t need a server but still have SEO benefits because Nuxt will pre-render all pages and include the necessary HTML. Also, you can deploy the resulting page easily to Netlify or GitHub pages.',
        proverbial: 'only proverbial'
      }
    },
    sponsors: {
      title: 'Sponsors',
      description:
        'NuxtJS is an MIT licensed open source project and completely free to use. However, the amount of effort needed to maintain and develop new features for the project is not sustainable without proper financial backing. If you run a business and are using Nuxt in a revenue-generating product, it makes business sense to sponsor Nuxt development: it ensures the project that your product relies on stays healthy and actively maintained. It can also help your exposure in the Vue/Nuxt community and makes it easier to attract Vue/Nuxt developers. If you are an individual user and have enjoyed the productivity of using Nuxt, consider donating as a sign of appreciation.',
      become_a_sponsor: 'Become a sponsor'
    },
    newsletter: {
      title: '{nuxt} Newsletter',
      description:
        'Get the latest Nuxt news to your inbox, curated by the NuxtJS team.',
      form: {
        email: 'Email',
        subscribing: 'Subscribing...',
        subscribe: 'Subscribe',
        subscribed_messages: {
          pre: 'An email to confirm your subscription has been sent to',
          post: '💚'
        }
      }
    }
  },
  design: {
    meta: {
      title: 'NuxtJS Design',
      description:
        'Download NuxtJS design resources (SVG, icons, emoji and favicon).'
    },
    title: '{nuxt} Design',
    description:
      'NuxtJS is an MIT licensed open source project and completely free to use. {break} You can freely use our logos as long as you mention NuxtJS and link to nuxtjs.org.',
    other_download_message:
      'You can also download our {favicon} or our {sketch} file.'
  },
  resources: {
    meta: {
      title: 'NuxtJS Resources',
      description:
        'Discover a panel of resources made by our partners. By using thoses affiliate resources links, you are helping us to maintain and develop the Open Source Framework.'
    },
    title: '{nuxt} Resources',
    description:
      'Discover a panel of resources made by our partners. By using thoses affiliate resources links, you are helping us to maintain and develop the Open Source Framework.',
    themes: {
      title: 'Themes'
    },
    modules: {
      title: 'Modules'
    },
    examples: {
      title: 'Examples'
    },
    faq: {
      title: 'FAQ'
    },
    videos: {
      title: 'Video Courses'
    }
  },
  shop: {
    meta: {
      title: 'The NuxtJS Shop',
      description:
        'You want to support the NuxtJS project and show your love to the rest of the community? Here our products with the best quality ever!'
    },
    title: 'The {nuxt} Shop',
    description:
      'You want to support the NuxtJS project and show your love to the rest of the community?{break} Here our products with the best quality ever!',
    button: 'Coming soon'
  },
  team: {
    meta: {
      title: 'NuxtJS Team',
      description:
        'NuxtJS has a very active and engaged team that is constantly striving to push Nuxt forward.'
    },
    title: '{nuxt} Team',
    description:
      'The development of NuxtJS and its ecosystem is guided by an international team. We have a very active and engaged team that is constantly striving to push Nuxt forward.'
  },
  themes: {
    meta: {
      title: 'NuxtJS Themes',
      description:
        'With the themes below built by our partners from Creative Tim and Theme Forest you can see how a real world application is built, with Nuxt.js stack behind.'
    },
    title: '{nuxt} Themes',
    description:
      'With the themes below built by our partners from Creative Tim and Theme Forest you can see how a real world application is built, with Nuxt.js stack behind.',
    button: 'GET IT for'
  },
  'video-courses': {
    meta: {
      title: 'NuxtJS Video Courses',
      description:
        'With the video courses below created by our partner VueSchool you can discover and learn more about the Nuxt.js Framework.'
    },
    title: '{nuxt} Video Courses',
    description:
      'With the video courses below you can discover and learn more about the Nuxt Framework.',
    cta: {
      discover: 'Discover Mastering Nuxt',
      start: 'START COURSE'
    }
  },
  sponsor: {
    meta: {
      title: 'Sponsor NuxtJS Development',
      description:
        'You can support NuxtJS development via different methods and ensure regular updates to the framework.'
    },
    title: 'Sponsor {nuxt} Development',
    description:
      'NuxtJS is an MIT licensed open source project and completely free to use.{break} However, the amount of effort needed to maintain and develop new features for the project is not sustainable without proper financial backing.{break} You can support NuxtJS development via the following methods:',
    donations: {
      title: 'One-time donations',
      description: 'We accept donations through these channels'
    },
    pledges: {
      title: 'Recurring Pledges',
      description:
        'Recurring pledges come with exclusive perks, e.g. having your name listed in the NuxtJS GitHub repository, or have your company logo placed on this website. Become a nuxter or sponsor via {opencollective} (goes into a fund with transparent expense models supporting community efforts and events).'
    },
    become_a_sponsor: 'Become a sponsor'
  },
  support: {
    meta: {
      title: 'The NuxtJS Support',
      description:
        'Our NuxtJS team now offers official consulting services for your NuxtJS applications.'
    },
    title: 'Consulting {nuxt} Support',
    description:
      'Our {team} now offers official consulting services for your NuxtJS applications.{break} We offer different services depending of your needs, from technical support to custom development. Expect a reply within one business day, we can sign custom NDA and you can get a full refund if you are not satisfied with our service.',
    technical: {
      title: 'Technical support',
      description:
        'Get project audits, app deployments, custom development and technical support from the NuxtJS team.',
      start: 'Start chat',
      partner: {
        pre: 'We partnered with',
        post: 'to offer these services so we can focus on helping you as fast as possible.'
      }
    },
    entreprise: {
      title: 'for enterprise',
      description:
        'NuxtJS and the maintainers of thousands of other packages are working with Tidelift to deliver one enterprise subscription that covers all of the open source you use.{break} If you want the flexibility of open source and the confidence of commercial-grade software, this is for you.',
      partner: {
        pre: 'Available as part of the',
        post: 'subscription.'
      },
      learn_more: 'Learn more',
      request_a_demo: 'Request a demo'
    }
  },
  blog: {
    meta: {
      title: 'NuxtJS Blog',
      description:
        'Discover articles from the NuxtJS team and NuxtJS Community about NuxtJS, tips and tricks included!'
    },
    title: '{nuxt} Blog',
    description:
      'Discover articles from the {nuxtTeam} and {nuxtCommunity} about NuxtJS, tips and tricks included!',
    nuxt_team: 'NuxtJS Team',
    nuxt_community: 'Nuxt.js Community',
    contribute: 'Caught a mistake or want to contribute to this blog post?'
  },
  guide: {
    release_notes: 'Release Notes',
    toc_title: 'On this page'
  },
  quiz: {
    title: 'Quiz'
  },
  tryNewDocs: {
    msg1: 'Want to take a look at our new docs? Our ',
    link: 'new docs',
    msg2: 'are now in beta. Have fun!'
  },
  contribute: {
    title: 'Contributors',
    docs: 'Caught a mistake or want to contribute to the documentation?',
    blog: 'Caught a mistake or want to contribute to this blog post?',
    edit_on_github: 'Edit this page on GitHub!',
    msg1: 'Contribution for this page is now closed. If you would like to contribute please check out our',
    link: 'new docs'
  },
  example: {
    intro: 'In this example:'
  },
  codeSandbox: {
    open: 'See Example'
  },
  content: {
    guide: {
      prologue: 'Prologue',
      'getting-started': 'Getting Started'
    },
    api: {
      essential: 'Essential',
      pages: 'Pages',
      components: 'Components',
      utils: 'Utils',
      configuration: 'Configuration',
      programmatically: 'Programmatically',
      internals: 'Internals'
    },
    examples: {
      routing: 'Routing',
      dataFetching: 'Data Fetching',
      assetManagement: 'Asset Management',
      transitions: 'Transitions',
      seo: 'SEO',
      loading: 'Loading',
      miscellaneous: 'Miscellaneous',
      middleware: 'Middleware',
      plugins: 'Plugins',
      modules: 'Modules',
      customization: 'Customization',
      advanced: 'Advanced'
    },
    faq: {
      configuration: 'Configuration',
      development: 'Development',
      deployment: 'Deployment'
    },
    guides: {
      'get-started': 'Get Started',
      concepts: 'Concepts',
      features: 'Features',
      'directory-structure': 'Directory Structure',
      'configuration-glossary': 'Configuration Glossary',
      'internals-glossary': 'Internals Glossary',
      'components-glossary': 'Components Glossary',
      deployment: 'Deployment',
      examples: 'Examples'
    }
  },
  footer: {
    links: {
      discover: {
        title: 'Discover',
        shop: 'Our Goodies Store',
        consulting: 'Training & consultancy',
        sponsorNuxt: 'Sponsoring & donations'
      },
      about: {
        title: 'Help',
        team: 'Our team',
        design: 'Design kit',
        contact: 'Contact us'
      },
      support: {
        title: 'Support',
        resources: 'Resources',
        discord: 'Chat with us',
        contributionGuide: 'Contribution guide'
      }
    }
  },
  cookies: {
    consent: 'We use Cookies for user analysis and on-page improvements!',
    linkLabel: 'Learn about cookies',
    button: 'Got it'
  }
}
