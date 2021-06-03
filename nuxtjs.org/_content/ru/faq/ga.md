---
title: Интеграция Google Analytics
description: Как использовать Google Analytics?
category: configuration
position: 9
---

# Как использовать Google Analytics?

Вы можете использовать [официальный модуль Google Analytics](https://github.com/nuxt-community/analytics-module) для Nuxt.js.

В другом случае, чтобы использовать [Google Analytics](https://www.google.com/analytics/) с вашим Nuxt.js приложением, мы рекомендуем создать новый файл `plugins/ga.js`:

```js
/* eslint-disable */

export default ({ app }) => {
  /*
   ** Будет работать только на стороне клиента и только когда режим разработки будет "production"
   */
  if (process.env.NODE_ENV !== 'production')
    return /*
     ** Подключаем скрипт Google Analytics
     */
  ;(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r
    ;(i[r] =
      i[r] ||
      function () {
        ;(i[r].q = i[r].q || []).push(arguments)
      }),
      (i[r].l = 1 * new Date())
    ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  )
  /*
   ** Устанавливаем текущую страницу
   */
  ga('create', 'UA-XXXXXXXX-X', 'auto')
  /*
   ** Вызывается каждый раз после смены роута (при инициализации тоже)
   */
  app.router.afterEach((to, from) => {
    /*
     ** We tell Google Analytics to add a `pageview`
     */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
```

> Строку `UA-XXXXXXXX-X` следует заменить на идентификатор ресурса Google Analytics (его также называют "идентификатором отслеживания").

Затем, мы скажем Nuxt.js, что его нужно импортировать в наше приложение:

`nuxt.config.js`

```js
module.exports = {
  plugins: [{ src: '~plugins/ga.js', mode: 'client' }]
}
```

Вот и всё, Google Analytics интегрирована и теперь будет отслеживать каждый просмотр страницы!

<div class="Alert Alert--nuxt-green">

<b>Информация:</b> вы можете использовать этот метод для любой другой службы отслеживания/веб-аналитики.

</div>
