---
title: 'API: dev プロパティ'
description: 開発モードかプロダクションモードかを指定します。
menu: dev
category: configuration
position: 106
---

- 型: `Boolean`
- デフォルト: `true`

> 開発モードかプロダクションモードかを指定します。

このプロパティは [nuxt コマンド](/guide/commands) によって上書きされます:

- `nuxt` コマンドを使うときは `dev` は強制的に `true` になります
- `nuxt build`、`nuxt start`、`nuxt generate` コマンドを使うときは `dev` は強制的に `false` になります

このプロパティは [Nuxt.js をプログラムで使う](/api/nuxt) ときに設定します:

例:

`nuxt.config.js`

```js
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

`server.js`

```js
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// Nuxt.js をオプションを使ってインスタンス化する
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

それから `package.json` に次のように書きます:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "cross-env NODE_ENV=production node server.js"
  }
}
```

情報: 上の例を動かすためには `npm install --save-dev cross-env` を実行する必要があります。もし Windows で開発しているの _でない_ ならば、`start` スクリプトから cross-env を削除して、直接 `NODE_ENV` をセットすることもできます。
