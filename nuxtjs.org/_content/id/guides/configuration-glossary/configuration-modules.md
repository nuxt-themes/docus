---
title: 'Properti modules'
description: Modul adalah ekstensi dari Nuxt.js yang dapat menambah fungsionalitas utama dari Nuxt.js dan menambah integrasi tanpa batas.
menu: modules
category: configuration-glossary
position: 19
---

- Tipe Data: `Array`

> Modul adalah ekstensi dari Nuxt.js yang dapat menambah fungsionalitas utama dari Nuxt.js dan menambah integrasi tanpa batas. [Pelajari Lebih Lanjut](/docs/2.x/directory-structure/modules)

Contoh (`nuxt.config.js`):

```js
export default {
  modules: [
    // Menggunakan nama paket
    '@nuxtjs/axios',

    // Relatif terhadap nilai srcDir pada proyek Anda
    '~/modules/awesome.js',

    // Menambahkan pengaturan
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // Definisi inline
    function () {}
  ]
}
```

Pengembang modul biasanya menyediakan langkah-langkah tambahan yang perlu dilakukan untuk menggunakan modul.

Nuxt.js akan berusaha untuk mencari setiap modul dalam _array_ `modules` menggunakan _require path_ milik node (yang ada dalam `node_modules`) dan akan mencari pada direktori yang ditunjuk oleh `srcDir` apabila alias `~` digunakan. Modul akan dieksekusi secara sekuensial sehingga urutan penulisan menjadi penting.

Modul harus mengekspor sebuah fungsi untuk meningkatkan kemampuan nuxt saat pembangunan kode program / _runtime_ dan dapat mengembalikan sebuah _Promise_ sampai pekerjaan yang modul tersebut lakukan selesai. Sebagai catatan, modul dibutuhkan saat _runtime_, sehingga kode dalam modul harus sudah ditranspilasi apabila Anda bergantung pada fitur ES6 modern.

Anda dapat membaca pada [panduan modul](/docs/2.x/directory-structure/modules) untuk mencari informasi lebih lanjut tentang cara kerja modul atau tertarik untuk mengembangkan modul Anda sendiri. Selain itu, kami juga sudah menyediakan bagian [modul](https://github.com/nuxt-community/awesome-nuxt#modules) resmi yang mampu menyajikan daftar modul yang layak digunakan dalam kode produksi yang dibuat oleh komunitas Nuxt.

## `buildModules`

<div class="Alert Alert--info">

Fitur ini tersedia sejak Nuxt versi 2.9

</div>

Beberapa modul hanya akan dibutuhkan saat proses pengembangan dan pembangunan kode perangkat lunak. Penggunaan `buildModules` akan mempercepat proses inisiasi kode produksi dan memperkecil ukuran `node_modules` yang dibutuhkan kode produksi secara signifikan. Anda dapat membaca dokumentasi pada setiap modul untuk mengetahui apakah modul tersebut sebaiknya disimpan dalam `modules` atau `buildModules`.

Perbedaan antara dua pilihan tersebut antara lain:

- Penambahan modul menggunakan `buildModules` dibandingkan `modules` dalam `nuxt.config.js`
- Penambahan modul pada `devDependencies` dibandingkan `dependencies` dalam `package.json` (`yarn add --dev` atau `npm install --save-dev`)
