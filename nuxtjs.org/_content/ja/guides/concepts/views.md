---
title: ビュー
description: Views セクションでは、Nuxt.js アプリケーション内の特定のルートのデータとビューを設定するために必要なことを全て説明しています。ビューは、アプリテンプレート、レイアウト、ページで構成されています。
position: 1
category: concepts
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/01_views?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Nuxt ビューの構成順序は？ (上から)?
    answers:
      - レイアウト → ページ → ドキュメント
      - ページ → レイアウト → ドキュメント
      - ドキュメント → レイアウト → ページ
    correctAnswer: ドキュメント → レイアウト → ページ
  - question: デフォルトのレイアウトは何と呼ばれていますか？
    answers:
      - default.vue
      - layout.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: カスタムレイアウトの作成方法は？
    answers:
      - pages フォルダに .vue ファイルを追加する
      - layouts フォルダに .vue ファイルを追加する
      - components フォルダに .vue ファイルを追加する
    correctAnswer: layouts フォルダに .vue ファイルを追加する
  - question: ページで「ブログ」というカスタムレイアウトを有効にするには？
    answers:
      - "layout: 'blog'"
      - "layout: 'default'"
      - "blog: 'blog'"
    correctAnswer: "layout: 'blog'"
  - question: カスタマイズされたエラーページを作成する error.vue ファイルはどこに置きますか？
    answers:
      - pages フォルダ
      - errors フォルダ
      - layouts フォルダ
    correctAnswer: layouts フォルダ
---

Views セクションでは、Nuxt.js アプリケーション内の特定のルートのデータとビューを設定するために必要なことを全て説明しています。ビューは、アプリテンプレート、レイアウト、ページで構成されています。加えて、各ページのヘッド部に SEO（Search Engine Optimization）に重要なカスタムメタタグを定義することができます。

![Nuxt.js でのビューの構成](/docs/2.x/views.png)

Nuxt.js でのビューの構成

## ページ

すべてのページコンポーネントは Vue コンポーネントですが、Nuxt.js はアプリケーションの開発を可能な限り容易にするための特殊な属性や関数が追加されています。

```html{}[pages/index.vue]
<template>
  <h1 class="red">Hello World</h1>
</template>

<script>
  export default {
    head() {
      // このページ向けにメタタグを設定します
    }
    // ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## ページコンポーネントのプロパティ

上の例の head プロパティのように、ページコンポーネントには多くのプロパティがあります。

<base-alert type="next">

ページで使用できるすべてのプロパティの詳細については、[Directory Structure のドキュメント](/docs/2.x/directory-structure/nuxt) を参照してください。

</base-alert>

## レイアウト

サイドバーを含めたり、モバイルとデスクトップに異なるレイアウトを使用したりするなど Nuxt.js アプリの外観を変更したい場合にレイアウトは非常に役立ちます。

### デフォルトレイアウト

layouts ディレクトリに `default.vue` ファイルを追加することでデフォルトレイアウトを定義することができます。これは特定のレイアウトを持たないすべてのページで使用されます。レイアウトに含める必要があるのは、ページコンポーネントをレンダリングする `<Nuxt />` コンポーネントだけです。

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

<base-alert type="next">

詳細は [Nuxt component](/docs/2.x/features/nuxt-components) のコンポーネントの章を参照してください。

</base-alert>

### カスタムレイアウト

layouts ディレクトリに `.vue` ファイルを追加することで、カスタムレイアウトを作成できます。カスタムレイアウトを使用するには、そのレイアウトを使用したいページコンポーネントで `layout` プロパティを設定する必要があります。値は作成したカスタムレイアウトの名前になります。

blog レイアウトを作成するには、`blog.vue` ファイルを layouts ディレクトリ `layouts/blog.vue` に追加します:

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>My blog navigation bar here</div>
    <Nuxt />
  </div>
</template>
```

<base-alert>

実際にページコンポーネントを含めるレイアウトを作成するときは、必ず `<Nuxt />`コンポーネントを追加してください。

</base-alert>

次に、そのレイアウトを使用したいページで 'blog' の値を持つ layout プロパティを使用します。

```html{}[pages/posts.vue]
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

<base-alert type="info">

ページに `layout: 'blog'` のような layout プロパティを追加しない場合、`default.vue` レイアウトが使用されます。

</base-alert>

### エラーページ

エラーページは、エラーが発生したときに常に表示される _ページコンポーネント_ です（サーバーサイドレンダリングでは発生しません）。

<base-alert>

このファイルは `layouts` フォルダーに配置されますが、ページとして扱う必要があります。

</base-alert>

上記のように、このレイアウトは特別です。なぜなら、テンプレート内に `<Nuxt />` コンポーネントを含めるべきではないからです。このレイアウトは、エラー（`404`、`500` など）が発生したときに表示されるコンポーネントとしてみなさなければなりません。他のページコンポーネントと同様に、エラーページにも通常の方法でカスタムレイアウトを設定することができます。

`layouts/error.vue` ファイルを追加することでエラーページをカスタマイズすることができます:

```html{}[layouts/error.vue]
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // エラーページ用のカスタムレイアウトを指定できます
  }
</script>
```

## ドキュメント: App.html

アプリテンプレートは、Nuxt.js アプリケーションのドキュメントの実際の HTML フレームを作成するために使用され、コンテンツだけでなく、ヘッドとボディに変数も注入します。このファイルは自動的に作成されるので、通常はほとんど変更する必要はありません。プロジェクトのソースディレクトリ（デフォルトではルートディレクトリ）に `app.html` ファイルを作成することで、スクリプトや条件付き CSS クラスを含むように Nuxt.js が使用する HTML アプリテンプレートをカスタマイズすることができます。

Nuxt.js で使用されるデフォルトのテンプレートは次のとおりです:

```html{}[app.html]
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

カスタムアプリテンプレートを使うユースケースの 1 つとして、IE 用の条件付き CSS クラスを追加します:

```html{}[app.html]
<!DOCTYPE html>
<!--[if IE 9]><html class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

<base-alert type="info">

JavaScript や CSS ファイルを `app.html` に追加することもできますが、代わりに `nuxt.config.js` を使用することをお勧めします！

</base-alert>

<quiz :questions="questions"></quiz>
