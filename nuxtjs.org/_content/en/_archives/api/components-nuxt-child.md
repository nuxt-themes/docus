---
title: 'API: The <nuxt-child> Component'
description: Display the current page.
menu: nuxt-child
category: components
position: 42
---

> This component is used for displaying the children components in a [nested route](/docs/2.x/features/file-system-routing#nested-routes).

Example:

```bash
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

This file tree will generate these routes:

```js
;[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

To display the `child.vue` component, we have to insert `<nuxt-child/>` inside `pages/parent.vue`:

```html
<template>
  <div>
    <h1>I am the parent view</h1>
    <nuxt-child :foobar="123" />
  </div>
</template>
```

`<nuxt-child/>` accepts `keep-alive` and `keep-alive-props`:

```html
<template>
  <div>
    <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- will be converted into something like this -->
<div>
  <keep-alive :exclude="['modal']">
    <router-view />
  </keep-alive>
</div>
```

> Child components can also receive properties like a regular Vue component.

To see an example, take a look at the [nested-routes example](/examples/nested-routes).

## The activated and deactivated hooks

When using `keep-alive` on `<nuxt-child/>`, the children components will register two additional lifecycle hooks: [activated](https://vuejs.org/v2/api/#activated) and [deactivated](https://vuejs.org/v2/api/#deactivated). These hooks are called on the client side when entering and leaving the child component.

## Named View

> Introduced with Nuxt v2.4.0

`<nuxt-child/>` accepts `name` prop to render named-view:

```html
<template>
  <div>
    <nuxt-child name="top" />
    <nuxt-child />
  </div>
</template>
```

To see an example, take a look at the [named-views example](/examples/named-views).
