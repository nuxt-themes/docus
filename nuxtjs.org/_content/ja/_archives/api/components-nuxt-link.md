---
title: 'API: <nuxt-link> コンポーネント'
description: ページ間を nuxt-link を使ってリンクさせます。
menu: nuxt-link
category: components
position: 43
---

> このコンポーネントは、ページコンポーネント間のナビゲーションを提供し、賢い prefetching（先読み）でパフォーマンスを高めるのに使用します。

`<nuxt-link>` は Nuxt の重要な要素です。あなたのアプリケーションを**遷移するのに使われるべきコンポーネント**で、従来の Vue アプリケーションにおける `<router-link>` と似ています。実際に、`<nuxt-link>` は [`<router-link>`](https://router.vuejs.org/api/#router-link) を拡張しています。つまり、同じプロパティを取り、同じように使うことができるということです。詳しくは、[Vue Router のドキュメント](https://router.vuejs.org/api/#router-link) を参照してください。

例（`pages/index.vue`）:

```html
<template>
  <div>
    <h1>ホームページ</h1>
    <nuxt-link to="/about"
      >このサイトについて（Nuxt アプリケーション内部リンク）</nuxt-link
    >
    <a href="https://nuxtjs.org">別のページへの外部リンク</a>
  </div>
</template>
```

**エイリアス:** `<n-link>`, `<NuxtLink>`, `<NLink>`

> この機能は Nuxt.js v2.4.0 で追加されました

Nuxt.js アプリケーションの応答性を高めるため、viewport（ブラウザの表示領域）内にリンクが表示されたとき、Nuxt.js は*コード分割された*ページを自動的に先読みします。この機能は Google Chrome Labs の [quicklink.js](https://github.com/GoogleChromeLabs/quicklink) にインスパイアされています。

リンク先ページの先読みを無効化するために、`no-prefetch` プロパティを使うことができます。Nuxt.js v2.10.0 からは `prefetch` プロパティを `false` に設定することもできます。:

```html
<n-link to="/about" no-prefetch>先読みしないページについて</n-link>
<n-link to="/about" :prefetch="false">先読みしないページについて</n-link>
```

[router.prefetchLinks](/api/configuration-router#prefetchlinks) を使って、この挙動をグローバルに設定することができます。

Nuxt.js v2.10.0 からは、[router.prefetchLinks](/api/configuration-router#prefetchlinks) をグローバルに `false` に設定した上で特定のリンクを先読みしたい場合 `prefetch` プロパティを使うことができます。

```html
<n-link to="/about" prefetch>先読みするページについて</n-link>
```

また、コード分割されたページの先読みが完了したとき付与される class をカスタマイズするため、 `prefetched-class` プロパティを使用することもできます。この機能は [router.linkPrefetchedClass](/api/configuration-router#linkprefetchedclass) でグローバルに設定できることを必ず確認してください。
