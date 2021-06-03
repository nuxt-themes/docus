---
title: ミドルウェア
description: middleware ディレクトリには、アプリケーションミドルウェアが含まれています。ミドルウェアを使用すると、ページまたはページのグループ（レイアウト）をレンダリングする前に実行できる、カスタム関数を定義できます。
position: 8
category: directory-structure
csb_link_anonymous: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_anonymous?fontsize=14&hidenavigation=1&theme=dark
csb_link_named: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_named?fontsize=14&hidenavigation=1&theme=dark
csb_link_router: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_router?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: ミドルウェアを使用すると実行する関数を定義できます
    answers:
      - ページをレンダリングする前
      - ページのレンダリング中
      - ページをレンダリングした後
    correctAnswer: ページをレンダリングする前
  - question: 共有ミドルウェアはどのディレクトリに置きますか？
    answers:
      - middleware
      - shared-middleware
      - shared
    correctAnswer: middleware
  - question: ミドルウェアは最初の引数としてどのような引数を受け取りますか？
    answers:
      - req
      - res
      - context
    correctAnswer:
  - question: ユニバーサルモードでは、ミドルウェアはいつ呼び出されますか？
    answers:
      - 最初のリクエストではサーバ側、ナビゲートする時はサーバ側
      - 最初のリクエストではクライアント側、ナビゲートする時もクライアント側
      - 最初のリクエストではサーバ側、ナビゲートする時はクライアント側
    correctAnswer: 最初のリクエストではサーバ側、ナビゲートする時はクライアント側
  - question: ミドルウェアが呼び出されるときに SSR が false に設定されている場合は？
    answers:
      - 最初のリクエストではサーバ側、ナビゲートする時はサーバ側
      - 最初のリクエストではクライアント側、ナビゲートする時もクライアント側
      - 最初のリクエストではサーバ側、ナビゲートする時はクライアント側
    correctAnswer: 最初のリクエストではクライアント側、ナビゲートする時もクライアント側
  - question: ミドルウェアはどの順序で実行されますか？
    answers:
      - マッチしたページ ⇒  マッチしたレイアウト ⇒ nuxt.config.js
      - nuxt.config.js ⇒ マッチしたレイアウト ⇒ マッチしたページ
      - マッチしたレイアウト ⇒ マッチしたページ ⇒ nuxt.config.js
    correctAnswer: nuxt.config.js ⇒ マッチしたレイアウト ⇒ マッチしたページ
  - question: ミドルウェアをすべてのルートに追加するためにはどのキーを使用しますか？
    answers:
      - middleware.router
      - router.middleware
      - routes.middleware
    correctAnswer: router.middleware
  - question: 特定のページ、またはレイアウトに複数のミドルウェアを追加できますか？
    answers:
      - 正
      - 偽
    correctAnswer: 正
  - question: この名前付きミドルウェア（`middleware/authenticated.js`）をどのようにページに追加しますか？
    answers:
      - 'middleware: authenticated'
      - 'middleware: true'
      - "middleware: 'authenticated'"
    correctAnswer: "middleware: 'authenticated'"
  - question: 匿名のミドルウェア、特定のページのみのミドルウェアをどのように使用しますか？
    answers:
      - 名前付きミドルウェアを作成し、ミドルウェアディレクトリに保存する
      - ページコンポーネントのための `middleware` 関数を作成する
      - ミドルウェアディレクトリに_.vueファイルを追加する
    correctAnswer: ページコンポーネントのための `middleware` 関数を作成する
---

`middleware` ディレクトリには、アプリケーションミドルウェアが含まれています。ミドルウェアを使用すると、ページまたはページのグループ（レイアウト）をレンダリングする前に実行できる、カスタム関数を定義できます。

共有ミドルウェアは、`middleware/` ディレクトリに配置する必要があります。ファイル名はミドルウェアの名前になります（`middleware/auth.js` は `auth` ミドルウェアになります）。関数を直接使用して、ページ固有のミドルウェアを定義することもできます。
[匿名のミドルウェア](/docs/2.x/components-glossary/pages-middleware#anonymous-middleware)を参照してください。

ミドルウェアは最初の引数として[コンテキスト](/docs/2.x/internals-glossary/context)を受け取ります。

```js{}[middleware/user-agent.js]
export default function (context) {
  // userAgentプロパティをコンテキストに追加します
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

ユニバーサルモードでは、ミドルウェアはサーバ側（Nuxt アプリへの最初のリクエスト時、たとえばアプリに直接アクセスするときやページを更新するとき）で一度呼び出され、クライアント側でさらにルートに移動するときに呼び出されます。`ssr：false` を使用すると、どちらの状況でもクライアント側でミドルウェアが呼び出されます。

ミドルウェアは以下の順序で連続して実行されます:

1. `nuxt.config.js`（ファイル内の順序）
2. マッチしたレイアウト
3. マッチしたページ

## ルーターミドルウェア

ミドルウェアは非同期にすることができます。これを行うには `Promise` を返すか、async/await を使用します。

```js{}[middleware/stats.js]
import http from 'http'

export default function ({ route }) {
  return http.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

次に、`nuxt.config.js` で、`router.middleware` キーを使用します。

```js{}[nuxt.config.js]
export default {
  router: {
    middleware: 'stats'
  }
}
```

これで、ルートが変更されるたびに `stats` ミドルウェアが呼び出されます。

ミドルウェア（複数でも）を特定のレイアウト、またはページに追加することもできます。

```js{}[pages/index.vue / layouts/default.vue]
export default {
  middleware: ['auth', 'stats']
}
```

## 名前付きミドルウェア

`middleware/` ディレクトリ内にファイルを作成することで、名前付きミドルウェアを作成できます。ファイル名はミドルウェア名になります。

```js{}[middleware/authenticated.js]
export default function ({ store, redirect }) {
  // ユーザーが認証されていない場合
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

## 匿名のミドルウェア

特定のページにのみミドルウェアを使用する必要がある場合は、そのミドルウェアの関数（または関数の配列）を直接使用できます:

```html{}[pages/secret.vue]
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // ユーザーが認証されていない場合
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```

<quiz :questions="questions"></quiz>
