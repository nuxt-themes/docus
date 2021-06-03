---
title: 如何扩展 Webpack 的配置
description: 如何扩展 Webpack 的配置？
category: configuration
position: 5
---

# 如何扩展 Webpack 的配置？

你可以通过 `nuxt.config.js` 文件中的 `extend` 配置项来扩展 Webpack 的配置：

```js
module.exports = {
  build: {
    extend(config, { isDev, isClient }) {
      // ...
    }
  }
}
```
