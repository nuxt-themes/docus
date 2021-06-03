---
title: 'nuxt.renderAndGetWindow(url, options)'
description: 'Nuxt.js アプリケーションの URL を渡して `window` を取得します。'
menu: renderAndGetWindow
category: internals-glossary
position: 12
---

- 型: `Function`
- 引数: `String`
  1. `String`: レンダリングする URL
  2. *オプション* `Object`: オプション
  - virtualConsole: `Boolean`（デフォルト: `true`）
- 戻り値: `Promise`
  - 戻り値: `window`

> Get the window from a given url of a Nuxt.js application.

<base-alert>

このメソッドはテスト目的で作られました。

</base-alert>

この関数を使うためには `jsdom` をインストールする必要があります:

```bash
npm install --save-dev jsdom
```

例:

```js
const { loadNuxt } = require('nuxt')

async function init() {
  // すでにプロジェクトをビルド済みと仮定します
  const nuxt = await loadNuxt({ for: 'start' })
  await nuxt.listen(3000)
  const window = await nuxt.renderAndGetWindow('http://localhost:3000')
  // head `<title>` を表示する
  console.log(window.document.title)
  nuxt.close()
}

init()
```
