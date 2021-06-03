---
title: pages
description: この `pages` ディレクトリには、アプリケーションのビューとルートが格納されています。Nuxt.js はこのディレクトリ内のすべての `.vue` ファイルを読み込んで、ルーターの設定を自動的に作成します。
position: 10
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/11_pages?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: ページコンポーネントを配置するディレクトリは？
    answers:
      - views
      - pages
      - vues
    correctAnswer: pages
  - question: ルートを作成するには router.js ファイルを手動で設定する必要がありますか？
    answers:
      - 必要があります
      - 必要がありません
    correctAnswer: 必要がありません
  - question: .js ファイルや .ts ファイルを使ってルートを作成できます
    answers:
      - できます
      - できません
    correctAnswer: できます
  - question: asyncData はいつ呼び出されますか？
    answers:
      - コンポーネントをロードする前
      - コンポーネントをロード中
      - コンポーネントをロードした後
    correctAnswer: コンポーネントをロードする前
  - question: メタタグを追加するプロパティは？
    answers:
      - head
      - meta
      - metaTags
    correctAnswer: head
  - question: ページに別のレイアウトを追加するために使うプロパティは？
    answers:
      - layouts
      - page
      - layout
    correctAnswer: layout
  - question: 子ルートをレンダリングするときに一番上にスクロールするように Nuxt.js に指示する場合、scrollToTop プロパティをどのように設定しますか？
    answers:
      - "scrollToTop: 'scroll'"
      - 'scrollToTop: true'
      - "scroll: 'top'"
    correctAnswer: 'scrollToTop: true'
  - question: middleware/auth.js をどのようにページに追加しますか？
    answers:
      - 'middleware: true'
      - "middleware: 'auth'"
      - "import auth from 'middleware/auth.js'"
    correctAnswer: "middleware: 'auth'"
  - question: クエリ文字列の監視の設定に使うプロパティは？
    answers:
      - watcher
      - queryWatcher
      - watchQuery
    correctAnswer: watchQuery
  - question: 監視はデフォルトで無効になっていますか？
    answers:
      - 無効になっています
      - 無効になっていません
    correctAnswer: 無効になっています
---

`pages` ディレクトリには、アプリケーションのビューとルートが格納されています。Nuxt.js はこのディレクトリ内のすべての `.vue` ファイルを読み込んで、ルーターの設定を自動的に作成します。

<base-alert type="info">

.js ファイルや .ts ファイルを使ってルートを作成できます。

</base-alert>

すべてのページコンポーネントは Vue コンポーネントですが、Nuxt.js は特殊な属性や機能を追加し、ユニバーサルアプリケーションの開発をできるだけ簡単にします。

```html{}[pages
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
  export default {
    // page properties go here
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## 動的なページ

動的なページは、API からの出力でページ名がわからない場合や、同じページを何度も作成したくないときに作成できます。動的なページを作成するには、.vue ファイル名の前にアンダースコアを追加します。ディレクトリを動的にしたい場合はディレクトリ名の前にアンダースコアを追加します。ファイル名やディレクトリ名は自由に指定できますが、名前の前にアンダースコアを付ける必要があります。

例えば、ページフォルダ内に `_slug.vue` というファイルがある場合、`context` の `params.slug` で値にアクセスできます。

```html{}[pages/_slug.vue]
<template>
  <h1>{{ this.slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const slug = params.slug // "/abc" パスにアクセスすると、slug は "abc" になります。
      return { slug }
    }
  }
</script>
```

`/_book` フォルダー内に `/_slug.vue` ファイルを作成した場合は、`context` の `params.slug` および `params.book` で値にアクセスできます。

```html{}[pages/_book/_slug.vue]
<template>
  <h1>{{ this.book }} / {{ this.slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const book = params.book
      const slug = params.slug
      return { book, slug }
    }
  }
</script>
```

## プロパティ

### asyncData メソッド

`asyncData` はコンポーネントをロードする前に毎回呼び出されます。これは非同期にすることができ、引数として `context` を受け取ります。asyncData の結果は data とマージされます。

```js{}[pages/index.vue]
export default {
  asyncData(context) {
    return { name: 'World' }
  }
}
```

<base-alert type="next">

`asyncData` の詳細は[データの取得](/docs/2.x/features/data-fetching#async-data)ページを参照してください。

</base-alert>

### fetch メソッド

非同期データの取得には `fetch` が使えます。`fetch` はサーバーサイドではルートをレンダリングするときに呼び出され、クライアントサイドでは遷移するときに呼び出されます。

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
        res.json()
      )
    }
  }
</script>
```

<base-alert type="next">

`fetch` の詳細は[データの取得](/docs/2.x/features/data-fetching)ページを参照してください。

