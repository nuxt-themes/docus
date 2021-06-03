---
title: 如何发起跨域资源请求？
description: 如何发起跨域资源请求？
category: configuration
position: 10
---

# 如何发起跨域资源请求?

[用于 Nuxt.js 的 http-proxy 中间件解决方案](https://github.com/nuxt-community/proxy-module#readme)

```
npm i @nuxtjs/proxy -D
```

在 nuxt.config.js 配置文件中添加对应的模块，并设置代理

```
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://example.com',
      pathRewrite: {
        '^/api' : '/'
      }
    }
  }
```
