---
title: 'API: nuxt.renderAndGetWindow(url, options)'
description: nuxt.js 어플리케이션으로부터 주어진 url의 창을 가져옵니다.
menu: renderAndGetWindow
category: programmatically
position: 204
---

# nuxt.renderAndGetWindow(url, options = {})

- 타입: `Function`
- 인자: `String`
  1. `String`: 랜더된 url
  2. _Optional_, `Object`: options
  - virtualConsole: `Boolean` (default: `true`)
- 반환값: `Promise`
  - Returns: `window`

> nuxt.js 어플리케이션으로부터 주어진 url의 창을 가져옵니다.

<div class="Alert Alert--orange">

이 기능은 [test purposes](guide/development-tools#end-to-end-testing)를 위해 만들어졌습니다.

</div>

이 함수를 사용하기 위해, `jsdom`를 설치해야 합니다:

```bash
npm install --save-dev jsdom
```

예제:

```js
const Nuxt = require('nuxt')
const nuxt = new Nuxt()

nuxt.renderAndGetWindow('http://localhost:3000').then(window => {
  // head의 <title>이 보여집니다.
  console.log(window.document.title)
})
```
