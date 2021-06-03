---
title: 路由
description: 大多数网站不会只有一页。 例如主页，关于页面，联系页面等。为了显示这些页面，我们需要一个路由来管理。
position: 2
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/02_routing?fontsize=14&hidenavigation=1&theme=dark
---

## 自动配置路由

大多数网站会有多个页面（例如：主页，关于页面，联系页面等）。为了显示这些页面，我们需要一个路由来管理。这就是`vue-router`的来源。在使用 Vue 应用时，必须创建一个配置文件（即`router.js`）并将所有路由手动添加到里面。

Nuxt.js 会根据`page`目录中的`.vue`文件自动生成`vue-router`配置。这意味着你无需再编写路由配置！ Nuxt.js 还为你提供了所有路由的自动代码拆分功能。

换而言之，要在应用中使用路由，你要做的就是在`page`文件夹内创建`.vue`文件就行了。

<base-alert type="next">

了解更多有关[Routing](/docs/2.x/features/file-system-routing)

</base-alert>

## 导航

要在应用的页面之间导航，你需要使用[NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component)组件。该组件包含在 Nuxt.js 中，因此不必像使用其他组件那样引入它。 它类似于 HTML 的`<a>`标签，不同的是`nuxt`使用了`to="/about"`而不是使用`href="/about"`。如果你以前使用过`vue-router`，则可以用`<NuxtLink>`替换掉`<RouterLink>`。

一个简单的例子，在`pages`文件夹内的`index.vue`文件使用`<NuxtLink>`跳转到主页

```html{}[pages/index.vue]
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```

对于所有你站点内页面的链接，请使用`<NuxtLink>`。如果您有指向其他网站的链接，则应使用`<a>`标记。 参见以下示例：

```html{}[pages/index.vue]
<template>
  <main>
    <h1>Home page</h1>
    <NuxtLink to="/about">
      About (internal link that belongs to the Nuxt App)
    </NuxtLink>
    <a href="https://nuxtjs.org">External Link to another page</a>
  </main>
</template>
```

<base-alert type="next">

了解更多有关 [NuxtLink component](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

</base-alert>
