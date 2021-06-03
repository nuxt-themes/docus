---
title: '$nuxt: NuxtJS 헬퍼'
description: $nuxt는 사용자 경험을 개선하기 위해 설계된 헬퍼입니다.
menu: $nuxt
category: utils
position: 50
---

`$nuxt` 는 사용자 경험을 개선하기 위해 설계된 헬퍼입니다.

- `isOffline`
  - 타입: `Boolean`
  - 설명: 사용자의 인터넷 연결이 끊겼을 때 `true`가 됩니다.
- `isOnline`
  - 타입: `Boolean`
  - 설명: `isOffline`의 반대

예제:

`layouts/default.vue`:

```html
<template>
  <div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <nuxt />
  </div>
</template>
```
