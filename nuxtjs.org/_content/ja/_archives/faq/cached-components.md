---
title: Vue コンポーネントをキャッシュするには？
description: NuxtJS で Vue コンポーネントをキャッシュするには？
menu: Vue コンポーネントをキャッシュするには？
category: configuration
position: 8
---

> Vue の SSR は非常に高速ですが、コンポーネントインスタンスや仮想 DOM ノードの作成コストのため純粋な文字ベースのテンプレートのパフォーマンスにはかないません。 SSR のパフォーマンスが重大である場合、キャッシュを賢く活用することで応答時間が大幅に改善され、サーバーの負荷が軽減されます。

ボイラープレートを避けるために、Nuxt.js で[コンポーネントキャッシュモデル](https://github.com/nuxt-community/modules/tree/master/packages/component-cache)を使用してください。このモジュールは、Vue コンポーネント向けに vue-server-renderer を使って LRU キャッシュのサポートを追加します。

## 使い方

- Yarn または npm を使用してプロジェクトに `@nuxtjs/component-cache` の依存関係を追加してください
- `nuxt.config.js` の `modules` セクションに `@nuxtjs/component-cache` を追加してください

```js
{
  modules: [
    // シンプルな使い方
    '@nuxtjs/component-cache',

    // オプション
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ]
  ]
}
```

より詳しい情報は[コンポーネントレベルでのキャッシュ](http://ssr.vuejs.org/en/caching.html#component-level-caching)を参照してください。

## 忘れないでください

- キャッシュ可能なコンポーネントは **ユニークな `name` オプションを定義する必要があります。**
- 以下のコンポーネントはキャッシュ**_しないで_**ください。
  - グローバルな状態に依存する子コンポーネントを持つ
  - レンダリングされる `context` に副作用をもたらす子コンポーネントを持つ
