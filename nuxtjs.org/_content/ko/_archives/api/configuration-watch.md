---
title: 'API: watch 프로퍼티'
description: watch 프로퍼티는 서버를 재시작하기 위해 감시할 파일을 지정할 수 있게 해줍니다.
menu: watch
category: configuration
position: 133
---

- 타입: `Object`
- 기본값: `[]`

> watch 프로퍼티는 서버를 재시작하기 위해 감시할 파일을 지정할 수 있게 해줍니다.

```js
watch: ['~/custom/*.js']
```

[chokidar](https://github.com/paulmillr/chokidar)는 watcher를 설정하는데 사용됩니다. [chokidar API](https://github.com/paulmillr/chokidar#api)를 통해 chokidar 의 패턴 옵션에 대해 더 알아보세요.
