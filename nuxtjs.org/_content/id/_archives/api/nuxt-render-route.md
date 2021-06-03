---
title: 'API: nuxt.renderRoute(route, context)'
description: Me-render rute tertentu dengan konteks tertentu.
menu: renderRoute
category: programmatically
position: 203
---

# nuxt.renderRoute(route, context = {})

- Type: `Function`
- Argumen:
  1. `String` : rute untuk di-render
  2. _Optional_, `Object`, `context` yang diberikan, kunci yang tersedia: `req` & `res`
- Returns: `Promise`
  - `html`: `String`
  - `error`: `null` atau `Object`
  - `redirected`: `false` atau `Object`

> Me-render rute tertentu dengan konteks tertentu.

Metode ini kebanyakan digunakan untuk [tujuan pengujian](/guide/development-tools#end-to-end-testing) juga dengan [`nuxt.renderAndGetWindow`](/api/nuxt-render-and-get-window).

<div class="Alert Alert--orange">

`nuxt.renderRoute` dijalankan setelah proses pembangunan (build) dalam mode produksi (`dev: false`).

</div>

Contoh:

```js
const { Nuxt, Builder } = require('nuxt')

const config = require('./nuxt.config.js')
config.dev = false

const nuxt = new Nuxt(config)

new Builder(nuxt)
  .build()
  .then(() => nuxt.renderRoute('/'))
  .then(({ html, error, redirected }) => {
    // `html` will be always a string
    // `error` not null when the error layout is displayed, the error format is:
    // { statusCode: 500, message: 'My error message' }
    // `redirected` is not `false` when `redirect()` has been used in `data()` or `fetch()`
    // { path: '/other-path', query: {}, status: 302 }
  })
```
