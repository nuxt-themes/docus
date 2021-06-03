---
title: 'API: Properti render'
description: Nuxt.js memungkinkan Anda menyesuaikan opsi runtime untuk me-render halaman
menu: render
category: configuration
position: 122
---

# Properti Render

> Nuxt.js memungkinkan Anda menyesuaikan opsi runtime untuk me-render halaman

## bundleRenderer

- Type: `object`

> Gunakan opsi ini untuk menyesuaikan vue SSR (bundle renderer). Pilihan ini akan diabaikan pada mode spa.

```js
module.exports = {
  render: {
    bundleRenderer: {
      directives: {
        custom1(el, dir) {
          // something ...
        }
      }
    }
  }
}
```

Pelajari lebih lanjut tentang opsi yang tersedia pada [Referensi API Vue SSR](https://ssr.vuejs.org/en/api.html#renderer-options). Dianjurkan untuk tidak menggunakan opsi ini karena Nuxt.js sudah menyediakan standar SSR yang terbaik dan kesalahan konfigurasi dapat menyebabkan masalah SSR.

## etag

- Type: `object`
  - Default: `{ weak: true }`

Untuk menonaktifkan etag pada halaman gunakan `etag: false`

Lihat dokumentasi [etag](https://www.npmjs.com/package/etag) untuk opsi lainnya.

### gzip

- Type `object`
  - Default: `{ threshold: 0 }`

Lihat dokumentasi [compression](https://www.npmjs.com/package/compression) untuk opsi lainnya.

### http2

- Type `object`
  - Default: `{ push: false }`

Aktifkan header push HTTP2.

## resourceHints

- Type: `boolean`
  - Default: `true`

> Menambahkan link `prefetch` dan `preload` untuk membuka halaman awal menjadi lebih cepat.

Anda mungkin hanya ingin menonaktifkan opsi ini jika memiliki banyak halaman dan route.

## ssr

- Type: `boolean`
  - Default: `true` pada mode universal dan `false` pada mode spa

> Aktifkan render SSR

Pilihan ini diatur secara otomatis berdasarkan nilai `mode` jika tidak ditentukan. Ini bisa berguna untuk mengaktifkan/menonaktifkan SSR secara dinamis pada saat runtime setelah build image. (Dengan docker misalnya)

## static

- Type: `object`
  - Default: `{}`

Lihat dokumentasi [serve-static](https://www.npmjs.com/package/serve-static) untuk opsi lainnya.
