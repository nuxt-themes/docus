---
title: 'scrollToTop プロパティ'
description: '`scrollToTop` プロパティで、ページをレンダリングする前にトップまでスクロールか否かを指定できます。'
menu: 'scrollToTop プロパティ'
category: components-glossary
position: 0
---

> `scrollToTop` プロパティで、ページをレンダリングする前にトップまでスクロールか否かを指定できます。

- **型:** `Boolean`（デフォルト: `false`）

別のページへ遷移する際にトップまでスクロールしますが、子ルートがあるときはスクロール位置をキープする、というのが Nuxt.js のデフォルトの挙動です。子ルートをレンダリングするときにトップまでスクロールさせたいときは `scrollToTop` を `true` に設定してください:

```html
<template>
  <h1>My child component</h1>
</template>

<script>
  export default {
    scrollToTop: true
  }
</script>
```

逆に、親ルートは手動で `scrollToTop` を `false`に設定することもできます。

スクロールについて Nuxt.js のデフォルトの挙動を上書きしたいときは [scrollBehavior オプション](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior)を参照してください。
