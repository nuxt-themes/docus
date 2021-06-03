---
title: plugins
description: '`plugins` ディレクトリには、ルート Vue.js アプリケーションをインスタンス化する前に実行する Javascript プラグインが含まれています。'
position: 11
category: directory-structure
csb_link_plugins_client: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_client?fontsize=14&hidenavigation=1&theme=dark
csb_link_plugins_external: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_external?fontsize=14&hidenavigation=1&theme=dark
csb_link_plugins_custom: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_custom_plugin?fontsize=14&hidenavigation=1&theme=dark
csb_link_plugins_vue: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/12_plugins_vue?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/plugins.svg
imgAlt: modules-servermiddleware-plugins-in-nuxt-js
questions:
  - question: '`plugins` ディレクトリには、実行する Javascript プラグインが含まれています'
    answers:
      - ルート Vue.js アプリケーションをインスタンス化する前
      - ルート Vue.js アプリケーションのインスタンス化中
      - ルート Vue.js アプリケーションをインスタンス化した後
    correctAnswer: ルート Vue.js アプリケーションをインスタンス化する前
  - question: beforeCreate および created の Vue.js フックが呼び出される
    answers:
      - クライアントサイドからのみ
      - サーバーサイドからのみ
      - クライアントサイドとサーバーサイドの両方から
    correctAnswer: クライアントサイドとサーバーサイドの両方から
  - question: Vue.use() を使用するたびに、どのディレクトリにファイルを作成する必要がありますか？
    answers:
      - vue
      - plugins
      - vuePlugins
    correctAnswer: plugins
  - question: プラグインをどこに追加して、メインアプリケーションにインポートしますか？
    answers:
      - レイアウトページに
      - nuxt.config.js ファイル内に
      - あなたがする必要はなく、それは自動的にインポートされる
    correctAnswer: nuxt.config.js ファイル内に
  - question: 一部のプラグインはブラウザでのみ機能する可能性がありますか？
    answers:
      - 正
      - 偽
    correctAnswer: 正
  - question: プラグインをサーバー上のみで実行する場合、どの拡張機能を適用できますか？
    answers:
      - .serverside.js
      - .ssr.js
      - .server.js
    correctAnswer: .server.js
  - question: プラグインに使用できる2つのモードは何ですか？
    answers:
      - サーバーとクライアント
      - ssrとクライアント
      - サーバーサイドとクライアントサイド
    correctAnswer: サーバーとクライアント
  - question: アプリ全体で関数や値を利用できるようにするために何をしますか？
    answers:
      - プラグインを作成する
      - インジェクトメソッドを使用する
      - モジュールを作成する
    correctAnswer: インジェクトメソッドを使用する
  - question: 慣例として、注入関数の前に何を付ける必要がありますか？
    answers:
      - $
      - _
      - ':'
    correctAnswer: $
  - question: プラグインの順序を変更するには、どのプロパティを使用しますか？
    answers:
      - orderPlugins
      - extendPlugins
      - plugins
    correctAnswer: extendPlugins
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

`plugins` ディレクトリにはルート Vue.js アプリケーションがインスタンス化する前に実行する Javascript プラグインが含まれています。これは Vue プラグインを追加し、関数や定数を導入する場所です。`Vue.use()` を使用する必要がある時は都度 `plugins/` ファイルを作成し、`nuxt.config.js` の `plugins` にそのパスを追加する必要があります。

## 外部パッケージ

サーバーとクライアント両方に HTTP リクエストを行うためには、アプリケーションで外部パッケージ/モジュール（著名な例は [axios](https://axios.nuxtjs.org/) です）を使用することをお勧めします。

はじめに、npm か Yarn を介してインストールします。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxtjs/axios
```

  </code-block>
  <code-block label="npm">

```bash
npm install @nuxtjs/axios
```

  </code-block>
</code-group>

例えば、アプリケーション全体の API 呼び出しから発生する可能性のあるエラーに対応するよう、axios インターセプターを設定できます。この例では、API から 500 ステータスエラーが発生した時、sorry というカスタムエラーページにユーザをリダイレクトします。

```js{}[plugins/axios.js]
export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if (error.response.status === 500) {
      redirect('/sorry')
    }
  })
}
```

最後になりますが、モジュールと新しく作成したプラグインをプロジェクト構成に追加します。

```js{}[nuxt.config.js]
module.exports = {
  modules: ['@nuxtjs/axios'],
  plugins: ['~/plugins/axios.js']
}
```

そのあとページコンポーネントで直接使用できます:

```js{}[pages/index.vue]
<template>
  <h1>{{ post.title }}</h1>
</template>

<script>
export default {
	async asyncData ({ $axios, params }) {
	  const  post  = await $axios.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
	  return { post }
	}
}
</script>
```

Another way to use `axios` without installing the module is by importing `axios` direct in the `<script>` tag.

```js{}[pages/index.vue]
<script>
import axios from 'axios'

export default {
	async asyncData ({ params }) {
	  const { data: post }  = await axios.get(`https://api.nuxtjs.dev/posts/${params.id}`)
	  return { post }
	}
}
</script>
```

<base-alert type="info">

_モジュールの外部でインポートステートメントを使用できない_ というエラーが発生した場合、プラグインを使用できるようにするために、webpack ローダーの `nuxt.config.js` の `build` > `transpile` オプションにパッケージを追加する必要があります。

</base-alert>

```js{}[nuxt.config.js]
build: {
  // ここでwebpack設定を拡張できます
  transpile: ['npm-package-name'],
},
```

## Vue Plugins

[v-tooltip](https://akryum.github.io/v-tooltip) などの Vue プラグインを使用してアプリケーションにツールチップを表示する場合、アプリを起動する前にプラグインを設定する必要があります。

はじめにインストールをする必要があります

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add v-tooltip
```

  </code-block>
  <code-block label="npm">

