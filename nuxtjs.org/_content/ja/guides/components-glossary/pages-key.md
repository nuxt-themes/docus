---
title: 'key プロパティ'
description: 内部の `<router-view>` コンポーネントに `key` プロパティを設定します
menu: Key プロパティ
category: components-glossary
position: 0
---

> 内部の `<router-view>` コンポーネントに `key` プロパティを設定します。

- **型:** `String` または `Function`

`key` プロパティは `<router-view>` に渡され、動的ページでのルートトランジションに使われます。key が異なる場合はページコンポーネントが再レンダリングされます。

key を設定する方法は他にもあります。詳細については [nuxt コンポーネント](/docs/2.x/features/nuxt-components)の `nuxtChildKey` プロパティを参照してください。

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
