---
title: 'コンテキスト'
description: context は、Nuxt から Vue コンポーネントに追加のオブジェクト/パラメータを提供し、asyncData、fetch、plugins、middleware、nuxtServerInit のような特別な Nuxt ライフサイクル内で使用できます。
menu: コンテキスト
category: internals-glossary
position: 1
---

`context` は、Nuxt から Vue コンポーネントに追加のオブジェクト/パラメータを提供し、[`asyncData`](/api)、[`fetch`](/docs/2.x/features/data-fetching)、[`plugins`](/docs/2.x/directory-structure/plugins)、[`middleware`](/docs/2.x/directory-structure/middleware#router-middleware)、[`nuxtServerInit`](/docs/2.x/directory-structure/store#the-nuxtserverinit-action) のような特別な Nuxt ライフサイクル内で使用できます。

> 注意: ここで言う「コンテキスト」と、[`Vuex のアクション`](https://vuex.vuejs.org/ja/guide/actions.html)の中で使用できる `context` オブジェクトを混同しないでください。2 つは無関係です。

```js
function (context) {
  // ユニバーサルなキー
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
    error,
    $config
  } = context
  // サーバーサイド
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }
  // クライアントサイド
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

## ユニバーサルなキー

これらのキーは、クライアントサイドとサーバーサイドの両方で使用できます。

### app

`app`（_NuxtAppOptions_）

すべてのプラグインを含むルート Vue インスタンスのオプション。たとえば `i18n` を使用している場合は `context.app.i18n` で `$i18n` にアクセスできます。

### store

`store`（[_Vuex Store_](https://vuex.vuejs.org/ja/api/#vuex-store-%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)）

Vuex の Store インスタンス。**[Vuex ストア](/docs/2.x/directory-structure/store)が設定されている場合のみ使用できます**。

### route

`route`（[_Vue Router Route_](https://router.vuejs.org/ja/api/#%E3%83%AB%E3%83%BC%E3%83%88%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)）

Vue Router の route インスタンス。

### params

`params`（_Object_）

`route.params` のエイリアス。

### query

`query`（_Object_）

`route.query` のエイリアス。

### env

`env`（_Object_）

`nuxt.config.js` で設定された環境変数。[env api](/docs/2.x/configuration-glossary/configuration-env) を参照してください。

### isDev

`isDev`（_Boolean_）

開発モードであるかどうかを示すブール値で、本番環境で一部のデータをキャッシュするのに役立ちます。

### isHMR

`isHMR`（_Boolean_）

メソッド/ミドルウェアが webpack の hot module replacement から呼び出されたかどうかを示すブール値（開発モードのクライアントサイドでのみ true）。

### redirect

`redirect`（_Function_）

ユーザーを別のルートにリダイレクトするには、このメソッドを使用してください。ステータスコードはサーバーサイドで使用され、デフォルトは `302` です。 `redirect([status,] path [, query])`。

例:

```js{}[]
redirect(302, '/login')
redirect({ name: 'slug', params: { slug: mySlug } })
redirect('https://vuejs.org')
```

Location プロパティの詳細については、[Vue Router のドキュメント](https://github.com/vuejs/vue-router/blob/64d60c01920405f0b93e00a401c73868b08ee6e5/types/router.d.ts#L161-L169)を参照してください。

<base-alert type="info">

ハイドレーションエラー（クライアントの内容が、サーバーが返すものと異なってしまう）のため、[クライアントサイド限定の Nuxt プラグイン](/docs/2.x/directory-structure/plugins#client-or-server-side-only)の中では `redirect` や `error` を使用することはできません。

有効な回避策は、`window.onNuxtReady(() => { window.$nuxt.$router.push('/your-route') })` を使用することです。

</base-alert>

### error

`error`（_Function_）

エラーページを表示するには、このメソッドを使用してください。例: `error(params)`。`params` には `statusCode` と `message` プロパティが必要です。

### `$config`

`$config`（_Object_）

実際の[ランタイム設定](/docs/2.x/configuration-glossary/configuration-runtime-config)。

## サーバーサイドのキー

これらのキーはサーバーサイドでのみ使用できます。

### req

`req`（[_http.Request_](https://nodejs.org/api/http.html#http_class_http_incomingmessage)）

Node.js サーバーからのリクエスト。Nuxt がミドルウェアとして使われる場合、リクエストオブジェクトは使用しているフレームワークによって異なる可能性があります。<br>**`nuxt generate` では使用できません**。

### Res

`res`（[_http.Response_](https://nodejs.org/api/http.html#http_class_http_serverresponse)）

Node.js サーバーからのレスポンス。Nuxt がミドルウェアとして使われる場合、レスポンスオブジェクトは使用しているフレームワークによって異なる可能性があります。<br>**`nuxt generate` では使用できません**。

### beforeNuxtRender

`beforeNuxtRender(fn)`（_Function_）

クライアントサイドでレンダリングされた `__NUXT__` 変数を更新するには、このメソッドを使用してください。`fn`（非同期にもできます）は `{ Components, nuxtState }` で呼び出されます。[例](https://github.com/nuxt/nuxt.js/blob/cf6b0df45f678c5ac35535d49710c606ab34787d/test/fixtures/basic/pages/special-state.vue)を参照してください。

## クライアントサイドのキー

これらのキーはクライアントサイドでのみ使用できます。

### from

`from`（[_Vue Router Route_](https://router.vuejs.org/ja/api/#%E3%83%AB%E3%83%BC%E3%83%88%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)）

遷移元の route。

### nuxtState

`nuxtState`（_Object_）

Nuxt の状態。ハイドレーション前のクライアントサイドで Nuxt の状態を取得するために `beforeNuxtRender` を使うプラグインに便利です。**`universal` モードでのみ使用できます**。
