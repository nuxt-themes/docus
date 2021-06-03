---
title: 'API: 유효성 검증된 메서드'
description: Nuxt.js는 당신의 동적 route 컴포넌트 안에서 유효성 검증 메서드를 정의합니다.
menu: validate
category: pages
position: 30
---

> Nuxt.js는 당신의 동적 route 컴포넌트 안에서 유효성 검증 메서드를 정의합니다.

- **타입:** `Function`

```js
validate({ params, query, store }) {
  return true // params가 유효할 경우.
  return false // 반대인 경우, Nuxt.js는 route 랜더를 멈추고 에러 페이지를 노출시킬 것입니다.
}
```

Nuxt.js는 당신의 동적 route 컴포넌트 안에서 유효성 검증 메서드를 정의합니다 (예제: `pages/users/_id.vue`).

유효성 검사에서 `true`가 나오지 않을 경우, Nuxt.js는 자동으로 404 에러 페이지를로드합니다.

```js
export default {
  validate({ params }) {
    // 숫자만 가능합니다.
    return /^\d+$/.test(params.id)
  }
}
```

당신의 [store](/guide/vuex-store)된 데이터를 검사하는 예제를 봅시다. ([nuxtServerInit action](/guide/vuex-store#the-nuxtserverinit-action) 기능이 나오기 전 예제):

```js
export default {
  validate({ params, store }) {
    // `params.id` 항목이 존재한다면 검사합니다.
    return store.state.categories.some(category => category.id === params.id)
  }
}
```
