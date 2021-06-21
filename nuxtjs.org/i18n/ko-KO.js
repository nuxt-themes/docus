import ko from '~docus-i18n/ko-KO'

export default {
  ...ko,
  common: {
    an_error_occurred: '에러가 발생했습니다.',
    page_not_found: '페이지를 찾을 수 없습니다.',
    please_define_title: 'front matter에 title을 정의해주세요.',
    please_define_description: 'front matter에 description을 정의해주세요.',
    search: '검색 ("/" to focus)',
    version: '버전'
  },
  iso: 'ko',

  links: {
    download: '다운로드',
    live_edit: '라이브 수정'
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
      placeholder: '검색 ("/" to focus)'
    }
  },
  homepage: {
    meta: {
      title: 'Nuxt.js - Vue.js 프레임워크',
      description:
        'Nuxt.js는 Vue.js 애플리케이션 개발을 즐겁게 하는 데 필요한 모든 구성을 사전 설정합니다. Nuxt.js는 범용, SPA 및 정적 생성 애플리케이션을 만들 수 있습니다.'
    },
    welcome: {
      title: '직관적인 {br} {frameworkType} 프레임워크',
      description:
        'NuxtJS를 사용하여 신뢰 있는 Vue.js 애플리케이션을 구축하세요. 웹 개발을 간단하고 강력하게 만드는 오픈 소스 프레임워크입니다.',
      openSource: 'open source',
      get_started: '시작하기',
      get_updates: '매달 NuxtJS 업데이트 사항을 메일에서 확인하세요',
      video: '해당 비디오는 {company}가 제작하였고, {cheatSheet}에서 무료로 받으실 수 있습니다.',
      cheatSheet: 'Nuxt Cheat Sheet.'
    },
    why: {
      title: '왜 {nuxt} 일까요?',
      try_nuxtjs_online: 'NuxtJS Online 시작하기',
      enjoyable: {
        title: 'Enjoyable',
        description:
          '우리는 개발자 경험을 중시합니다. Nuxt.js를 사랑하는 마음으로 이 프레임워크를 개발하고 있으며, 여러분들도 이 프레임워크를 사랑할 수 있으리라 생각합니다{break} 매력적인 솔루션, 자세한 에러 메세지, 강력한 디폴트들과 상세한 문서화를 기대해주세요. 질문이나 이슈가 있으시다면, 우리의 커뮤니티가 여러분을 기꺼이 도와드리겠습니다.'
      },
      modular: {
        title: 'Modular',
        description:
          'Nuxt.js는 강력한 모듈 아키텍쳐에 기반해 있습니다. Nuxt.js에서 여러분은 개발을 더 빠르고 쉽게 만들기 위한 50개 이상의 모듈을 고르실 수 있습니다. PWA 베네핏을 받거나, Google Analytics를 페이지에 추가하거나, 사이트 맵을 생성하기 위해 시간을 낭비할 필요가 없습니다.'
      },
      performant: {
        title: 'Performant',
        description:
          '여러분은 Nuxt.js를 사용해 즉시 애플리케이션을 최적화시킬 수 있습니다. 저희는 Vue.js와 Node.js의 모범 사례를 활용하여 고성능 애플리케이션을 구축하기 위해 최선을 다하고 있습니다. 앱에서 불필요한 모든 비트를 줄이기 위해 Nuxt는 번들 분석기와 앱을 미세 조정할 수 있는 많은 수단을 가지고 있습니다.'
      }
    },
    companies: {
      title: '누가 {nuxt} 를 사용하고 있나요?'
    },
    modes: {
      title: '{nuxt} 렌더링',
      ssr: {
        title: '서버 사이드 렌더링',
        description:
          '가장 Nuxt에서 인기있는 모드입니다. "범용(universal)" 혹은 "동형(isomorphic)" 모드라고도 불리는 SSR로, Node.js 서버는 순수 자바스크립트 대신 Vue 컴포넌트에 기반한 HTML을 클라이언트에 전달합니다. SSR로 기존 Vue SPA와 비교했을 때 SEO는 크게 개선될 수 있고, 더 나은 UX 뿐 아니라 더 많은 혜택을 얻을 수 있습니다. {break} 여러분이 직접 SSR을 구현하는 것은 매우 귀찮은 작업일 수 있기 때문에, Nuxt.js는 바로 여기에 대한 모든 지원을 제공하며 일반적인 위험요소들을 처리할 것입니다.'
      },
      ssg: {
        title: '정적 사이트 생성',
        description:
          'JAMStack이라고 불리는 정적 사이트 생성(Static Site Generation)은 지금 아주 핫한 주제 중 하나입니다. 다른 프레임워크로 바꾸어 거기에 익숙해지는 데 시간을 쓰는 대신에, {proverbial}해보시는건 어떤가요? Nuxt.js는 Vue 애플리케이션에 기반한 정적 웹 사이트 생성을 지원합니다. Nuxt는 모든 페이지를 사전 렌더링하고 필요한 HTML을 포함시킬 수 있으므로, "양쪽에 최선"으로 서버 없이 SEO 혜택을 가질 수 있습니다.',
        proverbial: '일석이조'
      }
    },
    sponsors: {
      title: '스폰서',
      description:
        'NuxtJS 는 MIT 라이센스 오픈 소스 프로젝트이며 완전 무료입니다. 그러나 적절한 재정적 지원 없이는 프로젝트의 새로운 기능을 유지하고 개발하는 데 필요한 노력이 지속되기가 힘듭니다. 비즈니스를 운영하고 수익 창출 제품에서 Nuxt를 사용하는 경우 Nuxt 개발을 후원해주시는 것이 이상적일 것입니다. 이는 여러분의 제품이 의존하고 있는 이 프로젝트가 원활하게 유지될 수 있게 합니다. 또한 Vue/Nuxt 커뮤니티에 노출되는 데 도움이되며 Vue/Nuxt 개발자를 더 쉽게 구하는데 도움이 됩니다. 개인 사용자이고 Nuxt를 사용하는 것으로 생산성을 높이셨다면, 감사의 표시로 기부에 대해 생각해주세요.',
      become_a_sponsor: '스폰서되기'
    },
    newsletter: {
      title: '{nuxt} Newsletter',
      description: '저희 코어 팀과 컨트리뷰터들이 작성한 Nuxt의 최신 뉴스를 받아보세요.',
      form: {
        email: 'Email',
        subscribing: '구독중...',
        subscribe: '구독하기',
        subscribed_messages: {
          pre: '구독 확인용 이메일이 주소로 전송되었습니다.',
          post: '💚'
        }
      }
    }
  },
  design: {
    meta: {
      title: 'NuxtJS Design',
      description: 'Download NuxtJS design resources (SVG, icons, emoji and favicon).'
    },
    title: '{nuxt} Design',
    description:
      'NuxtJS is an MIT licensed open source project and completely free to use. {break} You can freely use our logos as long as you mention NuxtJS and link to nuxtjs.org.',
    other_download_message: 'You can also download our {favicon} or our {sketch} file.'
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
      description: 'NuxtJS has a very active and engaged team that is constantly striving to push Nuxt forward.'
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
      'With the video courses below created by our partner VueSchool you can discover and learn more about the Nuxt.js Framework.',
    cta: {
      discover: 'Discover vueschool',
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
      description: 'Our NuxtJS team now offers official consulting services for your NuxtJS applications.'
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
      description: 'Discover articles from the NuxtJS team and NuxtJS Community about NuxtJS, tips and tricks included!'
    },
    title: '{nuxt} Blog',
    description: 'Discover articles from the {nuxtTeam} and {nuxtCommunity} about NuxtJS, tips and tricks included!',
    nuxt_team: 'NuxtJS Team',
    nuxt_community: 'Nuxt.js Community',
    contribute: 'Caught a mistake or want to contribute to this blog post?'
  },
  guide: {
    release_notes: '릴리즈 노트',
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
    docs: '잘못된 부분이 있거나 이 문서에 기여하고 싶으신가요?',
    blog: 'Caught a mistake or want to contribute to this blog post?',
    edit_on_github: 'GitHub에서 이 페이지를 수정해주세요!',
    msg1: 'Contribution for this page is now closed. If you would like to contribute please check out our',
    link: 'new docs'
  },
  example: {
    intro: 'In this example:'
  },
  codeSandbox: {
    open: 'Open CodeSandbox'
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
      essentials: 'Essentials',
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
      'components-glossary': 'Components Glossary'
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
        title: 'About',
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
