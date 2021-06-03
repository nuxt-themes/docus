---
title: 'Menggunakan Nuxt.js Secara Terprogram'
description: Anda dapat menggunakan Nuxt.js secara terprogram untuk menggunakannya sebagai _middleware_ yang memberi Anda kebebasan untuk membuat server sendiri untuk merender aplikasi web Anda.
menu: Using Nuxt Programmatically
category: internals-glossary
position: 9
---

Anda mungkin ingin menggunakan server Anda sendiri dengan _middleware_ dan API Anda. Itulah mengapa Anda dapat menggunakan Nuxt.js secara terprogram.

## Nuxt Konstrukor

Untuk melihat daftar opsi yang akan diberikan kepada Nuxt.js, lihat bagian konfigurasi.

```js
const { loadNuxt, build } = require('nuxt')

// Periksa apakah kita perlu menjalankan Nuxt dalam mode pengembangan
const isDev = process.env.NODE_ENV !== 'production'

// Siapkan instance Nuxt yang siap digunakan
const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

// Aktifkan live build & muat ulang di dev
if (isDev) {
  build(nuxt)
}

// Kita bisa menggunakan `nuxt.render (req, res)` atau `nuxt.renderRoute (route, context)`
```

Anda dapat melihatnya di [nuxt-express](https://github.com/nuxt/express) dan [adonuxt](https://github.com/nuxt/adonuxt) untuk pemula agar memulai dengan cepat.

### Catatan _Debug_

Jika Anda ingin menampilkan log Nuxt.js, Anda dapat menambahkan kode berikut ini ke bagian atas berkas Anda:

```js
process.env.DEBUG = 'nuxt:*'
```
