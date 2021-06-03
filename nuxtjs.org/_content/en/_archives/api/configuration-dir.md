---
title: 'The dir Property'
description: Define the custom directories for your Nuxt.js application
menu: dir
category: configuration
position: 107
---

- Type: `Object`
- Default:

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

> Define the custom directories for your Nuxt.js application

Example (`nuxt.config.js`):

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
