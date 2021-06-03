---
title: 'ویژگی میان‌افزار'
description: جهت تنظیم میان افزار برای یک صفحه بخصوص در اپلیکیشن.
menu: ویژگی میان‌افزار
category: components-glossary
position: 0
---

- **نوع:** `String` یا `Array` یا `Function`
  - **آیتم‌ها**: `String` یا `Function`

جهت تنظیم میان افزار برای یک صفحه بخصوص در اپلیکیشن.

## میان‌افزارهای با نام

می‌توانید با ایجاد یک فایل داخل پوشه `middleware/` یک میان‌افزار با نام ایجاد کنید. نام این فایل به عنوان نام میان‌افزار در نظر گرفته خواهد شد.

```js{[middleware/authenticated.js]}
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

## میان‌افزارهای بی‌نام

در صورتی که می‌خواهید از یک میان‌افزار فقط برای یک صفحه بخصوص استفاده کنید، می‌توانید این میان‌افزار را به عنوان یک تابع و یا آرایه‌ای از توابع تعریف و مستقیما استفاده کنید:

```html{[pages/secret.vue]}
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```
