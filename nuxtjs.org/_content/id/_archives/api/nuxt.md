---
title: 'API: Nuxt(pilihan)'
description: Anda dapat menggunakan Nuxt.js secara terprogram untuk menggunakannya sebagai middleware yang memberi Anda kebebasan untuk membuat server Anda sendiri untuk me-render aplikasi web Anda.
menu: Usage
category: programmatically
position: 201
---

# Menggunakan Nuxt.js secara Terprogram

Anda mungkin ingin menggunakan server sendiri dengan middleware dan API sendiri. Itu sebabnya Anda bisa menggunakan Nuxt.js secara terprogram.

Anda bisa require Nuxt.js seperti ini:

```js
const { Nuxt, Builder } = require('nuxt')
```

## Konstruktor Nuxt

Untuk melihat daftar pilihan yang dapat diberikan ke Nuxt.js, lihat bagian konfigurasi.

```js
// Require modul `Nuxt` dan `Builder`
const { Nuxt, Builder } = require('nuxt')

// Require konfig Nuxt
const config = require('./nuxt.config.js')

// Membuat sebuah instance Nuxt baru
const nuxt = new Nuxt(config)

// Mengaktifkan pembangunan langsung (live build) & pemuatan ulang (reloading) di dev
if (nuxt.options.dev) {
  new Builder(nuxt).build()
}

// Kita dapat menggunakan `nuxt.render(req, res)` atau `nuxt.renderRoute(route, context)`
```

Anda dapat melihat/menggunakan [nuxt-express](https://github.com/nuxt/express) dan [adonuxt](https://github.com/nuxt/adonuxt) untuk memulai dengan cepat.

### Debug log

Jika Anda ingin menampilkan log Nuxt.js, Anda dapat menambahkannya ke bagian atas dari file Anda:

```js
process.env.DEBUG = 'nuxt:*'
```
