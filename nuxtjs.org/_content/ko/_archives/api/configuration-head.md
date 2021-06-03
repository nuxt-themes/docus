---
title: 'API: head 프로퍼티'
description: Nuxt.js를 사용하면 nuxt.config.js의 모든 기본 메타값을 정의할 수 있습니다.
menu: head
category: configuration
position: 112
---

# head 프로퍼티

> Nuxt.js를 사용하면 `nuxt.config.js`의 모든 기본 메타값을 정의할 수 있으며, `head`와 동일한 속성을 사용할 수 있습니다.

- 타입: `Object`

```js
module.exports = {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

`head`에 정의할 수 있는 옵션에 대해 확인하려면 [vue-meta 문서](https://vue-meta.nuxtjs.org/api/#metainfo-properties)를 확인하세요.

<div class="Alert Alert--teal">

<b>정보:</b> `head` 안에서 페이지 컴포넌트 안에서 `head`를 사용할 수 있으며, `this`를 통해 컴포넌트 데이터에 접근할 수 있습니다. [component head 프로퍼티](/api/pages-head)를 확인해주세요.

</div>
