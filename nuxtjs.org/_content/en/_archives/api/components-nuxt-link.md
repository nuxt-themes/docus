---
title: 'API: The <nuxt-link> Component'
description: Link the pages between them with nuxt-link.
menu: nuxt-link
category: components
position: 43
---

> This component is used to provide navigations between page components and enhance performances with smart prefetching.

The `<nuxt-link>` component is an essential of Nuxt. It **should be used to navigate** through your application, similar to the `<router-link>` component in a traditional Vue App. In fact, `<nuxt-link>` extends [`<router-link>`](https://router.vuejs.org/api/#router-link). That means it takes the same properties and can be used in the same manner. Read the [Vue Router documentation](https://router.vuejs.org/api/#router-link) for more information.

Example (`pages/index.vue`):

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/about"
      >About (internal link that belongs to the Nuxt App)</nuxt-link
    >
    <a href="https://nuxtjs.org">External Link to another page</a>
  </div>
</template>
```

**Aliases:** `<n-link>`, `<NuxtLink>`, and `<NLink>`

> Added with Nuxt.js v2.4.0

To improve the responsiveness of your Nuxt.js applications, when the link will be displayed within the viewport, Nuxt.js will automatically prefetch the _code splitted_ page. This feature is inspired by [quicklink.js](https://github.com/GoogleChromeLabs/quicklink) by Google Chrome Labs.

To disable the prefetching of the linked page, you can use the `no-prefetch` prop. Since Nuxt.js v2.10.0, you can also use the `prefetch` prop set to `false`:

```html
<n-link to="/about" no-prefetch>About page not pre-fetched</n-link>
<n-link to="/about" :prefetch="false">About page not pre-fetched</n-link>
```

You can configure globally this behavior with [router.prefetchLinks](/api/configuration-router#prefetchlinks).

Since Nuxt.js v2.10.0, if you have set [router.prefetchLinks](/api/configuration-router#prefetchlinks) to `false` globally but you want to prefetch a specific link, you can use the `prefetch` prop:

```html
<n-link to="/about" prefetch>About page pre-fetched</n-link>
```

The `prefetched-class` prop is also available to customize the class added when the code splitted page has been prefetched. Make sure to set up this functionality globally with [router.linkPrefetchedClass](/api/configuration-router#linkprefetchedclass).
