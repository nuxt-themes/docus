---
title: 'API: Nuxt.js をプログラムで使う'
description: Nuxt.js はプログラム上で、ミドルウェアとして使うことができます。そうすることでウェブアプリケーションをレンダリングする独自のサーバーを自由に作ることができます。
menu: Usage
category: programmatically
position: 201
---

あなた自身のサーバーと共にミドルウェアや API を使いたい場合もあるかもしれません。そういった場合、 Nuxt.js をプログラムから利用することが可能です。プログラムの例は、[examples/programmtic](https://github.com/nuxt/nuxt.js/tree/dev/examples/programmatic/scripts) で見ることができます。

## Nuxt のコンストラクタ

Nuxt.js に渡すことができるオプション一覧を見るには、設定のセクションを参照してください。

```js
const { loadNuxt, build } = require('nuxt')

// Nuxt を開発モードで実行する必要があるかどうかをチェックします
const isDev = process.env.NODE_ENV !== 'production'

// Nuxt のインスタンスを取得します
const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

// 開発環境の場合にライブビルドとライブリロードを有効化します
if (isDev) {
  build(nuxt)
}

// nuxt.render(req, res) もしくは nuxt.renderRoute(route, context) を利用することが可能です
```

手っ取り早く始めるために [nuxt-express](https://github.com/nuxt/express) や [adonuxt](https://github.com/nuxt/adonuxt) スターターを参照できます。

### ログを使ってデバッグする

Nuxt.js のログを表示したいときはファイルのトップに次のコードを追加してください:

```js
process.env.DEBUG = 'nuxt:*'
```
