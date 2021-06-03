---
title: 'API: loading 프로퍼티'
description: '`loading` 프로퍼티는 특정 페이지에서 디폴트인 로딩 진행바를 비활성화하는 옵션을 제공합니다.'
menu: loading
category: pages
position: 26
---

> `loading` 프로퍼티는 특정 페이지에서 디폴트인 로딩 진행바를 비활성화하는 옵션을 제공합니다.

- **타입:** `Boolean` (default: `true`)

기본값으로, Nuxt.js는 라우트 간에 로딩 진행바를 보여주게끔 설정되어 있습니다.

이를 비활성화 처리하거나, 혹은 전역으로 [설정의 로딩 옵션](/api/configuration-loading)을 통해 커스터마이징할 수 있습니다 . 그러나 특정 페이지의 `loading` 프로퍼티를 `false`로 세팅하는 것으로 비활성화처리도 가능합니다:

```html
<template>
  <h1>My page</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```

[여기](/examples/custom-page-loading)에서 이 프로퍼티에 대한 공식 예제를 보실 수있습니다.
