---
title: 'ルーティング'
description: '多くのウェブサイトでは単一のページではなく、複数ページを持っています。例えばホームページ、概要ページ、お問い合わせページなどです。これらのページを表示するにはルーターが必要です。'
position: 2
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/02_routing?fontsize=14&hidenavigation=1&theme=dark
---

## 自動的に生成されるルート

多くのウェブサイトでは単一のページではなく、複数ページ（例えばホームページ、概要ページ、お問い合わせページなど）を持ちます。これらのページを表示するにはルーターが必要です。そこで `vue-router` の出番です。Vue アプリケーションを使う際、設定ファイル（例えば `router.js`）を設定し、全てのルートを手動で追加しなければなりません。Nuxt.js では  `pages` ディレクトリにある Vue ファイルに基づいて `vue-router` の設定を自動的に生成します。つまり、ルーターの設定を書く必要はもうありません！Nuxt.js はまた全てのルートに対して自動でコード分割を行います。

つまり、アプリケーションでルーティングを行うのに必要なことは `pages` フォルダに `.vue` ファイルを作成するだけです。

<base-alert type="next">

詳細は[ルーティング](/docs/2.x/features/file-system-routing)を参照してください。

</base-alert>

## ナビゲーション

アプリケーションのページ間を遷移するには、[NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component) コンポーネントを使います。このコンポーネントは Nuxt.js に含まれているため、他のコンポーネントのようにインポートする必要はありません。HTML `<a>` タグに似ていますが、`href="/about"` のかわりに `to="/about"` を使用します。もし以前に `vue-router` を使ったことがある場合は `<NuxtLink>` を `<RouterLink>` の代わりと考えることができます。

`pages` フォルダーにある `index.vue` へのシンプルなリンク:

```html{}[pages/index.vue]
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```

サイト内の全てのページへのリンクに `<NuxtLink>` を使ってください。他のウェブサイトへのリンクがある場合は `<a>` タグを使ってください。例は以下を参照してください:

```html{}[pages/index.vue]
<template>
  <main>
    <h1>Home page</h1>
    <NuxtLink to="/about">
      About (internal link that belongs to the Nuxt App)
    </NuxtLink>
    <a href="https://nuxtjs.org">External Link to another page</a>
  </main>
</template>
```

<base-alert type="next">

詳細は [NuxtLink コンポーネント](/docs/2.x/features/nuxt-components#the-nuxtlink-component)を参照してください。

</base-alert>
