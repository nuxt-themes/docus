---
title: 'Properti dev'
description: Menentukan mode pengembangan atau produksi.
menu: dev
category: configuration-glossary
position: 6
---

- Tipe: `Boolean`
- Bawaan: `true`

> Menentukan mode pengembangan atau produksi Nuxt.js.

Properti ini ditimpa oleh perintah nuxt:

- `dev` dipaksa menjadi` true` dengan `nuxt`
- `dev` dipaksa menjadi `false` dengan `nuxt build`, `nuxt start` dan `nuxt generate`

Properti ini harus digunakan saat menggunakan [Nuxt.js secara terprogram](/docs/2.x/internals-glossary/nuxt):

```js{}[nuxt.config.js]
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

```js{}[server.js]
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// Kami memberi contoh Nuxt.js dengan opsi
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build hanya dalam mode pengembangan
if (config.dev) {
  new Builder(nuxt).build()
}

// Memantau peladen
app.listen(port, '0.0.0.0').then(() => {
  console.log(`Peladen sedang memantau pada port: ${port}`)
})
```

```json{}[package.json]
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "NODE_ENV=production node server.js"
  }
}
```
