---
title: 'API: transition 프로퍼티'
description: 페이지 transitions의 기본 프로퍼티 세팅하기
menu: transition
category: configuration
position: 131
---

# transition 프로퍼티

- 타입: `String` or `Object`

> 페이지 transitions의 기본 프로퍼티를 설정하는 것에 사용됩니다.

기본값:

```js
{
  name: 'page',
  mode: 'out-in'
}
```

예제 (`nuxt.config.js`):

```js
module.exports = {
  transition: 'page'
  // or
  transition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}
```

`nuxt.config.js` 파일의 transition 키는 페이지 transitions의 기본 프로퍼티 설정에 사용됩니다. `transition` 키가 object일 때, 가능한 키들에 대해 더 알아보시려면 [페이지 transition property](/api/pages-transition#object)를 확인해주세요.
