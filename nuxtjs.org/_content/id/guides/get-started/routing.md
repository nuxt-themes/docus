---
title: Routing
description: Sebagian besar situs web memiliki lebih dari satu halaman. Misalnya halaman _home_, halaman _about_, halaman _contact_, dll. Untuk menampilkan halaman-halaman ini kita membutuhkan sebuah Router.
position: 2
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/02_routing?fontsize=14&hidenavigation=1&theme=dark
---

## Route Otomatis

Sebagian besar situs web akan memiliki lebih dari satu halaman (yaitu halaman _home_, halaman _about_, halaman _contact_, dll.). Untuk menampilkan halaman ini, kita membutuhkan Router. Di situlah `vue-router` masuk. Ketika bekerja dengan aplikasi Vue, Anda harus mengatur file konfigurasi (yaitu `router.js`) dan menambahkan semua rute Anda secara manual ke sana. Nuxt.js secara otomatis membuat konfigurasi `vue-router` untuk Anda, berdasarkan file Vue yang Anda sediakan di dalam direktori `pages`. Itu berarti Anda tidak perlu menulis konfigurasi router lagi! Nuxt.js juga memberi Anda pemisahan kode otomatis untuk semua rute Anda.

Dengan kata lain, yang harus Anda lakukan untuk memiliki perutean di aplikasi Anda adalah membuat file `.vue` di folder `pages`.

<base-alert type="next">

Pelajari lebih lanjut tentang [Routing](/docs/2.x/features/file-system-routing)

</base-alert>

## Navigasi

Untuk menavigasi antar halaman aplikasi Anda, Anda harus menggunakan komponen [NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component). Komponen ini disertakan dengan Nuxt.js dan oleh karena itu Anda tidak perlu mengimpornya seperti yang Anda lakukan dengan komponen lain. Ini mirip dengan tag `<a>` HTML, kecuali bahwa alih-alih menggunakan yang `href="/about"` kita gunakan `to="/about"`. Jika Anda pernah menggunakan `vue-router` sebelumnya, Anda dapat menganggapnya `<NuxtLink>` sebagai pengganti `<RouterLink>`

Tautan sederhana ke halaman `index.vue` di folder `pages` Anda:

```html{}[pages/index.vue]
<template>
  <NuxtLink to="/">Halaman Beranda</NuxtLink>
</template>
```

Untuk semua link ke halaman dalam situs Anda, gunakan `<NuxtLink>`. Jika Anda memiliki tautan ke situs web lain, Anda harus menggunakan tag `<a>`. Lihat contoh di bawah:

```html{}[pages/index.vue]
<template>
  <main>
    <h1>Halaman Beranda</h1>
    <NuxtLink to="/about">
      Tentang (tautan internal milik Aplikasi Nuxt)
    </NuxtLink>
    <a href="https://nuxtjs.org">Tautan Eksternal ke halaman lain</a>
  </main>
</template>
```

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<base-alert type="next">

Pelajari lebih lanjut tentang [Komponen NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component).

</base-alert>
