---
title: 'fetch フック'
description: '`fetch` メソッドは、非同期でデータを取得するためのものです。サーバーサイドではルートをレンダリングするときに、クライアントサイドでは遷移するときに呼び出されます。'
menu: fetch メソッド
category: components-glossary
position: 0
---

## Nuxt >= 2.12

Nuxt.js `v2.12` から、**すべての Vue コンポーネントに対して** `fetch` という新しいフックが導入されています。**非同期**データを取得する必要があるたびに fetch を使います。`fetch` はサーバーサイドではルートをレンダリングするときに、クライアントサイドでは遷移するときに呼び出されます。

コンポーネントレベルで `$fetchState` を公開します:

- `$fetchState.pending`: `Boolean`。`fetch` が _クライアントサイドで_ 呼び出されているときにプレースホルダーを表示する用途などで使うことができます。
- `$fetchState.error`: `null` または `Error`。エラーメッセージを表示する用途で使うことができます。
- `$fetchState.timestamp`: `Integer`。最後に fetch したタイムスタンプです。`keep-alive` を用いたキャッシングに便利です。

テンプレートから `fetch` フックを呼び出すには、下記のように `$fetch()` を使います:

```html
<button @click="$fetch">Refresh</button>
```

コンポーネントメソッドでは下記のとおりです:

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

fetch フック内では `this.$nuxt.context` を使用して、Nuxt [context](/docs/2.x/internals-glossary/context) にアクセスできます。

### オプション

- `fetchOnServer`: `Boolean` または `Function`（デフォルト: `true`）。サーバーがページをレンダリングする際に `fetch()` を呼び出します。
- `fetchKey`: `String` または `Function`（デフォルトはコンポーネントスコープ ID またはコンポート名）でこのコンポーネントの取得結果を識別するキー（または一意のキーを生成する関数）です（Nuxt v2.15 以上で利用可能）。詳細は [PR](https://github.com/nuxt/nuxt.js/pull/8466) を参照してください。
- `fetchDelay`: `Integer`（デフォルト: `200`）。最小実行時間をミリ秒単位で設定します（過剰実行を防ぐため）。

`fetchOnServer` がファルシー（`false` または `false` を返す）な場合、`fetch` はクライアントサイドでのみ呼び出され、サーバーでコンポーネントをレンダリングする際には `$fetchState.pending` は `true` を返します。

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get('https://api.nuxtjs.dev/posts')
    },
    fetchOnServer: false,
    // 複数のコンポーネントが同じ `fetchKey` を返却することができ、Nuxt は両方を別々に追跡します。
    fetchKey: 'site-sidebar',
    // あるいは、より詳細に制御するためにコンポーネントインスタンスにアクセスして関数を渡すことができます。
    // 関数は `created` で呼び出され、取得したデータに依存してはいけません。
    fetchKey(getCounter) {
      // getCounter は呼び出し可能なメソッドで、一意な fetchKey の生成結果として
      // シーケンス内の次の番号を取得できます。
      return this.someOtherData + getCounter('sidebar')
    }
  }
</script>
```

<base-alert type="next">

fetch フックチェックアウトの詳細については[データの取得](/docs/2.x/features/data-fetching)のドキュメントを参照してください

</base-alert>
