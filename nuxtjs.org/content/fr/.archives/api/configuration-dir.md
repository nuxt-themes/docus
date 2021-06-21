---
title: 'API: La propriété dir'
description: Définir les dossiers personnalisés de votre application Nuxt.js.
menu: dir
category: configuration
position: 107
---

- Type: `Object`
- Valeurs par défaut:

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

> Définir les dossiers personnalisés de votre application Nuxt.js.

Exemple (`nuxt.config.js`):

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
