---
title: Kesimpulan
description: Selamat Anda telah membuat aplikasi Nuxt.js pertama Anda dan sekarang Anda dapat menganggap diri Anda seorang Nuxter. Namun masih banyak lagi yang harus dipelajari dan banyak lagi yang dapat Anda lakukan dengan Nuxt.js. Berikut ini beberapa rekomendasi.
position: 4
category: get-started
questions:
  - question: Apa nama direktori yang Anda perlukan agar Nuxt.js berfungsi?
    answers:
      - nuxt
      - pages
      - index
    correctAnswer: pages
  - question: Apa nama file ID proyek Anda?
    answers:
      - package.vue
      - package.json
      - package.js
    correctAnswer: package.json
  - question: Apa perintah yang Anda ketik di terminal untuk meluncurkan proyek Nuxt.js Anda?
    answers:
      - npm dev
      - npm run dev
      - nuxt dev
    correctAnswer: npm run dev
  - question: Apa alamat di _browser_ tempat Anda dapat melihat halaman Anda dalam mode pengembangan?
    answers:
      - http://localhost:3000/
      - http://localhost:3000/project-name:3000
      - http://localhost:3000/nuxt:3000/
    correctAnswer: http://localhost:3000/
  - question: Di mana Anda meletakkan konfigurasi Anda?
    answers:
      - nuxt.config.json
      - config.js
      - nuxt.config.js
    correctAnswer: nuxt.config.js
  - question: Direktori mana yang tidak cocok untuk file `.vue`?
    answers:
      - pages
      - static
      - components
    correctAnswer: static
  - question: Di direktori mana Anda meletakkan styles Anda?
    answers:
      - styles
      - components
      - assets
    correctAnswer: assets
  - question: Di direktori mana kita meletakkan robots.txt atau favicon?
    answers:
      - assets
      - components
      - static
    correctAnswer: static
  - question: Komponen apa yang kita gunakan untuk menavigasi antar halaman?
    answers:
      - '<Nuxt>'
      - '<RouterLink>'
      - '<NuxtLink>'
    correctAnswer: '<NuxtLink>'
  - question: '`<NuxtLink>` digunakan untuk tautan internal milik aplikasi Nuxt.js?'
    answers:
      - True
      - False
    correctAnswer: True
---

Selamat! Anda sekarang telah membuat aplikasi Nuxt.js pertama Anda dan sekarang Anda dapat menganggap diri Anda sebagai Nuxter, tetapi masih banyak yang harus dipelajari dan banyak lagi yang dapat Anda lakukan dengan Nuxt.js. Berikut beberapa rekomendasi:

<base-alert type="next">

Silakan lihat [Dokumentasi Concepts](../concepts/views)

</base-alert>

<base-alert type="next">

Berkerja dengan [asyncData](/docs/2.x/features/data-fetching#async-data)

</base-alert>

<base-alert type="next">

Memilih antara [Mode rendering](/docs/2.x/features/rendering-modes) yang berbeda

</base-alert>

<base-alert type="star">

Apakah Anda sejauh ini menyukai Nuxt.js? Jangan lupa untuk [membintangi proyek kami](https://github.com/nuxt/nuxt.js) di GitHub.

</base-alert>

<quiz :questions="questions"></quiz>
