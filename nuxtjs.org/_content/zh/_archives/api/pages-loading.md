---
title: 'API: loading 属性'
description: '`loading` 属性为您提供了禁用特定页面上的默认加载进度条的选项。'
menu: loading
category: pages
position: 26
---

# loading 属性

> loading 属性为您提供了禁用特定页面上的默认加载进度条的选项。

- **类型:** `Boolean` (默认: `true`)

默认情况下，Nuxt.js 使用自己的组件来显示路由跳转之间的进度条。

您可以通过[Configuration 的加载选项](/api/configuration-loading)全局禁用或自定义它，但也可以通过将 `loading` 属性设置为 `false` 来禁用特定页面：

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

您可以找到官方示例来使用此属性 [点击这里](/examples/custom-page-loading).
