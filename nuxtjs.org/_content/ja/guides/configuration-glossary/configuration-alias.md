---
title: 'alias プロパティ'
description: Nuxt.js では、エイリアスを使って JavaScript や CSS でカスタムディレクトリにアクセスできます
menu: alias
category: configuration-glossary
position: 0
---

> Nuxt.js では、エイリアスを使って JavaScript や CSS でカスタムディレクトリにアクセスできます。

- 型: `Object`
- デフォルト:
  ```js
  {
    '~~': `<rootDir>`,
    '@@': `<rootDir>`,
    '~': `<srcDir>`,
    '@': `<srcDir>`,
    'assets': `<srcDir>/assets`, // （`dir.assets` を設定している場合を除く）
    'static': `<srcDir>/static`, // （`dir.static` を設定している場合を除く）
  }
  ```

このオプションでは、（上記のディレクトリに加えて）プロジェクト内のディレクトリにエイリアスを定義できます。これらのエイリアスは、JavaScript や CSS で使用できます。

```js{}[nuxt.config.js]
import { resolve } from 'path'
export default {
  alias: {
    'images': resolve(__dirname, './assets/images'),
    'style': resolve(__dirname, './assets/style'),
    'data': resolve(__dirname, './assets/other/data')
  }
}
```

```html{}[components/example.vue]
<template>
  <img src="~images/main-bg.jpg">
</template>

<script>
import data from 'data/test.json'

// etc.
</script>

<style>
@import '~style/variables.scss';
@import '~style/utils.scss';
@import '~style/base.scss';

body {
  background-image: url('~images/main-bg.jpg');
}
</style>
```

<base-alert type="warning">Webpack のコンテキスト内（画像ソース、CSS - ただし JavaScript は除く）では、（上記の例のように）エイリアスのプレフィックスとして `~` を付ける必要があります。</base-alert>

<base-alert type="info">TypeScript を使っていて、自分で定義したエイリアスを TypeScript ファイル内で使用したい場合は、`tsconfig.json` 内の `paths` オブジェクトにエイリアスを追加する必要があります。</base-alert>
