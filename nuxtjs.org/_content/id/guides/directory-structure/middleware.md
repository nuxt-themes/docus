---
title: middleware
description: Direktori `middleware` berisi aplikasi middleware Anda. Middleware memungkinkan Anda menentukan fungsi kustom yang dapat dijalankan sebelum merender halaman atau sekelompok halaman (layout).
position: 8
category: directory-structure
csb_link_anonymous: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_anonymous?fontsize=14&hidenavigation=1&theme=dark
csb_link_named: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_named?fontsize=14&hidenavigation=1&theme=dark
csb_link_router: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/09_middleware_router?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Middleware memungkinkan Anda menentukan fungsi yang dijalankan
    answers:
      - sebelum merender halaman
      - saat merender halaman
      - sesudah merender halaman
    correctAnswer: sebelum merender halaman
  - question: Di direktori mana Anda meletakkan middleware bersama?
    answers:
      - middleware
      - shared-middleware
      - shared
    correctAnswer: middleware
  - question: Argumen apa yang diterima middleware sebagai argumen pertama?
    answers:
      - req
      - res
      - context
    correctAnswer: context
  - question: Dalam mode universal, kapan middleware dipanggil?
    answers:
      - sisi peladen pada permintaan pertama dan sisi peladen saat menavigasi
      - sisi klien pada permintaan pertama dan sisi klien saat menavigasi
      - sisi peladen pada permintaan pertama dan sisi klien saat menavigasi
    correctAnswer: sisi peladen pada permintaan pertama dan sisi klien saat menavigasi
  - question: Ketika SSR disetel ke false, kapan middleware dipanggil?
    answers:
      - sisi peladen pada permintaan pertama dan sisi peladen saat menavigasi
      - sisi klien pada permintaan pertama dan sisi klien saat menavigasi
      - sisi peladen pada permintaan pertama dan sisi klien saat menavigasi
    correctAnswer: sisi klien pada permintaan pertama dan sisi klien saat menavigasi
  - question: Middleware dijalankan dalam urutan apa?
    answers:
      - halaman yang cocok ⇒ layout yang cocok ⇒ nuxt.config.js
      - nuxt.config.js ⇒ tata letak yang cocok ⇒ halaman yang cocok
      - tata letak yang cocok ⇒ halaman yang cocok ⇒ nuxt.config.js
    correctAnswer: nuxt.config.js ⇒ tata letak yang cocok ⇒ halaman yang cocok
  - question: Kunci apa yang kami gunakan untuk menambahkan middleware Anda ke setiap rute?
    answers:
      - middleware.router
      - router.middleware
      - routes.middleware
    correctAnswer: router.middleware
  - question: Anda dapat menambahkan beberapa middleware ke halaman atau tata letak tertentu?
    answers:
      - true
      - false
    correctAnswer: true
  - question: Bagaimana Anda menambahkan middleware bernama ini (`middleware/authentication.js`) ke halaman Anda?
    answers:
      - 'middleware: authenticated'
      - 'middleware: true'
      - "middleware: 'authenticated'"
    correctAnswer: "middleware: 'authenticated'"
  - question: Bagaimana Anda menggunakan middleware anonim, middleware hanya untuk halaman tertentu?
    answers:
      - buat middleware bernama dan simpan di direktori middleware
      - buat fungsi `middleware` untuk itu di komponen halaman
      - tambahkan file _.vue ke direktori middleware
    correctAnswer: buat fungsi `middleware` untuk itu di komponen halaman
---

Direktori `middleware` berisi aplikasi _middleware_ Anda. _Middleware_ memungkinkan Anda menentukan fungsi kustom yang dapat dijalankan sebelum merender halaman atau sekelompok halaman (_layout_).

_Shared Middleware_ harus ditempatkan di direktori `middleware/`. Nama berkas akan menjadi nama _middleware_ (`middleware/auth.js` akan menjadi _middleware_ `auth`). Anda juga dapat mendefinisikan middleware khusus halaman dengan menggunakan fungsi secara langsung, lihat [_middleware_ anonim](/docs/2.x/components-glossary/pages-middleware#anonymous-middleware).

Sebuah middleware menerima [_context_](/docs/2.x/internals-glossary/context) sebagai argumen pertama.

```js{}[middleware/user-agent.js]
export default function (context) {
  // Tambahkan properti userAgent ke context
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

Dalam mode _universal_, _middlewares_ akan dipanggil satu kali di sisi peladen (pada permintaan pertama ke aplikasi Nuxt, misalnya saat mengakses aplikasi secara langsung atau memuat ulang halaman) dan di sisi klien saat menavigasi ke rute lebih lanjut. Dengan `ssr: false`, _middlewares_ akan dipanggil di sisi klien dalam kedua situasi tersebut.

Middleware akan dijalankan secara seri dalam urutan ini:

1. `nuxt.config.js` (dalam urutan di dalam berkas)
2. Tata letak yang cocok
3. Halaman yang cocok

## Middleware _Router_

Middleware bisa menjadi _asynchronous_. Untuk melakukan ini, kembalikan `Promise` atau gunakan _async_/_await_.

```js{}[middleware/stats.js]
import http from 'http'

export default function ({ route }) {
  return http.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

Kemudian, di `nuxt.config.js` Anda, gunakan kunci `router.middleware`.

```js{}[nuxt.config.js]
export default {
  router: {
    middleware: 'stats'
  }
}
```

Sekarang middleware `stats` akan dipanggil untuk setiap perubahan rute.

Anda juga dapat menambahkan middleware (bahkan multipel) ke tata letak atau halaman tertentu.

```js{}[pages/index.vue / layouts/default.vue]
export default {
  middleware: ['auth', 'stats']
}
```

<app-modal>
  <code-sandbox  :src="csb_link_router"></code-sandbox>
</app-modal>

## Middleware bernama

Anda dapat membuat nama middleware dengan membuat berkas di dalam direktori `middleware/`, nama berkas akan menjadi nama middleware.

```js{}[middleware/authenticated.js]
export default function ({ store, redirect }) {
  // Jika pengguna tidak diautentikasi
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>Halaman rahasia</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

<app-modal>
  <code-sandbox  :src="csb_link_named"></code-sandbox>
</app-modal>

## Middleware anonim

Jika Anda perlu menggunakan middleware hanya untuk halaman tertentu, Anda dapat langsung menggunakan fungsi untuknya (atau serangkaian fungsi):

```html{}[pages/secret.vue]
<template>
  <h1>Halaman rahasia</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // Jika pengguna tidak diautentikasi
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```

<app-modal>
  <code-sandbox  :src="csb_link_anonymous"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
