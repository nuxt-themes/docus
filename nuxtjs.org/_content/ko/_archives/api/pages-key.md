---
title: 'API: key 프로퍼티'
description: 내부의 `<router-view>` 컴포넌트의 `key` 프로퍼티를 설정합니다.
menu: key
category: pages
position: 24
---

> 내부의 `<router-view>` 컴포넌트의 `key` 프로퍼티를 설정합니다.

- **타입:** `String` 또는 `Function`

각 페이지에 설정된 `key` 프로퍼티는 `<router-view>`로 전달됩니다. 전달된 `key` 프로퍼티는 동적 페이지에서 여러 라우트간의 트랜지션을 만드는데 사용될 수 있습니다. 서로 다른 키를 사용하는 라우트의 경우 페이지 컴포넌트를 새로 렌더링합니다.

`<router-view>`의 `key` 프로퍼티를 세팅하는 방법은 여러가지가 있습니다. 더 자세한 내용에 대해서는 [nuxt 컴포넌트](/api/components-nuxt)의 `nuxtChildKey` 프로퍼티를 참고하세요.

```js
export default {
  keys(route) {
    return route.fullPath
  }
}
```
