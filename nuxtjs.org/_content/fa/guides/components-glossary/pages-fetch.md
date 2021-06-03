---
title: 'متد fetch'
description: متد `fetch` برای بارگزاری اطلاعات در store قبل از رندر شدن صفحه استفاده می شود. عملکردی مشابه `asyncData` دارد با تفاوت اینکه داده‌های کامپوننت را تنظیم نمی‌کند.
menu: متد fetch
category: components-glossary
position: 0
---

## Nuxt >= 2.12

نسخه `2.12` Nuxt.js هوک جدیدی به نام `fetch` را **در تمامی کامپوننت‌های Vue** در اختیار شما قرار می‌دهد.

<base-alert>

متد `fetch(context)` منسوح شده است، به جای آن میتوانید از یک [میان افزار](/docs/2.x/components-glossary/pages-middleware#anonymous-middleware) در صفحات خود استفاده کنید: `middleware(context)`

</base-alert>

### چه موقع از fetch استفاده کنیم؟

هرگاه بخواهید داده‌هایی **غیرهمزمان** (asynchronous) متد `fetch` در سمت سرور هنگامی که مسیر در حال رندر و یا در سمت سرور وقتی که کاربر در حال هدایت است فراخوانی می‌شود.

It exposes `$fetchState` at the component level:
این متد از `$fetchState‍` استفاده می کند:

- `$fetchState.pending`: از نوع `Boolean`, می‌تواند برای نمایش یک placeholder استفاده شود وقتی که fecth در سمت کاربر در حال استفاده است
- `$fetchState.error`: از نوع `null` یا `Error`, می‌تواند برای نمایش پیام خطا استفاده شود
- `$fetchState.timestamp`: از نوع `Integer`, یک تایم‌استمپ از آخرین fetch است. می‌تواند برای استفاده در کش (cache) با استفاده از `keep-alive` مفید باشد

اگر می‌خواهید هوک `fetch` را در قالب خود فراخوانی کنید:

```html
<button @click="$fetch">Refresh</button>
```

یا با استفاده از متد کامپوننت:

```javascript
// from component methods in script section
export default {
  methods: {
    refresh() {
      this.$fetch()
    }
  }
}
```

می‌توانید به [context](/docs/2.x/internals-glossary/context) فریم‌ورک Nuxt داخل هوک fetch با استفاده از `this.$nuxt.context` دسترسی داشته باشید.

### تنظیمات

- `fetchOnServer`: از نوع `Boolean` یا `Function` (به صورت پیشفرض `true`)، تنظیم جهت فراخوانی `fetch()` زمانی که صفحات در سمت سرور رندر می‌شوند
- `fetchDelay`: از نوع `Integer` (به صورت پیشفرض `۲۰۰`)، جهت تنظیم حداقل زمان اجرا به میلی ثانیه

<div class="Alert Alert--green">
  
زمانی که `fetchOnServer` مقدار `false` (یا تابعی که نتیجه آن مقدار `false` باشد) داشته باشد، تابع `fetch` تنها در سمت کاربر فراخوانی می‌شود و `$fetchState.pending` مقدار `true` را زمانی که صفحه در حال رندر در سمت سرور است را برخواهد گرداند.

</div>

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await this.$http.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    },
    fetchOnServer: false
  }
</script>
```
