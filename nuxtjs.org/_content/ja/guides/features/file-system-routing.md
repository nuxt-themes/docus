---
title: ファイルシステムに基づくルーティング
description: Nuxt.js は pages ディレクトリにある Vue ファイルの木構造に基づいて、vue-router の設定を自動的に生成します。pages ディレクトリに .vue ファイルを作成すると、特別な設定をせずとも基本的なルーティングが動作するようになります。
position: 3
category: features
questions:
  - question: ページ間を遷移するために使うコンポーネント名は？
    answers:
      - '<a>'
      - '<NuxtLink>'
      - '<Nuxt>'
    correctAnswer: '<NuxtLink>'
  - question: 自動ルーターの設定を生成するには何をする必要がありますか？
    answers:
      - pages ディレクトリに .vue ファイルを追加する
      - router.config ファイルを作成する
      - '<NuxtLink> をページに追加する'
    correctAnswer: pages ディレクトリに .vue ファイルを追加する
  - question: 動的ルートを作成しないのは次のうちどれですか？
    answers:
      - dynamic.vue
      - _slug.vue
      - _slug/index.vue
    correctAnswer: dynamic.vue
  - question: 動的ルートは nuxt generate コマンドによって無視されますか？
    answers:
      - 無視されます
      - 無視されません
    correctAnswer: 無視されません
  - question: users/_id.vue などの動的ページのルートパラメータにどのようにアクセスしますか？
    answers:
      - $route.params.id
      - $route.id
      - $route.params.users.id
    correctAnswer: $route.params.id
  - question: ネストされたルートの親コンポーネントをどのように定義しますか？
    answers:
      - 子ビューを含むディレクトリ内に parent という Vue ファイルを作成します
      - 子ビューを含むディレクトリとは異なる名前の Vue ファイルを作成します
      - 子ビューを含むディレクトリと同じ名前の Vue ファイルを作成します
    correctAnswer: 子ビューを含むディレクトリと同じ名前の Vue ファイルを作成します
  - question: URL 構造の深さがわからない場合、どのファイルを使ってネストされたパスを動的に照合しますか？
    answers:
      - _.vue
      - _index.vue
      - _id.vue
    correctAnswer: _.vue
  - question: 名前付きビューをレンダリングするために使うコンポーネントは？
    answers:
      - '<Nuxt> と <Child>'
      - '<Nuxt> と <NuxtChild>'
      - '<NuxtChild> と <NuxtLink>'
    correctAnswer: '<Nuxt> と <NuxtChild>'
  - question: Nuxt.js ですべてのルートでスクロール位置を上に強制するために、どのファイルを作成しますか？
    answers:
      - app/router.scrollBehavior.js
      - app/scrollBehavior.js
      - app/router.js
    correctAnswer: app/router.scrollBehavior.js
  - question: Nuxt.js ではすべてのルートの末尾にスラッシュを追加できますか？
    answers:
      - できます
      - できません
    correctAnswer: できます
---

Nuxt.js は pages ディレクトリにある Vue ファイルの木構造に基づいて、vue-router の設定を自動的に生成します。pages ディレクトリに .vue ファイルを作成すると、特別な設定をせずとも基本的なルーティングが動作するようになります。

動的なルーティングやネストされたルートを生成したり、ルーターのプロパティをより細かく設定したりする必要がある場合があるでしょう。この章では、ルーターを最大限に活用するために知るべきことすべてを説明します。

<base-alert type="info">

Nuxt.js は設定をしなくても自動的にコード分割を行います。

</base-alert>

<base-alert type="info">

