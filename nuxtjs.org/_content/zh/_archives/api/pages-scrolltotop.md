---
title: 'API: scrollToTop 属性'
description: scrollToTop 属性用于控制页面渲染前是否先滚动至页面顶部。
menu: scrollToTop
category: pages
position: 28
---

# scrollToTop 属性

> scrollToTop 属性用于控制页面渲染前是否滚动至页面顶部。

- **类型：** `Boolean` (默认值： `false`)

默认情况下，从当前页面切换至目标页面时，Nuxt.js 会让目标页面滚动至顶部。但是在嵌套子路由的场景下，Nuxt.js 会保持当前页面的滚动位置，除非在子路由的页面组件中将 `scrollToTop` 设置为 `true`。

```html
<template>
  <h1>子页面组件</h1>
</template>

<script>
  export default {
    scrollToTop: true
  }
</script>
```

如果你想改变 Nuxt.js 上述的默认的页面滚动逻辑，请参考 [scrollBehavior 配置项](/api/configuration-router#scrollBehavior)。
