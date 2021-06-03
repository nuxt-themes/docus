---
title: コンテキストとヘルパー
description: 'コンテキストは、アプリケーションへの現在のリクエストに関する*追加*およびオプションの情報を提供します。'
position: 2
category: concepts
csb_link_context: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-context?fontsize=14&hidenavigation=1&theme=dark
csb_link_helpers: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-helpers?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/context.svg
imgAlt: nuxt-js-context-keys
questions:
  - question: コンテキストが存在する理由は？
    answers:
      - サーバーサイドレンダリングのため
      - グローバルな状態を持つため
      - 横着するため
    correctAnswer: サーバーサイドリングのため
  - question: コンテキストにないキーは？
    answers:
      - env
      - isDev
      - $store
    correctAnswer: $store
  - question: どのコンテキストキーが*サーバー*サイドでのみ利用可能ですか？
    answers:
      - from
      - app
      - req
    correctAnswer: req
  - question: どのコンテキストキーが*クライアント*サイドでのみ利用可能ですか？
    answers:
      - from
      - res
      - app
    correctAnswer: from
  - question: '`$nuxt` ヘルパーが*しない*ことは？'
    answers:
      - Nuxt のバージョンを表示する
      - ユーザーのインターネット接続状況に関する情報を提供する
      - 公開されたモジュール機能へのアクセス
    correctAnswer: Nuxt のバージョンを表示する
  - question: プロセスヘルパーの名前は？
    answers:
      - global、client と server
      - server、client と static
      - ssr、spa と static
    correctAnswer: server、client と static
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

