---
title: Webpack 插件
description: 如何添加 Webpack 插件？
category: configuration
position: 6
---

# 如何添加 Webpack 插件？

可以在 `nuxt.config.js` 中添加 Webpack 插件：

```js
const webpack = require('webpack')

module.exports = {
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash'
        // ...etc.
      })
    ]
  }
}
```
