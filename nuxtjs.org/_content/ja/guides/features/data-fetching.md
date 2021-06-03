---
title: データの取得
description: Nuxt.js は API からデータを取得する2つの方法を提供しています。fetch メソッドもしくは asyncData メソッドを使うことができます。
position: 4
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/04_data_fetching?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: どこで Nuxt.js の fetch フックが使えますか？
    answers:
      - ページとコンポーネント
      - ページでのみ
      - コンポーネントでのみ
    correctAnswer: ページとコンポーネント
  - question: 'Nuxt.js fetch フックを使うと `this` にアクセスできますか？'
    answers:
      - できます
      - できません
    correctAnswer: できます
  - question: Nuxt.js の fetch フックはいつ呼ばれますか？
    answers:
      - コンポーネントがインスタンス化された後
      - コンポーネントがインスタンス化される前
      - コンポーネントがインスタンス化される間
    correctAnswer: コンポーネントがインスタンス化された後
  - question: '`fetch` が*クライアントサイド*で呼び出されているときにプレースホルダを表示できるのはどれですか？'
    answers:
      - $fetchState.timestamp
      - $fetchState.error
      - $fetchState.pending
    correctAnswer: $fetchState.pending
  - question: 既にアクセスしたページの fetch の呼び出しをどのように保存しますか？
    answers:
      - keep-alive
      - save-fetch
      - cache-fetch
    correctAnswer: keep-alive
  - question: アクティブ化されたフックで、fetchする 30 秒のキャッシュを追加するためにどのプロパティを使いますか？
    answers:
      - $fetchState.pending
      - $fetchState.timestamp
      - $fetchState.cache
    correctAnswer: $fetchState.timestamp
  - question: '`asyncData` はいつ呼ばれますか？'
    answers:
      - ページコンポーネントをロードした後
      - ページコンポーネントをロード中
      - ページコンポーネントをロードする前
    correctAnswer: ページコンポーネントをロードする前
  - question: 'asyncData 内の `this` にアクセスできますか？'
    answers:
      - アクセスできます
      - アクセスできません
    correctAnswer: アクセスできません
  - question: 'asyncDataを使用すると `context` パラメータを使って動的ルートデータにアクセスできますか？'
    answers:
      - できます
      - できません
    correctAnswer: できません
  - question: asyncData のエラーステータスコードにアクセスできますか？
    answers:
      - できます
      - できません
    correctAnswer: できます
---

Nuxt.js はコンポーネントの `mounted()` フックでデータを取得するような、クライアントサイドアプリケーションにおける従来の Vue のデータの取得パターンをサポートしています。しかしユニバーサルアプリケーションでは、サーバーサイドレンダリング中にデータをレンダリングするために Nuxt.js 特有のフックを使う必要があります。これによりすべての必要なデータと一緒にページをレンダリングすることができます。

Nuxt は非同期なデータを読み込むために 2 つのフックを提供しています：

- `fetch` フック（Nuxt 2.12 以降）。 どのコンポーネントにでも配置することができ、（クライアントサイドレンダリング中の）読み込み状態やエラーをレンダリングするショートカットを提供します。
- `asyncData` フック。 _ページ_ コンポーネントにのみ配置することができます。 `fetch` と異なり、クライアントサイドレンダリング中にローディングプレースホルダーを示しません： そのかわり、ルートナビゲーションが解決されるまでそれをブロックし、失敗するとエラーページを表示します。

<base-alert>

