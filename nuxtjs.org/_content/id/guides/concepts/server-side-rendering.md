---
title: Rendering Sisi Server
description: Server-side rendering (SSR), adalah kemampuan aplikasi untuk berkontribusi dengan menampilkan halaman web di server alih-alih merendernya di browser.
position: 3
category: concepts
questions:
  - question: Jenis server apa yang Anda butuhkan untuk Rendering Sisi Server (SSR)?
    answers:
      - PHP server
      - JavaScript server
      - Node.js server
    correctAnswer: Node.js server
  - question: Apa yang Anda gunakan untuk memperluas dan mengontrol server?
    answers:
      - Middleware
      - ServerMiddleware
      - Tidak mungkin untuk mengontrol server
    correctAnswer: ServerMiddleware
  - question: Anda dapat meng-host aplikasi yang dirender di sisi server pada penyedia hosting tanpa server
    answers:
      - true
      - false
    correctAnswer: false
  - question: Apakah kami memiliki akses ke dokumen di sisi server?
    answers:
      - Ya, itu selalu tersedia
      - Tidak, Objek milik browser dan tidak tersedia di server
    correctAnswer: Tidak, Objek milik browser dan tidak tersedia di server
  - question: Kapan halaman Anda menjadi interaktif?
    answers:
      - Saat browser menerima HTML yang diberikan dari server
      - Saat Vue.js hydration dimulai
      - Saat browser mengirimkan permintaan awal
    correctAnswer: Saat Vue.js hydration dimulai
  - question: Navigasi antar halaman menggunakan <NuxtLink> di selesaikan di
    answers:
      - Sisi klien
      - Sisi server
    correctAnswer: Sisi klien
  - question: Sebutkan langkah yang benar?
    answers:
      - browser → server, server → browser, browser → browser
      - server → browser, browser → server, server → server
      - browser → server, server → browser, browser → server
    correctAnswer: browser → server, server → browser, browser → browser
---

Server-side rendering (SSR), adalah kemampuan aplikasi untuk berkontribusi dengan menampilkan halaman web di server alih-alih merendernya di browser. Sisi server mengirimkan halaman yang dirender sepenuhnya ke klien; bundel JavaScript klien mengambil alih yang kemudian memungkinkan aplikasi Vue.js untuk [hydrate](https://ssr.vuejs.org/guide/hydration.html).

## Server Node.js diperlukan

Lingkungan JavaScript diperlukan untuk merender halaman web Anda.

Server Node.js perlu dikonfigurasi untuk menjalankan aplikasi Vue.js Anda.

## Extend and control the server

Anda dapat memperluas server dengan serverMiddleware dan mengontrol rute dengan middleware.

```js{}[server-middleware/logger.js]
export default function (req, res, next) {
  console.log(req.url)
  next()
}
```

```js{}[nuxt.config.js]
export default: {
  serverMiddleware: [
     '~/server-middleware/logger'
  ]
}
```

Jika middleware server Anda terdiri dari daftar fungsi yang dipetakan ke jalur:

## Server vs lingkungan Browser

Karena Anda berada di lingkungan Node.js, Anda memiliki akses ke objek Node.js seperti `req` dan `res`. Anda tidak memiliki akses ke objek `window` atau `document` karena mereka termasuk dalam lingkungan browser. Namun Anda dapat menggunakan `window` atau `document` dengan menggunakan hook `beforeMount` atau `mounted`.

```js
beforeMount{
  window.alert('hello');
}
mounted{
  window.alert('hello');
}
```

## Langkah rendering sisi Server dengan Nuxt.js

### Langkah 1: Browser ke Server

Ketika browser mengirim permintaan awal, itu akan masuk ke server internal Node.js. Nuxt.js akan menghasilkan HTML dan mengirimkannya kembali ke browser dengan hasil dari fungsi yang dijalankan, mis. `asyncData`, `nuxtServerInit` atau `fetch`. Fungsi terkait juga dijalankan.

### Langkah 2: Server ke Browser

Browser menerima halaman yang dirender dari server dengan HTML yang dihasilkan. Konten ditampilkan dan Vue.js hydration masuk, membuatnya reaktif. Setelah proses ini, halaman menjadi interaktif.

### Langkah 3: Browser ke Browser

Navigasi antar halaman dengan [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) dilakukan di sisi klien sehingga Anda tidak memuat server lagi kecuali Anda menyegarkan ulang browser.

<quiz :questions="questions"></quiz>
