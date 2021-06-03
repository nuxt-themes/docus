---
title: 'ویژگی layout'
description: هر فایل (در ریشه) پوشه `layouts` یک ساختار سفارشی قابل دسترس توسط ویژگی layout در کامپوننت صفحات ایجاد می‌کند.
menu: ویژگی Layout
category: components-glossary
position: 0
---

> هر فایل (در ریشه) پوشه `layouts` یک ساختار سفارشی قابل دسترس توسط ویژگی layout در کامپوننت صفحات ایجاد می‌کند.

- **نوع:** `String` یا `Function` (به صورت پیشفرض `'default'`)

برای تنظیم ساختار (layout) مورد استفاده در صفحه از کلیدواژه `layout` در کامپوننت صفحه استفاده کنید:

```js
export default {
  layout: 'blog',
  // OR
  layout(context) {
    return 'blog'
  }
}
```