</base-alert>

### head メソッド

現在のページに特定の `<meta>` タグを設定します。Nuxt.js は `vue-meta` を使用してアプリケーションのドキュメントヘッドとメタ属性を更新します。

```js{}[pages/index.vue]
export default {
  head() {
    // このページの meta タグを設定する
  }
}
```

<base-alert type="next">

詳細は[メタタグと SEO](/docs/2.x/features/meta-tags-seo) ページを参照してください。

</base-alert>

### layout プロパティ

layouts ディレクトリで定義されているレイアウトを指定します。

```js{}[pages/index.vue]
export default {
  layout: 'blog'
}
```

<base-alert type="next">

レイアウトの詳細は[レイアウトのドキュメント](/docs/2.x/concepts/views#layouts)を参照してください。

</base-alert>

### loading プロパティ

`loading` を false に設定すると、ページに入るときに `this.$nuxt.$loading.finish()` が自動的に呼び出されるのを防ぎ、ページを離れるときに `this.$nuxt.$loading.start()` が自動的に呼び出されるのを防ぎます。

```js{}[pages/index.vue]
export default {
  loading: false
}
```

<base-alert type="info">

nuxt.config.js で `loading` が設定されている場合のみ適用されます。

</base-alert>

<base-alert type="next">

詳細は[ローディング](/docs/2.x/features/loading)ページを参照してください。

</base-alert>

### transition プロパティ

このページにカスタムトランジションを設定します。

```js{}[pages/index.vue]
export default {
  transition: 'fade'
}
```

<base-alert type="next">

詳細は[トランジション](/docs/2.x/features/transitions)ページを参照してください。

</base-alert>

### scrollToTop プロパティ

`scrollToTop` は、ページをレンダリングする前に Nuxt.js に一番上にスクロールするように指示できます。
デフォルトでは別ページに移動すると一番上にスクロールしますが、子ルートの場合はスクロール位置を維持します。
子ルートをレンダリングする際に Nuxt.js に一番上までスクロールするように指示したい場合は、`scrollToTop` を `true` に設定します。

```js{}[pages/index.vue]
export default {
  scrollToTop: true
}
```

逆に、親ルートでも `scrollToTop` を手動で `false` に設定することができます。

スクロールについて Nuxt.js のデフォルトの挙動を上書きしたいときは、[scrollBehavior オプション](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior)を参照してください。

### middleware プロパティ

このページのためのミドルウェアを定義します。このミドルウェアは、ページをレンダリングする前に呼び出されます。

```js{}[pages/index.vue]
export default {
  middleware: 'auth'
}
```

<base-alert type="next">

詳細は[ミドルウェア](/docs/2.x/directory-structure/middleware)を参照してください。

</base-alert>

### watchQuery プロパティ

`watchQuery` キーを設定し、監視するクエリ文字列を設定します。定義した文字列が変更されると、すべてのコンポーネントメソッド（asyncData、fetch、validate、layout、...）が呼ばれます。パフォーマンス向上のため、監視はデフォルトで無効になっています。

```js{}[pages/index.vue]
export default {
  watchQuery: ['page']
}
```

<base-alert type="info">

すべてのクエリ文字列に対して監視を設定したい場合は、`watchQuery: true` を設定してください。

</base-alert>

```js{}[pages/index.vue]
export default {
  watchQuery: true
}
```

より洗練された監視のために、`watchQuery(newQuery, oldQuery)` 関数を使用することもできます。

```js{}[pages/index.vue]
export default {
  watchQuery(newQuery, oldQuery) {
    // 古いクエリ文字列に `bar` が含まれ、新しいクエリ文字列に `foo` が含まれている場合のみ、
    // コンポーネントメソッドを実行します
    return newQuery.foo && oldQuery.bar
  }
}
```

<base-alert type="next">

詳細は[データの取得](/docs/2.x/features/data-fetching)ページを参照してください。

</base-alert>

## ページを無視する

ページを無視したい場合は、ファイルの先頭に `-` を付けると `router.js` ファイルに含まれなくなります。

例えば、`pages/-about.vue` は無視されます。

<base-alert type="next">

詳細は[ignore オプション](/docs/2.x/configuration-glossary/configuration-ignore)ページを参照してください。

</base-alert>

## 設定

`dir.pages` オプションを設定すると、`pages/` ディレクトリの名前を別の名前に変更できます。

```js{}[nuxt.config.js]
export default {
  dir: {
    // `pages` ディレクトリの名前を `routes` に変更します。
    pages: 'routes'
  }
}
```

<base-alert type="next">

詳細は [dir オプション](/docs/2.x/configuration-glossary/configuration-dir)ページを参照してください。

</base-alert>

<quiz :questions="questions"></quiz>
