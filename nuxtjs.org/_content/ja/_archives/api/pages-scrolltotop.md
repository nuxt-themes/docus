---
title: 'API: scrollToTop プロパティ'
description: scrollToTop プロパティで、ページをレンダリングする前にトップまでスクロールか否かを指定できます。
menu: scrollToTop
category: pages
position: 28
---

> scrollToTop プロパティで、ページをレンダリングする前にトップまでスクロールか否かを指定できます。

- **型:** `Boolean`（デフォルト: `false`）

別のページへ遷移する際にトップまでスクロールしますが、子ルートがあるときはスクロール位置をキープする、というのが Nuxt.js のデフォルトの挙動です。子ルートをレンダリングするときにトップまでスクロールさせたいときは `scrollToTop` を `true` と設定してください:

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

逆に、親ルートでは `scrollToTop` を手動で `false` に設定することができます。

スクロールについて Nuxt.js のデフォルトの挙動を上書きしたいときは [scrollBehavior オプション](/api/configuration-router#scrollBehavior) を参照してください。
