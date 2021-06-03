---
title: 'API: watchers 属性'
description: watchers 属性可用来覆盖 Nuxt.js 默认的 watchers 配置。
menu: watchers
category: configuration
position: 134
---

# watchers 配置

- 类型： `Object`
- 默认值： `{}`

> watchers 属性可用来覆盖 Nuxt.js 默认的 watchers 配置。

## chokidar

- 类型： `Object`
- 默认值： `{}`

了解更多关于 chokidar 的配置项，请移步 [chokidar API](https://github.com/paulmillr/chokidar#api)。

## webpack

- 类型： `Object`
- 默认值：

```js
watchers: {
  webpack: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

了解更多关于 webpack 的 watchoptions， 请移步 [webpack 文档](https://webpack.js.org/configuration/watch/#watchoptions)。
