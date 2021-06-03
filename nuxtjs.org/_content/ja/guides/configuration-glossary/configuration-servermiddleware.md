---
title: 'serverMiddleware プロパティ'
description: 'サーバーサイドミドルウェアを定義します。'
menu: serverMiddleware
category: configuration-glossary
position: 27
---

- 型: `Array`
  - 要素: `String` または `Object` または `Function`

Nuxt はカスタムミドルウェアを追加できる [connect](https://github.com/senchalabs/connect) インスタンスを内部で作ります。これにより**外部サーバーを必要とせずに**通常は `/api` ルート）を登録できます。

connect 自体はミドルウェアなので、登録されたミドルウェアは `nuxt start` と [express-template](https://github.com/nuxt-community/express-template) のようなプログラムで使われるミドルウェアとして使う場合の両方で動作します。Nuxt [モジュール](/docs/2.x/directory-structure/modules) もまた [this.addServerMiddleware()](/docs/2.x/internals-glossary/internals-module-container#addservermiddleware-middleware) を使って `serverMiddleware` を提供できます。

それらに加え、デフォルト値が `true` の `prefix` オプションを導入しました。サーバーミドルウェアに router base を追加します。

**例:**

- サーバーミドルウェアパス: `/server-middleware`
- Router base: `/admin`
- `prefix: true` の場合（デフォルト）: `/admin/server-middleware`
- `prefix: false` の場合: `/server-middleware`

## サーバーミドルウェア vs ミドルウェア！

クライアントサイドやサーバーサイドレンダリングで Vue によって各ルートの前に呼び出される[ルートのミドルウェア](/docs/2.x/directory-structure/middleware)と混同しないでください。`serverMiddleware` プロパティに列挙されているミドルウェアは `vue-server-renderer` の**前**にサーバーサイドで実行され、API リクエストの処理やアセットの提供などのサーバー固有のタスクに使用できます。

<base-alert>

サーバーミドルウェアを middleware/ ディレクトリに追加しないでください。

ミドルウェアは webpack によって本番バンドルにバンドルされ beforeRouteEnter で実行されます。serverMiddleware を middleware/ ディレクトリに追加すると、Nuxt によってミドルウェアとして誤って選択され、誤った依存関係がバンドルに追加されたり、エラーが発生したりします。

</base-alert>

## 使い方

もしミドルウェアが文字列の場合、 Nuxt.js はそのミドルウェアを自動的に解決し要求します。

```js{}[nuxt.config.js]
import serveStatic from 'serve-static'

export default {
  serverMiddleware: [
    // redirect-ssl npm パッケージを登録します
    'redirect-ssl',

    // /server-middleware/* を処理するために、プロジェクトの server-middleware ディレクトリからファイルを登録します
    { path: '/server-middleware', handler: '~/server-middleware/index.js' },

    // カスタムインスタンスを作成することもできます
    { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ]
}
```

<base-alert type="warn">

もしミドルウェアをすべてのルートに登録したくない場合は、特定のパスでオブジェクトフォームを使用する必要があります。 そうしないと nuxt のデフォルトハンドラは機能しません。

</base-alert>

## カスタムサーバーミドルウェア

カスタムミドルウェアの作成も可能です。詳細については [Connect Docs](https://github.com/senchalabs/connect#appusefn) を参照してください。

ミドルウェア（`server-middleware/logger.js`）:

```js{}[server-middleware/logger.js]
export default function (req, res, next) {
  // req は Node.js の HTTP リクエストオブジェクトです
  console.log(req.url)

  // res は Node.js の HTTP レスポンスオブジェクトです

  // next は 次のミドルウェアを呼び出すための関数です。
  // ミドルウェアがエンドポイントでない場合、関数の最後で next を呼び出すのを忘れないでください！
  next()
}
```

```js{}[nuxt.config.js]
serverMiddleware: ['~/server-middleware/logger']
```

## カスタム API エンドポイント

サーバーミドルウェアも Express を拡張できます。これにより REST エンドポイントを作成できます。

```js{}[server-middleware/rest.js]
const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())
app.all('/getJSON', (req, res) => {
  res.json({ data: 'data' })
})

module.exports = app
```

```js{}[nuxt.config.js]
serverMiddleware: [
  { path: "/server-middleware", handler: "~/server-middleware/rest.js" },
],
```

## オブジェクトの構文

パスにマッピングされた関数のリストでサーバーミドルウェアが構成されている場合:

```js
export default {
  serverMiddleware: [
    { path: '/a', handler: '~/server-middleware/a.js' },
    { path: '/b', handler: '~/server-middleware/b.js' },
    { path: '/c', handler: '~/server-middleware/c.js' }
  ]
}
```

あるいは、次のとおりオブジェクトを渡して定義することもできます:

```js
export default {
  serverMiddleware: {
    '/a': '~/server-middleware/a.js',
    '/b': '~/server-middleware/b.js',
    '/c': '~/server-middleware/c.js'
  }
}
```
