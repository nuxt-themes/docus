---
title: مسیریابی
description: اکثر وبسایت ها بیشتر از یک صفحه خواهند داشت مانند تماس باما، درباره ما و... برای نمایش این صفحات در اپلیکیشن، نیاز به یک مسیر یاب داریم.
position: 2
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/02_routing?fontsize=14&hidenavigation=1&theme=dark
---

## ساخت صفحات نرم افزار به صورت خودکار

اکثر وبسایت ها بیشتر از یک صفحه خواهند داشت مانند: تماس باما، درباره ما و... برای نمایش این صفحات در اپلیکیشن، نیاز به یک مسیریاب داریم. به همین علت برای انجام این کار از کامپوننت `vue-router` استفاده می‌کنیم. در نرم افزار هایی که با فریمورک Vue نوشته شده اند برای استفاده از مسریاب، نیاز به ساخت یک فایل کانفیگ برای آن است (معمولا به اسم `router.js`). همچنین برای اینکه روتر به درستی کار کند. شما نیاز دارید تا صفحات و روت های خودت را به صورت دستی در فایل کانفیگ وارد کنید. اما Nuxt.js فایل کانفیگ `vue-router` را بر اساس فایل های با فرمت Vue که در در دایرکتوری `pages` ساخته اید، می‌سازد.

به زبان ساده تر، تنها کاری که نیاز به انجام است ساخت فایل با فرمت `.vue` در فولدر `pages` است.

<base-alert type="next">

درباره مسیریابی [بیشتر بدانید](/docs/2.x/features/file-system-routing)

</base-alert>

## جهت یابی

برای جابه‌جایی بین صفحات وبسایت، شما نیاز دارید تا از کامپوننت [NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component) استفاده کنید. این کامپوننت به صورت پیشفرض همراه با Nuxt.js نصب خواهد شد. به همین علت شما نیاز ندارید تا آن را در برنامه خود دوباره فراخوانی کنید. این کامپوننت به مانند تگ `<a>` در HTML است اما تنها تفاوتی که وجود دارد این است که به جای استفاده از `href="/about` از `to="/about` استفاده می‌کنیم. اگر در گذشته از `vue-router` استفاده کرده باشید، می‌توانید `<NuxtLink>` را به عنوان جایگزین برای `<RouterLink>` در نظر بگیرید.

یک لینک ساده که به صفحه `index.vue` در فولدر `pages`، اشاره می‌کند:

```html{}[pages/index.vue]
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```

برای لینک هایی که به صفحات برنامه شما اشاره می‌کنند، از `<NuxtLink>` استفاده کنید. اما اگر می‌خواهید تا به وبسایتی غیر از وبسایت خود لینک دهید، همچنان نیاز است تا از تگ `<a> استفاده کنید. به مثال زیر توجه کنید:

```html{}[pages/index.vue]
<template>
  <main>
    <h1>Home page</h1>
    <NuxtLink to="/about">
      About (internal link that belongs to the Nuxt App)
    </NuxtLink>
    <a href="https://nuxtjs.org">External Link to another page</a>
  </main>
</template>
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<base-alert type="next">

درباره کامپوننت NuxtLink [بیشتر بدانید](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

</base-alert>
