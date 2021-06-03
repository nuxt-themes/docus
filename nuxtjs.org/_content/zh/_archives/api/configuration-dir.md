---
title: 'API: dir 属性'
description: 定义Nuxt.js应用程序的自定义目录
menu: dir
category: configuration
position: 107
---

# dir 属性

- 类型: `Object`
- 默认:

```js
{
  assets: 'assets',
  layouts: 'layouts',
  middleware: 'middleware',
  pages: 'pages',
  static: 'static',
  store: 'store'
}
```

> 定义 Nuxt.js 应用程序的自定义目录

例如 (`nuxt.config.js`):

```js
export default {
  dir: {
    assets: 'custom-assets',
    layouts: 'custom-layouts',
    middleware: 'custom-middleware',
    pages: 'custom-pages',
    static: 'custom-static',
    store: 'custom-store'
  }
}
```
