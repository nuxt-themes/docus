---
title: Webpack 설정의 확장
description: Webpack 설정을 확장하려면?
category: configuration
position: 5
---

# Webpack 설정을 확장하려면?

`nuxt.config.js`의 `extend` 옵션에 Webpack 설정을 확장할 수 있습니다:

```js
module.exports = {
  build: {
    extend(config, { isDev, isClient }) {
      // ...
    }
  }
}
```
