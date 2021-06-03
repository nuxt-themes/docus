---
title: 'nuxt.renderAndGetWindow(url, options)'
description: Dapatkan `window` dari URL tertentu dari Aplikasi Nuxt.js.
menu: renderAndGetWindow
category: internals-glossary
position: 12
---

- Tipe: `Function`
- Argument: `String`
  1. `String`: URL untuk dirender
  2. _Optional_, `Object`: opsi
  - Konsol virtual: `Boolean` (default: `true`)
- Kembalian: `Promise`
  - Kembalian: `window`

> Dapatkan window dari URL tertentu dari Aplikasi Nuxt.js.

<base-alert>

_Method_ ini dibuat untuk tujuan pengujian.

</base-alert>

Untuk menggunakan _function_ ini, Anda harus menginstal `jsdom`:

```bash
npm install --save-dev jsdom
```

Contoh:

```js
const { Nuxt, Builder } = require('nuxt')

const config = require('./nuxt.config.js')
config.dev = false

const nuxt = new Nuxt(config)

nuxt.renderAndGetWindow('http://localhost:3000').then(window => {
  // menampilkan head `<title>`
  console.log(window.document.title)
})
```
