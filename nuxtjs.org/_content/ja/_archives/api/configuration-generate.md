---
title: 'API: generate プロパティ'
description: ユニバーサルなウェブアプリケーションから静的なウェブアプリケーションの生成について設定します。
menu: generate
category: configuration
position: 110
---

- 型: `Object`

> ユニバーサルなウェブアプリケーションから静的なウェブアプリケーションの生成について設定します。

`nuxt generate` コマンドを実行するか `nuxt.generate()` を呼び出したとき、Nuxt.js は `generate` プロパティで定義された設定を使います。

`nuxt.config.js`

```js
export default {
  generate: {
    ...
  }
}
```

## concurrency

- 型: `Number`
- デフォルト: `500`

`generate.concurrency` では、単一のスレッドで同時に生成されるルーティングの生成の数を設定します。

## dir

- 型: `String`
- デフォルト: `'dist'`

`nuxt generate` か、 SPA モードでの `nuxt build` によって、ウェブアプリケーションがビルドされる時に作成されるディレクトリ名です。

## devtools

- 型: `Boolean`
- デフォルト: `false`

[vue-devtools](https://github.com/vuejs/vue-devtools) よる検査を許可するかどうかを設定します。

もし既に `nuxt.config.js` か何かで有効にしている場合は、このフラグに関係なく `devtools` が有効になります。

## exclude

- 型: `Array`

配列の正規表現を指定することができ、指定した正規表現に一致するルートの生成を防ぎます。`generate.fallback` が使用されている場合、ルートは引き続きアクセスすることができます。

デフォルトでは、`nuxt generate` を実行するとそれぞれのルートに対してファイルが作成されます。

```bash
-| dist/
---| index.html
---| ignore/
-----| about.html
-----| item.html
```

「ignore」をもつすべてのルートに一致する正規表現を追加すると、これらのルートの生成が防止されます。

nuxt.config.js

```js
export default {
  generate: {
    exclude: [/^(?=.*\bignore\b).*$/]
  }
}
```

```bash
-| dist/
---| index.html
```

## fallback

- 型: `String` または `Boolean`
- デフォルト: `200.html`

```js
export default {
  generate: {
    fallback: true
  }
}
```

フォールバックする HTML ファイルのパス。エラーページとして設定する必要があります。この設定により、不明なルートも Nuxt を介してレンダリングされます。未設定またはファルシーな値が設定されている場合、フォールバック HTML ファイルの名前は `200.html` になります。もし、`true` を設定すると、ファイル名は `404.html` になります。値として文字列を指定すると、その文字列が代わりに使用されます。

SPA を実行するときは、他のルートが生成されず必要となる唯一のファイルになるので、`200.html` を使用するのがより慣用的です。

```js
fallback: false
```

静的に生成されたページを運用する場合、エラーページと [excludes](/api/configuration-generate#exclude) でカバーされているページに `404.html` を使用することをおすすめします（静的ページとして生成してほしくない場合）。

```js
fallback: true
```

ただし、Nuxt では任意のページを設定できるため、`200.html` または `404.html` を使用したくない場合は代わりに文字列を追加して、そのページにリダイレクトするようにすることができます。これはもちろん必須ではなく、`200.html`/`404.html` にリダイレクトするのがベストです。

```js
fallback: 'fallbackPage.html'
```

_情報：複数のサービス（例えば Netlify）では、`404.html` を自動的に検出します。ウェブサーバーを独自に設定する場合は、ドキュメントを参照してエラーページの設定方法を確認してください（そして、エラーページを `404.html` ファイルに設定してください）。_

## interval

- 型: `Number`
- デフォルト: `0`

2 つのレンダーの間でのインターバルで、ウェブアプリケーションからの潜在的な API に対して溢れでないようにするためのものです。

## minify

- **非推奨です！**
- 代わりに [build.html.minify](/api/configuration-build#html-minify) オプションを利用してください

## routes

- 型: `Array`

`generate` コマンド（yarn generate）では [動的なルーティング](/guide/routing#動的なルーティング) は無視されます。Nuxt はこれらのルートが何であるのか知らないので、生成することができません。

例:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

ルート `/` のみが Nuxt.js によって生成されます。

動的なパラメーターを用いたルートを生成させたい場合は、動的なルーティングの配列をセットする必要があります。

`nuxt.config.js` 内に `/users/:id` のルーティングを追加します:

```js
export default {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

そして `nuxt generate` を実行します:

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

いいですね。しかし、もし **動的なパラメータ** が必要な場合はどうでしょう？

1. `Promise` を返す `関数` を使う
2. `コールバック` と一緒に `関数` を使う

### Promise を返す関数を使う

`nuxt.config.js`

```js
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

### コールバックと一緒に関数を使う

`nuxt.config.js`

```js
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

上記の例では、サーバーから `user.id` を利用してルーティングを生成しますが、必要なデータ以外を破棄しています。通常、そのような場合は `/users/_id.vue` の内部から再度データを取得する必要があります。再度取得することは可能ですが、そうした場合は `generate.interval` オプションに `100` などの値を設定して、サーバーへとコールが溢れないようにする必要があります。このような実装は生成時間の増加へとつながるため、 `user` オブジェクト自体を、 `_id.vue` のコンテキストに渡すことが望ましいでしょう。上記のコードを、以下のように変更することで、実現することができます :

`nuxt.config.js`

```js
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

このように、 `/users/_id.vue` から `payload` へとアクセスすることが可能です :

```js
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```

## subFolders

- 型: `Boolean`
- デフォルト: `true`

デフォルトでは、 `nuxt generate` を実行すると、全てのルーティングに合わせたディレクトリと、 `index.html` が提供されます。

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

false を設定した場合、ルーティングパスに従う形で HTML ファイルを生成します:

`nuxt.config.js`

```js
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