Nuxt 2.12 未満においては、`fetch` フックは今日の `asyncData` と非常によく似た働きをします。この機能は後方互換性のためまだサポートされています: もし `fetch()` が `context` オブジェクトを受け取っているなら、それは「レガシー」な fetch フックだと考えられます。この機能は非推奨なので、`asyncData(context)` や `middleware(context)` を使用した[無名ミドルウェア](/docs/2.x/directory-structure/middleware#無名ミドルウェア) に置き換えてください。

</base-alert>

これらのフックは、選択した _あらゆるデータ取得ライブラリ_ で使用することができます。HTTP API へリクエストを送るために [@nuxt/http](https://http.nuxtjs.org/) や [@nuxt/axios](https://axios.nuxtjs.org/) を使用することをおすすめします。認証ヘッダーの設定のような、これらのライブラリのより詳しい情報はそれぞれのドキュメントで見つけることができるでしょう。

<base-alert type="info">
  
ミックスイン内で `fetch` または `asyncData` を定義し、それをコンポーネントやページでも定義するとミックスイン関数は呼び出されるかわりに上書きされます。

</base-alert>

## fetch フック

<base-alert type="info">

このフックは Nuxt 2.12 以降でのみ使用することができます。

</base-alert>

`fetch` はサーバーサイドレンダリングではコンポーネントのインスタンスが作成されたとき、クライアントサイドでは遷移するときに呼び出されるフックです。fetch フックは解決される promise を（明示的に、または `async/await` を使って暗黙的に）返却するべきです：

- 初期ページがレンダリングされる前のサーバー
- コンポーネントがマウントされた後のクライアント

以下のプロパティを持つ `$fetchState` をコンポーネントレベルで公開します：

- `pending` は `fetch` が _クライアントサイド_ で呼び出されたときにプレースホルダーを表示するかを表す `Boolean` です。
- `error` は `null` もしくは fetch フックからスローされた `Error` です。
- `timestamp` は最後に fetch したタイムスタンプです。[`keep-alive` でのキャッシング](#キャッシング) に便利です。

Nuxt が呼び出す fetch に加え、`this.$fetch()` を使うことでコンポーネント内から手動で fetch を呼び出すことができます。

```html{}[components/NuxtMountains.vue]
<template>
  <p v-if="$fetchState.pending">Fetching mountains...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div v-else>
    <h1>Nuxt Mountains</h1>
    <ul>
      <li v-for="mountain of mountains">{{ mountain.title }}</li>
    </ul>
    <button @click="$fetch">Refresh</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>
```

<base-alert type="info">

fetch フック内では `this.$nuxt.context` を使うことで、Nuxt [context](/docs/2.x/concepts/context-helpers) にアクセスできます。

</base-alert>

### オプション

`fetchOnServer`: `Boolean` または `Function`（デフォルト: `true`）。サーバーがページをレンダリングする際に `fetch()` を呼び出します。

`fetchDelay`: `Integer`（デフォルト: `200`）。最小実行時間をミリ秒単位で設定します（過剰実行を防ぐため）。

`fetchOnServer` が falsy（`false` または `false` を返す）な場合、`fetch` はクライアントサイドでのみ呼び出され、サーバーでコンポーネントをレンダリングする場合は、`$fetchState.pending` は `true` を返します。

```js
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
  },
  // クライアントサイドでのみ fetch を呼び出します
  fetchOnServer: false
}
```

### クエリ文字列の変化のリスニング

デフォルトでは、クエリ文字列の変化で `fetch` フックは呼び出されません。クエリ文字列の変化を監視するには、ウォッチャに `$route.query` を追加して `$fetch` を呼び出します：

```js
export default {
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    // クエリ文字列の変化時にも呼び出される
  }
}
```

### キャッシング

`<nuxt/>` や `<nuxt-child/>` コンポーネントで `keep-alive` ディレクティブを使うと、すでに訪れたページの `fetch` 呼び出しを保存することができます：

```html{}[layouts/default.vue]
<template>
  <nuxt keep-alive />
</template>
```

また、`<nuxt>` コンポーネントへ `keep-alive-props` prop を渡すことで、`<keep-alive>` に渡す [props](https://jp.vuejs.org/v2/api/index.html#keep-alive) を指定することもできます。

```html{}[layouts/default.vue]
<nuxt keep-alive :keep-alive-props="{ max: 10 }" />
```

ページコンポーネントを 10 ページ分だけメモリに保存します。

### `activated` フックを使う

最後に `fetch` を呼び出したときのタイムスタンプを `this.$fetchState.timestamp` から取得することができます（SSR も含む）。このプロパティを `activated` フックと組み合わせることで、`fetch` に 30 秒のキャッシュを追加することができます：

```html{}[pages/posts/_id.vue]
<template> ... </template>

<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    activated() {
      // 最後の fetch から30秒以上経っていれば、fetch を呼び出します
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
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

最後の `fetch` の呼び出しが 30 秒以内であれば、同じページへの遷移で `fetch` は呼ばれません。

## Async Data

<base-alert>

`asyncData` は [pages](/docs/2.x/directory-structure/pages) でのみ使用可能で、このフック内では `this` にアクセスすることはできません。

</base-alert>

`asyncData` はユニバーサルなデータ取得のためのもう 1 つのフックです。非同期な状態を保存するために、コンポーネントのインスタンスにプロパティをセットする（または Vuex アクションをディスパッチする）必要がある `fetch` とは異なり、`asyncData` は単にその返却された値をコンポーネントのデータにマージします。以下は [@nuxt/http](https://http.nuxtjs.org/) ライブラリを使った例です：

```html{}[pages/posts/_id.vue]
<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.description }}</p>
  </div>
</template>

<script>
  export default {
    async asyncData({ params, $http }) {
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
      return { post }
    }
  }
</script>
```

`fetch` と異なり、`asyncData` フックから返却される promise は*ルートの遷移の間に*解決されます。つまり、"loading placeholder" はクライアントサイドの遷移で表示されないということです（ただし読み込み中の状態をユーザーに示すために [ローディングバー](https://nuxtjs.org/guides/features/loading/) を使うことができます）。Nuxt は代わりに `asyncData` フックの終了を待ってから、次のページへ移動したり[エラーページ](/docs/2.x/directory-structure/layouts#error-page)を表示したりします。

このフックはページレベルのコンポーネントのためだけに使うことができます。`fetch` と異なり、`asyncData` はコンポーネントインスタンス (`this`) にアクセスすることはできません。そのかわりに、[context](/docs/2.x/concepts/context-helpers) を引数として受け取ります。`asyncData` をデータの取得のために使うことができ、Nuxt.js は自動で返却されたオブジェクトをコンポーネントのデータとマージします。

今後の例では、API からのデータの取得におすすめの [@nuxt/http](https://http.nuxtjs.org/) を使用します。

### コンポーネントの非同期データ？

コンポーネントには `asyncData` メソッドがないため、コンポーネント内でサーバーから非同期データを直接取得することはできません。この制限を回避するには、2 つの基本的なオプションがあります:

1. `mounted` フックで API を呼び出し、ロード時にデータプロパティを設定します。_欠点: サーバーサイドレンダリングでは機能しません。_
2. ページコンポーネントの `asyncData` メソッドで API を呼び出し、データをプロパティとしてサブコンポーネントに渡します。サーバーのレンダリングは正常に機能します。_欠点: ページの `asyncData` は他のコンポーネントのデータを読み込むため読みにくい可能性があります_。

### クエリ文字列の変化のリスニング

デフォルトでは、クエリ文字列の変化で `asyncData` メソッドは呼び出されません。ページネーションコンポーネントを作成するときなどにこの挙動を変えたい場合は、ページコンポーネントの `watchQuery` プロパティを見るパラメータを設定することができます。

<base-alert type="next">

[watchQuery プロパティ](/docs/2.x/components-glossary/pages-watchquery)についてより学び、利用可能な [context 内のキー](/docs/2.x/concepts/context-helpers)のリストを見てみましょう。

</base-alert>

<quiz :questions="questions"></quiz>
