---
title: レイアウト
description: レイアウトは Nuxt.js アプリケーションのルック&フィールを変えるとき、とても役に立ちます。例えばサイドバーを含めたいときや、モバイルとデスクトップのための別々のレイアウトを持ちたいときなどに有用です。
position: 7
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/07_layouts?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: 設定しなくてもレイアウトディレクトリの名前を簡単に変更できますか？
    answers:
      - できます
      - できません
    correctAnswer: できません
  - question: デフォルトのレイアウトページは何と呼ばれていますか？
    answers:
      - layout.vue
      - default.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: レイアウトにどのコンポーネントを含める必要がありますか？
    answers:
      - <Nuxt />
      - <NuxtLink />
      - <RouterView />
    correctAnswer: <Nuxt />
  - question: レイアウトに他のコンポーネントを追加できますか？
    answers:
      - できます
      - できません
    correctAnswer: できます
  - question: 'カスタムレイアウトを追加するために `.vue` ファイルを作成しそれをどのフォルダーに追加しますか？'
    answers:
      - layout
      - layouts
      - page
    correctAnswer: layouts
  - question: ブログレイアウトを使うためにページにどのような実装をしますか？
    answers:
      - "layout: 'blog'"
      - "name: 'blog'"
      - 'blog: true'
    correctAnswer: "layout: 'blog'"
  - question: どのディレクトリにエラーページを追加しますか？
    answers:
      - pages
      - layouts
      - errors
    correctAnswer: layouts
  - question: 'エラーページに `<Nuxt>` コンポーネントを追加する必要がありますか？'
    answers:
      - はい
      - いいえ
    correctAnswer: いいえ
  - question: エラーページのカスタムレイアウトを設定できますか？
    answers:
      - 設定できます
      - 設定できません
    correctAnswer: 設定できます
  - question: サーバーサイドレンダリング中にエラーが発生した場合エラーページは表示されますか？
    answers:
      - 表示されます
      - 表示されません
    correctAnswer: 表示されません
---

レイアウトは Nuxt.js アプリケーションのルック&フィールを変えるとき、とても役に立ちます。例えばサイドバーを含めたいときや、モバイルとデスクトップのための別々のレイアウトを持ちたいときなどに有用です。

<base-alert>

_このディレクトリは追加の設定なしに名前を変更できません_

</base-alert>

### デフォルトレイアウト

`layouts/default.vue` ファイルを追加することでメインレイアウトを設定できます。これはレイアウトが指定されていない全てのページで使用されます。ページコンポーネントを含むレイアウトを作成するときには `<Nuxt>` コンポーネントを記述することを忘れないようにしてください。

レイアウトに必要なのは、ページコンポーネントをレンダリングするための 3 行のコードだけです。

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

ナビゲーションやヘッダー、フッターのようなコンポーネントもここに追加できます。

```html{}[layouts/default.vue]
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>
```

<base-alert type="info">

もし [components プロパティを true に設定](/docs/2.x/directory-structure/components)していたら、コンポーネントを追加するために import 文は必要ないです。

</base-alert>

### カスタムレイアウト

`layout` ディレクトリの全てのファイル（_トップレベル_）は、ページコンポーネントの `layout` プロパティで使えるカスタムレイアウトが作られます。

ブログレイアウトを作成して `layouts/blog.vue` に保存しましょう。

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>My blog navigation bar here</div>
    <Nuxt />
  </div>
</template>
```

その後、カスタムレイアウトを使用するためにページに教えなければなりません。

```js{}[pages/posts.vue]
<script>
export default {
  layout: 'blog',
  // または
  layout (context) {
    return 'blog'
  }
}
</script>
```

## エラーページ

エラーページはエラーが発生したときいつも表示される _ページコンポーネント_ です（サーバーサイドで発生したエラーではない）。

<base-alert>

このファイルは `layout` フォルダに置かれますが、ページとして扱われるべきです。

</base-alert>

上述したように、このレイアウトは特殊でテンプレートの中に `<Nuxt>` を含めるべきではありません。このレイアウトは、エラーが発生したときに表示されるコンポーネントとして表示されなければなりません（`404`、`500` など）。他のページコンポーネントと同様に、エラーページにも通常の方法でカスタムレイアウトを設定することができます。

`layouts/error.vue` ファイルを追加することで、エラーページをカスタマイズできます:

```js{}[layouts/error.vue]
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // エラーページ用のカスタムレイアウトを設定できます
}
</script>
```

<base-alert type="info">

デフォルトのエラーページのソースコードは [GitHub で参照できます。](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue)

</base-alert>

<quiz :questions="questions"></quiz>
