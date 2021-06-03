---
title: 'API: watchers 프로퍼티'
description: watchers 프로퍼티는 watchers 설정을 덮어씌웁니다
menu: watchers
category: configuration
position: 134
---

# watchers 프로퍼티

- 타입: `Object`
- 기본값: `{}`

> watchers 프로퍼티는 당신의 nuxt.config.js 파일의 watchers 설정을 덮어씌웁니다.

## chokidar

- 타입: `Object`
- 기본값: `{}`

chokidar 옵션에 대해 더 알고싶으시면 [chokidar API](https://github.com/paulmillr/chokidar#api) 문서를 확인 바랍니다.

## webpack

- 타입: `Object`
- 기본값:

```js
watchers: {
  webpack: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

webpack watchoptions에 대해 더 알고싶으시면, [webpack documentation](https://webpack.js.org/configuration/watch/#watchoptions) 문서를 확인 바랍니다.
