---
title: 'متد validate'
description: Nuxt.js به شما این امکان را می‌دهد تا یک متد اعتبارسنجی داخل مسیرهای داینامیک خود تغریف کنید.
menu: متد Validate
category: components-glossary
position: 0
---

> Nuxt.js به شما این امکان را می‌دهد تا یک متد اعتبارسنجی داخل مسیرهای داینامیک خود تغریف کنید.

- **نوع:** `Function` یا `Async Function`

متد `validate` هر بار قبل از انتقال به مسیر جدید فراخوانی می‌شود. این متد در سمت سرور فقط یکبار (زمانی که اولین درخواست به اپلیکیشن Nuxt شما می‌رسد) و در سمت کاربر زمانی که به مسیرهای بعدی مراجعه می‌شود فراخوانی می‌شود. این متد مقدار [`context`](/docs/2.x/internals-glossary/context) را به عنوان پارامتر دریافت می‌کند.

```js
validate({ params, query, store }) {
  return true // if the params are valid
  return false // will stop Nuxt.js to render the route and display the error page
}
```

```js
async validate({ params, query, store }) {
  // await operations
  return true // if the params are valid
  return false // will stop Nuxt.js to render the route and display the error page
}
```

تابع شما میتواند یک promise را نیر برگرداند:

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
}
```

Nuxt.js به شما این اجازه را می‌دهد تا یک متد اعتبارسنجی داخل کامپوننت مسیر داینامیک خود تعریف کنید. (به عنوان مثال `pages/users/_id.vue`)

اگر متد مقدار `true` را برنگرداند Nuxt.js به صورت خودکار صحفه خطای ۴۰۴ را نمایش می‌دهد.

```js
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

همچنین می‌توانید به اطلاعات [store](/docs/2.x/directory-structure/store) خود دسترسی داشته باشید. (به عنوان مثال وقتی که این داده‌ها قبلا توسط [`nuxtServerInit`](/docs/2.x/directory-structure/store#the-nuxtserverinit-action) ایجاد شده باشند.)

```js
export default {
  validate({ params, store }) {
    // Check if `params.id` is an existing category
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

همچنین می‌توانید از خطاهای منتظره (expected) یا غیرمنتظره (unexpected) در متد اعتبارسنجی خود استفاده کنید:

```js
export default {
  async validate({ params, store }) {
    // Throws a 500 internal server error with custom message
    throw new Error('Under Construction!')
  }
}
```
