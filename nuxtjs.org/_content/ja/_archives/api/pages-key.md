---
title: 'key プロパティ'
description: 内部の `<router-view>` コンポーネントに `key` プロパティを設定します
menu: key
category: pages
position: 24
---

> 内部の `<router-view>` コンポーネントに `key` プロパティを設定します。

- **型:** `String` or `Function`

各ページコンポーネントで設定された `key` プロパティは内部の `<router-view>` の `key` プロパティとして設定されます。この `key` プロパティは動的ページでのルートトランジションに使われます。違うキーを持つルートの場合ページコンポーネントを再レンダリングします。

`<router-view>` の `key` プロパティを設定する方法は他にもあります。詳細については [nuxt コンポーネント](/api/components-nuxt)の `nuxtChildKey` プロパティを参照してください。

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
