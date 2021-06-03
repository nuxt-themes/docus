---
title: 'API: layout プロパティ'
description: '`layouts` ディレクトリの（第一階層の）ファイルはカスタムレイアウトになります。これらはページコンポーネントの layout プロパティで指定して利用できます'
menu: layout
category: pages
position: 25
---

> layouts ディレクトリの（第一階層の）ファイルはカスタムレイアウトになります。これらはページコンポーネントの layout プロパティで指定して利用できます。

- **型:** `String` または `Function`（デフォルト: `'default'`）

どのレイアウトを使うか指定するために、ページコンポーネントで `layout` キーを使ってください:

```js
export default {
  layout: 'blog',
  // または
  layout(context) {
    return 'blog'
  }
}
```

この例では Nuxt.js は `layouts/blog.vue` ファイルをこのページコンポーネントのレイアウトとしてインクルードします。

動作する様子を [デモ動画](https://www.youtube.com/watch?v=YOKnSTp7d38) で確認してみてください。

Nuxt.js でレイアウトがどのように動作するか理解するためには[layout ドキュメント](/guide/views#layouts) を参照してください。
