---
title: 'API: nuxt.renderRoute(route, context)'
description: Render a specific route with a given context.
menu: renderRoute
category: programmatically
position: 203
---

- 型: `Function`
- 引数:
  1. `String`、レンダリングするルート
  2. _オプション_、`Object`、付与するコンテキスト、利用できるキー: `req` 及び `res`
- 戻り値: `Promise`
  - `html`: `String`
  - `error`: `null` または `Object`
  - `redirected`: `false` または `Object`

> 特定のルートをレンダリングします。その際にコンテキストを渡すことができます。

このメソッドはほとんどの場合 [nuxt.renderAndGetWindow](/api/nuxt-render-and-get-window) とともに [テストする目的](/guide/development-tools#エンドツーエンドテスト) で使われます。

<div class="Alert Alert--orange">

`nuxt.renderRoute` はプロダクションモードではビルド処理の後に実行すると良いでしょう。

</div>

例:

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
