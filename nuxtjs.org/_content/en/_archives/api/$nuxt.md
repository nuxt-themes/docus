---
title: '$nuxt: The NuxtJS helper'
description: $nuxt is a helper designed to improve user experience.
menu: $nuxt
category: utils
position: 50
---

`$nuxt` is a helper designed to improve user experience.

- `isOffline`
  - Type: `Boolean`
  - Description: `true` when the user's internet connection becomes offline
- `isOnline`
  - Type: `Boolean`
  - Description: Opposite of `isOffline`

Example:

`layouts/default.vue`:

```html
<template>
  <div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <nuxt />
  </div>
</template>
```
