---
title: 'API: コンテキスト'
description: '`context` は、従来 Vue コンポーネントが使用できないオブジェクト/パラメータを Nuxt から追加で提供します。`context` は `asyncData`、`plugins`、`middlewares`、`modules` や `store/nuxtServerInit` といった nuxt の特別なライフサイクル内で使用できます。'
menu: context
category: essential
position: 1
---

> `context` は Nuxt から Vue コンポーネントへ追加のオブジェクト/パラメータを提供し 、[`asyncData`](/api)、[`fetch`](/api/pages-fetch)、[`plugins`](/guide/plugins)、[`middleware`](/guide/routing/#%E3%83%9F%E3%83%89%E3%83%AB%E3%82%A6%E3%82%A7%E3%82%A2)、そして [`nuxtServerInit`](/guide/vuex-store/#nuxtserverinit-%E3%82%A2%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3) のような特別な nuxt ライフサイクル内で利用可能です。

> \*注意: ここで言及する"コンテキスト"は、[`Vuex Actions`](https://vuex.vuejs.org/ja/guide/actions.html) で利用する `context` オブジェクトと混同しないでください。2 つは無関係です。

```js
function (context) {
  // Universal keys
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error
  } = context
  // Server-side
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }
  // Client-side
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

## Universal keys

これらのキーはクライアントサイドとサーバーサイド両方で利用可能です。

### `app` (_NuxtAppOptions_)

すべてのプラグインを含むルートの Vue インスタンス。 たとえば、`i18n` を使用する場合、`context.app.i18n` から `$i18n` にアクセスすることができます。

### `store` ([_Vuex Store_](https://vuex.vuejs.org/ja/api/#vuex-store-%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3))

Vuex Store インスタンス。**[vuex store](/guide/vuex-store) が設定されている場合にのみ利用可能です**。

### `route` ([_Vue Router Route_](https://router.vuejs.org/ja/api/#%E3%83%AB%E3%83%BC%E3%83%88%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88))

Vue Router ルートインスタンス。

### `params` (_Object_)

`route.params` のエイリアス。

### `query` (_Object_)

`route.query` のエイリアス。

### `env` (_Object_)

`nuxt.config.js` で設定された環境変数。[env api](/api/configuration-env) を参照してください。

### `isDev` (_Boolean_)

開発モードであるかどうかを知らせます。プロダクション環境でデータをキャッシュさせる場合などに便利です。

### `isHMR` (_Boolean_)

メソッド/ミドルウェアが webpack の hot module replacement（_開発モードでのクライアントサイドに限る_）から呼び出されたかどうかを知らせます。

### `redirect` (_Function_)

ユーザーを別のルートにリダイレクトさせます。ステータスコードはサーバーサイドで使用され、デフォルトは `302` です。`redirect([status,] path [, query])`。

### `error` (_Function_)

エラーページを表示します。`error(params)` のように呼びます。`params` は `statusCode` と `message` の 2 つのプロパティを持つ必要があります。

## Server-side keys

これらのキーはサーバーサイドでのみ利用可能です。

### `req` ([_http.Request_](https://nodejs.org/api/http.html#http_class_http_incomingmessage))

Node.js サーバーからのリクエスト。Nuxt がミドルウェアとして使用されている場合、使用しているフレームワークによってリクエストオブジェクトが異なることがあります。<br>**`nuxt generate` からは使用できません**。

### `res` ([_http.Response_](https://nodejs.org/api/http.html#http_class_http_serverresponse))

Node.js サーバーからのレスポンス。 Nuxt がミドルウェアとして使用されている場合、使用しているフレームワークに応じてレスポンスオブジェクトが異なることがあります。<br>**`nuxt generate` からは使用できません**。

### `beforeNuxtRender(fn)` (_Function_)

クライアントサイドでレンダリングされた `__NUXT__` 変数がアップデートされます。`fn`（非同期にすることができます）は `{ Components, nuxtState }` と共に呼ばれます。詳細は[例](https://github.com/nuxt/nuxt.js/blob/cf6b0df45f678c5ac35535d49710c606ab34787d/test/fixtures/basic/pages/special-state.vue)を参照してください。

## Client-side keys

これらのキーはクライアントサイドでのみ利用可能です。

### `from` ([_Vue Router Route_](https://router.vuejs.org/ja/api/#%E3%83%AB%E3%83%BC%E3%83%88%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88))

遷移元の route。

### `nuxtState` _(Object)_

Nuxt の状態。`beforeNuxtRender` を使用してハイドレーション前にクライアントサイドで nuxt の状態を取得するプラグインに便利です。**`universal` モードでのみ使用できます**。