```bash
npm install v-tooltip
```

  </code-block>
</code-group>

次にファイル `plugins/vue-tooltip.js` を作成します

```js{}[plugins/vue-tooltip.js]
import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
```

### plugins プロパティ

次に `nuxt.config.js` の `plugins` キー内にファイルパスを追加します。plugins プロパティを使用すると、簡単に Vue.js プラグインをメインアプリケーションに追加できます。`plugins` プロパティで定義されているすべてのパスは、メインアプリケーションを初期化する前にインポートされます。

```js{}[nuxt.config.js]
export default {
  plugins: ['~/plugins/vue-tooltip.js']
}
```

### ES6 Plugins

プラグインが `node_modules` にあり、ES6 モジュールをエクスポートする場合、`transpile` ビルドオプションに追加する必要がある場合があります:

```js{}[nuxt.config.js]
module.exports = {
  build: {
    transpile: ['vue-tooltip']
  }
}
```

その他のビルドオプションについては、[configuration build](https://ja.nuxtjs.org/docs/2.x/configuration-glossary/configuration-build#transpile)のドキュメントを参照してください。

## クライアント、またはサーバーサイドのみ

一部のプラグインは SSR がサポートされていないため、ブラウザのみで機能する場合があります。

### 従来のプラグインに名前を付ける

プラグインがクライアント、もしくはサーバーサイドのみで実行されると想定される場合、`.client.js` または `.server.js` は、プラグインファイルの拡張子として適用できます。ファイルはそれぞれの（クライアントまたはサーバー）サイドのみに自動的に含まれます。

```js{}[nuxt.config.js]
export default {
  plugins: [
    '~/plugins/foo.client.js', // クライアントサイドのみ
    '~/plugins/bar.server.js', // サーバーサイドのみ
    '~/plugins/baz.js' // クライアントとサーバー両方
  ]
}
```

### オブジェクト構文

`plugins` の `mode` プロパティ（`'client'` または `'server'`）でオブジェクト構文を使用することもできます。

```js{}[nuxt.config.js]
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' }, // クライアントサイドのみ
    { src: '~/plugins/server-only.js', mode: 'server' } // サーバーサイドのみ
  ]
}
```

## `$root` とコンテキストの挿入

これらの変数を Vue インスタンス（クライアントサイド）、コンテキスト（サーバーサイド）、さらには Vuex ストアに挿入できます。これらの関数の前に `$` を付けるのが慣例です。

Nuxt.js はこれを簡単に行うための `inject（key、value）` メソッドを提供します。関数をエクスポートするとき、2 番目のパラメーターとして Inject が指定されます。`$` は、キーの先頭に自動的に追加されます。

<base-alert type="info">

Vue[インスタンスのライフサイクル](https://jp.vuejs.org/v2/guide/instance.html)では、`beforeCreate` フックと `created`  フックのみがクライアント、サーバーサイド両方から呼び出されることを把握しておくことが重要です。他のすべてのフックはクライアントサイドからのみ呼び出されます。

</base-alert>

```js{}[plugins/hello.js]
export default ({ app }, inject) => {
  // Vue、コンテキスト、ストアに$hello(msg）を挿入します。
  inject('hello', msg => console.log(`Hello ${msg}!`))
}
```

```js{}[nuxt.config.js]
export default {
  plugins: ['~/plugins/hello.js']
}
```

`$hello` サービスは、ページ、コンポーネント、プラグイン、ストアアクションの `context` と `this` にアクセスできるようになりました。

```js{}[example-component.vue]
export default {
  mounted() {
    this.$hello('mounted')
    // console.log 'Hello mounted!'
  },
  asyncData({ app, $hello }) {
    $hello('asyncData')
    // Nuxt <= 2.12 を使用する場合は 👇
    app.$hello('asyncData')
  }
}
```

```js{}[store/index.js]
export const state = () => ({
  someValue: ''
})

export const actions = {
  setSomeValueToWhatever({ commit }) {
    this.$hello('store action')
    const newValue = 'whatever'
    commit('changeSomeValue', newValue)
  }
}
```

<base-alert>

`Vue.use()`、`Vue.component()` を使用しないでください、またグローバルに、Nuxt インジェクション専用のこの関数**内**に Vue を接続しないでください。サーバーサイドでメモリリークが発生します。

</base-alert>

## extendsPlugins プロパティ

プラグインを拡張したり、Nuxt.js によって作成されたプラグインの順序を変更したりすることができます。この関数は [plugin](https://ja.nuxtjs.org/docs/2.x/configuration-glossary/configuration-plugins) オブジェクトの配列を受け入れ、プラグインオブジェクトの配列を返す必要があります。

プラグインの順序を変更する例:

```js{}[nuxt.config.js]
export default {
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex(
      ({ src }) => src === '~/plugins/shouldBeFirst.js'
    )
    const shouldBeFirstPlugin = plugins[pluginIndex]

    plugins.splice(pluginIndex, 1)
    plugins.unshift(shouldBeFirstPlugin)

    return plugins
  }
}
```

## グローバルミックスイン

グローバルミックスインは Nuxt プラグインで簡単に追加できますが、正しく処理しないとトラブルやメモリリークが発生する可能性があります。アプリケーションにグローバルミックスインを追加するときは、常にフラグを使用して複数回登録しないようにする必要があります:


```js{}[plugins/my-mixin-plugin.js]
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({ ... }) // ミックスインを設定する
}
```

<quiz :questions="questions"></quiz>
