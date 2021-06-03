---
title: Nuxt Components
description: Nuxt.js にはアプリケーションの構築に役立つ、いくつかの重要なコンポーネントが付属しています。
position: 9
category: features
csb_link_nuxt_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/09_components_nuxt-link?fontsize=14&hidenavigation=1&theme=dark
csb_link_nuxt: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/09_components_nuxt?fontsize=14&hidenavigation=1&theme=dark
---

Nuxt.js にはアプリケーションの構築に役立つ、いくつかの重要なコンポーネントが付属しています。それらのコンポーネントはグローバルに利用可能です。つまりそれらを使うために都度インポートする必要がないということです。

この章では、それぞれの付属コンポーネントについて説明します。

## Nuxt コンポーネント

`<Nuxt>` コンポーネントはページコンポーネントを表示するために使います。基本的にこのコンポーネントは、表示されているページに応じてページコンポーネントの中にあるものに置き換えられます。したがってレイアウトに `<Nuxt>` コンポーネントを追加することが重要です。

```html{}[layouts/default.vue]
<template>
  <div>
    <div>ナビゲーションバー</div>
    <Nuxt />
    <div>フッター</div>
  </div>
</template>
```

<base-alert>

`<Nuxt>` コンポーネントは [レイアウト](/docs/2.x/concepts/views#layouts) 内でのみ使うことができます。

</base-alert>

`<Nuxt>` コンポーネントは `nuxt-child-key` prop を受け取ることができます。この prop は `<RouterView>` に渡され、動的なページ内でトランジションが正しく動作するようになります。

`<RouterView>` の `key` prop を操作する方法は 2 つあります。

1. `<Nuxt>` コンポーネントの `nuxtChildKey` prop を使用する

```html{}[layouts/default.vue]
<template>
  <div>
    <Nuxt :nuxt-child-key="someKey" />
  </div>
</template>
```

2. *ページ*コンポーネントの `key` オプションに `string` や `function` を追加する

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```

## NuxtChild コンポーネント

このコンポーネントはネストされたルート内で子コンポーネントを表示するために使われます。

例:

```
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

`child.vue` コンポーネントを表示するためには、`pages/parent.vue` 内に `<NuxtChild>` コンポーネントを挿入する必要があります:

```html{}[pages/parent.vue]
<template>
  <div>
    <h1>I am the parent view</h1>
    <NuxtChild :foobar="123" />
  </div>
</template>
```

## keep-alive

`<Nuxt>` コンポーネントと `<NuxtChild/>` コンポーネントは、`keep-alive` と `keep-alive-props` を受け入れます。

<base-alert type="info">

keep-alive と keep-alive-props についてより詳しく知るためには [vue のドキュメント](https://jp.vuejs.org/v2/api/#keep-alive) を参照してください

</base-alert>

```html{}[layouts/default.vue]
<template>
  <div>
    <Nuxt keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- このように変換されます -->
<div>
  <KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
</div>
```

```html{}[pages/parent.vue]
<template>
  <div>
    <NuxtChild keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- このように変換されます -->
<div>
  <KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
</div>
```

`<NuxtChild>` コンポーネントは通常の Vue コンポーネントのようなプロパティを受け取ることもできます。

```html
<template>
  <div>
    <NuxtChild :key="$route.params.id" />
  </div>
</template>
```

## NuxtLink コンポーネント

アプリケーションでページ間を遷移するためには、`<NuxtLink>` コンポーネントを使うべきです。このコンポーネントは Nuxt.js に含まれているので、他のコンポーネントのようにインポートする必要はありません。これは HTML の `<a>` タグと似ていますが、`href="/about"` の代わりに `to="/about"` を使います。もし以前 `vue-router` を使ったことがあるなら、`<RouterLink>` の代わりが `<NuxtLink>` だと考えることができます。

`pages` フォルダの `index.vue` へのシンプルなリンク:

```html
<template>
  <NuxtLink to="/">ホームページ</NuxtLink>
</template>
```

`<NuxtLink>` コンポーネントはすべての内部リンクで使用されるべきです。つまり、サイト内のページへのすべてのリンクは `<NuxtLink>` を使ってください。`<a>` タグはすべての外部リンクで使用されるべきです。つまり、他のウェブサイトへのリンクがある場合、それらには `<a>` タグを使ってください。

```html
<template>
  <div>
    <h1>ホームページ</h1>
    <NuxtLink to="/about"
      >このサイトについて (Nuxt アプリケーションの内部リンク)</NuxtLink
    >
    <a href="https://nuxtjs.org">別のページへの外部リンク</a>
  </div>
</template>
```

<base-alert type="info">

`<RouterLink>` についてより詳しく知りたい場合は、[Vue Router のドキュメント](https://router.vuejs.org/ja/api/#router-link)を参照してください。

</base-alert>

## prefetchLinks

Nuxt.js はスマートプリフェッチの機能を持ちます。viewport 内やスクロール時にリンクが表示されたことを検知し、それらのページの JavaScript をプリフェッチしてユーザーがリンクをクリックするのを待ちます。Nuxt.js はブラウザがビジーではないときにのみリソースを読み込み、接続がオフラインのときや 2G の接続しかない場合はプリフェッチをスキップします。

<base-alert type="info">

スマートプリフェッチについての詳細は[こちらの記事](/blog/introducing-smart-prefetching)を参照してください。

</base-alert>

### 特定のリンクでプリフェッチを無効にする

多くの JavaScript がある場合や、プリフェッチされる異なるページが多くある場合、サードパーティ製のスクリプトをたくさん読み込む場合には、いくつかのリンクのプリフェッチを無効にしたいでしょう。特定のリンクでプリフェッチを無効にするには、`no-prefetch` prop を使ってください。Nuxt.js v2.10.0 からは `prefetch` prop を `false` に設定することもできます。

```html
<NuxtLink to="/about" no-prefetch>About page not prefetched</NuxtLink>
<NuxtLink to="/about" :prefetch="false">About page not prefetched</NuxtLink>
```

### グローバルでプリフェッチを無効にする

すべてのリンクでプリフェッチを無効にするには、`prefetchLinks` を `false` に設定します:

```js{}[nuxt.config.js]
export default {
  router: {
    prefetchLinks: false
  }
}
```

Nuxt.js v2.10.0 からは、`prefetchLinks` を `false` に設定した上で特定のリンクでプリフェッチを行いたい場合、`prefetch` prop を使うことができます:

```html
<NuxtLink to="/about" prefetch>About page prefetched</NuxtLink>
```

## Link クラス

### linkActiveClass

`linkActiveClass` は、アクティブなリンクのための `vue-router` の CSS クラスと同じように機能します。どのリンクがアクティブかを表示したい場合は、`nuxt-link-active` クラスを持つ css を作成することで実現できます。

```css
.nuxt-link-active {
  color: red;
}
```

<base-alert>

この css は、ナビゲーションコンポーネント、適用したい特定のページ、レイアウトコンポーネント、main.css ファイルのいずれかに追加できます。

</base-alert>

クラス名を別のものに変更したい場合は、`nuxt.config.js` ファイルで router プロパティの `linkActiveClass` を修正してください。

```js
export default {
  router: {
    linkActiveClass: 'my-custom-active-link'
  }
}
```

<base-alert type="info">

このオプションは `vue-router` の linkActiveClass に直接付与されます。より詳しい情報は [vue-router のドキュメント](https://router.vuejs.org/ja/api/#active-class)を参照してください。

</base-alert>

### linkExactActiveClass

`linkExactActiveClass` は、正確なアクティブなリンクのための `vue-router` の CSS クラスと同じように機能します。どのリンクがアクティブか完全に一致させて表示したい場合は、`nuxt-link-exact-active` クラスを css に追加することで実現できます。

```css
.nuxt-link-exact-active {
  color: green;
}
```

<base-alert type="info">

この css は、ナビゲーションコンポーネント、適用したい特定のページ、レイアウトコンポーネント、main.css ファイルのいずれかに追加できます。

</base-alert>

クラス名を別のものに変更したい場合は、`nuxt.config.js` ファイルで router プロパティの `linkExactActiveClass` を修正してください。

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'my-custom-exact-active-link'
  }
}
```

<base-alert type="info">

このオプションは `vue-router` の linkExactActiveClass に直接付与されます。より詳しい情報は [vue-router のドキュメント](https://router.vuejs.org/ja/api/#exact-active-class)を参照してください。

</base-alert>

### linkPrefetchedClass

プリフェッチしたリンクすべてにスタイルを追加することができます。これはデフォルトの挙動を変更した後に、どのリンクでプリフェッチが行われているかをテストする際に役立ちます。linkPrefetchedClass はデフォルトでは無効になっています。有効にしたい場合、 `nuxt.config.js` ファイルの router プロパティに `linkPrefetchedClass` を追加する必要があります。

```js{}[nuxt.config.js]
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

指定したクラスにスタイルを追加することができます。

```css
.nuxt-link-prefetched {
  color: orangered;
}
```

## client-only コンポーネント

このコンポーネントは、意図的にクライアントサイドでのみコンポーネントをレンダリングするために使用されます。クライアントサイドでのみコンポーネントをインポートするには、client-side only プラグインに登録します。

```html{}[pages/example.vue]
<template>
  <div>
    <sidebar />
    <client-only placeholder="Loading...">
      <!-- このコンポーネントは、クライアントサイドでのみレンダリングされます -->
      <comments />
    </client-only>
  </div>
</template>
```

`<client-only />` がクライアントサイドにマウントされるまで、プレースホルダーとしてスロットを使用します。

```html{}[pages/example.vue]
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- このコンポーネントは、クライアントサイドでのみレンダリングされます -->
      <comments />

      <!-- サーバーサイドでレンダリングされた ローディングインジケーター -->
      <comments-placeholder slot="placeholder" />
    </client-only>
  </div>
</template>
```

<base-alert  type="info">

サーバーでレンダリングされたページでは `<client-only>` 内の `$refs` が `$nextTick` を使っても準備ができていない場合があります。手としては `$nextTick` を数回呼び出すことです:

</base-alert>

```js{}[page.vue]
mounted(){
  this.initClientOnlyComp()
},
methods: {
  initClientOnlyComp(count = 10) {
    this.$nextTick(() => {
      if (this.$refs.myComp) {
        //...
      } else if (count > 0) {
        this.initClientOnlyComp(count - 1);
      }
    });
  },
}
```

<base-alert>

Nuxt のバージョンが v2.9.0 未満の場合、`<client-only>` のかわりに `<no-ssr>` を使用してください。

</base-alert>

<quiz :questions="questions"></quiz>
