---
title: 'ویژگی key'
description: جهت تنظیم ویژگی `key` در کامپوننت داخلی `<router-view>`
menu: ویژگی Key
category: components-glossary
position: 0
---

> جهت تنظیم ویژگی `key` در کامپوننت داخلی `<router-view>`

- **نوع:** `String` یا `Function`

ویژگی `key` در کامپوننت `<router-view>` جهت انتقال در داخل یک صفحه داینامیک و دیگر مسیرها استفاده می‌شود. `key`های متفاوت باعث رندر شدن کامپوننت صفحات می‌شوند.

راه‌های زیادی برای تنظیم ویژگی `key` وجود دارد. برای اطلاعات بیشتر به ویژگی `nuxtChildKey` در صفحه [کامپوننت Nuxt](/docs/2.x/features/nuxt-components) مراجعه کنید.

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```
