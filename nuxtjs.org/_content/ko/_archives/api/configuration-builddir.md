---
title: 'API: buildDir 프로퍼티'
description: Nuxt.js 애플리케이션의 dist 디렉토리를 정의합니다
menu: buildDir
category: configuration
position: 102
---

- 타입: `String`
- 기본값: `.nuxt`

> Nuxt.js 애플리케이션의 dist 디렉토리를 정의합니다

예제 (`nuxt.config.js`):

```js
export default {
  buildDir: 'nuxt-dist'
}
```

기본값 `.nuxt`는 .으로 시작하는 이름이기 때문에 많은 도구들이 buildDir을 숨김 디렉토리로 간주합니다. 이 옵션을 사용하여 그러한 동작을 방지할 수 있습니다.
