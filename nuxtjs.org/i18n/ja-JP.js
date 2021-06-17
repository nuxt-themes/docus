export default {
  common: {
    an_error_occurred: 'エラーが発生しました',
    page_not_found: 'ページが見つかりません',
    please_define_title: 'Frontmatter 内の title を定義してください',
    please_define_description:
      'Frontmatter 内の description を定義してください',
    search: '検索 ("/" でフォーカス)',
    version: 'バージョン'
  },
  iso: 'ja',
  links: {
    download: 'ダウンロード',
    live_edit: 'ライブ編集'
  },
  header: {
    links: [
      {
        name: 'ドキュメント',
        icon: 'books',
        slug: 'docs-2.x-book-slug'
      },
      {
        name: '例',
        icon: 'code',
        slug: 'examples'
      },
      {
        name: 'Resources',
        icon: 'resources',
        slug: 'resources'
      },
      {
        name: 'ブログ',
        icon: 'blog',
        slug: 'blog'
      },
      {
        name: 'ビデオコース',
        icon: 'video',
        href: 'https://masteringnuxt.com/?utm_source=nuxt&utm_medium=link&utm_campaign=navbar_link'
      }
    ],
    search: {
      placeholder: '検索 ("/" でフォーカス)'
    }
  },
  homepage: {
    meta: {
      title: 'Nuxt.js - ユニバーサル Vue.js アプリケーション',
      description:
        'Nuxt.js はサーバーサイドレンダリングやコード分割、ホットリローディング、静的ファイル生成などを備えた Vue.js アプリケーションを構築するためのミニマルなフレームワークです！'
    },
    welcome: {
      title: '使いやすい {br} {frameworkType} フレームワーク',
      description:
        'NuxtJS を使用し自信を持って次の Vue.js アプリケーションをビルドしましょう。ウェブ開発をシンプルかつ強力にする{openSource}フレームワークです。',
      openSource: 'オープンソース',
      get_started: 'はじめる',
      get_updates: '毎月 NuxtJS の更新を受信します',
      video:
        '動画は {company} による提供で、彼らの {cheatSheet} は無料でダウンロードできます。',
      cheatSheet: 'Nuxt チートシート.'
    },
    why: {
      title: 'なぜ {nuxt} なのか？',
      try_nuxtjs_online: 'Nuxt.js をオンラインで試す',
      enjoyable: {
        title: '楽しみ',
        description:
          '私たちのメインフォーカスは開発者体験です。私たちは Nuxt.js が好きで、継続的にフレームワークの改善をしているため、あなたも好きになることでしょう！{break} 魅力的な解決策や、説明的なエラーメッセージ、強力なデフォルト設定、詳細なドキュメントが待っています。もし質問や問題が発生した場合、私たちの有用なコミュニティが助けてくれるでしょう。'
      },
      modular: {
        title: 'モジュール',
        description:
          'Nuxt は強力なモジュール構造に基づいています。開発をより早く簡単にするために、50を超えるモジュールから選ぶことができます。PWA の利点を得るため、ページに Google アナリティクスを追加するため、サイトマップの生成のために車輪の再発明をする必要はありません。'
      },
      performant: {
        title: 'パフォーマンス',
        description:
          'Nuxt.js は、あなたのアプリケーションをすぐに最適化することでしょう。Vue.js と Node.js のベストプラクティスを利用することで、パフォーマンスの高いアプリケーションを構築することに最善を尽くします。 アプリケーションから不要な部分を絞りだすために、Nuxt はバンドルアナライザや多くの微調整の機会を含んでいます。'
      }
    },
    companies: {
      title: '{nuxt} を使っている企業 '
    },
    modes: {
      title: '{nuxt} のレンダリング',
      ssr: {
        title: 'サーバーサイドレンダリング',
        description:
          'Nuxt で一番人気のモードです。サーバーサイドレンダリングでは「ユニバーサル」または「アイソモーフィック」モードと呼ばれ、Node.js サーバーではピュア JavaScript の代わりに Vue コンポーネントベースの HTML をクライアントに配信するために利用しています。サーバーサイドレンダリングを利用すると従来の Vue SPA と比較し SEO が大幅に向上し、UX がよくなり、より多くの機会が増えます。{break}サーバーサイドレンダリングを自分で実装するのは非常に面倒です。Nuxt.js はそのまま利用でき、よくある落とし穴を回避します。'
      },
      ssg: {
        title: '静的ファイルの生成',
        description:
          '静的サイト生成は現在非常に注目されているトピックです（JAMStack として知られます）。別のフレームワークに切り替えて慣れるのに時間を費やす代わりに、なぜ一石二鳥ではいけないのでしょうか？{proverbial} Nuxt.js はあなたの Vue アプリケーションに基づく静的ウェブサイトの生成をサポートします。Nuxt はすべてのページを事前にレンダリングしてインクルードするため、サーバーは必要ありませんが SEO の利点はあるという、いいとこ取りをしています。また、作成したページを Netlify または GitHub Pages に簡単に配置できます。',
        proverbial: 'ただのことわざ'
      }
    },
    sponsors: {
      title: 'スポンサー',
      description:
        'Nuxt.js は MIT ライセンスのオープンソースプロジェクトで、完全無料で使用できます。ただし、プロジェクトの新しい機能を維持および開発するために必要な作業は、適切な資金援助なしには持続できません。もし、あなたがビジネスで営利目的の製品に Nuxt を使用しているのであれば、Nuxt の開発をサポートすることは理に適っています。サポートいただくことで、Nuxt プロジェクトを健全でアクティブに維持することができます。また、サポートにより Vue/Nuxt コミュニティに露出することで、Vue/Nuxt 開発者を引きつけやすくなります。もし、あなたが個人ユーザーで Nuxt を使用した開発を楽しんでいるのであれば、感謝の印として寄付を検討いただけると幸いです。',
      become_a_sponsor: 'スポンサーになる'
    },
    newsletter: {
      title: '{nuxt} ニュースレター',
      description:
        'コアチームとコントリビューターがキュレーションした最新の Nuxt のニュースをメールで受信できます。',
      form: {
        email: 'メールアドレス',
        subscribing: '送信中...',
        subscribe: '購読する',
        subscribed_messages: {
          pre: '購読を確認するメールを',
          post: 'に送信しました 💚'
        }
      }
    }
  },
  design: {
    meta: {
      title: 'NuxtJS のデザイン',
      description:
        'NuxtJS のデザインリソース（SVG、icons、emoji や favicon）をダウンロードする'
    },
    title: '{nuxt} のデザイン',
    description:
      'NuxtJS は MIT ライセンスのオープンソースプロジェクトであり、完全に無料で使えます。{break} NuxtJS に言及し、nuxtjs.org にリンクしている限り、ロゴを自由に使えます。',
    other_download_message:
      'また、{favicon} や {sketch} ファイルもダウンロードできます。'
  },
  resources: {
    meta: {
      title: 'NuxtJS のリソース',
      description:
        'パートナーが作成したリソースパネルをご覧ください。もしそれらのアフィリエイトリソースリンクを使っていただけたら、オープンソースフレームワークの維持と開発を支援につながります。'
    },
    title: '{nuxt} のリソース',
    description:
      'パートナーが作成したリソースパネルをご覧ください。もしそれらのアフィリエイトリソースリンクを使っていただけたら、オープンソースフレームワークの維持と開発を支援につながります。',
    themes: {
      title: 'テーマ'
    },
    videos: {
      title: 'ビデオコース'
    }
  },
  shop: {
    meta: {
      title: 'NuxtJS ショップ',
      description:
        'NuxtJS プロジェクトをサポートし、コミュニティの他のメンバーに愛を示したいですか？ これまでで最高品質のプロダクトをご紹介します。'
    },
    title: '{nuxt} ショップ',
    description:
      'NuxtJS プロジェクトをサポートし、コミュニティの他のメンバーに愛を示したいですか？ これまでで最高品質のプロダクトをご紹介します！',
    button: 'Coming soon'
  },
  team: {
    meta: {
      title: 'NuxtJS チーム',
      description:
        'NuxtJS には非常に活発で熱心なチームがあり、Nuxt を前進させるために絶えず努力しています。'
    },
    title: '{nuxt} チーム',
    description:
      'NuxtJS とそのエコシステムの開発は国際的なチームによって行われています。 私たちには非常に活発で熱心なチームがあり、Nuxt を前進させるために絶えず努力しています。'
  },
  themes: {
    meta: {
      title: 'NuxtJS テーマ',
      description:
        'パートナーの CreativeTim と ThemeForest によって作成された以下のテーマを使用すると、Nuxt.js スタックを背後に実際のアプリケーションがどのように作成されているかを確認できます。'
    },
    title: '{nuxt} テーマ',
    description:
      'パートナーの CreativeTim と ThemeForest によって作成された以下のテーマを使用すると、Nuxt.js スタックを背後に実際のアプリケーションがどのように作成されているかを確認できます。',
    button: '取得する'
  },
  'video-courses': {
    meta: {
      title: 'NuxtJS のビデオコース',
      description:
        'パートナーの VueSchool が作成した以下のビデオコースを使用すると、Nuxt.js フレームワークについて詳しく知ることができます。'
    },
    title: '{nuxt} ビデオコース',
    description:
      'パートナーの VueSchool が作成した以下のビデオコースを使用すると、Nuxt.js フレームワークについて詳しく知ることができます。',
    cta: {
      discover: 'vueschool で発見する',
      start: 'コースをはじめる'
    }
  },
  sponsor: {
    meta: {
      title: 'NuxtJS の開発スポンサー',
      description:
        'さまざまな方法で NuxtJS の開発をサポートし、フレームワークを定期的に更新することができます。'
    },
    title: '{nuxt} 開発スポンサー',
    description:
      'NuxtJS は MIT ライセンスのオープンソースプロジェクトであり完全に無料で使用できます。{break} ただし、プロジェクトの新機能の維持と開発に必要な労力は適切な財政的支援なしには持続できません。{break} NuxtJS の開発は次の方法でサポートできます:',
    donations: {
      title: '一度きりの寄付',
      description: 'これらのチャネルを通して寄付を受け付けています'
    },
    pledges: {
      title: 'リカーリングの誓約',
      description:
        'リカーリングの誓約には排他的な特典（NuxtJS の GitHub リポジトリにあなたの名前を掲載するか、この Web サイトに会社のロゴを掲載します）が付属しています。{opencollective}（コミュニティの取り組みやイベントをサポートする透明な経費モデルを備えたファンドに参加しています）を介して nuxter またはスポンサーになれます。'
    },
    become_a_sponsor: 'スポンサーになる'
  },
  support: {
    meta: {
      title: 'NuxtJS サポート',
      description:
        'NuxtJS チームは、NuxtJS アプリケーションの公式コンサルティングサービスを提供しています。'
    },
    title: '{nuxt} サポートのコンサルティング',
    description:
      '現在 {team} は NuxtJS アプリケーションの公式コンサルティングサービスを提供しています。{break} テクニカルサポートからカスタム開発までニーズに応じてさまざまなサービスを提供しています。1 営業日以内に返信しカスタム NDA に署名できます。サービスにご満足いただけない場合は全額払い戻しを受けることができます。',
    technical: {
      title: 'テクニカルサポート',
      description:
        'プロジェクト監査、アプリのデプロイ、カスタム開発、テクニカルサポートを NuxtJS チームから受けられます。',
      start: 'チャットを始める',
      partner: {
        pre: '私たちはこれらのサービスを提供するために',
        post: 'と提携しましたので、できるだけ早くサポートすることに集中できます。'
      }
    },
    entreprise: {
      title: '企業向け',
      description:
        'NuxtJS と他の何千ものパッケージのメンテナーは、Tidelift と協力して使用するすべてのオープンソースをカバーする 1 つのエンタープライズサブスクリプションを提供しています。{break} オープンソースの柔軟性と商用グレードのソフトウェアの信頼性が必要な場合、Tidelift はあなたのためにあります。',
      partner: {
        pre: 'サブスクリプションの一部として',
        post: 'を利用できます。'
      },
      learn_more: '詳細',
      request_a_demo: 'デモをリクエストする'
    }
  },
  blog: {
    meta: {
      title: 'NuxtJS ブログ',
      description:
        'NuxtJS チームと NuxtJS コミュニティの NuxtJS に関する記事、ヒントとコツが含まれています！'
    },
    title: '{nuxt} ブログ',
    description:
      'NuxtJS について {nuxtTeam} と {nuxtCommunity} のヒントとコツが含まれています！',
    nuxt_team: 'NuxtJS チーム',
    nuxt_community: 'Nuxt.js コミュニティ',
    contribute: '間違いを見つけた、またはこのブログ投稿に貢献したいですか？'
  },
  guide: {
    release_notes: 'リリースノート',
    toc_title: 'このページで'
  },
  quiz: {
    title: 'クイズ'
  },
  tryNewDocs: {
    msg1: '新しいドキュメントを見たいですか？私たちの',
    link: '新しいドキュメント',
    msg2: 'は今ベータ版です。楽しんでください！'
  },
  contribute: {
    title: 'コントリビューター',
    docs: '間違いを見つけた、またはドキュメントに貢献したいですか？',
    blog: '間違いを見つけた、またはこのブログ投稿に貢献したいですか？',
    edit_on_github: 'GitHub でこのページを編集する',
    msg1: 'このページへの貢献は受け付けていません。もし貢献したい場合は新しいドキュメントをチェックアウトしてください',
    link: '新しいドキュメント'
  },
  example: {
    intro: 'この例では:'
  },
  codeSandbox: {
    open: 'CodeSandbox を開く'
  },
  content: {
    guide: {
      prologue: 'プロローグ',
      'getting-started': 'はじめる'
    },
    api: {
      essential: 'エッセンシャル',
      pages: 'ページ',
      components: 'コンポーネント',
      utils: 'ユーティリティ',
      configuration: '設定',
      programmatically: 'プログラムで使う',
      internals: '内部'
    },
    examples: {
      essentials: 'エッセンシャル',
      customization: 'カスタマイズ',
      advanced: '上級'
    },
    faq: {
      configuration: '設定',
      development: '開発',
      deployment: 'デプロイ'
    },
    guides: {
      'get-started': 'はじめる',
      concepts: 'コンセプト',
      features: '機能',
      'directory-structure': 'ディレクトリ構造',
      'configuration-glossary': '設定用語集',
      'internals-glossary': '内部の用語集',
      'components-glossary': 'コンポーネント用語集'
    }
  },
  footer: {
    links: {
      discover: {
        title: '発見',
        shop: 'グッズストア',
        consulting: 'トレーニングとコンサルティング',
        sponsorNuxt: 'スポンサーと寄付'
      },
      about: {
        title: 'About',
        team: '私たちのチーム',
        design: 'デザインキット',
        contact: 'お問い合わせ'
      },
      support: {
        title: 'サポート',
        resources: 'リソース',
        discord: 'チャット',
        contributionGuide: '貢献ガイド'
      }
    }
  },
  cookies: {
    consent: 'ユーザー分析とページ上の改善の目的でクッキーを使っています！',
    linkLabel: 'クッキーの詳細',
    button: 'わかりました'
  }
}
