---
title: '$nuxt: Nuxt.js のヘルパー'
description: '$nuxt はユーザーエクスペリエンスを向上するために設計されたヘルパーです。'
category: internals-glossary
position: 2
---

`$nuxt` はユーザーエクスペリエンスを向上するために設計されたヘルパーです。
Nuxt.js ヘルパーの詳細については [コンテキストとヘルパーのドキュメント](/docs/2.x/concepts/context-helpers#nuxt-nuxtjs-ヘルパー)を参照してください。

## コネクションチェッカー

- `isOffline`
  - 型: `Boolean`
  - 説明: ユーザーのインターネット接続環境がオフラインになった時に `true`
- `isOnline`
  - 型: `Boolean`
  - 説明: `isOffline` の反対でユーザーのインターネット接続環境がオンラインになった時に `true`

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">オフラインです</div>
    <nuxt />
  </div>
</template>
```

## ページデータのリフレッシュ

- `refresh()`
  - asyncData または fetch が提供するデータのみをリフレッシュしたいとき

```html{}[example.vue]
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Created at: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

## ローディングバーの制御

- `$loading`
  - Nuxt のローディングバーをプログラムで制御したいとき

```js{}[]
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```
