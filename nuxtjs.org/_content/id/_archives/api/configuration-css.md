---
title: 'API: Properti css'
description: Nuxt.js memungkinkan Anda menentukan file/modules/libraries CSS yang ingin Anda atur secara global (disertakan pada setiap halaman).
menu: css
category: configuration
position: 104
---

# Properti css

> Nuxt.js memungkinkan Anda menentukan file/modules/libraries CSS yang ingin Anda atur secara global (disertakan pada setiap halaman).

Jika Anda ingin menggunakan `sass` pastikan Anda telah menginstal paket `sass` dan `sass-loader`. Jika belum, instal saja:

```sh
npm install --save-dev sass sass-loader fibers
```

- Type: `Array`
- Items: `String`

Pada file `nuxt.config.js`, tambahkan sumber CSS:

```js
module.exports = {
  css: [
    // Masukan node module secara langsung (di sini adalah file SASS)
    'bulma',
    // file CSS di dalam proyek
    '@/assets/css/main.css',
    // file SCSS di dalam proyek
    '@/assets/css/main.scss'
  ]
}
```

Nuxt.js secara otomatis akan membaca jenis file dengan ekstensi itu dan menggunakan pemroses pra-prosesor yang sesuai untuk webpack. Anda masih perlu menginstal loader yang diperlukan jika Anda perlu menggunakannya.
