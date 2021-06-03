---
title: 'ویژگی watchQuery'
description: بر رشته‌های پرس‌و‌جو (query strings) نظارت کنید و در صورت تغییر آن‌ها متدهای کامپوننت را اجرا کنید (asyncData, fetch(context), validate, layout, ...).
menu: ویژگی watchQuery
category: components-glossary
position: 0
---

> بر رشته‌های پرس‌و‌جو (query strings) نظارت کنید و در صورت تغییر آن‌ها متدهای کامپوننت را اجرا کنید (asyncData, fetch(context), validate, layout, ...).

- **نوع:** `Boolean` یا `Array` یا `Function` (به صورت پیشفرض `[]`)

از ویژگی `watchQuer` جهت ایجاد یک نظاره‌گر (watcher) برای رشته‌های پرس‌و‌جو (query strings) استفاده کنید. اگر رشته تعریف شده تغییر کنید تمامی متدهای کامپوننت (asyncData, fetch(context), validate, layout, ...) فراخوانی می‌شوند. نظاره بر این پارامترها به صورت پیشفرض جهت بهینه کردن عملکرد اپلیکیشن غیرفعال شده است.

اگر می‌خواهید برای تمامی رشته‌های پرس‌و‌جو نظاره کنید، از `watchQuery: true` استفاده کنید.

```js
export default {
  watchQuery: ['page']
}
```

همچنین می‌توانید از تابع `watchQuery(newQuery, oldQuery)` برای تعریف نظاره‌گرهای دقیق‌تر استفاده کنید.

```js
export default {
  watchQuery(newQuery, oldQuery) {
    // Only execute component methods if the old query string contained `bar`
    // and the new query string contains `foo`
    return newQuery.foo && oldQuery.bar
  }
}
```

<base-alert>

**هشدار:** `watchQuery` بر روی متد جدید `fetch` که در نسخه ۲.۱۲ اضافه شده است تاثیری ندارد. برای اطلاعات بیشتر به [نظاره بر تغییرات رشته پرس‌و‌جو](/docs/2.x/features/data-fetching#the-fetch-hook) مراجعه کنید.

</base-alert>
