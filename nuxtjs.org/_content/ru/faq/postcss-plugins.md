---
title: Плагины Postcss
description: Как добавить плагины Postcss?
category: configuration
position: 4
---

# Как добавить плагины Postcss?

В вашем файле конфигурации nuxt.config.js укажите:

```js
module.exports = {
  build: {
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')()
    ]
  }
}
```
