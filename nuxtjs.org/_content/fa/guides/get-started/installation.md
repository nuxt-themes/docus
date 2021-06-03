---
title: نصب و راه اندازی
description: شما در این بخش با نصب و راه اندازی Nuxt.js در 4 مرحله ساده، آشنا خواهید شد.
position: 1
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/01_installation?fontsize=14&hidenavigation=1&theme=dark
---

## پیش نیاز‌ها

شما در این بخش با نصب و راه اندازی Nuxt.js در 4 مرحله ساده، آشنا خواهید شد.

<base-alert type="info">

راه دیگر برای شروع کار با Nuxt.js، استفاده از [CodeSandbox](https://template.nuxtjs.org) است که یک راه سریع برای تست قابلیت های Nuxt.js و اشتراک گذاری کد با بقیه افراد است.

</base-alert>

### Node

[node](https://nodejs.org/en/download/) - حداقل v8.9.0

_ما به شما پیشنهاد می‌کنیم که آخرین نسخه را نصب کنید_

### ویرایشگر متن

می‌توانید از ویرایشگر متنی که با آن راحت هستید استفاده کنید، اما پیشنهاد ما [VSCode](https://code.visualstudio.com/) است.

### ترمینال

می‌توانید از ترمینالی که با آن راحت هستید استفاده کنید، اما پیشنهاد ما [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) است.

## ساخت پروژه جدید

ساخت یک پروژه Nuxt.js از صفر، تنها نیاز به یک فایل و فولدر دارد.

ما در این مثال از ترمینال برای ساخت فایل ها و فولدر های مورد نیاز پروژه استفاده خواهیم کرد. همچنین شما می‌توانید با استفاده از ادیتور متنی که استفاده می‌کنید، این کار را نیز انجام دهید.

### راه اندازی پروژه

برای شروع کافیست تا یک دایرکتوری خالی به اسم پروژه خود بسازید و وارد آن شوید:

```bash
mkdir <project-name>
cd <project-name>
```

_شما باید `<project-name>` را با اسم پروژه خود جایگذاری کنید._

سپس با دستور زیر یک فایل به اسم `package.json` بسازید:

```bash
touch package.json
```

فایل package.json خود را در ادیتور متن دلخواه خود باز کرده و کد JSON زیر را در آن وارد کنید:

```json{}[package.json]
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "start": "nuxt start"
  }
}
```

کلید `scripts` دستور های Nuxt.js را تعریف می‌کند. برای اجرا این دستورات می‌توانید از `npm run <command>` استفاده کنید.

#### **فایل package.json چیست؟**

فایل `package.json` مانند یک شناسه منحصر به فرد برای پروژه شماست. اگر شما درباره نحوه ی کارایی `package.json` اطلاع ندارید. ما به شدت به شما توصیه می‌کنیم نگاهی به مستندات [npm documentation](https://docs.npmjs.com/creating-a-package-json-file) بی‌اندازید.

### نصب کردن nuxt

بعد از اینکه فایل `package.json` ساخته شد، `nuxt` را از طریق `npm` یا `yarn` به پروژه اضافه کنید. مانند زیر:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add nuxt
```

  </code-block>
  <code-block label="npm">

```bash
npm install nuxt
```

  </code-block>
</code-group>

این دستور، `nuxt` را به عنوان وابستگی به پروژه شما اضافه خواهد کرد. همچنین این وابستگی به صورت اتوماتیک به فایل `package.json` نیز اضافه خواهد شد. همچنین دایرکتوری `node_module` نیز ساخته خواهد شد که محل ذخیره پکیج های نصب شده و وابستگی های آن ها در پروژه، می‌باشد.

<base-alert type="info">

همچنین یک فایل `yarn.lock` یا `package-lock.json` نیز ساخته خواهد شد که نصب پایدار و سازگاری وابستگی پکیج های شما را در پروژه، تضمین خواهد کرد.

</base-alert>

### ساخت اولین صفحه

Nuxt.js تمام فایل های `*.vue` در دایرکتوری `pages` را به route های برنامه شما تبدیل می‌کند.

ساخت دایرکتوری `pages` در پروژه:

```bash
mkdir pages
```

سپس فایل `index.vue` را در دایرکتوری `pages` بسازید:

```bash
touch pages/index.vue
```

این مهم است که این صفحه `index.vue` نامیده شود. زیرا این فایل به عنوان صفحه پیشفرضی است که درهنگام اجرا شدن Nuxt نمایش داده خواهد شد. این صفحه‌ی اصلی (خانه) است و باید index نامیده شود.

صفحه `index.vue` را در ادیتور متن خود باز کرده و کد زیر را در آن قرار دهید:

```html{}[pages/index.vue]
<template>
  <h1>Hello world!</h1>
</template>
```

### راه اندازی پروژه

برنامه خود را با وارد کردن کد زیر در خطر فرمان (ترمینال)، اجرا کنید:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
npm run dev
```

  </code-block>
</code-group>

<base-alert type="info">

از فرمان dev زمانی استفاده می‌شود که میخوام نرم افزار را در حالت توسعه (development) اجرا کنیم.

</base-alert>

برنامه هم اکنون در آدرس **[http://localhost:3000](http://localhost:3000/)** در حال اجرا است.

با کلیک بروی لینک در ترمینال، آدرس را در مرورگر خود باز کنید. خواهید دید که متن "Hello World" که در مراحل قبلی کپی شد. بروی صفحه نمایش داده خواهد شد.

<base-alert type="info">

زمانی که Nuxt.js را در حالت توسعه (development) اجرا می‌کنید، Nuxt.js تغییرات فایل های درون اکثر دایرکتوری ها را، تشخیص خواهد داد. به همین علت نیاز نیست که مثلا برای اضافه کردن صفحه جدید به برنامه خود، برنامه را دوباره راه اندازی کنید.

</base-alert>

<base-alert type="warning">

زمانی که دستور dev را اجرا می‌کنید. یک دایرکتوری به اسم .nuxt ساخته خواهد شد. این دایرکتوری باید توسط version control نادیده گرفته شود. شما می‌توانید با ساخت فایل .gitignore در روت دایرکتوری پروژه و اضافه کردن .nuxt به آن،فایل ها را نادیده بگیرید.

</base-alert>

### مراحل اضافی

یک صفحه به اسم `fun.vue`، در دایرکتوری `pages` بسازید.

یک `<template></template>` بسازید که شامل یک متن طنز در درون آن باشد.

سپس وارد مرورگر شوید و صفحه ی جدیدی را که ساخته‌اید مشاهده کنید **[http://localhost:3000/fun](http://localhost:3000/fun)**.

<base-alert type="info">

یک دایرکتوری به اسم `more-fun` ایجاد کنید و در درون آن یک فایل به اسم `index.vue` ایجاد کنید. خروجی این روش با ساخت `more-fun.vue` یکی خواهد بود.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## استفاده از create-nuxt-app

برای شروع سریع می‌توانید از [create-nuxt-app](https://github.com/nuxt/create-nuxt-app) استفاده کنید.

مطمئن شوید که npx بروی سیستم شما نصب باشد (npx به صورت پیشفرض با npm از نسخه 5.2.0 به بعد، منتشر شده است) یا npm نسخه 6.1 و یا yarn.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create nuxt-app <project-name>
```

  </code-block>
  <code-block label="npx">

```bash
npx create-nuxt-app <project-name>
```

  </code-block>
    <code-block label="npm">

```bash
npm init nuxt-app <project-name>
```

  </code-block>

</code-group>

npx از شما سوال هایی خواهد پرسید (اسم، تنظیمات Nuxt، فریمورک های رابط کاربری، تایپ‌اسکریپت، لینتر‌ها، فریمورک های تست و...) زمانی که به سوالات پاسخ بدهید، npx تمام وابستگی ها و پکیج های مربوط به پروژه را نصب خواهد کرد. پس از آن تنها کاری که باید بکنید این است که وارد دایرکتوری پروژه خود شوید و آن را اجرا کنید:

<code-group>
  <code-block label="Yarn" active>

```bash
cd <project-name>
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
cd <project-name>
npm run dev
```

  </code-block>
</code-group>

نرم افزار شما بروی [http://localhost:3000](http://localhost:3000) قابل دسترسی است. آفرین
