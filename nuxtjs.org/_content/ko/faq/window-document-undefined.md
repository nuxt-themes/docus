---
title: window 혹은 document가 undefined
description: Nuxt.js에서 window 혹은 document가 undefined인 경우라면?
category: development
position: 101
---

# window 혹은 document가 undefined인 경우라면?

이 에러는 서버측 랜더링에 원인이 있습니다.

특정 리소스를 클라이언트 측에서만 import를 하고 싶은 경우에는 `process.client` 변수를 사용할 필요가 있습니다.

예를 들어 .vue 파일을 다음처럼 작성합니다:

```js
if (process.client) {
  require('external_library')
}
```

<!-- Don't forget to add your library in the [vendor bundle](/docs/2.x/configuration-glossary/configuration-build#build-vendor) in your `nuxt.config.js`: -->

`nuxt.config.js` 파일에 해당 라이브러리를 [vendor bundle](/docs/2.x/configuration-glossary/configuration-build#vendor) 에 추가하는 것을 잊지 말기 바랍니다.

```js
build: {
  vendor: ['external_library']
}
```
