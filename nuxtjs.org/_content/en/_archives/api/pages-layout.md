---
title: 'The layout Property'
description: Every file (first level) in the `layouts` directory will create a custom layout accessible with the layout property in the page component.
menu: layout
category: pages
position: 25
---

> Every file (first level) in the layouts directory will create a custom layout accessible with the layout property in the page component.

- **Type:** `String` or `Function` (default: `'default'`)

Use the `layout` key in your pages components to define which layout to use:

```js
export default {
  layout: 'blog',
  // OR
  layout(context) {
    return 'blog'
  }
}
```

In this example, Nuxt.js will include the `layouts/blog.vue` file as a layout for this page component.

Check the [demonstration video](https://www.youtube.com/watch?v=YOKnSTp7d38) to see it in action.

To understand how the layouts work with Nuxt.js, take a look at the [layout documentation](/guide/views#layouts).
