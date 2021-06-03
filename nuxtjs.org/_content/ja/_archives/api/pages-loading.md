---
title: 'API: loading プロパティ'
description: '`loading` プロパティは特定のページに対してデフォルトの loading プログレスバーを無効にするオプションを提供します。'
menu: loading
category: pages
position: 26
---

> loading プロパティは特定のページに対してデフォルトの loading プログレスバーを無効にするオプションを提供します。

- **型:** `boolean` (デフォルト: `true`)

デフォルトでは、 Nuxt.js はルート間の遷移の際に自身で持っているコンポーネントでプログレスバーを表示します。

[設定の loading オプション](/api/configuration-loading) からグローバルで無効にしたりカスタマイズすることもできますし、特定のページの `loading` プロパティを `false` に設定することで無効にすることもできます:

```html
<template>
  <h1>My page</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```

[こちら](/examples/custom-page-loading) から公式のプロパティ利用例を探すことができます。
