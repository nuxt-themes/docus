---
title: ルーティング
description: 'Nuxt.js はウェブアプリケーションのルーティングを生成するためにファイルシステムを利用します。'
category: getting-started
position: 104
---

> Nuxt.js は `pages` ディレクトリ内の Vue ファイルの木構造に沿って、自動的に [vue-router](https://github.com/vuejs/vue-router) の設定を生成します。

<div class="Alert Alert--grey">

ページ間を遷移するためには [`<nuxt-link>`](/api/components-nuxt-link) コンポーネントの使用を推奨します。

</div>

例:

```html
<template>
  <nuxt-link to="/">Home page</nuxt-link>
</template>
```

## ルーティングの基礎

下記のようなファイルの木構造のとき:

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

自動的に以下が生成されます:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## 動的なルーティング

パラメータを使って動的なルーティングを定義するには .vue ファイル名またはディレクトリ名に **アンダースコアのプレフィックス** を付ける必要があります。

<div class="Promo__Video">
  <a href="https://vueschool.io/lessons/nuxtjs-dynamic-routes?friend=nuxt" target="_blank">
    <p class="Promo__Video__Icon">
     Vue School で<strong>動的なルーティング</strong>についての無料レッスンをみる
    </p>
  </a>
</div>

下記のような木構造のとき:

```bash
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

自動的に以下が生成されます:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

`users-id` と名付けられたルートに `:id?` というパスがありますが、これはこの `:id` が必須ではないことを表します。もし必須にしたい場合は、代わりに `users/_id` ディレクトリ内に `index.vue` ファイルを作成してください。

<div class="Alert Alert--orange">

**警告**: `generate` コマンドで動的なルーティングは無視されます。: [generate 設定 API](/api/configuration-generate#routes)

</div>

### ルーティングのパラメータのバリデーション

Nuxt.js では、動的なルーティングをするコンポーネント内に、パラメータをバリデーションするメソッドを定義することができます。

例えば `pages/users/_id.vue` 内にこのように書きます:

```js
export default {
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  }
}
```

もしバリデーションのメソッドが `true` または `true` に解決する `Promise` を返さない、またはエラーをスローした場合は、Nuxt.js は自動的に 404 エラーページあるいはエラーの場合 500 エラーページをロードします。

バリデーションのメソッドについてより深く理解したい場合は [ページバリデーションの API](/api/pages-validate) を参照してください。

## ネストされたルート

Nuxt.js では vue-router の子ルートを使ってルートをネストさせることができます。

ネストされたルートの親コンポーネントを定義するには、子ビューを含む **ディレクトリと同じ名前** の Vue ファイルを作成する必要があります。

<div class="Alert Alert--orange">

<b>警告:</b> `<nuxt-child/>` を親コンポーネント内（<code>.vue</code> ファイル内）に書くことを忘れないでください。

</div>

下記のようなファイルの木構造のとき:

```bash
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

自動的に以下が生成されます:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## 動的でネストされたルート

あまり頻繁に使うべきではありませんが、Nuxt.js では動的な親ルーティングの中に動的な子ルーティングを持つことが可能です。

下記のようなファイルの木構造のとき:

```bash
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

自動的に以下が生成されます:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

### 未知の動的でネストされたルート

もし URL 構造の深さが不明な場合は、ネストされたパスに動的にマッチさせる `_.vue` ファイルを使用することができます。これは _より詳細な_ リクエストにマッチしなかったリクエストをハンドリングします。

下記のようなファイルの木構造のとき:

```bash
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

次のようにリクエストをハンドリングします:

| Path                     | File               |
| ------------------------ | ------------------ |
| `/`                      | `index.vue`        |
| `/people`                | `people/index.vue` |
| `/people/123`            | `people/_id.vue`   |
| `/about`                 | `_.vue`            |
| `/about/careers`         | `_.vue`            |
| `/about/careers/chicago` | `_.vue`            |

