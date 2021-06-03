---
title: 'Properti CSS'
description: Nuxt.js mengizinkan kamu untuk menentukan berkas/modul/pustaka CSS yang ingin kamu atur secara global (disertakan dalam setiap halaman).
menu: css
category: configuration-glossary
position: 4
---

> Nuxt.js mengizinkan kamu untuk menentukan berkas/modul/pustaka CSS yang ingin kamu atur secara global (disertakan dalam setiap halaman).

Jika kamu ingin menggunakan `sass` pastikan kamu telah menginstal _package_ `sass` dan `sass-loader`. Jika belum, maka

```sh
npm install --save-dev sass sass-loader fibers
```

<base-alert type="info">Kompilasi sinkron dengan `sass` (peningkatan kecepatan 2x) [diaktifkan secara otomatis](https://github.com/webpack-contrib/sass-loader) ketika `fibers` telah terinstal.</base-alert>

- Tipe: `Array`
  - Item: `string`

```js{}[nuxt.config.js]
export default {
  css: [
    // Memuat modul Node.js secara langsung (Ini adalah berkas Sass)
    'bulma',
    // Berkas CSS dalam proyek
    '@/assets/css/main.css',
    // Berkas SCSS dalam proyek
    '@/assets/css/main.scss'
  ]
}
```

Nuxt.js secara otomatis akan menentukan jenis berkas berdasarkan ekstensinya dan menggunakan pemuat pra-prosesor yang sesuai untuk _webpack_. Kamu masih perlu menginstal pemuat yang diperlukan jika kamu perlu menggunakannya

### Ekstensi Gaya

Kamu bisa menghilangkan ekstensi berkas untuk berkas CSS/SCSS/Postcss/Less/Stylus/... yang terdapat dalam larik css di berkas konfigurasi nuxt.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

<base-alert>

Jika kamu memiliki dua berkas dengan nama yang sama mis. `main.scss` dan` main.css`, dan tidak menentukan ekstensi dalam larik css, mis. `css: ['~/assets/css/main']`, maka hanya satu berkas yang akan dimuat, tergantung pada urutan `styleExtensions`. Dalam kasus ini, hanya berkas `css` yang akan dimuat dan berkas `scss` akan diabaikan karena `css` berada di urutan pertama dalam larik `styleExtension` bawaan.

</base-alert>

Urutan bawaan: `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`
