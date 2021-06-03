---
title: 'API: fetch メソッド'
description: '`fetch` メソッドは、ページがレンダリングされる前に、データをストアに入れるために使われます。コンポーネントのデータをセットしないという点を除いては `asyncData`メソッドとよく似ています。'
menu: fetch
category: pages
position: 22
---

## Nuxt >= 2.12

Nuxt.js `v2.12` では、**あらゆる Vue コンポーネント**に `fetch` という新しいフックが導入されています。

[ライブデモ](https://nuxt-new-fetch.surge.sh)と[コード例](https://github.com/nuxt/nuxt.js/tree/dev/examples/new-fetch)を見てください。

<div class="Alert Alert--orange">

`fetch(context)` は非推奨になりましたが、代わりに[無名ミドルウェア](/api/pages-middleware#無名ミドルウェア)をページ内の `middleware(context)` で使用できます。

</div>

### fetch を使うタイミングは？

**非同期**データ取得の必要がある度です。`fetch` はサーバーサイドでルートをレンダリングするときに呼び出され、クライアントサイドでは遷移するときに呼び出されます。

コンポーネントレベルで `$fetchState` を公開します:

- `$fetchState.pending`: `Boolean`。`fetch` が*クライアントサイド*で呼び出されたときにプレースホルダを示します。
- `$fetchState.error`: `null` または `Error`。エラーメッセージを示します。
- `$fetchState.timestamp`: `Integer`。最後に fetch したタイムスタンプです。`keep-alive` でのキャッシングに便利です。

テンプレートから `fetch` フックを呼び出すには、以下のように `$fetch()` を使用します:

```html
<button @click="$fetch">Refresh</button>
```

コンポーネントメソッドでは以下のとおりです:

```javascript
// スクリプトセクションのコンポーネントメソッドより
export default {
  methods: {
    refresh() {
      this.$fetch()
    }
  }
}
```

fetch フック内では `this.$nuxt.context` を使用して、Nuxt [context](/api/context) にアクセスできます。

### オプション

- `fetchOnServer`: `Boolean` または `Function`（デフォルト: `true`）。サーバーがページをレンダリングする際に `fetch()` を呼び出します。
- `fetchDelay`: `Integer`（デフォルト: `200`）。最小実行時間をミリ秒単位で設定します（過剰実行を防ぐため）。

<div class="Alert Alert--green">

`fetchOnServer` がファルシー（`false` または `false` を返す）な場合、`fetch` はクライアントサイドでのみ呼び出され、サーバでコンポーネントをレンダリングする際には `$fetchState.pending` は `true` を返します。

</div>

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    },
    fetchOnServer: false
  }
</script>
```

### 例

<div class="Alert Alert--green">

今回は公式の [http モジュール](https://http.nuxtjs.org)を使って HTTP リクエストを行ってみます。

</div>

投稿記事を掲載したブログをホームページに持ちましょう:

`pages/index.vue`

```html
<template>
  <div>
    <h1>Blog posts</h1>
    <p v-if="$fetchState.pending">Fetching posts...</p>
    <p v-else-if="$fetchState.error">
      Error while fetching posts: {{ $fetchState.error.message }}
    </p>
    <ul v-else>
      <li v-for="post of posts" :key="post.id">
        <n-link :to="`/posts/${post.id}`">{{ post.title }}</n-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    }
  }
