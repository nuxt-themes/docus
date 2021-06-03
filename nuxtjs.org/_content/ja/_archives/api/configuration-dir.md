---
title: 'API: dir プロパティ'
description: カスタムディレクトリを定義します。
menu: dir
category: configuration
position: 107
---

- 型: `Object`
- デフォルト:

```js
{
  assets: 'assets',
  app: 'app',
  layouts: 'layouts',
  middleware: 'middleware',
  pages: 'pages',
  static: 'static',
  store: 'store'
}
```

> カスタムディレクトリを定義します。

例（`nuxt.config.js`）:

```js
export default {
  dir: {
    assets: 'custom-assets',
    app: 'custom-app',
    layouts: 'custom-layouts',
    middleware: 'custom-middleware',
    pages: 'custom-pages',
    static: 'custom-static',
    store: 'custom-store'
  }
}
```
