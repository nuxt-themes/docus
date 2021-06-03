---
title: Webpack 플러그인
description: Webpack 플러그인을 추가하려면?
category: configuration
position: 6
---

# Webpack 플러그인을 추가하려면?

<!-- In your `nuxt.config.js` file: -->

`nuxt.config.js` 파일에 다음처럼 작성합니다:

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
