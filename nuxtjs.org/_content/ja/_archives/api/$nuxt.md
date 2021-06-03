---
title: '$nuxt: NuxtJS のヘルパー'
description: '$nuxt はユーザーエクスペリエンスを向上させることを目的としたヘルパーです。'
menu: $nuxt
category: utils
position: 50
---

`$nuxt` はユーザーエクスペリエンスを向上させることを目的としたヘルパーです。

- `isOffline`
  - 型: `Boolean`
  - 説明: ユーザーのインターネット接続がオフラインになったときに `true`
- `isOnline`
  - 型: `Boolean`
  - 説明: ユーザーのインターネット接続がオンラインになったときに `true`

例:

`layouts/default.vue`:

```html
<template>
  <div>
    <div v-if="$nuxt.isOffline">オフラインです</div>
    <nuxt />
  </div>
</template>
```
