---
title: 'nuxt.renderRoute(route, context)'
description: Merender rute tertentu dengan konteks tertentu.
menu: renderRoute
category: internals-glossary
position: 11
---

- Tipe: `Function`
- Argumen:
  1. `String` : rute untuk dirender
  2. _Optional_, `Object`, konteks yang diberikan, kunci yang tersedia: `req` & `res`
- Kembalian: `Promise`
  - `html`: `String`
  - `error`: `null` atau `Object`
  - `redirected`: `false` atau `Object`

> Merender rute tertentu dengan konteks tertentu.

_Method_ ini harus digunakan sebagian besar untuk tujuan pengujian dan juga dengan [`nuxt.renderAndGetWindow`](/docs/2.x/internals-glossary/nuxt-render-and-get-window).

<base-alert>

`nuxt.renderRoute` harus dijalankan setelah proses _build_ dalam mode produksi.

</base-alert>

```js
const { loadNuxt, build } = require('nuxt')

async function start() {
  // Pastikan untuk  `nuxt build` berjalan sebelum menjalankan skrip init
  const nuxt = await loadNuxt({ for: 'start' })

  const { html, error, redirected } = await nuxt.renderRoute('/')

  // `html` akan selalu menjadi string

  // `error` tidak null saat tata letak kesalahan ditampilkan, format kesalahannya adalah:
  // { statusCode: 500, message: 'My error message' }

  // `redirected` tidak `false` ketika `redirect()` telah digunakan di `asyncData()` atau `fetch()`
  // { path: '/other-path', query: {}, status: 302 }
}

start()
```

### Apa berikutnya

<base-alert type="next">

Lihat [buku Komponen Glosarium](/docs/2.x/components-glossary/pages-fetch)

</base-alert>
