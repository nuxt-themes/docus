---
title: 'A propriedade dir'
description: Defina os diretórios personalizados para sua aplicação Nuxt.js
menu: dir
category: configuration-glossary
position: 7
---

- Tipo: `Object`
- Padrão:

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

> Defina os diretórios personalizados para sua aplicação Nuxt.js

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
