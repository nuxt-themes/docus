---
title: '$nuxt: NuxtJS 的优化帮手'
description: $nuxt 是一个专注于改善用户用户体验的帮手。
menu: $nuxt
category: utils
position: 50
---

`$nuxt` 是一个专注于改善用户用户体验的帮手。

- `isOffline`
  - 类型: `Boolean`
  - 描述: `true` 当用户互联网连接变为离线时
- `isOnline`
  - 类型: `Boolean`
  - 描述: `isOffline`相反

例子:

`layouts/default.vue`:

```html
<template>
  <div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <nuxt />
  </div>
</template>
```