**注意:** 404 ページのハンドリングは `_.vue` ページのロジックに依存します。[404 リダイレクトについての詳細はこちら](/guide/async-data#handling-errors)を参照してください。

## router の拡張

Nuxt のルーティングを拡張するためにはいくつかの方法があります。

- [router-extras-module](https://github.com/nuxt-community/router-extras-module) はページコンポーネントのルートパラメータをカスタマイズできます
- [@nuxtjs/router](https://github.com/nuxt-community/router-module) は独自の `router.js` を使って Nuxt router を上書きすることができます
- [router.extendRoutes](https://nuxtjs.org/api/configuration-router#extendroutes) プロパティを `nuxt.config.js` で使います

## 名前付きビュー

名前付きビューをレンダリングするために `<nuxt name="top"/>` または `<nuxt-child name="top"/>` コンポーネントを layout/page 内で使用できます。名前付きビューを特定するには `nuxt.config.js` ファイルのルータ設定の拡張が必要です。

```js
export default {
  router: {
    extendRoutes(routes, resolve) {
      const index = routes.findIndex(route => route.name === 'main')
      routes[index] = {
        ...routes[index],
        components: {
          default: routes[index].component,
          top: resolve(__dirname, 'components/mainTop.vue')
        },
        chunkNames: {
          top: 'components/mainTop'
        }
      }
    }
  }
}
```

これには関連する 2 つのプロパティ `components` と `chunkNames` を拡張する必要があります。上記の設定例の名前付きビューは `top` という名前を持っています。

名前付きビューの例が見たい場合は [名前付きビューの例](/examples/named-views) を参照してください。

### SPA フォールバック

動的なルーティングに対しても SPA フォールバックを有効にすることができます。Nuxt.js は `mode: 'spa'` を使って生成された index.html ファイルと同様のファイルを出力します。多くの静的ホスティングサービスは、一致するファイルがない場合に SPA テンプレートを使用するよう設定できます。`head` 情報や HTML は含まれませんが、API からデータをロードし解決します。

`nuxt.config.js` で SPA フォールバックを有効化:

```js
export default {
  generate: {
    fallback: true, // デフォルトの '200.html' の代わりに '404.html' を使用したい場合
    fallback: 'my-fallback/file.html' // ホスティングサービスで特定のロケーションを指定する必要がある場合
  }
}
```

### ルートパラメータへのローカルアクセス

ローカルページまたはコンポーネント内の現在のルートパラメータは、`this.$route.params.{parameterName}` を参照することでアクセスできます。例えば、動的ユーザーページ (`users\_id.vue`) があり、ユーザーまたはプロセス情報を読み込むために `id` パラメータにアクセスする場合、次のような変数にアクセスできます。： `this.$route.params.id`

#### Surge 向けの実装

Surge は `200.html` と `404.html` の両方を[ハンドリングできます](https://surge.sh/help/adding-a-custom-404-not-found-page)。`generate.fallback` はデフォルトで `200.html` に設定されるので、変更する必要はありません。

#### GitHub Pages と Netlify 向けの実装

GitHub Pages と Netlify は `404.html` ファイルを自動的に認識するため、設定すべきことは `generate.fallback` を `true` にするだけです！

#### Firebase ホスティング向けの実装

Firebase ホスティングは `404.html` ファイルを自動的に[処理できる](https://firebase.google.com/docs/hosting/full-config#404)ため、`generate.fallback` を `true` に設定すると、404 のデフォルトレスポンスコードと一緒にエラーページがレンダリングされます。

## トランジション

Nuxt.js では [`<transition>`](https://jp.vuejs.org/v2/guide/transitions.html#%E5%8D%98%E4%B8%80%E8%A6%81%E7%B4%A0-%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B8%E3%82%B7%E3%83%A7%E3%83%B3) コンポーネントを使って、ページ間を遷移する際のトランジション/アニメーションを行うことができます。

### グローバルな設定

<div class="Alert Alert--nuxt-green">

<b>情報:</b> Nuxt.js のデフォルトのトランジション名は `"page"`です。

</div>

アプリケーションのすべてのページでフェードさせるトランジションを定義するには、ルーティング全体に適用されている CSS ファイルが必要です。まずは `assets` ディレクトリ内にファイルを作成するところから始めます:

`assets/main.css` 内にグローバルな CSS を書きます:

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
```

`nuxt.config.js` ファイルの `css` 配列に CSS ファイルのパスを追加します:

```js
export default {
  css: ['~/assets/main.css']
}
```

トランジションについてより深く理解したい場合は [トランジション設定 API](/api/pages-transition) を参照してください。

### 特定のページに対する設定

`transition` プロパティを使うことで、特定のページのみに対してカスタムトランジションを定義することもできます。

`assets/main.css` 内に新しい CSS 定義を追加します:

```css
.test-enter-active,
.test-leave-active {
  transition: opacity 0.5s;
}
.test-enter,
.test-leave-active {
  opacity: 0;
}
```

それから、このページトランジションを利用するためのクラス名を transition プロパティで指定します:

```js
export default {
  transition: 'test'
}
```

トランジションプロパティについてより深く理解したい場合は [ページトランジション API](/api/pages-transition) を参照してください。

## ミドルウェア

> ミドルウェアを使うと、特定のページやいくつかのページのグループがレンダリングされる前に実行されるカスタム関数を定義することができます。

**ミドルウェアは `middleware/` ディレクトリに入れてください。** ファイル名はミドルウェアの名前となります（`middleware/auth.js` は `auth` ミドルウェアになります）。関数を直接使用してページ固有のミドルウェアを定義することもできます。[anonymous middleware](/api/pages-middleware#無名ミドルウェア) を参照してください。

ミドルウェアは第一引数として [コンテキスト](/api/context) を受け取ります:

```js
export default function (context) {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

ユニバーサルモードの場合、ミドルウェアはサーバサイドでは一度だけ呼び出され（Nuxt アプリケーションへの最初のリクエスト時、またはページの再読込み時）クライアントサイドでは他のルートへ移動したときに呼び出されます。ページを静的に生成しているときは、ミドルウェアはサーバーサイドではなくビルド時に一度だけ呼び出されます。SPA モードの場合、ミドルウェアはクライアントサイドで最初のリクエスト時と他のルートへ移動したときに呼び出されます。

ミドルウェアは下記の順に実行されます:

1. `nuxt.config.js`（ファイル内の順）
2. マッチしたレイアウト
3. マッチしたページ

ミドルウェアは非同期に実行することもできます。そのためには、単に `Promise` を返却するか、第 2 引数の `callback` を使用します:

`middleware/stats.js`

```js
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

そして `nuxt.config.js` で `router.middleware` キーを使います:

`nuxt.config.js`

```js
export default {
  router: {
    middleware: 'stats'
  }
}
```

これで `stats` ミドルウェアはすべてのルート変更時に呼び出されるようになります。

同様に、特定のレイアウトもしくはページ内にもミドルウェア（複数であっても）を追加することができます:

`pages/index.vue` または `layouts/default.vue`

```js
export default {
  middleware: ['auth', 'stats']
}
```

ミドルウェアを使った実際の例を見たい場合は GitHub 上にある [example-auth0](https://github.com/nuxt/example-auth0) を参照してください。
