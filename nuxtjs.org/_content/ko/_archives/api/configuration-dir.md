---
title: 'API: dir 프로퍼티'
description: Nuxt.js 애플리케이션의 커스텀 디렉토리를 정의합니다
menu: dir
category: configuration
position: 107
---

- 타입: `Object`
- 기본값:

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

> Nuxt.js 애플리케이션의 커스텀 디렉토리를 정의합니다

예제 (`nuxt.config.js`):

```js
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
