---
title: نتیجه گیری
description: تبریک می‌گوییم! شما اولین نرم افزار Nuxt.js خود را ساخته اید. شما حالا می‌توانید خودتان را یک Nuxter بدانید. اما همچنان چیز های زیادی وجود دارد که می‍‌توانید یاد بگیرید تا از همه ی قابلیت های Nuxt.js استفاده کنید. ما برای شما چند پیشنهاد داریم.
position: 4
category: get-started
questions:
  - question: اسم دایرکتوری که برای کار کردن Nuxt.js به آن نیاز دارید چیست؟
    answers:
      - nuxt
      - pages
      - index
    correctAnswer: pages
  - question: نام فایلی که به مانند یک شناسه منحصر به فرد برای پروژه شماست، چیست؟
    answers:
      - package.vue
      - package.json
      - package.js
    correctAnswer: package.json
  - question: دستوری که برای اجرا برنامه Nuxt.js در ترمینال وارد می‌کنیم چیست؟
    answers:
      - npm dev
      - npm run dev
      - nuxt dev
    correctAnswer: npm run dev
  - question: آدرس اینترنتی که برنامه Nuxt.js درحالت توسعه (development)، بروی آن اجرا می‌شود چیست ؟
    answers:
      - http://localhost:3000/
      - http://localhost:3000/project-name:3000
      - http://localhost:3000/nuxt:3000/
    correctAnswer: http://localhost:3000/
  - question: نام فایلی که تنظیمات(کانفیگ) برنامه در آن قرار می‌گیرد چیست؟
    answers:
      - nuxt.config.json
      - config.js
      - nuxt.config.js
    correctAnswer: nuxt.config.js
  - question: کدام دایرکتوری برای فایل های `.vue` نامناسب است ؟
    answers:
      - pages
      - static
      - components
    correctAnswer: static
  - question: کدام دایرکتوری محل قرار گیری استایل های برنامه است؟
    answers:
      - styles
      - components
      - assets
    correctAnswer: assets
  - question: فایل robot.txt و favicon در کدام دایرکتوری قرار می‌گیرد؟
    answers:
      - assets
      - components
      - static
    correctAnswer: static
  - question: برای مسیریابی در بین صفحه ها از کدام کامپوننت استفاده می‌کنیم؟
    answers:
      - '<Nuxt>'
      - '<RouterLink>'
      - '<NuxtLink>'
    correctAnswer: '<NuxtLink>'
  - question: 'کامپوننت `<NuxtLink> `برای لینک های داخلی متعلق به Nuxt.js استفاده می‌شود؟'
    answers:
      - True
      - False
    correctAnswer: True
---

تبریک می‌گوییم! شما اولین نرم افزار Nuxt.js خود را ساخته اید. شما حالا می‌توانید خودتان را یک Nuxter بدانید. اما همچنان چیز های زیادی وجود دارد که می‍‌توانید یاد بگیرید تا از همه ی قابلیت های Nuxt.js استفاده کنید. پیشنهاد ما برای شما:

<base-alert type="next">

پیشنهاد های ما:

</base-alert>

<base-alert type="next">

درباره ی مفهوم های Nuxt بیشتر بدانید [Concept book](../concepts/views)

</base-alert>

<base-alert type="next">

انتخاب بین روش های مختلف خروجی گرفتن [Rendering modes](/docs/2.x/features/rendering-modes)

</base-alert>

<base-alert type="star">

آیا به Nuxt.js علاقه‌مند شده اید؟ در گیت هاب پروژه ما را لایک کنید [star our project](https://github.com/nuxt/nuxt.js)

</base-alert>

<quiz :questions="questions"></quiz>
