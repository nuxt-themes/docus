---
title: 'layout プロパティ'
description: '`layouts` ディレクトリの（第一階層の）ファイルはカスタムレイアウトになります。これらはページコンポーネントの layout プロパティで指定して利用できます'
menu: layout プロパティ
category: components-glossary
position: 0
---

> layouts ディレクトリの（第一階層の）ファイルはカスタムレイアウトになります。これらはページコンポーネントの layout プロパティで指定して利用できます

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
