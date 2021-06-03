---
title: content
description: '`@nuxt/content` モジュールを使うことで Nuxt.js アプリケーションを強化できます。このモジュールは `content/` ディレクトリへの書き込みや、**Git ベースのヘッドレス CMS** のように動作する MongoDB のような API を介してマークダウン、JSON、YAML や CSV ファイルを取得できます。'
position: 4
category: directory-structure
img: /docs/2.x/nuxt-content.svg
imgAlt: nuxt content module
questions:
  - question: マークダウンファイルを追加するディレクトリのデフォルト名は？
    answers:
      - markdown
      - content
      - pages
    correctAnswer: content
  - question: マークダウンのページ本文を表示するためにテンプレートでどのコンポーネントを使いますか？
    answers:
      - <markdown>
      - <nuxt>
      - <nuxt-content>
    correctAnswer: <nuxt-content>
  - question: マークダウンのスタイルを設定するためにどのクラスが自動的に追加されますか？
    answers:
      - .content
      - .nuxt-content
      - .markdown
    correctAnswer: .nuxt-content
  - question: content モジュールはマークダウン、CSV、YAML、JSON ファイルを処理できますか？
    answers:
      - 正
      - 偽
    correctAnswer: 正
  - question: マークダウンに Vue コンポーネントを追加できますか？
    answers:
      - 正
      - 偽
    correctAnswer: 正
  - question: contentの一覧表示、フィルタリング、検索にはどれを使いますか？
    answers:
      - $nuxt-content()
      - $content()
      - $nuxt()
    correctAnswer: $content()
  - question: 前の記事や次の記事を取得するために使うのは？
    answers:
      - .surround(slug)
      - .prev-next(slug)
      - .slug()
    correctAnswer: .surround(slug)
  - question: Prism クラスはデフォルトでコードブロックに適用されますか？
    answers:
      - 正
      - 偽
    correctAnswer: 正
  - question: API をつかって JSON を表示するためにアクセスするデフォルトの URL はどれですか？
    answers:
      - http://localhost:3000/content
      - http://localhost:3000/_content
      - http://localhost:3000/api
    correctAnswer: http://localhost:3000/_content
  - question: 目次の作成に使われる見出しタグはどれですか？
    answers:
      - h1 と h2
      - h2 と h3
      - h1 と h2 と h3
    correctAnswer: h2 と h3
  - question: 静的サイト生成に content モジュールを使えますか？
    answers:
      - 正
      - 偽
    correctAnswer: 正
---

`@nuxt/content`  モジュールを使うことで Nuxt.js アプリケーションを強化できます。このモジュールは  `content/`  ディレクトリへの書き込みや、**Git ベースのヘッドレス CMS** のように動作する MongoDB のような API を介してマークダウン、JSON、YAML や CSV ファイルを取得できます。

<app-modal :src="img" :alt="imgAlt"></app-modal>

### 開発時のホットリロード

マークダウンファイルに変更があった場合 webpack を介する必要がないので、開発時における content モジュールのホットリロードは非常に高速です。また、`content:update` イベントのリッスンやプラグインを作ることもできるので content 内のファイルを更新するたびに例えば fetchCategories メソッドをディスパッチすることができます。

<base-alert type="next">

