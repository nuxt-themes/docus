---
title: 'API: validate メソッド'
description: Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます。
menu: validate
category: pages
position: 30
---

> Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます。

- **型:** `Function` または `Async Function`

`validate` は新しいルートに移動する前に毎回呼び出されます。これは、サーバサイド（Nuxt アプリへの最初のリクエスト）で 1 回、クライアントサイドで別のルートに移動しても呼び出されます。このメソッドは、引数として [`context`](/api/context) オブジェクトを受け取ります。

```js
validate({ params, query, store }) {
  return true // params バリデーションを通過したとき
  return false // Nuxt.js がルートをレンダリングするのを中止して、エラーページを表示させる
}
```

```js
async validate({ params, query, store }) {
  // await の処理
  return true // params バリデーションを通過したとき
  return false // Nuxt.js がルートをレンダリングするのを中止して、エラーページを表示させる
}
```

プロミスを返すこともできます:

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
}
```

Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます（下記の例は `pages/users/_id.vue` 内です）

バリデーションメソッドが `true` を返さないときは Nuxt.js は自動的に 404 エラーページをロードします。

```js
export default {
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  }
}
```

また、例えば [Vuex ストア](/guide/vuex-store) のデータを使ってバリデーションすることもできます（Vuex ストアのデータは [nuxtServerInit アクション](/guide/vuex-store#nuxtserverinit-アクション) を用いて事前に格納しておきます）:

```js
export default {
  validate({ params, store }) {
    // `params.id` が存在している category の id なのか否かをチェックする
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

さらにバリデーション関数を実行中に、想定したエラーや想定外のエラーを投げることもできます:

```js
export default {
  async validate({ params, store }) {
    // 500 internal server error とともにカスタムメッセージを投げる
    throw new Error('Under Construction!')
  }
}
```
