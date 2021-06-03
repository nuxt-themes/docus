---
title: Nuxt Lifecycle
description: Apa pun alat yang Anda gunakan, Anda akan selalu merasa lebih percaya diri saat memahami cara kerja alat di balik terpal. Hal yang sama berlaku untuk Nuxt.js.
position: 5
category: concepts
img: /docs/2.x/nuxt-lifecycle.svg
imgAlt: understanding-nuxt-2-12-lifecycle-hooks
questions:
  - question: Kapan Nuxt.js lifecycle dimulai?
    answers:
      - Saat respon akan dikirim ke klien
      - Setelah fase build
      - Saat menjalankan nuxt dev
    correctAnswer: Setelah fase build
  - question: Dimana faktor utama konten ke lifecycle bergantung?
    answers:
      - Waktu dan tanggal yang kita miliki saat memulai server
      - Jika rendering sisi server diaktifkan dan jika demikian, jenis manapun yang digunakan
      - Jenis OS yang menjalankan aplikasi Nuxt.js
    correctAnswer: Jika rendering sisi server diaktifkan dan jika demikian, jenis manapun yang digunakan
  - question: Kapan waktu nuxtServerInit dipanggil?
    answers:
      - Server-side dan client-side
      - Setalah Vue hydration
      - Hanya di server-side
    correctAnswer: Hanya di server-side
  - question: Sebutkan 3 jenis middleware?
    answers:
      - Global, Layout, Route
      - Global, Layout, Page
      - Global, Group, Route
    correctAnswer: Global, Layout, Route
  - question: Langkah apa yang hanya dapat terjadi di sisi klien?
    answers:
      - Vue Hydration
      - Eksekusi middleware
      - Memanggil fungsi fetch
    correctAnswer: Vue Hydration
  - question: Langkah mana yang tidak pernah terjadi di sisi klien?
    answers:
      - Eksekusi asyncData
      - Eksekusi serverMiddleware
      - Eksekusi fetch
    correctAnswer: Eksekusi serverMiddleware
  - question: Metode Vue mana yang dipanggil di kedua sisi ini, server dan sisi klien?
    answers:
      - mounted dan beforeMount
      - beforeDestroy dan destroyed
      - created dan beforeCreate
    correctAnswer: created dan beforeCreate
  - question: Langkah apa yang tidak terjadi setelah navigasi melalui <NuxtLink>?
    answers:
      - Memanggil fetch
      - Eksekusi client-side Nuxt.js plugins
      - Memanggil beforeCreate
    correctAnswer: Eksekusi client-side Nuxt.js plugins
  - question: Apa perbedaan khusus antara asyncData dan fetch setelag navigasi melalui <NuxtLink>?
    answers:
      - asyncData lebih cepat dari fetch
      - asyncData dipanggil setelah fetch
      - asyncData memblokir sementara fetch tidak
    correctAnswer: asyncData memblokir sementara fetch tidak
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Apa pun alat yang Anda gunakan, Anda akan selalu merasa lebih percaya diri saat memahami cara kerja alat di balik terpal. Hal yang sama berlaku untuk Nuxt.js. Tujuan dari bab ini adalah untuk memberi Anda gambaran umum terkait tingkat tinggi tentang berbagai bagian kerangka kerja, urutan pelaksanaannya, dan cara kerjanya.

Lifecycle Nuxt.js menjelaskan apa yang terjadi setelah fase build, di mana aplikasi Anda dibundel, dipotong, dan diminimalkan. Apa yang terjadi setelah fase ini bergantung pada apakah Anda mengaktifkan rendering sisi server atau tidak. Jika sudah, selanjutnya tergantung pada jenis rendering sisi server yang Anda pilih:

SSR dinamis (`nuxt start`)

atau Static Site Generation (`nuxt generate`).

## Lifecycle

### Server

Untuk SSR, langkah-langkah ini akan dijalankan untuk setiap permintaan awal ke aplikasi Anda

- Memulai server (`nuxt start`)

Saat menggunakan pembuatan situs statis, langkah server hanya dijalankan pada waktu pembuatan, tetapi sekali untuk setiap halaman yang akan dibuat

- Proses pembuatan dimulai dengan (`nuxt generate`)

- Nuxt hooks
- serverMiddleware
- Plugin Nuxt Server-side

  - Dapat di urutan seperti yang didefinisikan dalam nuxt.config.js

- nuxtServerInit

  - Vuex action yang hanya dipanggil di server-side untuk mengisi store
  - Argumen pertamag adalah **Vuex context**, Argumen kedua adalah **Nuxt.js context**
    - Kirim tindakan lain dari sini → hanya "entry point" untuk store actions selanjutnya di server-side
  - Hanya dapat didefinisikan dalam `store/index.js`

- Middleware

  - Global middleware
  - Layout middleware
  - Route middleware

- asyncData
- beforeCreate (metode Vue lifecycle)
- created (metode Vue lifecycle)
- fetch baru (top to bottom, siblings = parallel)
- Serialisasi state (`render:routeContext` Nuxt.js hook)

- Rendering HTML terjadi (`render:route` Nuxt.js hook)

- `render:routeDone` hook ketika HTML telah dikirim ke browser

- `generate:before` Nuxt.js hook
- File HTML dibuat
  - **Full static generation**
    - Misalnya static payloads are extracted
  - `generate:page` (HTML editable)
  - `generate:routeCreated` (Route generated)
- `generate:done` ketika semua file HTML telah dibuat

### Client

Bagian lifecycle ini sepenuhnya dijalankan di browser, apa pun mode Nuxt.js yang Anda pilih.

- Menerima HTML
- Memuat assets (misalnya Javascript)
- Vue Hydration
- Middleware
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (blocking)
- client-side Nuxt.js plugin
  - Dapat di urutan seperti yang didefinisikan dalam nuxt.config.js
- beforeCreate (metode Vue lifecycle)
- created (metode Vue lifecycle)
- fetch beru (top to bottom, siblings = parallel) (non-blocking)
- beforeMount (metode Vue lifecycle)
- mounted (metode Vue lifecycle)

### Navigasi menggunakan komponen NuxtLink

Sama seperti bagian untuk _client_, semuanya terjadi di browser tetapi hanya saat navigasi melalui `<NuxtLink>`. Selain itu, tidak ada konten halaman yang ditampilkan hingga semua tugas _blocking_ dipenuhi.

<base-alert type="info">

Lihat bab komponen untuk melihat info lebih lanjut [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component)

</base-alert>

- middleware (blocking)
  - Global middleware
  - Layout middleware
  - Route middleware
- asyncData (blocking)
- asyncData (blocking) [atau memuat seluruh static]
- beforeCreate & created (metode Vue lifecycle)
- fetch (non-blocking)
- beforeMount & mounted

### Apa selanjutnya

<base-alert type="next">

Lihat di [Features book](/docs/2.x/features/rendering-modes)

</base-alert>

<quiz :questions="questions"></quiz>
