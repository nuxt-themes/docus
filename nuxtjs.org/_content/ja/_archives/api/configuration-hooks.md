---
title: 'API: hooks プロパティ'
description: フックは Nuxt モジュールで一般的に使われる Nuxt イベントのリスナーですが、 `nuxt.config.js` の中でも利用できます。
menu: hooks
category: configuration
position: 113
---

- 型: `Object`

> フックは Nuxt モジュールで一般的に使われる [Nuxt イベントのリスナー](/api/internals) ですが、 `nuxt.config.js` の中でも利用できます。 より詳しくは [こちら](/api/internals) を参照してください。

例 (`nuxt.config.js`):

```js
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(
          builder.nuxt.options.buildDir,
          'extra-file'
        )
        fs.writeFileSync(extraFilePath, 'Something extra')
      }
    }
  }
}
```

内部的には、フックはコロン（例えば、 `build:done`）を使った命名パターンに従います。設定を簡単にするため、上記の例のように `nuxt.config.js` を使用して独自のフックを設定すると、それらを階層オブジェクトとして構造化できます。 それらの仕組みの詳細については [Nuxt Internals](/api/internals) を参照してください。

## フックリスト

- [Nuxt クラス フック](https://ja.nuxtjs.org/api/internals-nuxt/#フック)
- [Renderer クラス フック](https://ja.nuxtjs.org/api/internals-renderer/#フック)
- [ModulesContainer クラス フック](https://ja.nuxtjs.org/api/internals-module-container/#フック)
- [Builder クラス フック](https://ja.nuxtjs.org/api/internals-builder/#フック)
- [Generator クラス フック](https://ja.nuxtjs.org/api/internals-generator/#フック)

## 例

### root でない場合は router.base にリダイレクトさせる

ページを `/` の代わりに `/portal` として提供したいとしましょう。

これはおそらくエッジケースで、 _nuxt.config.js_ における `router.base` のポイントは Web サーバーがドメインルート以外の場所で Nuxt を提供する時のためのものです。

しかし、ローカル開発中に _localhost_ にアクセスすると、router.base が / でない場合は 404 が返されてしまいます。フックを設定することでこれを防ぐことができます。

リダイレクトは、プロダクション用の Web サイトでは最適なユースケースではないかもしれませんが、これはフックを活用するのに役立ちます。

まずはじめに、 [`router.base` を変更できます](/api/configuration-router#base) `nuxt.config.js` を更新してみましょう:

```js
// nuxt.config.js
import hooks from './hooks'
export default {
  router: {
    base: '/portal'
  }
  hooks: hooks(this)
}
```

それから、いくつかファイルを作成します。

1. `hooks/index.js` フックモジュール

   ```js
   // file: hooks/index.js
   import render from './render'

   export default nuxtConfig => ({
     render: render(nuxtConfig)
   })
   ```

1. `hooks/render.js` レンダーフック

   ```js
   // file: hooks/render.js
   import redirectRootToPortal from './route-redirect-portal'

   export default nuxtConfig => {
     const router = Reflect.has(nuxtConfig, 'router') ? nuxtConfig.router : {}
     const base = Reflect.has(router, 'base') ? router.base : '/portal'

     return {
       /**
        * 'render:setupMiddleware'
        * {@link node_modules/nuxt/lib/core/renderer.js}
        */
       setupMiddleware(app) {
         app.use('/', redirectRootToPortal(base))
       }
     }
   }
   ```

1. `hooks/route-redirect-portal.js` ミドルウェア自体

   ```js
   // file: hooks/route-redirect-portal.js

   /**
    * /portalから / へリダイレクトするための Nuxt ミドルウェアフック（または nuxt.config.js の router.base で設定したもの）
    *
    * connect と同じバージョンであるべきです
    * {@link node_modules/connect/package.json}
    */
   import parseurl from 'parseurl'

   /**
    * 目的の Web アプリケーションコンテキストルートへのリダイレクト処理をするためのミドルウェアに接続する。
    *
    * Nuxt のドキュメントにはフックの使い方の説明が欠けていることに注意してください。
    * 下記は補足説明として役立つルーターのサンプルです。
    *
    * インスピレーションのための素晴らしい実装を見てみましょう:
    * - https://github.com/nuxt/nuxt.js/blob/dev/examples/with-cookies/plugins/cookies.js
    * - https://github.com/yyx990803/launch-editor/blob/master/packages/launch-editor-middleware/index.js
    *
    * [httpクラス httpクライアントリクエスト]: https://nodejs.org/api/http.html#http_class_http_clientrequest
    * [httpクラス httpサーバーレスポンス]: https://nodejs.org/api/http.html#http_class_http_serverresponse
    *
    * @param {http.ClientRequest} req Node.jsの内部的なクライアントリクエストオブジェクト [httpクラス httpクライアントリクエスト]
    * @param {http.ServerResponse} res Node.jsの内部的なレスポンス [httpクラス httpサーバーレスポンス]
    * @param {Function} next ミドルウェアのコールバック
    */
   export default desiredContextRoot =>
     function projectHooksRouteRedirectPortal(req, res, next) {
       const desiredContextRootRegExp = new RegExp(`^${desiredContextRoot}`)
       const _parsedUrl = Reflect.has(req, '_parsedUrl') ? req._parsedUrl : null
       const url = _parsedUrl !== null ? _parsedUrl : parseurl(req)
       const startsWithDesired = desiredContextRootRegExp.test(url.pathname)
       const isNotProperContextRoot = desiredContextRoot !== url.pathname
       if (isNotProperContextRoot && startsWithDesired === false) {
         const pathname = url.pathname === null ? '' : url.pathname
         const search = url.search === null ? '' : url.search
         const Location = desiredContextRoot + pathname + search
         res.writeHead(302, {
           Location
         })
         res.end()
       }
       next()
     }
   ```

これで、開発中の Web サービスに同僚が誤って `/` にアクセスしようとしても、Nuxt は自動的に `/portal` にリダイレクトするでしょう。
