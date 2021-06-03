---
title: How to share cross-origin resource?
description: How to share cross origin resource?
category: configuration
position: 10
---

[The solution of cross origin resource sharing in Nuxt.js ](https://github.com/nuxt-community/proxy-module#readme)

```
npm i @nuxtjs/proxy
```

In nuxt.config.js

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
