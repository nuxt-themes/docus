---
title: 'ویژگی scrollToTop'
description: ویژگی `scrollToTop` به شما این امکان را می‌دهد تا به Nuxt.js دستور دهید تا قبل از رندر کردن صفحه به بالای صفحه اسکرول کند.
menu: ویژگی scrollToTop
category: components-glossary
position: 0
---

> ویژگی `scrollToTop` به شما این امکان را می‌دهد تا به Nuxt.js دستور دهید تا قبل از رندر کردن صفحه به بالای صفحه اسکرول کند.

- **نوع:**: `Boolean` (به صورت پیشفرض `false`)

به صورت پیشفرض Nuxt.js وقتی به صفحه دیگری انتقال پیدا می‌کنید شما را به بالای صفحه انتقال (اسکرول) می‌دهد. اما در مورد مسیرهای فرزند Nuxt.js موقعیت اسکرول را حفظ می‌کند. اگر می‌خواهید به Nuxt.js بگویید تا شما را به بالای صفحه منتقل کند، مقدار ویژگی `scrollToTop` را برابر با `true` قرار دهید:

```html
<template>
  <h1>My child component</h1>
</template>

<script>
  export default {
    scrollToTop: true
  }
</script>
```

متقابلا می‌توانید به صورت دستی مقدار ویژگی `scrollToTop` را در مسیر‌های اصلی (مادر) برابر با `false` قرار دهید.

If you want to overwrite the default scroll behavior of Nuxt.js, take a look at the
اگر می‌خواهید رفتار پیشفرض Nuxt.js در مورد اسکرول کردن را تغییر دهید به [تنظیمات رفتار اسکرول](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior) مراجعه کنید.
