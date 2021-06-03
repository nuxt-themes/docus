---
title: 'API: <nuxt-link> 组件'
description: nuxt-link 组件用于在页面中添加链接至别的页面。
menu: nuxt-link
category: components
position: 43
---

# &lt;nuxt-link&gt; 组件

> nuxt-link 组件用于在页面中添加链接至别的页面。

目前 `<nuxt-link>` 的作用和 [`<router-link>`](https://router.vuejs.org/zh-cn/api/router-link.html) 一致，推荐阅读 [Vue 路由文档](https://router.vuejs.org/zh-cn/api/router-link.html) 来了解它的使用方法。

例如 (`pages/index.vue`)：

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/about">关于</nuxt-link>
  </div>
</template>
```

**别名:** `<n-link>`, `<NuxtLink>`, 和 `<NLink>`

> Nuxt.js v2.4.0 添加

为了提高 Nuxt.js 应用程序的响应能力，当链接将显示在视口中时，Nuxt.js 将自动预获取代码分割页面。此功能的灵感来自 Google Chrome Labs 的[quicklink.js](https://github.com/GoogleChromeLabs/quicklink)。

要禁用链接页面的预获取，可以使用`no-prefetch`：

```html
<n-link to="/about" no-prefetch>About page not pre-fetched</n-link>
```

您可以使用[router.prefetchLinks](/api/configuration-router#prefetchlinks)全局配置此行为。

关于`prefetched-class`还可用于自定义在预获取代码分割页面时添加的类。确保使用[router.linkPrefetchedClass](/api/configuration-router#linkprefetchedclass)全局设置此功能。
