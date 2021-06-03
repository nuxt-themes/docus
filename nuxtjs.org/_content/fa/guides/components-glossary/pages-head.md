---
title: 'متد head'
description: Nuxt.js از vue-meta برای بروزرسانی هدر و مولفه‌های HTML در اپلیکیشن شما استفاده می‌کند.
menu: متد Head
category: components-glossary
position: 0
---

> Nuxt.js از [vue-meta](https://github.com/nuxt/vue-meta) برای بروزرسانی هدر و مولفه‌های HTML در اپلیکیشن شما استفاده می‌کند.

- **نوع:** `Object` یا `Function`

از متد `head` برای تنظیم تگ‌های Head در صفحه کنونی استفاده کنید.

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
