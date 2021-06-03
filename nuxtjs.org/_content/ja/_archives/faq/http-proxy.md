---
title: クロスオリジンリソースを共有するには？
description: クロスオリジンリソースを共有するには？
category: configuration
position: 10
---

[Nuxt.js においてのクロスオリジンリソース共有の解決策](https://github.com/nuxt-community/proxy-module#readme)

```
npm i @nuxtjs/proxy
```

nuxt.config.js は以下のように記述します。

```
 modules: [
      '@nuxtjs/axios',
      '@nuxtjs/proxy'
  ],
proxy: {
  '/api': {
    target: 'http://example.com',
    pathRewrite: {
      '^/api' : '/'
      }
    }
}
```
