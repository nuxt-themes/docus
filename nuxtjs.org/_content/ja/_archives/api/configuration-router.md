---
title: 'API: router プロパティ'
description: router プロパティを使って Nuxt.js のルーターをカスタマイズできます。
menu: router
category: configuration
position: 124
---

> router プロパティを使って Nuxt.js のルーター（[vue-router](https://router.vuejs.org/en/)）をカスタマイズできます。

## base

- 型: `String`
- デフォルト: `'/'`

アプリケーションのベース URL です。例えばシングルページアプリケーション全体を `/app/` 配下で配信したい場合は base に `'/app/'` を設定します。

これは、より大きな Web サイト内から Nuxt を異なったコンテキストルートとして提供する必要がある場合に便利です。フロントプロキシ Web サーバーを設定してもしなくても構いません。

`router.base` にリダイレクトしたい場合は、そうすることもできます。 [フックを設定し、 _root でない場合は router.base にリダイレクトさせる_ ](/api/configuration-hooks#root-でない場合は-router-base-にリダイレクトさせる) を参照してください。

例（`nuxt.config.js`）:

```js
export default {
  router: {
    base: '/app/'
  }
}
```

<div class="Alert Alert-blue">

`base` がセットされているときは Nuxt.js はドキュメントのヘッダーに `<base href="{{ router.base }}"/>` を追加します。

</div>

> このオプションは vue-router の [base](https://router.vuejs.org/ja/api/#base) に直接付与されます。

## routeNameSplitter

- 型: `String`
- デフォルト: `'-'`

Nuxt.js が使うルート名の区切り文字を変更したい場合があるでしょう。設定ファイル内の `routeNameSplitter` オプションを使用して変更することが可能です。 `pages/posts/_id.vue` というページファイルがあるとします。Nuxt はプログラムに従ってルート名を生成します。この場合は `posts-id` です。`routeNameSplitter` の設定を `/` に変更することによって `posts/id` へ変更されます。

例 (`nuxt.config.js`):

```js
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

## extendRoutes

- 型: `Function`

Nuxt.js によって作成されるルーティングを拡張したいことがあるかもしれません。それは `extendRoutes` オプションで実現できます。

独自のルートを追加する例:

`nuxt.config.js`

```js
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

ルートをソートしたい場合、`@nuxt/utils` の `sortRoutes(routes)` 関数を使用できます。

`nuxt.config.js`

```js
import { sortRoutes } from '@nuxt/utils'
export default {
  router: {
    extendRoutes(routes, resolve) {
      // ルートをここに追加する

      // ソートをする
      sortRoutes(routes)
    }
  }
}
```

ルートのスキーマは [vue-router](https://router.vuejs.org/ja/) のスキーマを尊重すべきです。

<div class="Alert Alert--orange">

<b>警告：</b> [名前付きビュー](/guide/routing#%E5%90%8D%E5%89%8D%E4%BB%98%E3%81%8D%E3%83%93%E3%83%A5%E3%83%BC)を使うルートを追加する場合、対応する名前付き `components` の `chunkNames` を追加することを忘れないでください。

</div>

`nuxt.config.js`

```js
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

- 型: `Boolean`
- デフォルト: `false`

history.pushState がサポートされていないブラウザにおいて、モードが history に設定されているとき、ルーターを hash モードにフォールバックするかどうか制御します。

これを false に設定すると、本質的に全ての router-link ナビゲーションが IE9 においてフルページリフレッシュになります。これは、アプリケーションがサーバサイドレンダリングされ、 IE9 で動作する必要がある場合に便利です。なぜなら、サーバーサイドレンダリングではハッシュモードの URL が機能しないためです。

> このオプションは vue-router の [fallback](https://router.vuejs.org/ja/api/#fallback) に直接付与されます。

## linkActiveClass

- 型: `String`
- デフォルト: `'nuxt-link-active'`

[`<nuxt-link>`](/api/components-nuxt-link) のデフォルトの active class をグローバルに設定します。

例（`nuxt.config.js`）:

```js
export default {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

> このオプションは vue-router の [linkactiveclass](https://router.vuejs.org/ja/api/#linkactiveclass) に直接付与されます。

## linkExactActiveClass

- 型 `String`
- デフォルト: `'nuxt-link-exact-active'`

[`<nuxt-link>`](/api/components-nuxt-link) のデフォルトの active class をグローバルに設定します。

例 (`nuxt.config.js`):

```js
export default {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

> このオプションは [linkexactactiveclass](https://router.vuejs.org/ja/api/#linkexactactiveclass) に直接付与されます.

## linkPrefetchedClass

- 型: `String`
- デフォルト: `false`

[`<nuxt-link>`](/api/components-nuxt-link) の prefetch クラスをグローバルに設定する（デフォルトでは無効の機能）

例 (`nuxt.config.js`):

```js
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

## middleware

- 型: `String` または `Array`
  - 要素: `String`

アプリケーションのすべてのページに対してデフォルトのミドルウェアをセットします。

例:

`nuxt.config.js`

```js
export default {
  router: {
    // すべてのページで middleware/user-agent.js を実行します
    middleware: 'user-agent'
  }
}
```

`middleware/user-agent.js`

```js
export default function (context) {
  // userAgent プロパティを context 内に追加します（context は `data` メソッドや `fetch` メソッド内で利用できます）
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

ミドルウェアについてより深く理解するには [ミドルウェア](/guide/routing#ミドルウェア) ガイドを参照してください。

## mode

- 型: `String`
- デフォルト: `'history'`

ルーティングのモードを設定します。サーバーサイドレンダリングのため、この設定を変更することは非推奨です。

例（`nuxt.config.js`）:

```js
export default {
  router: {
    mode: 'hash'
  }
}
```

> このオプションは直接 vue-router の [mode](https://router.vuejs.org/ja/api/#mode) に渡されます。

## parseQuery / stringifyQuery

- 型: `Function`

カスタムクエリ構文解析関数 / 文字列化関数を提供します。デフォルトを上書きします。

> このオプションは vue-router の [parseQuery / stringifyQuery](https://router.vuejs.org/ja/api/#parsequery-stringifyquery) に直接付与されます。

## prefetchLinks

> この機能は Nuxt v2.4.0 で追加されました

- 型: `Boolean`
- デフォルト: `true`

viewport（ブラウザの表示領域）内にリンクが表示されたとき _コード分割された_ ページを先読みする `<nuxt-link>` の設定をします。 [IntersectionObserver](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API) がサポートされている必要があります ([CanIUse](https://caniuse.com/#feat=intersectionobserver)を御覧ください）。

この機能を [Polyfill.io](https://polyfill.io) のようなサービスで条件付きで埋め込むことをお勧めします:

`nuxt.config.js`

```js
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

特定のリンクで先読みを無効にしたい場合は、`no-prefetch` プロパティを使用します。Nuxt.js v2.10.0 からは `prefetch` プロパティを `false` に設定することもできます。:

```html
<nuxt-link to="/about" no-prefetch>先読みしないページについて</nuxt-link>
<nuxt-link to="/about" :prefetch="false">先読みしないページについて</nuxt-link>
```

全てのリンクで先読みを無効にしたい場合は、`prefetchLinks` を `false` に設定してください:

```js
// nuxt.config.js
export default {
  router: {
    prefetchLinks: false
  }
}
```

Nuxt.js v2.10.0 からは `prefetchLinks` を `false` に設定した上で特定のリンクを先読みしたい場合 `prefetch` プロパティを使うことができます。

```html
<nuxt-link to="/about" prefetch>先読みするページについて</nuxt-link>
```

## scrollBehavior

- 型: `Function`

`scrollBehavior` オプションを使って、ページ間のスクロール位置についての独自の振る舞いを定義できます。このメソッドはページがレンダリングされるたびに毎回呼び出されます。詳細は [vue-router のスクロールの振る舞い](https://router.vuejs.org/ja/guide/advanced/scroll-behavior.html)を参照してください。

<div class="Alert Alert-blue">

v2.9.0 以降、ファイルを使用してルーターの scrollBehavior を上書きすることができます。このファイルは `~/app/router.scrollBehavior.js` に配置する必要があります（注意: Windows ではファイル名の大文字と小文字を区別します）。

</div>

Nuxt のデフォルトの `router.scrollBehavior.js` ファイルは次の場所にあります：[packages/vue-app/template/router.scrollBehavior.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js)

すべてのルートにおいて強制的にトップまでスクロールさせる例:

`app/router.scrollBehavior.js`

```js
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

## trailingSlash

- 型： `Boolean` または `undefined`
- デフォルト： `undefined`
- 利用可能なバージョン： v2.10 以降

このオプションを true に設定した場合、末尾のスラッシュがすべてのルートに追加されます。もし false に設定した場合はそれらは削除されます。

**注意**： このオプションは準備なしに設定しないでください。徹底的にテストする必要があります。`router.trailingSlash` に `undefined` 以外の値を設定すると反対のルートは機能しなくなります。したがって、301 リダイレクトが適切に行われ、*内部リンク*が適切に適応される必要があります。`trailingSlash` を `true` に設定する場合、`example.com/abc/` のみが機能し `example.com/abc` は機能しません。false に設定する場合はその逆になります。
