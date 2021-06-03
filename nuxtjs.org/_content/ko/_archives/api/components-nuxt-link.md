---
title: 'API: <nuxt-link> 컴포넌트'
description: 다른 페이지에 연결합니다.
menu: nuxt-link
category: components
position: 43
---

# &lt;nuxt-link&gt; 컴포넌트

> 해당 컴포넌트는 현재 페이지와 다른 페이지를 연결하는 데 사용됩니다.

현재 `<nuxt-link>` 는 [`<router-link>`](https://router.vuejs.org/en/api/router-link.html) 와 동일합니다. 사용 방법은 [vue-router documentation](https://router.vuejs.org/en/api/router-link.html) 를확인해보세요.

예제 (`pages/index.vue`):

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/about">About</nuxt-link>
  </div>
</template>
```

앞으로 어플리케이션 응답 속도 향상을 위해 `pre-fetching` 기능을 백그라운드에 추가할 것입니다.
