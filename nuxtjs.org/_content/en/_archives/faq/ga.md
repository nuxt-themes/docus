---
title: How to use Google Analytics?
description: How to use Google Analytics in my Nuxt app?
category: configuration
position: 9
---

First, please check the [official Google Analytics module](https://github.com/nuxt-community/analytics-module) for Nuxt.js.

Otherwise, to use [Google Analytics](https://www.google.com/analytics/) with your Nuxt.js application, we recommend you create a file `plugins/ga.js`:

```js
/* eslint-disable */

export default ({ app }) => {
  /*
   ** Only run on client-side and only in production mode
   */
  if (process.env.NODE_ENV !== 'production')
    return /*
     ** Include Google Analytics Script
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
   ** Set the current page
   */
  ga('create', 'UA-XXXXXXXX-X', 'auto')
  /*
   ** Every time the route changes (fired on initialization too)
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

> Replace `UA-XXXXXXXX-X` by your Google Analytics tracking ID.

Then, we tell Nuxt.js to import it in our main application:

`nuxt.config.js`

```js
export default {
  plugins: [{ src: '~plugins/ga.js', mode: 'client' }]
}
```

Voilà, Google Analytics is integrated into your Nuxt.js application and will track every page view!

<div class="Alert Alert--nuxt-green">

<b>Info:</b> you can use this method for any other tracking service.

</div>
