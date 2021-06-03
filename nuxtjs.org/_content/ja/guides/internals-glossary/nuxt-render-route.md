---
title: 'nuxt.renderRoute(route, context)'
description: 渡されたコンテキストを使い特定のルートをレンダリングします。
menu: renderRoute
category: internals-glossary
position: 11
---

- 型: `Function`
- 引数:
  1. `String` : レンダリングするルート
  2. *オプション* `Object`、渡されたコンテキスト、利用可能なキー: `req` と `res`
- 戻り値: `Promise`
  - `html`: `String`
  - `error`: `null` または `Object`
  - `redirected`: `false` または `Object`

> 渡されたコンテキストを使い、特定のルートをレンダリングします。

このメソッドはほとんどの場合  [`nuxt.renderAndGetWindow`](/docs/2.x/internals-glossary/nuxt-render-and-get-window) とともにテストする目的で使われます。

<base-alert>

`nuxt.renderRoute` はプロダクションモードではビルド処理の後に実行するといいでしょう。

</base-alert>

```js
const { loadNuxt, build } = require('nuxt')

async function start() {
  // 起動用の nuxt インスタンスを取得します（プロダクションモード）
  // このスクリプトを実行する前に `nuxt build` を実行していることを確認してください
  const nuxt = await loadNuxt({ for: 'start' })

  const { html, error, redirected } = await nuxt.renderRoute('/')

  // `html` は常に文字列になります

  // エラーレイアウトが表示されるときは `error` は null ではありません。エラーフォーマットは下記:
  // { statusCode: 500, message: 'エラーメッセージ' }

  // `asyncData()` または `fetch()` 内で `redirect()` が使われたときは `redirected` は `false` ではありません
  // { path: '/other-path', query: {}, status: 302 }
}

start()
```

### このあとは

<base-alert type="next">

[fetch メソッド](/docs/2.x/components-glossary/pages-fetch)についてのドキュメントを参照してください。

</base-alert>