詳細は [content モジュールのドキュメントのホットリロードの取り扱い](https://content.nuxtjs.org/ja/advanced/#%E3%83%9B%E3%83%83%E3%83%88%E3%83%AA%E3%83%AD%E3%83%BC%E3%83%89%E3%81%AE%E5%8F%96%E3%82%8A%E6%89%B1%E3%81%84)を参照してください

</base-alert>

### content の表示

ページの本文を表示するために `<nuxt-content>` コンポーネントをテンプレートで直接使えます。

```html{}[pages/blog/_slug.vue]
<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>
```

<base-alert type="next">

詳細は [content モジュールのドキュメントのコンポーネント](https://content.nuxtjs.org/ja/displaying/#component)を参照してください

</base-alert>

### content のスタイリング

アプリケーションの設計に使っているものによってはマークダウンを適切に表示するために何らかのスタイルを作成する必要があるかもしれません。

`<nuxt-content>`  コンポーネントは自動的に  `.nuxt-content`  クラスを追加します。このクラスを使ってスタイルをカスタマイズできます。

```html
<style>
  .nuxt-content h2 {
    font-weight: bold;
    font-size: 28px;
  }
  .nuxt-content p {
    margin-bottom: 20px;
  }
</style>
```

<base-alert type="next">

詳細は [content モジュールのドキュメントのスタイル](https://content.nuxtjs.org/ja/displaying#style)を参照してください

</base-alert>

### マークダウン、CSV、YAML、JSON（5）を扱う

このモジュールは `.md` ファイルを JSON AST ツリー構造に変換し body 変数に格納します。YAML front matter ブロックをマークダウンファイルまたはドキュメントに挿入される .yaml ファイルに追加することもできます。また、同様にドキュメントに挿入できる json/json5 ファイルや行が body 変数に割り当てられる .csv ファイルを追加することもできます。

```md
---
title: 最初のブログ投稿
description:@nuxt/content を使ってブログを作る方法を学びます
---
```

<base-alert type="next">

詳細は [content モジュールのドキュメントのマークダウン](https://content.nuxtjs.org/ja/writing/#markdown)を参照してください

</base-alert>

### マークダウン内の Vue コンポーネント

マークダウンファイルで Vue コンポーネントを直接使えます。ただし、コンポーネントをケバブケースで参照する必要があり自動終了タグは使えません。

```html{}[components/global/InfoBox.vue]
<template>
  <div class="p-4 mb-4 text-white bg-blue-500">
    <p><slot name="info-box">デフォルト</slot></p>
  </div>
</template>
```

```html{}[content/articles/my-first-blog-post.md]
<info-box>
  <template #info-box>
    これは slot を使ったマークダウン内の Vue コンポーネントです
  </template>
</info-box>
```

<base-alert type="next">

詳細は [content モジュールのドキュメントの vue コンポーネント](https://content.nuxtjs.org/writing#vue-components)を参照してください

</base-alert>

### 完全検索可能な API

`$content()` を使って content を簡単に一覧表示したりフィルタしたり検索したりできます。

```html{}[pages/blog/index.vue]
<script>
  export default {
    async asyncData({ $content, params }) {
      const articles = await $content('articles', params.slug)
        .only(['title', 'description', 'img', 'slug', 'author'])
        .sortBy('createdAt', 'asc')
        .fetch()

      return {
        articles
      }
    }
  }
</script>
```

<base-alert type="next">

詳細は [content モジュールのドキュメントのメソッド一覧](https://content.nuxtjs.org/ja/fetching/#%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E4%B8%80%E8%A6%A7)を参照してください

</base-alert>

### 前の記事と次の記事

content モジュールには `.surround(slug)` が含まれているので前の記事と次の記事を簡単に取得できます。

```js
async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next
    }
  },
```

```html
<prev-next :prev="prev" :next="next" />
```

<base-alert type="next">

詳細は [content モジュールのドキュメントの surroundslug オプション](https://content.nuxtjs.org/ja/fetching/#surroundslug-options)を参照してください

</base-alert>

### 全文検索

content モジュールには全文検索が備わっているので何もインストールしなくてもマークダウンファイルを簡単に検索できます。

```html{}[components/AppSearchInput.vue]
<script>
  export default {
    data() {
      return {
        searchQuery: '',
        articles: []
      }
    },
    watch: {
      async searchQuery(searchQuery) {
        if (!searchQuery) {
          this.articles = []
          return
        }
        this.articles = await this.$content('articles')
          .limit(6)
          .search(searchQuery)
          .fetch()
      }
    }
  }
</script>
```

<base-alert type="next">

詳細は [content モジュールのドキュメントの search](https://content.nuxtjs.org/ja/fetching/#searchfield-value)を参照してください

</base-alert>

### シンタックスハイライト

このモジュールは自動的にコードブロックをラップ氏、[Prism](https://prismjs.com/)  クラスを適用します。異なる Prism テーマを使ったり無効化したりすることもできます。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add prism-themes
```

  </code-block>
  <code-block label="npm">

```bash
npm install prism-themes
```

  </code-block>
</code-group>

```js{}[nuxt.config.js]
content: {
  markdown: {
    prism: {
      theme: 'prism-themes/themes/prism-material-oceanic.css'
    }
  }
}
```

<base-alert type="next">

詳細は [content モジュールのドキュメントのシンタックスハイライト](https://content.nuxtjs.org/ja/writing/#%E3%82%B7%E3%83%B3%E3%82%BF%E3%83%83%E3%82%AF%E3%82%B9%E3%83%8F%E3%82%A4%E3%83%A9%E3%82%A4%E3%83%88)を参照してください

</base-alert>

### マークダウンのパースを拡張する

もともとマークダウンはコードブロック内の行やファイル名の強調表示をサポートしていません。content モジュールでは独自のカスタム構文を使えます。行番号は  data-line  属性の `pre`  タグに追加され、ファイル名は `filename`  クラスの `span` に変換されるのでスタイルを設定できます。

<base-alert type="next">

詳細は [content モジュールのドキュメントのコードブロック](https://content.nuxtjs.org/ja/writing/#%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF)を参照してください

</base-alert>

### 目次の生成

TOC（Table of Contents/ 目次）配列プロパティがドキュメントに挿入され、すべての見出しとそのタイトル、ID の一覧が表示されるのでそれらにリンクできます。

```html{}[pages/blog/_slug.vue]
<nav>
  <ul>
    <li v-for="link of article.toc" :key="link.id">
      <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</nav>
```

<base-alert type="next">

詳細は [content モジュールのドキュメントのテーブルコンテンツ](https://content.nuxtjs.org/writing#table-of-contents)を参照してください

</base-alert>

### （MongoDB のような）力強いクエリビルダー API

content モジュールには MongoDB に似た強力なクエリビルダー API が備わっており、`http://localhost:3000/_content/` で各ディレクトリの JSON を簡単に確認できます。エンドポイントは GET や POST リクエストでアクセスできるのでクエリパラメータを使えます。

`http://localhost:3000/_content/articles?only=title&only=description&limit=10`

<base-alert type="next">

詳細は [content モジュールのドキュメントの API エンドポイント](https://content.nuxtjs.org/ja/advanced#api%E3%82%A8%E3%83%B3%E3%83%89%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88)を参照してください

</base-alert>

### フックを使った拡張

フックを使用してモジュールを拡張し、ドキュメントを保存する前にデータをドキュメントに追加できます。

<base-alert type="next">

詳細は [content モジュールのドキュメントのフック](https://content.nuxtjs.org/ja/advanced/#%E3%83%95%E3%83%83%E3%82%AF)を参照してください

</base-alert>

### @nuxtjs/feed を使った統合

記事の場合、content は [@nuxtjs/feed](https://www.npmjs.com/package/@nuxtjs/feed) モジュールを使ってニュースフィードを生成することに使えます。

<base-alert type="next">

詳細は [content モジュールのドキュメントの @nuxtjs/feed との統合](https://content.nuxtjs.org/ja/integrations/#nuxtjsfeed)を参照してください

</base-alert>

### 静的サイト生成のサポート

content モジュールは `nuxt generate` を使って静的サイト生成ができます。nuxt クローラ機能のおかげですべてのルートが自動的に生成されます。

<base-alert>

もし Nuxt v2.12 以下を使っていて動的ルートを指定する必要がある場合は、generate プロパティを使ってプログラムから @nuxt/content を使って指定できます。

</base-alert>

<base-alert type="next">

プログラムでの扱い方についての詳細は [content モジュールのドキュメントのプログラマティックな利用方法](https://content.nuxtjs.org/ja/advanced/#programmatic-usage)を参照してください

</base-alert>

### このあとは

<base-alert type="next">

チュートリアル [Nuxt Content でブログを作る方法](/blog/creating-blog-with-nuxt-content)を参照してください

</base-alert>

<base-alert type="next">

高度な使用方法と例については [content モジュールのドキュメント](https://content.nuxtjs.org/ja)を参照してください

</base-alert>

<quiz :questions="questions"></quiz>
