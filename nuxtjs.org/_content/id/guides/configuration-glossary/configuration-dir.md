---
title: 'Properti dir'
description: Tentukan direktori khusus untuk aplikasi Nuxt.js Anda
menu: dir
category: configuration-glossary
position: 7
---

- Tipe: `Object`
- Nilai Anggapan:

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

> Tentukan direktori khusus untuk aplikasi Nuxt.js Anda

```js{}[nuxt.config.js]
export default {
  dir: {
    assets: 'assets-khusus',
    app: 'app-khusus',
    layouts: 'layouts-khusus',
    middleware: 'middleware-khusus',
    pages: 'pages-khusus',
    static: 'static-khusus',
    store: 'store-khusus'
  }
}
```
