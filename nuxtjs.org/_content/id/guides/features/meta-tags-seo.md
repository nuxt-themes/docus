---
title: Tag Meta dan SEO
description: Nuxt.js memungkinkan Anda untuk mendefinisikan semua tag `<meta>` bawaan untuk aplikasi Anda di dalam berkas nuxt.config.js dengan menggunakan properti `head`. Ini sangat berguna untuk menambahkan tag `title` dan `description` bawaan untuk tujuan SEO atau untuk menyetel viewport atau untuk menambahkan favicon.
position: 6
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/06_meta_tags_seo?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Di mana Anda bisa menyetel tag title dan meta secara global?
    answers:
      - di dalam komponen page
      - di dalam berkas nuxt.config.js
      - di dalam berkas package.json
    correctAnswer: di dalam berkas nuxt.config.js
  - question: Di mana Anda menyetel tag title dan meta secara lokal?
    answers:
      - di dalam komponen page
      - di dalam berkas nuxt.config.js
      - di dalam komponen seo
    correctAnswer: di dalam komponen page
  - question: Di dalam halaman, untuk bisa mengakses data tag title atau meta description Anda menggunakan...
    answers:
      - fungsi meta
      - fungsi head
      - fungsi seo
    correctAnswer: fungsi head
  - question: Anda hanya bisa memuat sumber daya eksternal melalui berkas nuxt.config.js
    answers:
      - benar
      - salah
    correctAnswer: salah
  - question: Untuk menambahkan skrip sebelum penutup tag body kita menggunakan...
    answers:
      - 'body: true'
      - 'body: false'
      - 'scripts: true'
    correctAnswer: 'body: true'
---

Nuxt.js memberikan Anda 3 cara berbeda untuk menambahkan data meta ke aplikasi Anda:

1. Secara global menggunakan berkas `nuxt.config.js`.
2. Secara lokal menggunakan properti `head` sebagai objek.
3. Secara lokal menggunakan properti `head` sebagai fungsi yang memungkinkan Anda untuk mengakses data dan properti-properti _computed_.

### Pengaturan Global

Nuxt.js memungkinkan Anda untuk mendefinisikan semua _tag_ `<meta>` bawaan untuk aplikasi Anda di dalam berkas `nuxt.config.js` dengan menggunakan properti `head`. Ini sangat berguna untuk menambahkan _tag_ `title` dan `description` bawaan untuk tujuan SEO atau untuk menyetel _viewport_ atau untuk menambahkan _favicon_.

```js{}[nuxt.config.js]
export default {
  head: {
    title: 'Judul situs web saya',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Deskripsi untuk website saya'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
}
```

<base-alert type="info">

Hal ini akan membuat semua halaman Anda memiliki judul dan deskripsi yang sama

</base-alert>

### Pengaturan Lokal

Anda juga bisa menambahkan judul dan meta untuk setiap halaman menggunakan _method_ `head` di dalam _tag script_ pada setiap komponen _page_ Anda.

```js{}[pages/index.vue]
<script>
export default {
  head: {
    title: 'Ini halaman beranda',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Deskripsi untuk halaman beranda'
      }
    ],
  }
}
</script>
```

<base-alert type="info">

Contoh di atas menggunakan `head` sebagai objek untuk menyetel judul dan deskripsi untuk halaman beranda saja

</base-alert>

```html{}[pages/index.vue]
<template>
  <h1>{{ title }}</h1>
</template>
<script>
  export default {
    data() {
      return {
        title: 'Halaman beranda'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Deskripsi untuk halaman beranda'
          }
        ]
      }
    }
  }
</script>
```

<base-alert type="info">

Contoh di atas menggunakan `head` sebagai fungsi untuk menyetel judul dan deskripsi hanya untuk halaman beranda saja. Dengan menggunakan `head` sebagai fungsi, Anda bisa mengakses data dan properti-properti _computed_

</base-alert>

Nuxt.js menggunakan [vue-meta](https://vue-meta.nuxtjs.org/) untuk memperbarui atribut _head_ dan _meta_ dari dokumen di dalam aplikasi Anda.

<base-alert>

Untuk menghindari duplikasi ketika menggunakan komponen anak, tolong berikan _identifier_ unik dengan _key_ `hid` ke dalam deskripsi _meta_. Dengan begini `vue-meta` akan mengetahui kapan harus menimpa _tag_ bawaannya.

</base-alert>

<base-alert type="next">

Pelajari lebih lanjut tentang opsi-opsi yang tersedia untuk `head` di [dokumentasi vue-meta](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

</base-alert>

## Sumber Daya Eksternal

Anda bisa memasukkan sumber daya eksternal seperti skrip dan fon dengan cara menambahkannya secara global ke dalam berkas `nuxt.config.js` atau secara lokal di dalam objek atau fungsi `head`.

<base-alert type="info">

Anda juga bisa memasukkan _key_ opsional `body: true` untuk memasukkan sumber daya sebelum penutup _tag_ `</body>`.

</base-alert>

### Pengaturan Global

```js{}[nuxt.config.js]
export default {
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  }
}
```

### Pengaturan Lokal

```html{}[pages/index.vue]
<template>
  <h1>Halaman tentang kami menggunakan jQuery dan fon Roboto</h1>
</template>

<script>
  export default {
    head() {
      return {
        script: [
          {
            src:
              'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
          }
        ],
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-family: Roboto, sans-serif;
  }
</style>
```

## Petunjuk Sumber Daya

Menambahkan fungsionalitas _prefetch_ dan _preload_ tautan untuk mempercepat waktu pemuatan website.

Anda mungkin ingin menonaktifkan opsi ini jika Anda memiliki banyak halaman dan rute.

<base-alert type="next">

[Petunjuk Sumber Daya](/docs/2.x/configuration-glossary/configuration-render#resourcehints)

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
