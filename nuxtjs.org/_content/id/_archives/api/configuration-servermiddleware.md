---
title: 'API: Properti serverMiddleware'
description: Mendefinisikan middleware sisi-server.
menu: serverMiddleware
category: configuration
position: 127
---

# Properti serverMiddleware

- Tipe: `Array`
  - Item: `String` atau `Object` atau `Function`

Nuxt secara internal membuat sebuah instansi [connect](https://github.com/senchalabs/connect), jadi kita bisa mendaftarkan middleware ke stack-nya dan berkesempatan untuk menyediakan lebih banyak rute seperti API **tanpa perlu server eksternal**. Karena `connect` sendiri adalah sebuah middleware, middleware yang terdaftar akan bekerja baik di `nuxt start` dan juga ketika digunakan sebagai middleware dengan penggunaan terprogram seperti [express-template](https://github.com/nuxt-community/express-template). [Modules](/guide/modules) Nuxt juga dapat menyediakan `serverMiddleware` menggunakan [this.addServerMiddleware()](/api/internals-module-container#addservermiddleware-middleware-)

## serverMiddleware vs middleware!

Jangan bingung dengan [rute middleware](/guide/routing#middleware) yang dipanggil sebelum masing-masing rute oleh Vue di Sisi-Client atau Sisi-Server (SSR). `serverMiddleware` hanya berjalan di sisi-server **sebelum** vue-server-renderer dan dapat digunakan untuk tugas-tugas spesifik server seperti menangani permintaan API atau aset layanan (serving assets).

## Penggunaan

Jika middleware adalah String Nuxt.js akan mencoba untuk secara otomatis menyelesaikan (resolve) dan mensyaratkannya (require).

Contoh (`nuxt.config.js`):

```js
const serveStatic = require('serve-static')

module.exports = {
  serverMiddleware: [
    // Akan mendaftarkan paket npm redirect-ssl
    'redirect-ssl',

    // Akan mendaftarkan berkas dari direktori api proyek untuk menangani /api/*
    { path: '/api', handler: '~/api/index.js' },

    // Kita juga dapat membuat instansi sendiri (custom)
    { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ]
}
```

<div class="Alert Alert--danger">

<b>Mohon Diperhatikan! </b> Jika Anda tidak ingin middleware mendaftar ke semua rute, Anda harus menggunakan bentuk Object dengan jalur (path) tertentu, jika tidak, penanganan default nuxt tidak akan bekerja!

</div>

## Server Middleware Sendiri

Anda juga dapat menulis middleware sendiri. Untuk informasi lebih lanjut lihat [Dokumentasi Connect](https://github.com/senchalabs/connect#appusefn).

Middleware (`server-middleware/logger.js`):

```js
module.exports = function (req, res, next) {
  // req adalah obyek permintaan (request) http Node.js
  console.log(req.path)

  // res adalah obyek respon (response) http Node.js

  // next adalah sebuah function untuk memanggil middleware selanjutnya
  // Jangan lupa untuk memanggil next pada akhir middleware ketika middleware anda bukan sebuah titik pemberhentian (endpoint)!
  next()
}
```

Konfigurasi Nuxt (`nuxt.config.js`):

```js
serverMiddleware: ['~/api/logger']
```
