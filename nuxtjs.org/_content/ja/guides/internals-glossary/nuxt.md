---
title: 'Nuxt.js をプログラムで使う'
description: 'Nuxt.js はプログラム上で、ミドルウェアとして使うことができます。そうすることでウェブアプリケーションをレンダリングする独自のサーバーを自由に作ることができます。'
menu: 'Nuxt をプログラムで使う'
category: internals-glossary
position: 9
---

あなた自身のサーバーと共にミドルウェアや API を使いたい場合もあるかもしれません。そういった場合に Nuxt.js をプログラムから利用することができます。

## Nuxt コンストラクタ

Nuxt.js に渡すことができるオプション一覧を見るには、設定のセクションを参照してください。

```js
const { loadNuxt, build } = require('nuxt')

// Nuxt を開発モードで実行する必要があるかどうかをチェックします
const isDev = process.env.NODE_ENV !== 'production'

// Nuxt のインスタンスを取得します
const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

// 開発モードの場合にライブビルドとライブリローディングを有効化します
if (isDev) {
  build(nuxt)
}

// `nuxt.render(req, res)` または `nuxt.renderRoute(route, context)` が使えます
```

手っ取り早く始めるために [nuxt-express](https://github.com/nuxt/express) や [adonuxt](https://github.com/nuxt/adonuxt) スターターを参照できます。

### デバッグログ

Nuxt.js のログを表示したいときはファイルの始めに次のコードを追加してください:

```js
process.env.DEBUG = 'nuxt:*'
```
