export default {
  common: {
    an_error_occurred: '文档API服务异常',
    page_not_found: '页面不存在',
    please_define_title: '请在文档页头中指定标题(title)字段',
    please_define_description: '请在文档页头中指定描述(description)字段',
    search: '搜索 ("/" 快速定位)',
    version: '版本'
  },
  iso: 'zh',

  links: {
    download: '下载',
    live_edit: '在线编辑'
  },
  header: {
    links: [
      {
        name: '文档',
        icon: 'books',
        slug: 'docs-2.x-book-slug'
      },
      {
        name: '示例',
        icon: 'code',
        slug: 'examples'
      },
      {
        name: '资源',
        icon: 'resources',
        slug: 'resources'
      },
      {
        name: '博客',
        icon: 'blog',
        slug: 'blog'
      },
      {
        name: '视频课程',
        icon: 'video',
        href: 'https://masteringnuxt.com/?utm_source=nuxt&utm_medium=link&utm_campaign=navbar_link'
      }
    ],
    search: {
      placeholder: '搜索 ("/" 快速定位)'
    }
  },
  homepage: {
    meta: {
      title: 'Nuxt.js - Vue.js 通用应用框架',
      description:
        'Nuxt.js 是一个基于 Vue.js 的轻量级应用框架，可用来创建服务端渲染 (SSR) 应用，也可充当静态站点引擎生成静态站点应用，具有优雅的代码结构分层和热加载等特性。'
    },
    welcome: {
      title: '易于使用的 {br} {frameworkType} 框架',
      description:
        '使用 NuxtJS 充满信心地构建您的下一个 Vue.js 应用程序。 一个{openSource}框架，让 Web 开发变得简单而强大。',
      openSource: '开源',
      get_started: '开始使用',
      get_updates: '每月获取 NuxtJS 更新到您的收件箱',
      video: '由 {company} 制作的视频, 下载免费的 {cheatSheet}',
      cheatSheet: 'Nuxt 备忘单。'
    },
    why: {
      title: '为什么选择 {nuxt}',
      try_nuxtjs_online: '在线尝试 NuxtJS',
      enjoyable: {
        title: '令人愉快',
        description:
          '我们的主要重点是开发人员体验。我们喜欢 Nuxt.js，并且会不断改进框架，所以您也喜欢它！ {break}期待有吸引力的解决方案，描述性的错误消息，强大的默认值和详细的文档。 如果有问题或疑问，我们有用的社区将为您提供帮助。'
      },
      modular: {
        title: '模块化',
        description:
          'Nuxt 基于强大的模块化体系结构。您可以从 50 多个模块中进行选择，以使您的开发更快，更轻松。您无需重新发明轮子即可获得 PWA 好处，无需在页面上添加 Google Analytics 或生成站点地图。'
      },
      performant: {
        title: '高效率',
        description:
          '借助 Nuxt.js，您的应用程序将得到开箱即用的优化。我们尽最大努力通过利用 Vue.js 和 Node.js 最佳实践来构建高性能应用程序。为了从应用程序中挤出所有不必要的内容，Nuxt 包括捆绑分析器和许多微调您的应用程序的机会。 '
      }
    },
    companies: {
      title: '谁在使用 {nuxt}'
    },
    modes: {
      title: '{nuxt} 渲染',
      ssr: {
        title: '服务器端渲染',
        description:
          '这是 Nuxt 最受欢迎的模式。使用 SSR（也称为 "universal" 或 "isomorphic" 模式），将使用 Node.js 服务器将基于 Vue 组件的 HTML 传递给客户端，而不是纯 JavaScript。与传统的 Vue SPA 相比，使用 SSR 将带来更大的 SEO 提升，更好的用户体验和更多的机会。{break}由于单独实施 SSR 可能非常繁琐，因此 Nuxt.js 可为您提供全面的支持，并将处理常见的缺陷。'
      },
      ssg: {
        title: '静态生成',
        description:
          '静态网站生成是当前非常热门的话题（又名 JAMStack）。与其切换到另一个框架并花时间去适应它，不如一石二鸟？ {proverbial} Nuxt.js 支持根据您的 Vue 应用程序生成静态网站。它是 “两全其美” 的选择，因为您不需要服务器，但仍然拥有 SEO 的好处，因为 Nuxt 会预先渲染所有页面并包含必要的 HTML。另外，您可以轻松地将结果页面部署到 Netlify 或 GitHub 页面。',
        proverbial: ''
      }
    },
    sponsors: {
      title: '赞助商',
      description:
        'NuxtJS 是 MIT 许可的开源项目，完全免费使用。但是，如果没有适当的资金支持，为项目维护和开发新功能所需的工作量将无法持续。如果您经营一家企业并在产生收入的产品中使用 Nuxt，则赞助Nuxt开发具有商业意义：它可以确保您的产品所依赖的项目保持健康并得到积极维护。 它还可以帮助您在 Vue/Nuxt 社区中曝光，并更容易吸引 Vue/Nuxt 开发人员。如果您是个人用户，并且享受使用 Nuxt 带来的生产力，请考虑捐赠作为一种感激之情。',
      become_a_sponsor: '成为赞助商'
    },
    newsletter: {
      title: '{nuxt} 电子报刊',
      description: '将最新的 Nuxt 新闻发送到您的收件箱，这由 NuxtJS 团队策划。',
      form: {
        email: '邮箱',
        subscribing: '订阅中...',
        subscribe: '订阅',
        subscribed_messages: {
          pre: '一封您的订阅确认邮件已发送至',
          post: '💚'
        }
      }
    }
  },
  design: {
    meta: {
      title: 'NuxtJS 设计',
      description: '下载 NuxtJS 设计资源（SVG，图标，表情符号和网站图标）.'
    },
    title: '{nuxt} 设计',
    description:
      'NuxtJS 是 MIT 许可的开源项目，完全免费使用。 {break}只要提及 NuxtJS 并链接到 nuxtjs.org，您就可以自由使用我们的徽标。',
    other_download_message:
      '您也可以下载我们的 {favicon} 或我们的 {sketch} 文件。'
  },
  resources: {
    meta: {
      title: 'NuxtJS 资源',
      description:
        '发现我们合作伙伴提供的资源面板。通过使用那些会员资源链接，您正在帮助我们维护和开发开放源代码框架。'
    },
    title: '{nuxt} 资源',
    description:
      '发现我们合作伙伴提供的资源面板。通过使用那些会员资源链接，您正在帮助我们维护和开发开放源代码框架。',
    themes: {
      title: '主题'
    },
    videos: {
      title: '视频课程'
    }
  },
  shop: {
    meta: {
      title: 'NuxtJS 商店 ',
      description:
        '您想支持 NuxtJS 项目，并向社区的其他成员表达您的爱吗？在这里，我们的产品有史以来最好的质量！'
    },
    title: '{nuxt} 商店',
    description:
      '您想支持 NuxtJS 项目并将您的爱表达给社区的其他人吗？{break}这里是我们有史以来最优质的产品！',
    button: '马上到来'
  },
  team: {
    meta: {
      title: 'NuxtJS 团队',
      description:
        'NuxtJS 拥有一支非常活跃和敬业的团队，并不断努力推动 Nuxt 前进。'
    },
    title: '{nuxt} 团队',
    description:
      'NuxtJS 及其生态系统的开发由一个国际团队指导。我们有一支非常积极和敬业的团队，正在不断努力推动 Nuxt 前进。'
  },
  themes: {
    meta: {
      title: 'NuxtJS 主题',
      description:
        '通过我们由 Creative Tim 和 Theme Forest 的合作伙伴构建的以下主题，您可以了解如何构建真实的应用程序以及 Nuxt.js 。'
    },
    title: '{nuxt} 主题',
    description:
      '通过我们由 Creative Tim 和 Theme Forest 的合作伙伴构建的以下主题，您可以了解如何构建真实的应用程序以及 Nuxt.js',
    button: '获得它，仅需'
  },
  'video-courses': {
    meta: {
      title: 'NuxtJS 视频课程',
      description:
        '通过我们的合作伙伴 Vue School 创建的以下视频课程，您可以发现并了解有关 Nuxt.js 框架的更多信息。'
    },
    title: '{nuxt} 视频课程',
    description:
      '通过我们的合作伙伴 VueSchool 创建的以下视频课程，您可以发现并了解有关 Nuxt.js 框架的更多信息。',
    cta: {
      discover: '探索 vueschool',
      start: '开始课程'
    }
  },
  sponsor: {
    meta: {
      title: '赞助 NuxtJS 开发',
      description:
        '您可以通过不同的方法支持 NuxtJS 开发，并确保对框架进行定期更新。'
    },
    title: '赞助 {nuxt} 开发',
    description:
      'NuxtJS 是 MIT 许可的开源项目，完全免费使用。{break}但是，如果没有适当的资金支持，维护和开发该项目的新功能所需的工作量是无法持续的。{break}您可以通过以下方式支持 NuxtJS 开发下列方法：',
    donations: {
      title: '一次性捐助',
      description: '我们通过这些渠道接受捐赠'
    },
    pledges: {
      title: '定期捐助',
      description:
        '定期捐助会享受一些特权，例如在 NuxtJS GitHub 存储库中列出您的姓名，或在此网站上放置您的公司徽标。通过{opencollective}成为赞助商或赞助商（进入具有透明费用模型的基金，以支持社区的工作和活动）。'
    },
    become_a_sponsor: '成为赞助商'
  },
  support: {
    meta: {
      title: 'NuxtJS 支持',
      description:
        '我们的 NuxtJS 团队现在为您的 NuxtJS 应用程序提供官方咨询服务。'
    },
    title: '咨询 {nuxt} 支持',
    description:
      '我们的 {team} 现在为您的NuxtJS应用程序提供官方咨询服务。{break}我们根据您的需求提供不同的服务，从技术支持到定制开发。希望在一个工作日内得到答复，我们可以签署自定义NDA，如果您对我们的服务不满意，则可以全额退款。',
    technical: {
      title: '技术支持',
      description:
        '从 NuxtJS 团队获得项目审核，应用程序部署，自定义开发和技术支持。',
      start: '开始聊天',
      partner: {
        pre: '我们与',
        post: '提供这些服务，以便我们专注于尽快为您提供帮助。'
      }
    },
    entreprise: {
      title: '对于企业',
      description:
        'NuxtJS和其他数千个软件包的维护者正在与 Tidelift 一起提供一项企业订阅，其中涵盖您使用的所有开源。{break}如果您想要开源的灵活性和对商业级软件的信心，这就是为你量身定制。',
      partner: {
        pre: '可作为',
        post: '订阅。'
      },
      learn_more: '了解更多',
      request_a_demo: '请求 Demo'
    }
  },
  blog: {
    meta: {
      title: 'NuxtJS 博客',
      description:
        '发现来自 NuxtJS 团队和 NuxtJS 社区的有关 NuxtJS 的文章，包括技巧和窍门！'
    },
    title: '{nuxt} 博客',
    description:
      '从 {nuxtTeam} 和 {nuxtCommunity} 中找到有关 NuxtJS 的文章，包括技巧和窍门！',
    nuxt_team: 'NuxtJS 团队',
    nuxt_community: 'Nuxt.js 社区',
    contribute: '遇到错误或想要为该博客文章做出贡献？'
  },
  guide: {
    release_notes: '发行说明',
    toc_title: '在本页'
  },
  quiz: {
    title: '测验'
  },
  tryNewDocs: {
    msg1: '想看一下我们的新文档吗？我们的 ',
    link: '新文档',
    msg2: '现在处于测试阶段。玩得开心！'
  },
  contribute: {
    title: '贡献者',
    docs: '如何提交问题或文档贡献？',
    blog: '遇到错误或想要为该博客文章做出贡献？',
    edit_on_github: '在 GitHub 编辑此页面！',
    msg1: '该页面的贡献现已关闭。如果您想贡献，请查看我们的',
    link: '新文档'
  },
  example: {
    intro: '在此示例中:'
  },
  codeSandbox: {
    open: '打开 CodeSandbox'
  },
  content: {
    guide: {
      prologue: '序幕',
      'getting-started': '开始入门'
    },
    api: {
      essential: '必要',
      pages: '页面',
      components: '组件',
      utils: '实用工具',
      configuration: ' 配置',
      programmatically: '以编程方式',
      internals: '内部构造'
    },
    examples: {
      // essentials: '必要',
      routing: '路由',
      dataFetching: '数据获取',
      assetManagement: '资源依赖管理',
      transitions: '过渡动画',
      seo: 'SEO',
      loading: '加载',
      miscellaneous: '其他项目',
      middleware: '中间件',
      plugins: '插件',
      modules: '模块'
      // customization: '定制化',
      // advanced: '高级'
    },
    faq: {
      configuration: '配置',
      development: '开发',
      deployment: '部署'
    },
    guides: {
      'get-started': '开始使用',
      concepts: '概念',
      features: '特性',
      'directory-structure': '目录结构',
      'configuration-glossary': '配置词汇表',
      'internals-glossary': '内部术语表',
      'components-glossary': '组件词汇表',
      examples: '示例'
    }
  },
  footer: {
    links: {
      discover: {
        title: '发现',
        shop: '我们的杂货店',
        consulting: '培训与咨询',
        sponsorNuxt: '赞助与捐赠'
      },
      about: {
        title: '关于',
        team: '我们团队',
        design: '设计套件',
        contact: '联系我们'
      },
      support: {
        title: '支持',
        resources: '资源',
        discord: '与我们聊天',
        contributionGuide: '贡献指南'
      }
    }
  },
  cookies: {
    consent: '我们使用 Cookies 进行用户分析和页面改进！',
    linkLabel: '了解 Cookie',
    button: '明白了'
  }
}
