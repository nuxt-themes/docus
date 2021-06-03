---
title: 'API: serverMiddleware プロパティ'
description: サーバーミドルウェアを定義します
menu: serverMiddleware
category: configuration
position: 127
---

- 型: `Array`
  - 要素: `String` または `Object` または `Function`

Nuxt は内部で [connect](https://github.com/senchalabs/connect) のインスタンスを作ります。それはミドルウェアをスタックに登録したり、 **外部サーバーを必要とせず** に API などのルートを増やす事を可能にしてくれます。 connect 自体はミドルウェアで、登録されたミドルウェアは `nuxt start` と [express-template](https://github.com/nuxt-community/express-template) のようなプログラム的な使用法を持つミドルウェアとして使用されます。 Nuxt [モジュール](/guide/modules) もまた [this.addServerMiddleware()](/api/internals-module-container#addservermiddleware-middleware-) を使用して `serverMiddleware` を提供できます。

それらに加え、デフォルトで `true` にする `prefix` オプションを導入しました。サーバーミドルウェアに router base を追加します。

**例:**

- サーバーミドルウェアパス: `/api`
- Router base: `/admin`
- With `prefix: true` (default): `/admin/api`
- With `prefix: false`: `/api`

## サーバーミドルウェア vs ミドルウェア！

クライアントサイドや SSR の Vue で各ルートの前に呼び出されている [ルーティングのミドルウェア](/guide/routing#ミドルウェア) と混同しないでください。 `serverMiddleware` は `vue-server-renderer` の **前に** サーバー側で実行され、API リクエストの処理やアセットの処理などのサーバー固有のタスクとして使用できます。

## 使用方法

もしミドルウェアが文字列の場合、 Nuxt.js は自動的にそれを解決し、そのミドルウェアを要求します。

例 (`nuxt.config.js`):

```js
import serveStatic from 'serve-static'

export default {
  serverMiddleware: [
    // redirect-ssl npm パッケージを登録します
    'redirect-ssl',

    // /api/* を処理するために、プロジェクトの api ディレクトリからファイルを登録します
    { path: '/api', handler: '~/api/index.js' },

    // カスタムインスタンスを作成することもできます。
    { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ]
}
```

<p class="Alert Alert--danger">
    <b>注意点！</b>
    もしミドルウェアをすべてのルートに登録したくない場合は、特定のパスでオブジェクトフォームを使用する必要があります。
    そうしないと nuxt の デフォルトハンドラは機能しません。
</p>

## カスタムサーバーミドルウェア

カスタムミドルウェアの作成も可能です。 詳細については、 [Connect Docs](https://github.com/senchalabs/connect#appusefn) を参照してください。

ミドルウェア (`server-middleware/logger.js`):

```js
export default function (req, res, next) {
  // req は Node.js の HTTPリクエストオブジェクトです
  console.log(req.url)

  // res は Node.js の HTTPレスポンスオブジェクトです

  // next は 次のミドルウェアを呼び出すための関数です。
  // あなたのミドルウェアが最後でない場合、関数の最後で next を呼び出すのを忘れないでください！
  next()
}
```

Nuxt Config (`nuxt.config.js`):

```js
serverMiddleware: ['~/api/logger']
```

## オブジェクト構文

パスにマッピングされた関数のリストでサーバーミドルウェアが構成されている場合:

```js
export default {
  serverMiddleware: [
    { path: '/a', handler: '~/api/a.js' },
    { path: '/b', handler: '~/api/b.js' },
    { path: '/c', handler: '~/api/c.js' }
  ]
}
```

あるいは、次のとおりオブジェクトを渡して定義することもできます:

```js
export default {
  serverMiddleware: {
    '/a': '~/api/a.js',
    '/b': '~/api/b.js',
    '/c': '~/api/c.js'
  }
}
```
