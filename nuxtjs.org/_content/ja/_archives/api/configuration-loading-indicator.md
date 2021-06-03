---
title: 'API: Loading indicator プロパティ'
description: SPA のページ読み込み中に素敵なローディングインジケータを表示します！
menu: loadingIndicator
category: configuration
position: 116
---

> SPA のページ読み込み中に素敵なローディングインジケータを表示します！

SPA モードで Nuxt.js を実行すると、はじめのページ読み込み時にはサーバーからのコンテンツがないため、ページが読み込まれている間に空白のページの代わりとしてスピナーを表示することがあるでしょう。

このプロパティには、 `string`, `false`, `object` の 3 ついずれかの型を持つことができます。文字列が与えられた場合には、オブジェクトへと変換されます。

デフォルト値:

```js
loadingIndicator: {
  name: 'circle',
  color: '#3B8070',
  background: 'white'
}
```

## 内蔵されているインジケータ

このインジケータは、素晴らしい [Spinkit](http://tobiasahlin.com/spinkit) プロジェクトから移植されています。 Spinkit のデモページを見ることで、スピナーを試してみることができます。

- circle
- cube-grid
- fading-circle
- folding-cube
- chasing-dots
- nuxt
- pulse
- rectangle-bounce
- rotating-plane
- three-bounce
- wandering-cubes

内蔵インジケータは、 `color` および `background` オプションをサポートしています。

## カスタムインジケータ

もし独自の特別なインジケータを必要とする場合は、 String 値もしくは Name キーにインジケータのソースコードを HTML テンプレートへのパスとして設定することができます！その際、全てのオプションもテンプレートへと渡されます。

ベースが必要な場合は、 Nuxt の組み込み[ソースコード](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading)をベースとして使用できます。
