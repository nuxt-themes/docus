---
title: 'API: scrollToTop 프로퍼티'
description: scrollToTop 프로퍼티로 페이지를 랜더링하기 전에 페이지의 최상단까지의 스크롤 여부를 지정할 수 있습니다.
menu: scrollToTop
category: pages
position: 28
---

> scrollToTop 프로퍼티로 페이지를 랜더링하기 전에 페이지의 최상단까지의 스크롤여부를 지정할 수 있습니다.

- **타입:** `Boolean`（기본값: `false`）

별도의 페이지로 이동할 때에 페이지의 최상단으로 스크롤을 하지만, 자식 라우트가존재하는 경우에는 스크롤 위치를 유지해 두는게 Nuxt.js의 기본 움직임입니다. 자식라우트를 랜더링할 때 최상단으로 스크롤 시키고 싶은 경우는 `scrollToTop: true`라고설정을 해 주세요:

```html
<template>
  <h1>My child component</h1>
</template>

<script>
  export default {
    scrollToTop: true
  }
</script>
```

반대로 상위 경로에서도 수동으로 `scrollToTop`을 `false`로 설정할 수 있습니다.

스크롤에 대해서 Nuxt.js의 기본 움직임을 덮어쓰고 싶은 경우에는 [scrollBehavior 옵션](/api/configuration-router#scrollBehavior)을 참조하세요.
