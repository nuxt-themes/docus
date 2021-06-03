---
title: 'router プロパティ'
description: 'router プロパティを使って Nuxt.js ルーターをカスタマイズできます。'
menu: router
category: configuration-glossary
position: 24
---

> router プロパティを使って Nuxt.js ルーター（[vue-router](https://router.vuejs.org/ja/)）をカスタマイズできます。

## base

- 型: `String`
- デフォルト: `'/'`

アプリケーションのベースの URL です。例えば、単一ページアプリケーション全体が `/app/` 下に配置される場合、base の値は `'/app/'` を指定します。

これは、より大きな Web サイト内から、Nuxt を別のコンテキストルートとして提供する必要がある場合に役立ちます。フロントプロキシウェブサーバーを設定する場合としない場合があることに注意してください。

`router.base` にリダイレクトしたい場合、Hook を使ってリダイレクトすることができます。[ルートでない場合 router.base にリダイレクトさせる](/docs/2.x/configuration-glossary/configuration-hooks#root-でない場合は-routerbase-にリダイレクトさせる)を参照してください。

Nuxt v2.15 以降では、実行時にこのプロパティの値を変更すると、既にビルドされているアプリケーションの設定が上書きされます。

```js{}[nuxt.config.js]
export default {
  router: {
    base: '/app/'
  }
}
```

<div class="Alert Alert-blue">

`base` が設定されている場合、Nuxt.js はドキュメントヘッダー `<base href="{{ router.base }}"/>` も追加します。

</div>

> このオプションは直接 vue-router の [base](https://router.vuejs.org/ja/api/#base) に渡されます。

## routeNameSplitter

- 型: `String`
- デフォルト: `'-'`

Nuxt.js が使うルート名間の区切り文字を変更したいかもしれません。その場合は設定ファイルの `routeNameSplitter` オプションを介して変更できます。ページファイル `pages/posts/_id.vue` があると仮定します。Nuxt はプログラムでルート名（今回の場合は `posts-id`）を生成します。`routeNameSplitter` の設定を `/` に変更するとルート名は `posts/id` に変更されます。

```js{}[nuxt.config.js]
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

## extendRoutes

- 型: `Function`

Nuxt.js によって作成されたルートを拡張したいことがあるかもしれません。その場合は `extendRoutes` オプションを介して拡張できます。

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

ルートをソートしたい場合、`@nuxt/utils` の `sortRoutes(routes)` 関数を使えます:

```js{}[nuxt.config.js]
import { sortRoutes } from '@nuxt/utils'
export default {
  router: {
    extendRoutes(routes, resolve) {
      // ルートをここに追加する ...

      // それからソートする
      sortRoutes(routes)
    }
  }
}
```

ルートのスキーマは [vue-router](https://router.vuejs.org/ja/) スキーマを尊重してください。

<base-alert>

名前付きビューを使うルートを追加する場合、対応する名前付き `components` の `chunkNames` の追加を忘れないでください。

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

## fallback

- 型: `boolean`
- デフォルト: `false`

history.pushState がサポートされていないブラウザにおいて、モードが history に設定されているとき、ルーターを hash モードにフォールバックするかどうか制御します。

ケーションがサーバサイドレンダリングされ、IE9 で動作する必要がある場合に便利です。なぜなら、サーバーサイドレンダリングではハッシュモードの URL が機能しないためです。

> このオプションは直接 vue-router の [fallback](https://router.vuejs.org/ja/api/#fallback) に渡されます。

## linkActiveClass

- 型: `String`
- デフォルト: `'nuxt-link-active'`

[`<nuxt-link>`](/docs/2.x/features/nuxt-components#nuxtlink-コンポーネント) のデフォルトの active class をグローバルに設定します。

```js{}[nuxt.config.js]
export default {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> このオプションは直接 vue-router の [linkActiveClass](https://router.vuejs.org/ja/api/#linkactiveclass) に渡されます。

## linkExactActiveClass

- 型: `String`
- デフォルト: `'nuxt-link-exact-active'`

[`<nuxt-link>`](/docs/2.x/features/nuxt-components#nuxtlink-コンポーネント) のデフォルトの active class をグローバルに設定します。

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> このオプションは直接 vue-router の [linkExactActiveClass](https://router.vuejs.org/ja/api/#linkexactactiveclass) に渡されます。

## linkPrefetchedClass

- 型: `String`
- デフォルト: `false`

[`<nuxt-link>`](/docs/2.x/features/nuxt-components#nuxtlink-コンポーネント) の prefetch クラスをグローバルに設定します（デフォルトは無効の機能）。

```js{}[nuxt.config.js]
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

## middleware

- 型: `String` または `Array`
  - 要素: `String`

アプリケーションのページごとにデフォルトのミドルウェアを設定します。

```js{}[nuxt.config.js]
export default {
  router: {
    // ページごとに middleware/user-agent.js を実行します
    middleware: 'user-agent'
  }
}
```

```js{}[middleware/user-agent.js]
export default function (context) {
  // userAgent プロパティを context（`asyncData` と `fetch` メソッドで利用できます）内に追加します
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

ミドルウェアについてより深く理解するために、[ミドルウェアのドキュメント](/docs/2.x/directory-structure/middleware#router-middleware)を参照してください。

## mode

- 型: `String`
- デフォルト: `'history'`

ルーティングのモードを設定します。サーバーサイドレンダリングのためにこの設定を変更することはおすすめしません。

```js{}[nuxt.config.js]
export default {
  router: {
    mode: 'hash'
  }
}
```

> このオプションは直接 vue-router の [mode](https://router.vuejs.org/ja/api/#mode) に渡されます。

## parseQuery / stringifyQuery

- 型: `Function`

カスタムクエリ構文解析関数/文字列化関数を提供します。デフォルトを上書きします。

> このオプションは直接 vue-router の [parseQuery / stringifyQuery](https://router.vuejs.org/ja/api/#parsequery-stringifyquery) に渡されます。

## prefetchLinks

> この機能は Nuxt v2.4.0 で追加されました

- 型: `Boolean`
- デフォルト: `true`

viewport（ブラウザの表示領域）内でリンクが検出された時に*コード分割された*ページを先読みする `<nuxt-link>` の設定をします。[IntersectionObserver](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API) がサポートされている必要があります（[Caniuse](https://caniuse.com/#feat=intersectionobserver) を参照してください）。

この機能を [Polyfill.io](https://polyfill.io) のようなサービスに条件付きで埋め込むことをおすすめします:

```js{}[nuxt.config.js]
export default {
  head: {
    script: [
      {
        src:
          'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver',
        body: true
      }
    ]
  }
}
```

特定のリンクで先読みを無効にしたい場合、`no-prefetch` プロパティが使えます。Nuxt.js v2.10.0 からは `prefetch` プロパティ（`false` に設定）も使えます:

```html
<nuxt-link to="/about" no-prefetch>About page not prefetched</nuxt-link>
<nuxt-link to="/about" :prefetch="false">About page not prefetched</nuxt-link>
```

全てのリンクで先読みを無効にしたい場合は、`prefetchLinks` を `false` に設定してください:

```js{}[nuxt.config.js]
export default {
  router: {
    prefetchLinks: false
  }
}
```

Nuxt.js v2.10.0 からは `prefetchLinks` を `false` に設定した上で特定のリンクを先読みしたい場合、`prefetch` プロパティが使えます:

```html
<nuxt-link to="/about" prefetch>About page prefetched</nuxt-link>
```

## prefetchPayloads

> v2.13.0 で追加された機能で、[静的なターゲット](/docs/2.x/features/deployment-targets#静的ホスティング)でのみ利用できます。

- 型: `Boolean`
- デフォルト: `true`

`target: 'static'` に設定した上で `nuxt generate` を使う場合、Nuxt はページごとに `payload.js` を生成します。

このオプションを有効にすると、viewport に `<nuxt-link>` が表示された時に Nuxt はリンク先ページのペイロードを自動的に先読みし**インスタントナビゲーション**を作成します。

<base-alert type="info">

このオプションの有効化は [prefetchLinks](#prefetchlinks) オプションに依存します。

</base-alert>

`prefetchPaylods` を `false` に設定することで無効にできます:

```js{}[nuxt.config.js]
export default {
  router: {
    prefetchPayloads: false
  }
}
```

## scrollBehavior

- 型: `Function`

`scrollBehavior` オプションを使って、ページ間のスクロール位置についての独自の振る舞いを定義できます。このメソッドはページがレンダリングされるたびに毎回呼び出されます。詳細は [vue-router のスクロールの振る舞いのドキュメント](https://router.vuejs.org/ja/guide/advanced/scroll-behavior.html)を参照してください。

<div class="Alert Alert-blue">

v2.9.0 以降、ファイルを使用してルーターの scrollBehavior を上書きすることができます。このファイルは `~/app/router.scrollBehavior.js` に配置する必要があります（注意: Windows ではファイル名の大文字と小文字が区別されます）。

</div>

Nuxt のデフォルトの `router.scrollBehavior.js` ファイルは次の場所にあります: [packages/vue-app/template/router.scrollBehavior.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js)

すべてのルートにおいて強制的にトップまでスクロールさせる例:

`app/router.scrollBehavior.js`

```js{}[app/router.scrollBehavior.js]
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

## trailingSlash

- 型: `Boolean` または `undefined`
- デフォルト: `undefined`
- 利用できる最小バージョン: v2.10

このオプションを true に設定した場合、末尾のスラッシュがすべてのルートに追加されます。もし false に設定した場合は末尾のスラッシュは削除されます。

**注意**: このオプションは準備なしに設定すべきではなく、徹底的にテストする必要があります。`router.trailingSlash` に `undefined` 以外の値を設定すると、反対のルートは機能しなくなります。したがって、301 リダイレクトを設定し、*内部リンク*を正しく適応させる必要があります。`trailingSlash` を `true` に設定した場合、`example.com/abc/` のみが動作し `example.com/abc` は動作しません。false に設定する場合はその逆になります。

### 動作例（子ルートあり）

ディレクトリ構造:

```bash
-| pages/
---| index.vue
---| posts.vue
---| posts/
-----| _slug.vue
-----| index.vue
```

これは `trailingSlash` の設定がそれぞれ有効な場合の動作です:

<code-group>
<code-block label="default" active>

```bash
ルート          ページ
/               ~/pages/index.vue
/posts          ~/pages/posts.vue (parent) + ~/pages/posts.vue (child route)
/posts/         ~/pages/posts.vue (parent) + ~/pages/posts.vue (child route)
/posts/foo      ~/pages/posts.vue (parent) + ~/pages/_slug.vue (child route)
/posts/foo/     ~/pages/posts.vue (parent) + ~/pages/_slug.vue (child route)
```

</code-block>
<code-block label="true">

```bash

ルート          ページ
/               ~/pages/index.vue
/posts          404
/posts/         ~/pages/posts.vue (parent) + ~/pages/index.vue (child route)
/posts/foo      404
/posts/foo/     ~/pages/posts.vue (parent) + ~/pages/_slug.vue (child route)
```

</code-block>
<code-block label="false">

```bash

ルート          ページ
/               ~/pages/index.vue
/posts          ~/pages/posts.vue
/posts/         ~/pages/posts.vue (parent) + ~/pages/index.vue (child route)
/posts/foo      ~/pages/posts.vue (parent) + ~/pages/_slug.vue (child route)
/posts/foo/     404
```

</code-block>
</code-group>
