---
title: 'ویژگی loading'
description: ویژگی `loading` این امکان را می‌دهد تا نوار پیشرفت بارگزاری پیشفرض را در یک صفحه بخصوص غیرفعال کنید.
menu: ویژگی Loading
category: components-glossary
position: 0
---

> ویژگی `loading` این امکان را می‌دهد تا نوار پیشرفت بارگزاری پیشفرض را در یک صفحه بخصوص غیرفعال کنید.

- **Type:** `Boolean` (default: `true`)

Nuxt.js به صورت پیشفرض از کامپوننت خود برای نمایش نوار پیشرفت هنگام انتقال بین مسیرها استفاده می کند.

شما می‌توانید این نوار پیشرفت را به صورت کلی غیرفعال و یا از طریق [تنظیمات بارگیری](/docs/2.x/configuration-glossary/configuration-loading) سفارشی سازی کنید. همچنین می‌توانید این نوار پیشرفت را برای یک صفحه بخصوص از طریق تنظیم ویژگی `loading` به مقدار `false` غیرفعال کنید.

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
