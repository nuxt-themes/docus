---
title: 'API: nuxt.renderAndGetWindow(url, options)'
description: Nuxt.js アプリケーションの URL を渡して window を取得します。
menu: renderAndGetWindow
category: programmatically
position: 204
---

- 型: `Function`
- 引数: `String`
  1. `String`: レンダリングする URL
  2. _オプション_, `Object`: オプション
  - virtualConsole: `Boolean`（デフォルト: `true`）
- 戻り値: `Promise`
  - 戻り値: `window`

> Nuxt.js アプリケーションの URL を渡して window を取得します。

<div class="Alert Alert--orange">

このメソッドは [テストする目的](guide/development-tools#end-to-end-testing) で使われます。

</div>

この関数を使うためには `jsdom` をインストールする必要があります。:

```bash
npm install --save-dev jsdom
```

例:

```js
const { Nuxt, Builder } = require('nuxt')

const config = require('./nuxt.config.js')
config.dev = false

const nuxt = new Nuxt(config)

nuxt.renderAndGetWindow('http://localhost:3000').then(window => {
  // head 内の <title> の内容を表示
  console.log(window.document.title)
})
```
