---
title: ビュー
description: Views セクションでは、Nuxt.js アプリケーション（ドキュメント、レイアウト、ページ、およびHTMLヘッド）内の特定のルートのデータとビューを設定するために必要なことを全て説明しています。
category: getting-started
position: 105
---

> Views セクションでは、Nuxt.js アプリケーション（アプリテンプレート、レイアウト、ページ、および HTML ヘッド）内の特定のルートのデータとビューを設定するために必要なことを全て説明しています。

![nuxt-views-schema](/nuxt-views-schema.svg)

## アプリテンプレート

> スクリプトまたは条件付きの CSS クラスを含めるために Nuxt.js で使われる HTML アプリテンプレートをカスタマイズできます。

テンプレートを変更するために、プロジェクトのソースフォルダ（デフォルトはプロジェクトのルートディレクトリ）に `app.html` ファイルを作成します。

Nuxt.js によって使われるデフォルトのテンプレート:

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

カスタムアプリテンプレートを使用して、IE 用に条件付きの CSS クラスを追加するユースケースの 1 つ:

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

<!-- TODO: Load polyfills here? -->

## レイアウト

サイドバーを含めたり、モバイルとデスクトップに異なるレイアウトを使用したりするなど Nuxt.js アプリの外観を変更したい場合にレイアウトは非常に役立ちます。

### デフォルトレイアウト

`layouts/default.vue` ファイルを追加することでメインレイアウトを拡張できます。メインレイアウトは、レイアウト指定がされていないすべてのページに使用されます。

<div class="Alert Alert--nuxt-green">

<b>情報:</b> 実際にページコンポーネントが含まれるようにレイアウトを作成するときは、必ず `<nuxt/>` コンポーネントを入れておくことを覚えておいてください。

</div>

次にあるデフォルトのレイアウトはたった 3 行で、単純にページコンポーネントをレンダリングします:

```html
<template>
  <nuxt />
</template>
```

### カスタムレイアウト

`layouts` ディレクトリのすべてのファイル（_第一階層_）は、ページコンポーネントの `layout` プロパティでアクセス可能なカスタムレイアウトを作成します。

ブログのレイアウトを作成して、それを `layouts/blog.vue` に書くときの例：

```html
<template>
  <div>
    <div>ブログのナビゲーションバーをここに設置します</div>
    <nuxt />
  </div>
</template>
```

それからページ (例えば `pages/posts.vue` ) で、カスタムレイアウトを使うことを伝えます:

```html
<template>
  <!-- テンプレート -->
</template>
<script>
  export default {
    layout: 'blog'
    // ページコンポーネントの定義
  }
</script>
```

`layout` プロパティについての詳細： [`layout` プロパティ](/api/pages-layout)

