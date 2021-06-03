---
title: 'loading indicator プロパティ'
description: 'ページ読み込み中に素敵なローディングインジケータを表示します！'
menu: loadingIndicator
category: configuration-glossary
position: 16
---

> ページ読み込み中に素敵なローディングインジケータを表示します！

サーバーサイドレンダリングでない（`ssr` オプションが `false`）場合、最初のページ読み込み時にはサーバーサイドからのコンテンツがありません。そのためページ読み込み中に空白のページのかわりにスピナーを表示することができます。

このプロパティには `string`、`false`、`object` の 3 つの異なる型を指定できます。文字列が指定された場合はオブジェクトスタイルに変換されます。

デフォルト値:

```js
loadingIndicator: {
  name: 'circle',
  color: '#3B8070',
  background: 'white'
}
```

## 内蔵されているインジケータ

これらのインジケータは素晴らしい [SpinKit](http://tobiasahlin.com/spinkit) プロジェクトからインポートされています。SpinKit のデモページを使ってスピナーをプレビューできます。

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

内臓インジケータは `color` と `background` オプションをサポートしています。

## 独自のインジケータ

独自の特別なインジケータが必要な場合は文字列または Name キーをインジケータのソースコードの HTML テンプレートへのパスにすることもできます。すべてのオプションもテンプレートに渡されます。

もしベースが必要な場合は[ソースコード](https://github.com/nuxt/nuxt.js/tree/dev/packages/vue-app/template/views/loading)も利用できます！
