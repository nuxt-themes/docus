---
title: 'generate プロパティ'
description: 'ユニバーサルなウェブアプリケーションや静的なウェブアプリケーションの生成について設定します。'
menu: generate
category: configuration-glossary
position: 10
---

- 型: `Object`

> ユニバーサルなウェブアプリケーションや静的なウェブアプリケーションの生成について設定します。

`nuxt.generate()` を呼び出した際、Nuxt.js は `generate` プロパティで定義された設定を使います。

```js{}[nuxt.config.js]
export default {
  generate: {
    ...
  }
}
```

## cache

> v2.14.0 で導入されました

- 型: `Object` または `false`

このオプションは追跡したファイルが変更されていない場合にリビルドを避けるために`nuxt generate` の[静的ホスティング](/docs/2.x/features/deployment-targets#静的ホスティング)で使われます。

デフォルト:

```js
{
  ignore: [
    '.nuxt', // buildDir
    'static', // dir.static
    'dist', // generate.dir
    'node_modules',
    '.**/*',
    '.*',
    'README.md'
  ]
}
```

設定ファイル変更時にリビルドを避けたい場合は、`cache.ignore` オプションに対象となる設定ファイルのリストを追加してください:

```js{}[nuxt.config.js]
export default {
  generate: {
    cache: {
      ignore: ['renovate.json'] // このファイルに適用された変更を無視する
    }
  }
}
```

## concurrency

- 型: `Number`
- デフォルト: `500`

ルート生成は並行で行われ、`generate.concurrency` は 1 スレッドで実行されるルートの数を指定します。

## crawler

- 型: `boolean`
- デフォルト: true

Nuxt v2.13 以降、Nuxt.js には相対リンクをクロールし、クロールしたリンクに基づいて動的リンクを生成するクローラーがインストールされています。この機能を無効にしたい場合は `false` に設定してください。

```js
export default {
  generate: {
    crawler: false
  }
}
```

## dir

- 型: `String`
- デフォルト: `'dist'`

`nuxt generate` コマンドを使ってウェブアプリケーションがビルドされる時に作成されるディレクトリ名です。

## devtools

- 型: `boolean`
- デフォルト: `false`

[vue-devtools](https://github.com/vuejs/vue-devtools) による検査を許可するかどうかを設定します。

もしすでに nuxt.config.js か何かで有効にしている場合はこのフラグに関係なく devtools が有効になります。

## exclude

- 型: `Array`
  - 要素: `String` または `RegExp`

配列の文字列か正規表現を指定することができ、一致するルートの生成を防ぎます。`generate.fallback` が使われている場合はルートは引き続きアクセスすることができます。

この構造の例を用いると:

```bash
-| pages/
---| index.vue
---| admin/
-----| about.vue
-----| index.vue
```

デフォルトでは `nuxt generate` を実行するとそれぞれのルートに対してファイルが生成されます。

```bash
-| dist/
---| index.html
---| admin/
-----| about.html
-----| item.html
```

「ignore」で全てのルートに一致する正規表現を追加した場合はこれらのルート生成が防止されます。

```js{}[nuxt.config.js]
export default {
  generate: {
    exclude: [
      /^\/admin/ // /admin で始まるパス
    ]
  }
}
```

```bash
-| dist/
---| index.html
```

文字列で特定のルートを除外することもできます:

```js{}[nuxt.config.js]
export default {
  generate: {
    exclude: ['/my-secret-page']
  }
}
```

## fallback

- 型: `String` または `Boolean`
- デフォルト: `200.html`

```js{}[nuxt.config.js]
export default {
  generate: {
    fallback: '404.html'
  }
}
```

フォールバックする HTML ファイルのパスです。エラーページとして設定する必要があります。この設定により、不明なルートも Nuxt を介してレンダリングされます。未設定またはファルシーな値が設定されている場合、フォールバック HTML ファイルの名前は `200.html` になります。もし、`true` を設定すると、ファイル名は `404.html` になります。値として文字列を指定すると、その文字列が代わりに使用されます。

```{}[nuxt.config.js]
fallback: false;
```

静的に生成されたページを運用する場合、エラーページと [excludes](/docs/2.x/configuration-glossary/configuration-generate#exclude) でカバーされるページに `404.html` を使うことをおすすめします（静的ページとして生成してほしくない場合）。

```js{}[nuxt.config.js]
fallback: true
```

しかし、Nuxt では任意のページを設定できるため、`200.html` または `404.html` を使用したくない場合は代わりに文字列を追加して、そのページにリダイレクトができます。これはもちろん必須ではなく、`200.html`/`404.html` にリダイレクトするのがベストです。

```js{}[nuxt.config.js]
fallback: 'fallbackPage.html'
```

_注意: 複数のサービス（例えば Netlify）では、`404.html` を自動的に検出します。ウェブサーバーを独自に設定する場合は、ドキュメントを参照してエラーページの設定方法を確認してください（そして、エラーページを `404.html` ファイルに設定してください）_

## interval

- 型: `Number`
- デフォルト: `0`

2 つのレンダーの間でのミリセカンドのインターバルで、ウェブアプリケーションからの潜在的な API に対して溢れでないようにするためのものです。

## minify

- **非推奨です！**
- 代わりに [build.html.minify](/docs/2.x/configuration-glossary/configuration-build#htmlminify) を使ってください

## routes

- 型: `Array`

<base-alert type="info">

Nuxt v2.13 から `nuxt generate` を実行すると、リンクタグをクロールしてルートを生成するクローラがインストールされています。

リンクされていないページ（シークレットページなど）も生成したい場合は `generate.routes` プロパティを使うことができます。

</base-alert>

<base-alert>

`Nuxt v2.12` 以下で `generate` コマンドを使うと、動的ルートは無視されます。

</base-alert>

Example:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

ルート `/` のみが Nuxt.js によって生成されます。

Nuxt.js で動的なパラメータをもつルートを生成したい場合は `generate.routes` プロパティに動的なルートの配列を設定する必要があります。

`/users/:id` のルートを追加します:

```js{}[nuxt.config.js]
export default {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

そして `nuxt generate` を実行した場合:

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

すばらしいですが、**動的なパラメータ**がある場合はどうでしょうか？

1. `Promise` を返す `Function` を使う。
2. `callback(err, params)` と一緒に `Function` を使う。

### Promise を返す関数

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return '/users/' + user.id
        })
      })
    }
  }
}
```

### callback 関数

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes(callback) {
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => {
            return '/users/' + user.id
          })
          callback(null, routes)
        })
        .catch(callback)
    }
  }
}
```

### `payload` による動的ルーティング生成の高速化

上記の例では、サーバーから `user.id` を使ってルーティングを生成しますが、残りのデータは破棄しています。通常はそのような場合は `/users/_id.vue` 内から再度データを取得する必要があります。再度取得することは可能ですが、その場合は `generate.interval` に `100` のような値を設定してサーバー呼び出しが殺到しないようにする必要があります。このような実装は生成時間の増加へとつながるため、`user` オブジェクト自体を `_id.vue` コンテキストに渡すことが好ましいです。上記のコードを以下のように変更することで実現できます:

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return {
            route: '/users/' + user.id,
            payload: user
          }
        })
      })
    }
  }
}
```

これで `/users/_id.vue` から `payload` へアクセスできます:

```js
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```

## subFolders

- 型: `Boolean`
- デフォルト: `true`

デフォルトでは `nuxt generate` を実行すると、Nuxt.js はルートごとにディレクトリを作成し `index.html` ファイルを提供します。

例:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

false を設定した場合、HTML ファイルはルートパスに従って生成されます:

```js{}[nuxt.config.js]
export default {
  generate: {
    subFolders: false
  }
}
```

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```
