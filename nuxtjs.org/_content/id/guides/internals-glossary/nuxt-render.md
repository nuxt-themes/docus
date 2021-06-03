---
title: 'nuxt.render(req, res)'
description: Anda dapat menggunakan Nuxt.js sebagai middleware untuk server Node.js Anda.
menu: render
category: internals-glossary
position: 10
---

- Tipe: `Function`
- Argumen:
  1. [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- Kembalian : `Promise`

> Anda dapat menggunakan Nuxt.js sebagai middleware dengan `nuxt.render` untuk server node.js Anda.

Contoh dengan [Express](https://github.com/expressjs/express):

```js
const { loadNuxt, build } = require('nuxt')

const app = require('express')()
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function start() {
  // kita mendapatkan instance Nuxt
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  // Render setiap rute dengan Nuxt.js
  app.use(nuxt.render)

  // Build hanya dalam mode pengembang dengan hot-reload
  if (isDev) {
    build(nuxt)
  }
  // Dengarkan server
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}

start()
```

<div class="Alert">

Direkomendasikan untuk memanggil `nuxt.render` di akhir middleware Anda, karena ini akan menangani _rendering_ aplikasi web Anda dan tidak akan memanggil `next()`

</div>
