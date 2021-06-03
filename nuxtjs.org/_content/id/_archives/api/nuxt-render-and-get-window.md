---
title: 'API: nuxt.renderAndGetWindow(url, options)'
description: Mendapatkan `window` dari URL tertentu dari Aplikasi Nuxt.js.
menu: renderAndGetWindow
category: programmatically
position: 204
---

# nuxt.renderAndGetWindow(url, options = {})

- Type: `Function`
- Argument: `String`
  1. `String`: URL untuk render
  2. _Optional_, `Object`: options
  - virtualConsole: `Boolean` (default: `true`)
- Returns: `Promise`
  - Returns: `window`

> Mendapatkan `window` dari URL tertentu dari Aplikasi Nuxt.js.

<div class="Alert Alert--orange">

Metode ini dibuat untuk [tujuan pengujian](/guide/development-tools#end-to-end-testing).

</div>

Untuk menggunakan fungsi ini, Anda harus menginstal `jsdom`:

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
  // Tampilkan `<title>` pada head
  console.log(window.document.title)
})
```
