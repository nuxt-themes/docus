---
title: プラグイン
description: Nuxt.js では JavaScript プラグインを定義することができ、それはルートの Vue.js アプリケーションがインスタンス化される前に実行されます。この機能は、自前のライブラリや外部のモジュールを使用する際にとりわけ有用です。
category: getting-started
position: 108
---

> Nuxt.js では JavaScript プラグインを定義することができ、それはルートの Vue.js アプリケーションがインスタンス化される前に実行されます。この機能は、自前のライブラリや外部のモジュールを使用する際にとりわけ有用です。

<div class="Alert">

Vue インスタンスの [ライフサイクル](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) において、`beforeCreate` と `created` フックのみが **クライアントサイドとサーバーサイドの両方** で呼び出されることに注意してください。それ以外のすべてのフックはクライアントサイドでのみ呼び出されます。

</div>

## 外部パッケージ

アプリケーションにおいて、サーバーとクライアントの双方で HTTP リクエストを送るために、外部パッケージ/モジュールを使いたいときがあるでしょう（[axios](https://github.com/mzabriskie/axios) が素晴らしい例です）。

まず最初に、npm でパッケージをインストールします:

```bash
npm install --save axios
```

そうすると次のようにページコンポーネント内で直接それを使うことができます:

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  import axios from 'axios'

  export default {
    async asyncData({ params }) {
      let { data } = await axios.get(`https://my-api/posts/${params.id}`)
      return { title: data.title }
    }
  }
</script>
```

## Vue プラグイン

アプリケーション内で通知を表示する [vue-notifications](https://github.com/se-panfilov/vue-notifications) のような Vue プラグインを使用したい場合には、アプリケーションを起動する前にプラグインをセットアップする必要があります。

`plugins/vue-notifications.js` ファイルを作成します:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

それから `nuxt.config.js` の `plugins` キー内にファイルパスを追加します:

```js
export default {
  plugins: ['~/plugins/vue-notifications']
}
```

`plugins` 設定キーについてより深く理解するには [plugins api](/api/configuration-plugins) を参照してください。

### ES6 プラグイン

プラグインが `node_modules` にあり、ES6 モジュールをエクスポートしている場合、それを `transpile` ビルドオプションに追加する必要があるかもしれません:

```js
module.exports = {
  build: {
    transpile: ['vue-notifications']
  }
}
```

その他のビルドオプションについては [configuration build](/api/configuration-build/#transpile) のドキュメントを参照することができます。

## アプリケーションのルートや context に注入する

関数や値をアプリケーション全体で利用できるようにしたい場合もあるでしょう。そのような変数を Vue インスタンス（クライアントサイド）やコンテキスト（サーバーサイド）、さらに Vuex ストアへ注入することが可能です。それらの関数の前には `$` を付けるのが一般的です。

### Vue インスタンスに注入する

Vue インスタンスへのコンテキストの注入は、通常の Vue アプリケーションと同様に動作します。

`plugins/vue-inject.js`:

```js
import Vue from 'vue'

Vue.prototype.$myInjectedFunction = string =>
  console.log('This is an example', string)
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/vue-inject.js']
}
```

これで全ての Vue コンポーネントで関数を使用することができます。

`example-component.vue`:

```js
export default {
  mounted() {
    this.$myInjectedFunction('test')
  }
}
```

### コンテキストに注入する

Vue インスタンスへのコンテキストの注入は、通常の Vue アプリケーションと同様に動作します。

`plugins/ctx-inject.js`:

```js
export default ({ app }, inject) => {
  // context.app オブジェクトへ関数を直接セットします
  app.myInjectedFunction = string =>
    console.log('Okay, another function', string)
}
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/ctx-inject.js']
}
```

`context` へアクセス可能なときには、いつでも関数を使用することができます（例えば、`asyncData` や `fetch` 関数内などです）。

`ctx-example-component.vue`:

```js
export default {
  asyncData(context) {
    context.app.myInjectedFunction('ctx!')
  }
}
```

### 統合された注入

`context` 内や Vue インスタンスだけでなく Vuex ストア内でも関数が必要な場合 `inject` 関数を使用することができます。この関数は、プラグインとして公開する関数の第 2 引数です。

Vue インスタンスへのコンテンツの注入は、通常の Vue アプリケーションと同様に動作します。関数の先頭へ自動的に `$` が追加されます。

`plugins/combined-inject.js`:

```js
export default ({ app }, inject) => {
  inject('myInjectedFunction', string => console.log('That was easy!', string))
}
```

`nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/combined-inject.js']
}
```

これで `context` 、Vue インスタンス内での `this` 、及びストアの `actions` / `mutations` 内での `this` を通して、関数を使用することができます。

`ctx-example-component.vue`:

```js
export default {
  mounted() {
    this.$myInjectedFunction('works in mounted')
  },
  asyncData(context) {
    context.app.$myInjectedFunction('works with context')
  }
}
```

`store/index.js`:

```js
export const state = () => ({
  someValue: ''
})

export const mutations = {
  changeSomeValue(state, newValue) {
    this.$myInjectedFunction('accessible in mutations')
    state.someValue = newValue
  }
}

export const actions = {
  setSomeValueToWhatever({ commit }) {
    this.$myInjectedFunction('accessible in actions')
    const newValue = 'whatever'
    commit('changeSomeValue', newValue)
  }
}
```

<div class="Alert">

Vue プラグインは、 export 関数の中で使用できないことに注意してください。それぞれのリクエストの前に export 関数を呼び出す、つまり、`Vue.use(...)`, `Vue.mixin(...)`, `Vue.component(...)`などを多数呼び出すことは、アプリのクラッシュを引き起こす可能性があります。

</div>

## クライアントサイド限定のプラグイン利用

いくつかのプラグインは、SSR をサポートしていないために **ブラウザでのみ** 動作するかもしれません。そのような場合は、クライアントサイドのみでプラグインを使用するために、`plugins` 内の `mode`: `client` オプションを使用することができます。

例:

`nuxt.config.js`:

```js
export default {
  plugins: [{ src: '~/plugins/vue-notifications', mode: 'client' }]
}
```

`plugins/vue-notifications.js`:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

*サーバーサイド*でのみライブラリを読み込む必要がある場合は、`process.server`変数に `true` がセットされているかでチェックできます。

また、もしあなたが生成されたアプリケーション（`nuxt generate` コマンドによって）の中にいるかどうか知る必要がある場合は、`process.static` 変数に `true` がセットされているかでチェックできます。これは、アプリケーションの生成中および生成後の場合のみです。

保存前に `nuxt generate` コマンドによって、ページがサーバレンダリングされている時の状態を知るには、2 つのオプションを組み合わせて使うことができます (`process.static && process.server`) 。

**情報**: Nuxt.js 2.4 以降、プラグインタイプを指定するための `plugins` のオプションとして `mode` が導入されました。指定可能な値は `client` または `server` です。 `ssr：false` は `mode: 'client'` に適応され、次のメジャーリリースでは非推奨になります。

例:

`nuxt.config.js`:

```js
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

### プラグイン名の規約

プラグインがクライアント側またはサーバー側でのみ実行されると想定される場合、 `.client.js` または `.server.js` をプラグインファイルの拡張として適用することができ、ファイルは自動的に対応する側に含まれます。

例:

`nuxt.config.js`:

```js
export default {
  plugins: [
    '~/plugins/foo.client.js', // クライアントサイド限定
    '~/plugins/bar.server.js', // サーバーサイド限定
    '~/plugins/baz.js' // クライアントサイドとサーバーサイド両方
  ]
}
```
