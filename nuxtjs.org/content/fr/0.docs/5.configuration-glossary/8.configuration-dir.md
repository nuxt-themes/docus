---
title: 'La Propriété dir'
description: Définie les répertoires personnalisés pour notre application Nuxt.js
menu: dir
category: configuration-glossary
position: 7
---

- Type : `Object`
- Par défaut :

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

> Définie les répertoires personnalisés pour notre application Nuxt.js

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
