---
title: 'dev プロパティ'
description: '開発モードかプロダクションモードかを指定します'
menu: dev
category: configuration-glossary
position: 6
---

- 型: `Boolean`
- デフォルト: `true`

> 開発モードかプロダクションモードかを指定します。

このプロパティは nuxt コマンドによって上書きされます:

- `nuxt` コマンドを使う場合は `dev` は強制的に `true` になります
- `nuxt build`、`nuxt start` そして `nuxt generate` を使う場合は `dev` は強制的に `false` になります

このプロパティは [Nuxt.js をプログラムで使う](/docs/2.x/internals-glossary/nuxt)ときに設定します:

```js{}[nuxt.config.js]
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

```js{}[server.js]
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// オプションを使って Nuxt.js をインスタンス化する
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// 開発モードのときのみビルドする
if (config.dev) {
  new Builder(nuxt).build()
}

// サーバーを Listen する
app.listen(port, '0.0.0.0').then(() => {
  console.log(`Server is listening on port: ${port}`)
})
```

```json{}[package.json]
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "NODE_ENV=production node server.js"
  }
}
```