[デモ動画](https://www.youtube.com/watch?v=YOKnSTp7d38)で、カスタムレイアウトの動作する様子を確認して見てください。

<!-- TODO: Scoped styles best practice -->

### エラーページ

エラーページは _ページコンポーネント_ で、エラーが発生したときに常に表示されます（サーバーサイドレンダリング中には発生しません）。

<div class="Alert Alert--orange">

<b>警告:</b> このファイルは <code>layouts</code> フォルダに配置されていますが、<b>ページ</b>として扱う必要があります。

</div>

上記のように、このレイアウトは特別です。テンプレートの中に `<nuxt/>` を含める**べきではない**からです。このレイアウトは、`404` や `500` などのエラーが発生した際に表示されるコンポーネントとしてみる必要があります。他のページコンポーネントと同様に、エラーページのカスタムレイアウトも通常の方法で設定できます。

デフォルトのエラーページのソースコードは、[GitHub から入手できます](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue)。

`layouts/error.vue` ファイルを追加することでエラーページをカスタマイズすることができます。:

```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">ページが見つかりません</h1>
    <h1 v-else>エラーが発生しました</h1>
    <nuxt-link to="/">ホーム</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blog' // エラーページ用のカスタムレイアウトを指定できます
  }
</script>
```

## ページ

すべてのページコンポーネントは Vue コンポーネントですが、Nuxt.js にユニバーサルアプリケーション開発を可能な限り容易にするための特別な属性と機能が追加されています。

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/nuxtjs-page-components?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
      Vue School で <strong>Nuxt.js ページコンポーネント</strong>についての無料レッスンをみる
    </p>
  </a>
</div>

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>
<script>
  export default {
    asyncData (context) {
      // コンポーネントをロードする前に毎回呼び出されます
      // 名前の通り非同期にすることができます
      // また、返されたオブジェクトはデータオブジェクトとマージされます
      return { name: 'World' }
    },
    fetch () {
      // `fetch` メソッドはページの描画前にストアを満たすために使用されます
    },
    head () {
      // このページ向けにメタタグを設定します
    },
    // そしてもっと多くの機能を見つける
    ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

| 属性          | 説明                                                                                                                                                                                                                                                                                                                                                                                                  | ドキュメント                                                                |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `asyncData`   | 最も重要なキーです。非同期であり、コンテキストを引数として受け取ります。                                                                                                                                                                                                                                                                                                                              | [非同期なデータ](/guide/async-data)                                         |
| `fetch`       | ページをレンダリングする前にストアを満たすために使用されます。`data` メソッドに似ていますが、コンポーネントデータは設定しません。                                                                                                                                                                                                                                                                     | [`fetch` メソッド](/api/pages-fetch)                                        |
| `head`        | 現在のページに対して特定の `<meta>` タグを設定します。                                                                                                                                                                                                                                                                                                                                                | [`head` メソッド](/api/pages-head)                                          |
| `layout`      | `layouts` ディレクトリに定義されているレイアウトを指定します。                                                                                                                                                                                                                                                                                                                                        | [`layout` プロパティ](/api/pages-layout)                                    |
| `loading`     | `false` に設定すると、ページへ遷移してきた際に `this.$nuxt.$loading.finish()` が呼び出されなくなり、ページから離れる際に `this.$nuxt.$loading.start()` が呼び出されなくなります。これによりローディングの振る舞いを **手動で** 制御ができるようになります。この動作は、[example](/examples/custom-page-loading)から確認できます。`loading` は `nuxt.config.js` で設定されている場合のみ適用されます。 | [`loading` プロパティ](/api/configuration-loading)                          |
| `transition`  | ページの特定のトランジションを設定します。                                                                                                                                                                                                                                                                                                                                                            | [`transition` プロパティ](/api/pages-transition)                            |
| `scrollToTop` | Boolean 型（デフォルト値：`false`）で、ページをレンダリングする前にページを一番上にスクロールするかどうかを指定します。これは[ネストされたルート](/guide/routing#nested-routes)に使用されます。                                                                                                                                                                                                       | [`scrollToTop` プロパティ](/api/pages-scrolltotop#the-scrolltotop-property) |
| `validate`    | [動的なルーティング](/guide/routing#dynamic-routes)に対する検証関数です。                                                                                                                                                                                                                                                                                                                             | [`validate` メソッド](/api/pages-validate#the-validate-method)              |
| `middleware`  | このページのミドルウェアを設定します。ミドルウェアは、ページをレンダリングする前に呼び出されます。                                                                                                                                                                                                                                                                                                    | [ミドルウェア](/guide/routing/#ミドルウェア)                                |

ページプロパティの使用についてより多くの情報: [ページに関するドキュメント](/api)をご覧ください。

## HTML ヘッド

Nuxt.js は、`document head` とアプリケーションの `meta attributes` を更新するために [vue-meta](https://vue-meta.nuxtjs.org/) を使用しています。

Nuxt.js が使っている `vue-meta` は、[GitHub](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/index.js#L42-L48) で参照できます。

<div class="Alert Alert--teal">

<b>情報:</b> Nuxt.js は、デフォルトの <code>vmid</code> キーの代わりに <code>hid</code> を使ってメタ要素を識別します。

</div>

### デフォルトメタタグ

Nuxt.js では、`nuxt.config.js` 内にデフォルトの `<meta>` タグを全て定義することができます。`head` プロパティを使用し、デフォルトのメタタグを定義します:

カスタム Google フォントによるカスタム viewport の例:

```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

`head` で利用できるオプションの詳細については、[メタ情報プロパティの認識](https://vue-meta.nuxtjs.org/api/#metainfo-properties)を参照してください。

`head` メソッドに関するより多くの情報は、[`head` プロパティ](/api/configuration-head)を参照してください。

### ページに対するカスタムメタタグ

head メソッドに関するより多くの情報: [`head` メソッド](/api/pages-head)を参照してください。
