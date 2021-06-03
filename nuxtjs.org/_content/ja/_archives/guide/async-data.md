---
title: 非同期なデータ
description: サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。 Nuxt.js はコンポーネントのデータをセットする前に非同期の処理を行えるようにするために `asyncData` メソッドを追加しています。
category: getting-started
position: 106
---

> サーバーサイドでデータを取得し、それをレンダリングしたいことがあるでしょう。 Nuxt.js はコンポーネントを初期化する前に非同期の処理を行えるようにするために `asyncData` メソッドを追加しています。

<div>
  <a href="https://vueschool.io/courses/async-data-with-nuxtjs?friend=nuxt" target="_blank" class="Promote">
  <img src="/async-data-with-nuxtjs.png" srcset="/async-data-with-nuxtjs-2x.png 2x" alt="AsyncData by vueschool"/>
  <div class="Promote__Content">
    <h4 class="Promote__Content__Title">Nuxt.js で非同期なデータを扱う</h4>
    <p class="Promote__Content__Description">Nuxt.js で非同期なデータをどう管理するかについて学びます。</p>
    <p class="Promote__Content__Signature">Nuxt.js の開発をサポートするために、VueSchool がビデオコースを作りました。</p>
  </div>
  </a>
</div>

## asyncData メソッド

場合によっては、ストアを使用せずにデータをフェッチし、サーバー上でプレレンダリングしたい場合があります。 `asyncData` は **ページ** コンポーネントがローディングされる前に常に呼び出されます。サーバーサイドでは 1 回だけ（Nuxt アプリへの最初のリクエスト）呼び出され、クライアントサイドではページ遷移をするたびに呼び出されます。このメソッドは、第一引数として[コンテキスト](/api/context)を受け取ります。これを使用してデータを取得し、 Nuxt.js はコンポーネントデータとマージすることができます。

Nuxt.js は返されたオブジェクトとコンポーネントデータを自動的にマージします。

<div class="Alert Alert--orange">

`asyncData` メソッド内の `this` を通してコンポーネントのインスタンスにアクセスすることは **できません**。それはコンポーネントが **インスタンス化される前に** このメソッドが呼び出されるからです。

</div>

Nuxt.js では `asyncData` メソッドを使うために、いくつかの異なるやり方があるので、お好きなものを選んでください:

1. `Promise` を返す。 Nuxt.js はコンポーネントがレンダリングされる前に `Promise` が解決されるまで待ちます
2. [async/await](https://ja.javascript.info/async-await) を使う

<div class="Alert Alert--grey">

私たちは isomorphic な HTTP リクエストを作るために [axios](https://github.com/mzabriskie/axios) を使っています。私たちはあなたの Nuxt プロジェクトに、私たちの [axios module](https://axios.nuxtjs.org/) を使うことを<strong>強くオススメ</strong>します。

</div>

`node_modules` 内の `axios` を直接使用しており、`axios.interceptors` を使用してデータを処理する場合、interceptors を追加する前にインスタンスを作成してください。そうしなければ、サーバレンダリングされたページをリフレッシュする際に、interceptor が複数追加され、データエラーが発生します。

```js
import axios from 'axios'
const myaxios = axios.create({
  // ...
})
myaxios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // ...
  }
)
```

### Promise を返す

```js
export default {
  asyncData({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`).then(res => {
      return { title: res.data.title }
    })
  }
}
```

### async/await を使う

```js
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### データを表示する

asyncData の結果はコンポーネントのデータと **マージされ** ます。下記のように template の内側でデータを表示することができます:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## コンテキスト

`context` 内で利用できるキーの一覧を確認するには [API 基本 `Context`](/api/context) を参照してください。

### `req`/`res` オブジェクトの利用

サーバーサイドで `asyncData` が呼ばれた場合、ユーザーリクエストの `req` と `res` オブジェクトにアクセスできます。

```js
export default {
  async asyncData({ req, res }) {
    // req と res を使う前にサーバーサイドか
    // どうかチェックしてください
    if (process.server) {
      return { host: req.headers.host }
    }

    return {}
  }
}
```

### 動的なルートデータへのアクセス

`context` パラメータを利用して動的ルートデータにアクセスすることもできます。たとえば、動的ルートパラメータには、それを設定したファイルまたはフォルダの名前を使用してアクセスできます。 `pages` フォルダに `_slug.vue` という名前のファイルを定義した場合、 `context.params.slug` を介して値にアクセスできます。

```js
export default {
  async asyncData({ params }) {
    const slug = params.slug // /abc というパスを呼び出した時、 slug は "abc" になる
    return { slug }
  }
}
```

### クエリの変化のリスニング

デフォルトでは、クエリストリングの変化で `asyncData` メソッドは**呼ばれません**。ページネーションコンポーネントのビルド時などにこの振る舞いを変更したい場合は、ページコンポーネントの `watchQuery` プロパティを見るパラメータを設定することができます。より詳しい情報は [API `watchQuery` プロパティ](/api/pages-watchquery) を参照してください。

## エラー処理

Nuxt.js は、 `context` に `error(params)` メソッドを追加し、エラーページを表示するためにそれを呼び出すことができます。 `params.statusCode` は、サーバーサイドから適切なステータスコードを表示するためにも使用されます。

`Promise` による例:

```js
export default {
  asyncData({ params, error }) {
    return axios
      .get(`https://my-api/posts/${params.id}`)
      .then(res => {
        return { title: res.data.title }
      })
      .catch(e => {
        error({ statusCode: 404, message: 'ページが見つかりません' })
      })
  }
}
```

エラーページをカスタマイズするには [ビューのレイアウトセクション](/guide/views#%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88) を参照してください。
