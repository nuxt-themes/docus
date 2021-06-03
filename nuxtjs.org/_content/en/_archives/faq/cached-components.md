---
title: How to cache Vue components?
description: How to cache Vue components in Nuxt?
menu: How to cache Vue components?
category: configuration
position: 8
---

> Although Vue's SSR is quite fast, it can't match the performance of pure string-based templating due to the cost of creating component instances and Virtual DOM nodes. In cases where SSR performance is critical, wisely leveraging caching strategies can greatly improve response time and reduce server load.

To avoid boilerplate, use [Component Cache module](https://github.com/nuxt-community/modules/tree/master/packages/component-cache) for Nuxt.js. This module uses vue-server-renderer to add LRU cache support for Vue components.

## Usage

- Add `@nuxtjs/component-cache` dependency using Yarn or npm to your project
- Add `@nuxtjs/component-cache` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/component-cache',

    // With options
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ]
  ]
}
```

See [component-level caching](http://ssr.vuejs.org/en/caching.html#component-level-caching) for more information.

## Don't forget, that

- Cache-able components **must define a unique `name` option**.
- You should **_NOT_** cache components, that
  - have child components that may rely on global state.
  - have child components that produce side effects on the render `context`.