ページ間を遷移するためには [NuxtLink コンポーネント](/docs/2.x/features/nuxt-components#NuxtLink-コンポーネント) を使ってください。

</base-alert>

```html
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```

## ルーティングの基礎

下記のような木構造のとき：

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

自動的に以下が生成されます：

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

ユーザーやブログ記事の一覧を API から取得する場合など、ルートの名前を決定することができない場合があります。私たちはこれを動的なルーティングと呼びます。動的なルーティングを生成するには、.vue ファイル名またはディレクトリ名の前にアンダースコアを付ける必要があります。ファイルやディレクトリには好きな名前をつけることができますが、アンダースコアのプレフィックスを必ず付ける必要があります。

下記のような木構造のとき：

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

自動的に以下が生成されます：

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

<base-alert type="info">

`users-id` と名付けられたルートに `:id?` というパスがありますが、これはこの `:id` が必須ではないことを表します。もし必須にしたい場合は、代わりに `users/_id` ディレクトリ内に `index.vue` ファイルを作成してください。

</base-alert>

<base-alert type="info">

Nuxt >= v2.13 ではクローラーがインストールされており、リンクタグをクロールしてそれらのリンクに基づいた動的なルートを生成します。しかしシークレットページのようなリンクが存在しないページがある場合、それらの動的なルートは手動で生成する必要があります。

</base-alert>

<base-alert type="next">

静的なサイトのために [動的なルーティングを生成する](/docs/2.x/concepts/static-site-generation)

</base-alert>

### ルートパラメーターへのローカルアクセス

ローカルページやコンポーネント内の現在のルートパラメータは、`this.$route.params.{parameterName}` を参照することでアクセスすることができます。例えば、動的なユーザーページ（`users/_id.vue`）があり、ユーザーまたはプロセス情報を読み込むために `id` パラメーターにアクセスしたい場合、次のような変数にアクセスできます: `this.$route.params.id`.。

## ネストされたルート

Nuxt.js は vue-router の子ルートを使ってルートをネストさせることができます。ネストされたルートの親コンポーネントを定義するには、子ビューを含むディレクトリと同じ名前の Vue ファイルを作成する必要があります。

<base-alert>

親コンポーネント（`.vue` ファイル）内に [NuxtChild  コンポーネント](/docs/2.x/features/nuxt-components#the-nuxtchild-component)を含めることを忘れないでください。

</base-alert>

下記のような木構造のとき：

```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

自動的に以下が生成されます：

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

あまり頻繁に使う場面はありませんが、Nuxt.js は動的な親ルーティングの中に動的な子ルーティングを持つことが可能です。

下記のような木構造のとき：

```
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

自動的に以下が生成されます：

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

## 未知の動的でネストされたルート

もし URL 構造の深さが不明な場合は、ネストされたパスに動的にマッチさせる `_.vue` ファイルを使うことができます。これは*より詳細な*ルートにマッチしなかったリクエストをハンドリングします。

下記のような木構造のとき：

```
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

次のようにリクエストをハンドリングします：

```
/ -> index.vue
/people -> people/index.vue
/people/123 -> people/_id.vue
/about -> _.vue
/about/careers -> _.vue
/about/careers/chicago -> _.vue
```

<base-alert type="info">

404 ページのハンドリングは `_.vue` ページのロジックに依存します。

</base-alert>

## ルーターの拡張

Nuxt のルーティングを拡張する方法はいくつかあります：

- [router-extras-module](https://github.com/nuxt-community/router-extras-module) を使ってページのルートパラメータをカスタマイズする
- [@nuxtjs/router](https://github.com/nuxt-community/router-module) を使い、独自の `router.js` で Nuxt router を上書きする
- `nuxt.config.js` 内で [router.extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes)  プロパティを使う

## router プロパティ

router プロパティを使って Nuxt.js のルーター (vue-router) をカスタマイズできます。

```js{}[nuxt.config.js]
export default {
  router: {
    // Nuxt.js router をカスタマイズする
  }
}
```

### Base：

アプリケーションのベース URL です。例えばシングルページアプリケーション全体を `/app/` 配下で配信したい場合、base に `/app/` を設定します。

<base-alert type="next">

[Router Base プロパティ](/docs/2.x/configuration-glossary/configuration-router#base)

</base-alert>

### extendRoutes

Nuxt.js によって生成されるルーティングを拡張したい場合があるでしょう。それは `extendRoutes` オプションで実現できます。

独自のルートを追加する例：

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

ルートをソートしたい場合、`@nuxt/utils` の `sortRoutes(routes)` 関数を使うことができます：

```js{}[nuxt.config.js]
import { sortRoutes } from '@nuxt/utils'
export default {
  router: {
    extendRoutes(routes, resolve) {
      // ここにルートを追加します ...

      // それらをソートします
      sortRoutes(routes)
    }
  }
}
```

<base-alert>

ルートのスキーマは [vue-router](https://router.vuejs.org/ja/) のスキーマを尊重すべきです。

</base-alert>

<base-alert>

[名前付きビュー](https://ja.nuxtjs.org/docs/2.x/features/file-system-routing#名前付きビュー) を使うルートを追加する場合、対応する名前付き `components` の `chunkNames` を追加することを忘れないでください。

</base-alert>

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/users/:id',
        components: {
          default: resolve(__dirname, 'pages/users'), // または routes[index].component
          modal: resolve(__dirname, 'components/modal.vue')
        },
        chunkNames: {
          modal: 'components/modal'
        }
      })
    }
  }
}
```

<base-alert type="next">

[extendRoutes プロパティ](/docs/2.x/configuration-glossary/configuration-router#extendroutes)

</base-alert>

### fallback

history.pushState をサポートしていないブラウザにおいて、モードが history に設定されている場合に、ルーターを hash モードにフォールバックするかどうかを制御します。

<base-alert type="next">

[fallback プロパティ](/docs/2.x/configuration-glossary/configuration-router#fallback)

</base-alert>

### mode

ルーティングのモードを設定します。サーバーサイドレンダリングのため、この設定を変更することは非推奨です。

<base-alert type="next">

[mode プロパティ](/docs/2.x/configuration-glossary/configuration-router#mode)

</base-alert>

### parseQuery / stringifyQuery

カスタムクエリ構文解析関数 / 文字列化関数を提供します。

<base-alert type="next">

[parseQuery / stringifyQuery プロパティ](/docs/2.x/configuration-glossary/configuration-router#parsequery--stringifyquery)

</base-alert>

### routeNameSplitter

Nuxt.js が使うルート名の区切り文字を変更したい場合があるでしょう。それは設定ファイル内の `routeNameSplitter` オプションを使用して実現できます。`pages/posts/_id.vue` というページファイルがあるとします。Nuxt.js はプログラムに従ってルート名を生成します。この場合は `posts-id` です。`routeNameSplitter` の設定を `/` に変更することによって `posts/id` へ変更されます。

```js{}[nuxt.config.js]
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

### scrollBehavior

`scrollBehavior` オプションを使って、ページ間遷移のスクロール位置について独自の振る舞いを定義することができます。このメソッドはページがレンダリングされるたびに毎回呼び出されます。

<base-alert type="next">

詳細は [vue-router のスクロールの振る舞いのドキュメント](https://router.vuejs.org/ja/guide/advanced/scroll-behavior.html)を参照してください。

</base-alert>

v2.9.0 以降で利用可能：

ファイルを利用してルーターの scrollBehavior を上書きすることができます。このファイルは app フォルダに配置する必要があります。

`~/app/router.scrollBehavior.js`.

すべてのルートに置いて強制的にトップまでスクロールさせる例：

```js{}[app/router.scrollBehavior.js]
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

<base-alert type="next">

[Nuxt.js のデフォルトの `router.scrollBehavior.js` ファイル](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js)

</base-alert>

<base-alert type="next">

[scrollBehavior プロパティ](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior)

</base-alert>

### trailingSlash

v2.10 以降で利用可能：

このオプションを true に設定した場合、すべてのルートの末尾にスラッシュが追加されます。false に設定した場合、それらは取り除かれます。

```js{}[nuxt.config.js]
export default {
  router: {
    trailingSlash: true
  }
}
```

<base-alert>

このオプションを準備なしに設定しないでください。徹底的にテストする必要があります。`router.trailingSlash` に `undefined`（デフォルトの値）以外の値を設定した場合、どちらかのルートは機能しなくなります。したがって、301 リダイレクトは適切に行われ、*内部リンク*は正しく適応される必要があります。`trailingSlash` を true に設定する場合、`example.com/abc/` のみが機能し、`example.com/abc` は機能しません。false に設定する場合はその逆になります。

</base-alert>

<base-alert type="next">

[trailingSlash プロパティ](/docs/2.x/configuration-glossary/configuration-router#trailingslash)

</base-alert>

<quiz :questions="questions"></quiz>
