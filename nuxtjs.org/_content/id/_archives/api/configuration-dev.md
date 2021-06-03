---
title: 'API: Properti dev'
description: Menentukan mode pengembangan (development) atau produksi (production).
menu: dev
category: configuration
position: 106
---

# The Properti dev

- Type: `Boolean`
- Default: `true`

> Menentukan mode pengembangan (development) atau produksi (production).

Properti ini ditimpa oleh [perintah-perintah (commands) nuxt](/guide/commands) :

- `dev` akan menjadi `true` oleh `nuxt`
- `dev` akan menjadi `false` dengan perintah `nuxt build`, `nuxt start` dan `nuxt generate`

Properti ini hendaknya digunakan ketika menggunakan [nuxt.js secara programatik (programmatically)](/api/nuxt):

Contoh:

`nuxt.config.js`

```js
module.exports = {
  dev: process.env.NODE_ENV !== 'production'
}
```

`server.js`

```js
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// We instantiate Nuxt.js with the options
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  new Builder(nuxt).build()
}

// Listen the server
app.listen(port, '0.0.0.0').then(() => {
  console.log(`Server is listening on port: ${port}`)
})
```

Kemudian pada `package.json`:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "cross-env NODE_ENV=production node server.js"
  }
}
```

Catatan: Anda harus menjalankan `npm install --save-dev cross-env` pada contoh di atas supaya bisa bekerja. Jika Anda _tidak_ bekerja menggunakan Windows, Anda dapat mengabaikan cross-env dil uar dari script `start` milik Anda dan mengatur `NODE_ENV` secara langsung.
