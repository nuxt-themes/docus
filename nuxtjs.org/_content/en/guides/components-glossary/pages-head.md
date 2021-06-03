---
title: 'The head Method'
description: Nuxt.js uses vue-meta to update the headers and HTML attributes of your application.
menu: Head Method
category: components-glossary
position: 0
---

> Nuxt.js uses [vue-meta](https://github.com/nuxt/vue-meta) to update the `headers` and `html attributes` of your application.

- **Type:** `Object` or `Function`

Use the `head` method to set the HTML Head tags for the current page.

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello World!'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }
  }
</script>
```

<base-alert type="info">

To avoid duplicated meta tags when used in child component, set up a unique identifier with the `hid` key for your meta elements ([read more](https://vue-meta.nuxtjs.org/api/#tagidkeyname)).

</base-alert>
