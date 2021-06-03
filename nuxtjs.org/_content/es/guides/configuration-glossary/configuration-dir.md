---
title: 'La propiedad dir'
description: Define los directorios personalizados para tu aplicación Nuxt.js
menu: dir
category: configuration-glossary
position: 7
---

- Tipo: `Object`
- Por defecto:

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

> Define los directorios personalizados para tu aplicación Nuxt.js

```js{}[nuxt.config.js]
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
