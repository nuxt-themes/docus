---
title: 'API: The <nuxt> Component'
description: Display the page components inside a layout.
menu: nuxt
category: components
position: 41
---

> This component is used only in [layouts](/guide/views#layouts) to display the page components.

Example (`layouts/default.vue`):

```html
<template>
  <div>
    <div>My nav bar</div>
    <nuxt />
    <div>My footer</div>
  </div>
</template>
```

To see an example, take a look at the [layouts example](/examples/layouts).

**Props**:

- nuxtChildKey: `string`
  - This prop will be set to `<router-view/>`, useful to make transitions inside a dynamic page and different route.
  - Default: `$route.path`

There are 2 ways to handle internal `key` prop of `<router-view/>`.

1. `nuxtChildKey` prop

```html
<template>
  <div>
    <nuxt :nuxt-child-key="someKey" />
  </div>
</template>
```

2. `key` option in page components: `string` or `function`

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```

- name: `string` (_introduced with Nuxt v2.4.0_)
  - This prop will be set to `<router-view/>`, used to render named-view of page component.
  - Default: `default`

To see an example, take a look at the [named-views example](/examples/named-views).
