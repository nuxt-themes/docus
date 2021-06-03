---
title: プレビューモード
description: プレビューモードによる静的ターゲットのためのライブプレビュー
category: features
position: 12
---

Nuxt.js とフルスタティックモジュールを使うことで、API や CMS を呼び出すライブプレビューをすぐに利用することができます。 そして、デプロイする前に変化を確認することができます。

<base-alert>[target:static](/docs/2.x/features/deployment-targets#static-hosting) を利用しているときのみ使用可能です</base-alert>

内部では `$nuxt.refresh` を使っており、クライアントサイドで nuxtServerInit や asyncData、fetch を呼び出しているため、プレビューモードでは自動的にページのデータが更新されます。

ライブプレビューを有効化するためには、次のプラグインを追加する必要があります:

```js{}[plugins/preview.client.js]
export default function ({ query, enablePreview }) {
  if (query.preview) {
    enablePreview()
  }
}
```

<base-alert>
`enablePreview` はプラグインの context オブジェクトでのみ利用可能です。プレビューはクライアントサイドで処理されるため、
プラグイン(今回の例では preview.client.js)はクライアントでのみ実行される必要があります。
</base-alert>

```js{}[nuxt.config.js]
export default {
  plugins: ['plugins/preview.client.js']
}
```

一度そのプラグインを追加すれば、すぐにサイトを生成し配信することができます。

<code-group>
<code-block label="npx" active>

```bash
npx nuxt generate
npx nuxt start
```

</code-block>
<code-block label="Yarn" >

```bash
yarn generate
yarn start
```

  </code-block>
</code-group>

そして以下のクエリパラメータを確認したいページの最後に追加することでプレビューを見ることができます:

```js
?preview=true
```

<base-alert>
enablePreview は yarn dev ではなく yarn start を用いてローカルでテストしてください。
</base-alert>

### まだ生成されていないページをプレビューする場合

まだ生成されていないページは API 上に存在しますが静的なページとして生成されてはいないため、SPA フォールバックは 404 ページを表示する前に API を呼び出します。

もし validate フックを設定している場合、プレビューモードで 404 ページへリダイレクトしないように validate フックを修正する必要があるでしょう。

```js
validate({ params, query }) {
  if (query.preview) {
    return true
}
```

### enablePreview にデータを渡す場合

`enablePreview` 関数にデータを渡すことができます。 そのデータは `$preview` コンテキストヘルパーと `this.$preview` で利用できます。

### このあとは

<base-alert type="next">

[ディレクトリ構成のドキュメント](/docs/2.x/directory-structure/nuxt) を見てみましょう。

</base-alert>
