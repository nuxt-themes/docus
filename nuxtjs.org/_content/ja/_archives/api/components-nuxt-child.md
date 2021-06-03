---
title: 'API: <nuxt-child> コンポーネント'
description: 現在のページを表示します。
menu: nuxt-child
category: components
position: 42
---

> このコンポーネントは [ネストされたルート](/guide/routing#%E3%83%8D%E3%82%B9%E3%83%88%E3%81%95%E3%82%8C%E3%81%9F%E3%83%AB%E3%83%BC%E3%83%88) 内で子コンポーネントを表示するために使われます。

例:

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

このファイルの木構造から次のルーティングが生成されます:

```js
;[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

`child.vue` コンポーネントを表示するには `pages/parent.vue` 内に `<nuxt-child/>` を挿入する必要があります:

```html
<template>
  <div>
    <h1>I am the parent view</h1>
    <nuxt-child :foobar="123" />
  </div>
</template>
```

`<nuxt-child/>` は `keep-alive` と `keep-alive-props` を受け入れます:

```html
<template>
  <div>
    <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- このように変換されます -->
<div>
  <keep-alive :exclude="['modal']">
    <router-view />
  </keep-alive>
</div>
```

> 子コンポーネントは、通常の Vue コンポーネントのようなプロパティも受け取ることができます。

実際の例を見たいときは [ネストされたルートの例](/examples/nested-routes) を参照してください。

## 名前付きビュー

> Nuxt v2.4.0 で導入されました

`<nuxt-child/>` は名前付きビューを描画するために `name` プロパティを受け入れます :

```html
<template>
  <div>
    <nuxt-child name="top" />
    <nuxt-child />
  </div>
</template>
```

実際の例を見たいときは [名前付きビューの例](/examples/named-views) を参照してください。
