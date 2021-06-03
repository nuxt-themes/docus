---
title: 'watchQuery プロパティ'
description: 'クエリ文字列を監視し、変更時にコンポーネントメソッドを実行します（asyncData、fetch、validate、layout など）'
menu: WatchQuery プロパティ
category: components-glossary
position: 0
---

> クエリ文字列を監視し、変更時にコンポーネントメソッドを実行します（asyncData、fetch、validate、layout など）

- **型:** `Boolean` または `Array` または `Function`（デフォルト: `[]`）

Use the `watchQuery` キーを設定し、監視するクエリ文字列を設定します。定義した文字列に変更が生じると、全てのコンポーネントメソッド（asyncData、fetch、validate、layout などが呼ばれます。パフォーマンス向上のため、監視はデフォルトで無効になっています。

すべてのクエリ文字列に対して監視を設定したい場合は `watchQuery: true` を設定してください。

```js
export default {
  watchQuery: ['page']
}
```

より洗練された監視のために `watchQuery(newQuery, oldQuery)` 関数を使用することもできます。

```js
export default {
  watchQuery(newQuery, oldQuery) {
    // Only execute component methods if the old query string contained `bar`
    // and the new query string contains `foo`
    return newQuery.foo && oldQuery.bar
  }
}
```

<base-alert>

**Warning**: v2.12 で導入された新しい `fetch` フックは `watchQuery` の影響を受けません。詳しくは[クエリ文字列の変化のリスニング](/docs/2.x/features/data-fetching#fetch-フック)を参照してください。

</base-alert>
