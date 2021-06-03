---
title: 'API: nuxt.renderRoute(route, context)'
description: 제공된 문장으로 특정 route를 랜더합니다.
menu: renderRoute
category: programmatically
position: 203
---

# nuxt.renderRoute(route, context = {})

- 타입: `Function`
- 인자:
  1. `String`, 경로를 랜더
  2. _Optional_, `Object`, 제공된 문장, 가능한 키값: `req` & `res`
- 반환값: `Promise`
  - `html`: `String`
  - `error`: `null` or `Object`
  - `redirected`: `false` or `Object`

> 제공된 문장으로 특정 route를 랜더합니다.

이 기능은 [test purposes](/guide/development-tools#end-to-end-testing) 기능과 [nuxt.renderAndGetWindow](/api/nuxt-render-and-get-window) 기능이 함께 사용되어야 합니다.

<div class="Alert Alert--orange">

`nuxt.renderRoute`기능은 프로덕션 모드에서의 빌드 후에 실행할 수 있습니다 (dev: false).

</div>

예제:

```js
const Nuxt = require('nuxt')
const config = require('./nuxt.config.js')
config.dev = false
const nuxt = new Nuxt(config)

nuxt
  .build()
  .then(() => {
    return nuxt.renderRoute('/')
  })
  .then(({ html, error, redirected }) => {
    // html은 항상 문자열 입니다.
    // error가 null이 아닐 때 아래와 같은 형식으로 보여집니다.
    // { statusCode: 500, message: '에러 메세지' }
    // redirected는 redirect()가 date() 또는 fetch()로 사용되면 false가 아닙니다:
    // { path: '/other-path', query: {}, status: 302 }
  })
```
