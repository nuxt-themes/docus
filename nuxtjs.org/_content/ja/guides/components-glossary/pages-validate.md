---
title: 'validate メソッド'
description: 'Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます'
menu: 'Validate メソッド'
category: components-glossary
position: 0
---

> Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます。

- **型:** `Function` または `Async Function`

`validate` は新しいルートに移動する前に毎回呼び出されます。サーバーサイドでは（Nuxt アプリケーションへの最初のリクエストで）1 度、クライアントサイドでは別のルートに遷移する際に呼び出されます。このメソッドは [`context`](/docs/2.x/internals-glossary/context) オブジェクトを引数として受け取ります。

```js
validate({ params, query, store }) {
  return true // params が有効な場合
  return false // Nuxt.js にルートをレンダリングさせるのを止め、エラーページを表示させます
}
```

```js
async validate({ params, query, store }) {
  // await operations
  return true // params が有効な場合
  return false // Nuxt.js にルートをレンダリングさせるのを止め、エラーページを表示させます
}
```

プロミスを返すこともできます:

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
}
```

Nuxt.js では動的なルーティングを行うコンポーネント内でバリデーションメソッドを定義できます（以下の例では `pages/users/_id.vue` です）。

バリデーションメソッドが `true` を返さない場合 Nuxt.js は自動的に 404 エラーページをロードします。

```js
export default {
  validate({ params }) {
    // 数字でなければなりません
    return /^\d+$/.test(params.id)
  }
}
```

例えば[ストア](/docs/2.x/directory-structure/store)内の一部のデータ（アクションの前に [`nuxtServerInit`](/docs/2.x/directory-structure/store#the-nuxtserverinit-action) で格納されます）を確認することもできます:

```js
export default {
  validate({ params, store }) {
    // `params.id` が存在しているカテゴリかどうかを確認します
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

バリデーション関数を実行中に想定されるエラーや想定外のエラーを投げることもできます:

```js
export default {
  async validate({ params, store }) {
    // カスタムメッセージと共に 500 internal server error を投げます
    throw new Error('Under Construction!')
  }
}
```
