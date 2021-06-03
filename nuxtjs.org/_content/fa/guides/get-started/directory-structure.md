---
title: ساختار پوشه‌بندی
description: ساختار پوشه‌بندی Nuxt.js نقطه شروع قدرتمندی برای ساخت نرم افزار های کوچک تا بزرگ است. شما آزاد هستید که برنامه خود را هر طور که دوست دارید سازماندهی کنید و همچنین می‌توانید پوشه‌های دیگری را در هر زمان که به آن ها نیاز دارید، ایجاد کنید.
position: 3
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/03_directory_structure?fontsize=14&hidenavigation=1&theme=dark
---

ساختار پوشه‌بندی Nuxt.js نقطه شروع قدرتمندی برای ساخت نرم افزار های کوچک تا بزرگ است. شما آزاد هستید که برنامه خود را هر طور که دوست دارید سازماندهی کنید و همچنین می‌توانید پوشه‌های دیگری را در هر زمان که به آن ها نیاز دارید، ایجاد کنید.

بیایید دایرکتوری هایی که هنوز در پروژه ما وجود ندارند را ایجاد کنیم.

```bash
mkdir components assets static
touch nuxt.config.js
```

این ها پوشه و فایل های اصلی برای ساخت برنامه‌ های Nuxt.js هستند. توضیحات مربوط به هرکدام را در زیر خواهید یافت.

<base-alert type="info">

ساخت پوشه با اسم های یاد شده، ویژگی ها و قابلیت هایی را برای برنامه شما فعال خواهد کرد.

</base-alert>

## لیست پوشه‌ها

### پوشه page

پوشه `page` شامل صفحات و مسیر های برنامه شما است. همانطور که در توضیحات گذشته آموخته اید، Nuxt.js تمام فایل هایی که دارای فرمت `.vue` در این پوشه است را میخواند و از آن ها برای ساخت صفحات و مسیر های برنامه شما استفاده می‌کند.

<base-alert type="next">

درباره پوشه page [بیشتر بدانید](/docs/2.x/directory-structure/pages)

</base-alert>

### پوشه components

پوشه `components` جایی است که شما تمام کامپوننت های Vue.js خود را در آن قرار می‌دهید. شما می‌توانید بعدا از این کامپوننت ها در صفحات نرم افزار خود استفاده کنید.

با استفاده از Nuxt.js شما می‌توانید کامپوننت هایی را که ساخته اید به صورت اتوماتیک وارد صفحات .vue خود کنید. به این معنی که شما نیاز ندارید کامپوننت های خود را در هر صفحه به صورت دستی وارد کنید. اگر تنظیمات component را برابر true قرار دهید، Nuxt.js کامپوننت های شما را اسکن خواهد کرد و آن ها را به صورت اتوماتیک در صفحات شما، وارد خواهد کرد.

<base-alert type="next">

درباره پوشه component [بیشتر بدانید](/docs/2.x/directory-structure/components)

</base-alert>

### پوشه assets

پوشه `assets` شامل فایل های غیر کامپایل شده شما می‌باشد مانند: استایل ها، عکس ها و فونت ها.

<base-alert type="next">

درباره پوشه assets [بیشتر بدانید](/docs/2.x/directory-structure/assets)

</base-alert>

### پوشه static

پوشه `static` در محل روت سرور قرار خواهد گرفت و شامل فایل هایی خواهد شد که نیاز است اسم آن ها تغییر نکند و یا ثابت بماند ( مانند: `robot.txt`) _یا_ فایل هایی که تغییر نخواهند کرد (مانند: favicon)

<base-alert type="next">

درباره پوشه static [بیشتر بدانید](/docs/2.x/directory-structure/static)

</base-alert>

### فایل nuxt.config.js

فایل `nuxt.config.js` محل ذخیره سازی تنظیمات مربوط به اپلیکیشن Nuxt.js شماست. اگر می‌خواهید ماژول های جدید به برنامه اضافه کرده و یا تنظیمات پیشفرض را تغییر دهید، این فایل جایی است که میتوانید تغییرات را در آن اعمال کنید.

<base-alert type="next">

درباره فایل nuxt.config.js [بیشتر بدانید](/docs/2.x/directory-structure/nuxt-config)

</base-alert>

### فایل package.json

فایل `package.json` تمام وابستگی ها، پکیج ها و دستورات مربوط به نرم افزار شما را نگه داری می‌کند.

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## درباره ساختار پوشه‌بندی بیشتر بدانید

فایل ها و پوشه های مفید دیگری نیز وجود دارند که شامل: [content](/docs/2.x/directory-structure/content), [layouts](/docs/2.x/directory-structure/layouts), [middleware](/docs/2.x/directory-structure/middleware), [modules](/docs/2.x/directory-structure/modules), [plugins](/docs/2.x/directory-structure/plugins) و [store](/docs/2.x/directory-structure/store) می‌شوند. از آنجایی که این پوشه ها برای پروژه های کوچک ضروری نیستند. در این بخش به آن ها پرداخته نشده است.

<base-alert type="next">

برای آشنایی بیشتر با این پوشه ها و جزئیات آن ها، می‌توانید [کتاب ساختار پوشه بندی](/docs/2.x/directory-structure/nuxt) را مطالعه کنید.

</base-alert>