`context` オブジェクトは  [asyncData](/docs/2.x/features/data-fetching#async-data)、[plugins](/docs/2.x/directory-structure/plugins)、[middleware](/docs/2.x/directory-structure/middleware)  や  [nuxtServerInit](/docs/2.x/directory-structure/store#the-nuxtserverinit-action) といった特定の Nuxt 関数で利用できます。これは、アプリケーションへの現在の要求に関する*追加の*情報と多くの場合オプションの情報を提供します。

何よりもまず、コンテキストは Nuxt.js アプリケーションの他の部分（例えば Vuex ストアや基盤となる `connect` インスタンス）へのアクセスを提供するために使用されます。そのため、サーバーサイドと `store` で使用可能なコンテキストの `req` オブジェクトと `res` オブジェクトは常に使用可能です。しかし、時間が経つにつれコンテキストは他の多くの役立つ変数やショートカットで拡張されました。今では `development` モードの HMR 機能、現在の `route`、ページの `params`、そして `query` にアクセスできるほか、コンテキストを介して環境変数にアクセスするオプションもあります。さらに、モジュール関数とヘルパーは、クライアントサイドとサーバーサイドの両方で使用できるようにコンテキストを通じて公開できます。

**デフォルトで存在するすべてのコンテキストキー**

```js
function (context) { // asyncData、nuxtServerInit, ...
  // 常に利用可能
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
   $config
  } = context

  // サーバーサイドでのみ利用可能
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }

  // クライアントサイドでのみ利用可能
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

<base-alert>

ここで参照する*コンテキスト*を [Vuex アクション](https://vuex.vuejs.org/ja/guide/actions.html)で利用可能な `context` オブジェクトや `nuxt.config.js` の `build.extend` 関数で利用可能な `context` オブジェクトと混同しないでください。これらはすべて互いに関連していません！

</base-alert>

他のコンテキストキーについての詳細は[コンテキストのドキュメント](/docs/2.x/internals-glossary/context)を参照してください。

### API クエリ用にページパラメータを使う

コンテキストは `context.params` を介してルートのとりうる動的パラメータを直接公開します。次の例では、URL の一部として動的ページパラメータを使用して、 `nuxt/http` モジュールを介して API を呼び出します。[nuxt/http](https://http.nuxtjs.org/) モジュールのようなモジュールは、[context.app](http://context.app) オブジェクトを介して利用できる独自の関数を公開できます。

また、潜在的なエラーを処理するために API の呼び出しを `try/catch` ステートメントでラップします。 `context.error` 関数を使用すると、Nuxt のエラーページを直接表示して発生したエラーを渡すことができます。

```js{}[pages/posts/_id.vue]
export default {
  async asyncData(context) {
    const id = context.params.id
    try {
      // nuxtjs/http モジュールをここで使い context.app を介して公開します
      const post = await context.app.$http.$get(
        `https://api.nuxtjs.dev/posts/${id}`
      )
      return { post }
    } catch (e) {
      context.error(e) // スローしたエラーと一緒に nuxt エラーページを表示します
    }
  }
}
```

[ES6](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/) を使用すると、この構文を使用してコンテキストオブジェクトを分解できます。アクセスしたいオブジェクトを渡すと、コンテキストという単語を使用せずにコードでそれらを使用できます。

```js{}[pages/posts/_id.vue]
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id

    try {
      // nuxtjs/http モジュールをここで使い context.app を介して公開します
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (e) {
      error(e) // スローしたエラーと一緒に nuxt エラーページを表示します
    }
  }
}
```

代わりにクエリパラメータを使いたい場合は [context.query.id](/docs/2.x/internals-glossary/context#query) を使ってください。

### ユーザをリダイレクトさせストアへアクセスする

Vuex ストアへのアクセス（`store` ディレクトリを介して設定した場合）もコンテキストを介して可能です。これは、Vue コンポーネントで `this.$store` として扱うことができる `store` オブジェクトを提供します。さらに、コンテキストを介して公開されたヘルパーである `redirect` メソッドを使用して `authenticated` 状態がファルシーな場合にユーザーをリダイレクトします。

```js
export default {
  middleware({ store, redirect }) {
    // 分解したオブジェクトからキーを取得する
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
```

<base-alert type="next">

その他の例についての詳細は [redirect メソッドのドキュメント](/docs/2.x/internals-glossary/context#redirect)を参照してください。

</base-alert>

## ヘルパー

コンテキスト内のショートカットに加えて、Nuxt.js アプリケーションには他の小さなヘルパーもあります。

## `$nuxt`: Nuxt.js ヘルパー

`$nuxt` はユーザーエクスペリエンスを向上させ、状況によってはエスケープハッチになるように設計されたヘルパーです。Vue コンポーネントでは `this.$nuxt` を介してアクセスでき、それ以外の場合はクライアント側で `window.$nuxt` を介してアクセスできます。

### コネクションチェッカー

`$nuxt` ヘルパーはユーザーのインターネット接続があるかどうかをすばやく確認する方法を提供します。ブール値の `isOffline` と `isOnline` を公開します。これらを使用して例えば、ユーザーがオフラインになるとすぐにメッセージを表示できます。

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <Nuxt />
  </div>
</template>
```

### ルートインスタンスへアクセスする

DX/UX 機能を提供することに加え、`$nuxt` ヘルパーは他のすべてのコンポーネントからアプリケーションのルートインスタンスへのショートカットも提供します。しかし、それだけではありません。Vue コンポーネントの外部から `$axios` などのモジュールメソッドにアクセスするためのエスケープハッチとして使用できる `window.$nuxt` を介して `$nuxt` ヘルパーにアクセスすることもできます。賢明に使う必要があり**最後の手段としてしてください**。

### ページデータのリフレッシュ

ユーザーの現在のページを更新したい場合、サーバーに再度アクセスして少なくとも Nuxt.js アプリケーション全体を再初期化する可能性があるのでページを完全にリロードさせたくないでしょう。リロードの代わりに `asyncData` または `fetch` によって提供されるデータのみを更新したい場合がよくあります。

これは `this.$nuxt.refresh()` を使って行えます！

```html
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Created at: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

#### ローディングバーの制御

`$nuxt` を使うと、Nuxt のローディングバーを `this.$nuxt.$loading` を介してプログラムで制御できます。

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

詳細については[ローディング機能のドキュメント](../features/loading)を参照してください。

## onNuxtReady ヘルパー

Nuxt.js アプリケーションがロードされて準備ができた*後* 、いくつかのスクリプトを実行する場合は、 `window.onNuxtReady` 関数を使用できます。これはサイトのインタラクティブ化にかかる時間を増やすことなく、クライアントサイドで関数を実行したい場合に便利です。

```js
window.onNuxtReady(() => {
  console.log('Nuxt.js is ready and mounted')
})
```

## プロセスヘルパー

Nuxt.js はグローバルな `process` オブジェクトに 3 つのブール値を挿入します。これはアプリケーションがサーバーでレンダリングされたか、完全にクライアントでレンダリングされたかを判断し、静的サイトの生成を確認するのに便利です。これらのヘルパーはアプリケーション全体で利用でき、`asyncData` ユーザーランドコードで一般的に使用されています。

```html{}[pages/about.vue]
<template>
  <h1>I am rendered on the {{ renderedOn }} side</h1>
</template>

<script>
  export default {
    asyncData() {
      return { renderedOn: process.client ? 'client' : 'server' }
    }
  }
</script>
```

この例ではサーバーサイドレンダリングを使用し、ユーザーが直接ページにアクセスすると `renderedOn` は `'server'` と評価されます。ユーザーがアプリケーションの別の部分からページに遷移する場合（例えば `<NuxtLink>` をクリックする場合）クライアントに評価されます。

<quiz :questions="questions"></quiz>
