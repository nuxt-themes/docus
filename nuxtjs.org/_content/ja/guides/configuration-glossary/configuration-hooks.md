---
title: 'hooks プロパティ'
description: 'フックは Nuxt モジュールで一般的に使われる Nuxt イベントリスナーだけでなく `nuxt.config.js` でも利用できます。'
menu: hooks
category: configuration-glossary
position: 13
---

- 型: `Object`

> フックは Nuxt モジュールで一般的に使われる [Nuxt イベントリスナー](/docs/2.x/internals-glossary/internals)だけでなく `nuxt.config.js` でも利用できます。

```js{}[nuxt.config.js]
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

内部的には、フックはコロン（例えば `build:done`）を使った命名パターンに従います。設定を簡単にするため、上記の例のように独自のフックを `nuxt.config.js` に設定すると、それらを階層オブジェクトとして構造化できます。仕組みの詳細については [Nuxt の内部](/docs/2.x/internals-glossary/internals)を参照してください。

## フックのリスト

- [Nuxt フック](/docs/2.x/internals-glossary/internals-nuxt#フック)
- [Renderer フック](/docs/2.x/internals-glossary/internals-renderer#フック)
- [ModulesContainer フック](/docs/2.x/internals-glossary/internals-module-container#フック)
- [Builder フック](/docs/2.x/internals-glossary/internals-builder#フック)
- [Generator フック](/docs/2.x/internals-glossary/internals-generator#フック)

## 例

### root でない場合は router.base にリダイレクトさせる

ページを `/` のかわりに `/portal` として提供するとします。

これはおそらくエッジケースであり、nuxt.config.js\_ の `router.base` のポイントは web サーバーがドメインルート以外の場所で Nuxt を提供するときのためのものです。

しかしローカル開発中に _localhost_ にアクセスすると router.base が / でない場合は 404 が返されます。フックを設定することでこれを防げます。

リダイレクトはプロダクション用の Web サイトでは最適なユースケースではないかもしれませんがフックを活用するのに役立ちます。

まずはじめに、[`router.base` を変更できます](/docs/2.x/configuration-glossary/configuration-router#base)。`nuxt.config.js` を更新してみましょう:

```js{}[nuxt.config.js]
import hooks from './hooks'
export default {
  router: {
    base: '/portal'
  }
  hooks: hooks(this)
}
```

そしていくつかファイルを作成します。

1. フックモジュールである `hooks/index.js`

   ```js{}[hooks/index.js]
   import render from './render'

   export default nuxtConfig => ({
     render: render(nuxtConfig)
   })
   ```

1. レンダーフックである `hooks/render.js`

   ```js{}[hooks/render.js]
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

1. ミドルウェア自体である `hooks/route-redirect-portal.js`

   ```js{}[hooks/route-redirect-portal.js]
   /**
    * /portalから / へリダイレクトするための Nuxt ミドルウェアフック（または nuxt.config.js の router.base で設定したもの）
    *
    * connect と同じバージョンにしてください
    * {@link node_modules/connect/package.json}
    */
   import parseurl from 'parseurl'

   /**
    * 目的の Web アプリケーションコンテキストルートへのリダイレクト処理をするためのミドルウェアに接続します。
    *
    * Nuxt のドキュメントにはフックの使い方の説明が欠けていることに注意してください。
    * これは補足説明として役立つルーターのサンプルです。
    *
    * インスピレーションのために素晴らしい実装を見てみましょう:
    * - https://github.com/nuxt/nuxt.js/blob/dev/examples/with-cookies/plugins/cookies.js
    * - https://github.com/yyx990803/launch-editor/blob/master/packages/launch-editor-middleware/index.js
    *
    * [http_class_http_clientrequest]: https://nodejs.org/api/http.html#http_class_http_clientrequest
    * [http_class_http_serverresponse]: https://nodejs.org/api/http.html#http_class_http_serverresponse
    *
    * @param {http.ClientRequest} req Node.jsの内部的なクライアントリクエストオブジェクト [http_class_http_clientrequest]
    * @param {http.ServerResponse} res Node.jsの内部的なレスポンス [http_class_http_serverresponse]
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

これで、開発中の Web サービスで同僚が誤って `/` にアクセスしても Nuxt は自動的に `/portal` にリダイレクトするでしょう。
