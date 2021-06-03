---
title: 'The loading Property'
description: The `loading` property gives you the option to disable the default loading progress bar on a specific page.
menu: Loading Property
category: components-glossary
position: 0
---

> The loading property gives you the option to disable the default loading progress bar on a specific page.

- **Type:** `Boolean` (default: `true`)

By default, Nuxt.js uses its own component to show a progress bar between the routes.

You can disable or customize it globally through the [Configuration's loading option](/docs/2.x/configuration-glossary/configuration-loading), but also disable it for specific pages by setting the `loading` property to `false` :

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
