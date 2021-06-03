---
title: 'API: <nuxt> コンポーネント'
description: レイアウト内でページコンポーネントを表示します。
menu: nuxt
category: components
position: 41
---

> このコンポーネントは [レイアウト](/guide/views#%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88) 内でのみ、ページコンポーネントを表示するために使われます。

例（`layouts/default.vue`）:

```html
<template>
  <div>
    <div>My nav bar</div>
    <nuxt />
    <div>My footer</div>
  </div>
</template>
```

実際の例を見たいときは [レイアウトの例](/examples/layouts) を参照してください。

**Props**:

- nuxtChildKey：`string`
  - この prop は `<router-view/>` に設定され、動的なページと異なるルートの中で遷移させるのに便利です
  - デフォルト: `$route.path`

`<router-view/>` の `key` prop を操作する方法は 2 つあります。

1. `nuxtChildKey` prop

```html
<template>
  <div>
    <nuxt :nuxt-child-key="someKey" />
  </div>
</template>
```

2. 各ページコンポーネントの `key` オプション: `string` or `function`

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```

- name：`string` (_Nuxt v2.4.0 で導入されました_)
  - この prop は `<router-view/>` に設定され、ページコンポーネントの名前付きビューをレンダリングするのに利用されます
  - デフォルト: `default`

実際の例を見たいときは [名前付きビューの例](/examples/named-views) を参照してください。