</script>
```

あなたが直接 [http://localhost:3000/](http://localhost:3000/) にアクセスすると、**サーバーレンダリング**（SEO に効果があります）されている完全な投稿リストを見ることができます。

<img width="669" alt="Screenshot 2019-03-11 at 23 04 57" src="https://user-images.githubusercontent.com/904724/54161334-1f9e8400-4452-11e9-97bf-996a6e69d9db.png">

<div class="Alert Alert--green">

Nuxt は、`fetch` の中でどのようなデータを変化させたかをうまく検出し、返された HTML に含まれる JSON を最適化します。

</div>

では、`pages/posts/_id.vue` ページを追加して、`/posts/:id` に投稿を表示させてみましょう。

`pages/posts/_id.vue`

```html
<template>
  <div v-if="$fetchState.pending">Fetching post #{{$route.params.id}}...</div>
  <div v-else>
    <h1>{{ post.title }}</h1>
    <pre>{{ post.body }}</pre>
    <p><n-link to="/">Back to posts</n-link></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        post: {}
      }
    },
    async fetch() {
      this.post = await this.$http.$get(
        `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
      )
    }
  }
</script>
```

遷移すると、クライアントサイドに `"Loading post #..."` が表示され、投稿の更新時には `"Loading post #..."` の表示はありません（ブラウザ上ではハードリフレッシュ）。

<img width="669" alt="fetch-nuxt3" src="https://user-images.githubusercontent.com/904724/54161844-d3544380-4453-11e9-9586-7428597db40e.gif">

<div class="Alert Alert--green">

`fetch` フックを含むコンポーネントの場合、`this.$fetch()` にアクセスして `fetch` フックを再呼び出しします（`$fetchState.pending` は再び `true` になります）。

</div>

### クエリ文字列の変化のリスニング

デフォルトでは、クエリ文字列の変更で `fetch` フックは**呼び出されません**。クエリの変更を監視するには、ウォッチャに `$route.query` を追加して `$fetch` を呼びます:

```js
export default {
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    // クエリの変更時にも呼び出される
  }
}
```

### キャッシング

`<nuxt/>` や `<nuxt-child/>` コンポーネントで `keep-alive` ディレクティブを使うと、既に訪問したページの `fetch` 呼び出しを保存することができます:

`layouts/default.vue`

```html
<template>
  <nuxt keep-alive />
</template>
```

<div class="Alert Alert--green">

また、`<nuxt>` コンポーネントに prop の `keep-alive-props` を渡すことで、`<keep-alive>` に渡す [props](https://jp.vuejs.org/v2/api/index.html#keep-alive) を指定することもできます。<br> 例: `<nuxt keep-alive :keep-alive-props="{ max: 10 }" />` ページコンポーネントを 10 ページ分だけメモリに保持するようにします。

</div>

### `activated` フックを使う

Nuxt は、最後に `fetch` を呼び出したときの `this.$fetchState.timestamp`（タイムスタンプ）を直接付与します（SSR を含む）。このプロパティを `activated` フックと組み合わせることで、`fetch` に 30 秒のキャッシュを追加することができます。

`pages/posts/_id.vue`

```html
<template> ... </template>

<script>
  export default {
    data() {
      return {
        post: {}
      }
    },
    activated() {
      // 最後の fetch から30秒以上経っていれば、fetch を呼び出します
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
      }
    },
    async fetch() {
      this.post = await this.$http.$get(
        `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
      )
    }
  }
</script>
```

最後の `fetch` 呼び出しが 30 秒以内であれば、同じページへの遷移で `fetch` は呼ばれません。

![fetch-keep-alive-nuxt](https://user-images.githubusercontent.com/904724/54164405-c6881d80-445c-11e9-94e0-366406270874.gif)

## Nuxt <= 2.11

> fetch メソッドは、ページがレンダリングされる前に、データをストアに入れるために使われます。コンポーネントのデータをセットしないという点を除いては `asyncData` メソッドとよく似ています。

- **型:** `Function`

`fetch` メソッドが*設定されている場合*、コンポーネント（**ページコンポーネントに限ります**）がロードされる前に毎回呼び出されます。サーバサイドでは一度だけ呼び出され（Nuxt アプリケーションへの最初のリクエスト時）、クライアントサイドでは他のルートへ移動したときに呼び出されます。

`fetch` メソッドは第一引数として [`context`](/api/context) オブジェクトを受け取るので、データを取得し、取得したデータをストアに入れることができます。`fetch` メソッドを非同期にするためには **Promise を返却してください**。そうすれば Nuxt.js はコンポーネントがレンダリングされる前に promise が解決されるまで待機します。

<div class="Alert Alert--orange">

**警告**: `fetch` メソッド内では、コンポーネントがインスタンス化される前に呼び出されるため、`this` を通してコンポーネントのインスタンスにアクセスすることは**できません**。

</div>

`pages/index.vue` の例:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    fetch({ store, params }) {
      return axios.get('http://my-api/stars').then(res => {
        store.commit('setStars', res.data)
      })
    }
  }
</script>
```

`async`/`await` を使ってコードをスッキリさせることもできます:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    async fetch({ store, params }) {
      let { data } = await axios.get('http://my-api/stars')
      store.commit('setStars', data)
    }
  }
</script>
```

### Vuex

ストアアクションを呼び出す場合は、`fetch` 内の `store.dispatch` を使用してください。その際、内部の `async`/`await` を用いてアクションの終了を待つようにしてください：

```html
<script>
  export default {
    async fetch({ store, params }) {
      await store.dispatch('GET_STARS')
    }
  }
</script>
```

`store/index.js`

```js
// ...
export const actions = {
  async GET_STARS({ commit }) {
    const { data } = await axios.get('http://my-api/stars')
    commit('SET_STARS', data)
  }
}
```

### クエリ文字列の変化のリスニング

`fetch` メソッドは、デフォルトではクエリ文字列の変更に対して**呼び出されません**。たとえばページネーション用のコンポーネントを作成する時など、この挙動を変更したい場合は、ページコンポーネントの `watchQuery` プロパティを使用してリスニング用のパラメータを設定することできます。詳しくは、<a href="/api/pages-watchquery" data-md-type="link">API `watchQuery` のページ</a>を参照してください。
