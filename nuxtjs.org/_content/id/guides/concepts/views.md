---
title: Views
description: Bagian Tampilan menjelaskan semua yang perlu Anda ketahui untuk mengonfigurasi data dan tampilan untuk rute tertentu di Aplikasi Nuxt.js Anda. Tampilan terdiri dari templat aplikasi, layout, dan halaman yang sebenarnya.
position: 1
category: concepts
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/01_views?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Bagaimana urutan komposisi tampilan Nuxt (dari atas ke bawah)?
    answers:
      - Layout → Page → Document
      - Page → Layout → Document
      - Document → Layout → Page
    correctAnswer: Document → Layout → Page
  - question: Apa yang disebut layout default?
    answers:
      - default.vue
      - layout.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: Bagaimana Anda membuat layout khusus?
    answers:
      - tambahkan file .vue ke folder pages
      - tambahkan file .vue ke folder layouts
      - tambahkan file .vue ke folder components
    correctAnswer: tambahkan file .vue ke folder layouts
  - question: Bagaimana Anda mengaktifkan layout khusus yang disebut 'blog' di halaman Anda?
    answers:
      - "layout: 'blog'"
      - "layout: 'default'"
      - "blog: 'blog'"
    correctAnswer: "layout: 'blog'"
  - question: Di mana Anda meletakkan file error.vue Anda yang membuat halaman kesalahan yang disesuaikan?
    answers:
      - di dalam folder pages
      - di dalam folder errors
      - di dalam folder layouts
    correctAnswer: di dalam folder layouts
---

Bagian Tampilan menjelaskan semua yang perlu Anda ketahui untuk mengonfigurasi data dan tampilan untuk rute tertentu di Aplikasi Nuxt.js Anda. Tampilan terdiri dari templat aplikasi, layout, dan halaman yang sebenarnya. Selain itu, Anda dapat menentukan tag meta kustom untuk bagian kepala setiap halaman yang penting untuk SEO (Search Engine Optimization).

![Composition of a View in Nuxt.js](/docs/2.x/views.png)

Komposisi Tampilan di Nuxt.js

## Pages

Setiap komponen Halaman adalah komponen Vue tetapi Nuxt.js menambahkan atribut dan fungsi khusus untuk membuat pengembangan aplikasi Anda semudah mungkin.

```html{}[pages/index.vue]
<template>
  <h1 class="red">Halo Dunia</h1>
</template>

<script>
  export default {
    head() {
      // Atur Tag Meta untuk Halaman ini
    }
    // ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## Properti komponen halaman

Ada banyak properti dari komponen halaman seperti properti head pada contoh di atas.

<base-alert type="next">

See the [Directory Structure book](/docs/2.x/directory-structure/nuxt) to learn more about all the properties can use on your page

</base-alert>

## Layouts

Layout sangat membantu saat Anda ingin mengubah tampilan dan nuansa aplikasi Nuxt.js Anda. Misalnya Anda ingin menyertakan bilah sisi atau memiliki layouts yang berbeda untuk seluler dan desktop.

### Layout Default

Anda dapat mendefinisikan layout default dengan menambahkan file `default.vue` di dalam direktori layouts. Ini akan digunakan untuk semua halaman yang layout tidak ditentukan. Satu-satunya hal yang perlu Anda sertakan dalam layout adalah komponen `<Nuxt />` yang merender komponen halaman.

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

<base-alert type="next">

Pelajari lebih lanjut tentang [Komponen Nuxt](/docs/2.x/features/nuxt-components) di bab komponen.

</base-alert>

### Layout Kustom

Anda dapat membuat layout kustom dengan menambahkan file `.vue` ke direktori layout. Untuk menggunakan layout khusus, Anda perlu menyetel properti `layout` di komponen halaman tempat Anda ingin menggunakan layout itu. Nilainya akan menjadi nama layout khusus yang telah Anda buat.

Untuk membuat layout blog, tambahkan file `blog.vue` ke direktori layout `layouts/blog.vue` Anda:

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>Bilah navigasi blog saya di sini</div>
    <Nuxt />
  </div>
</template>
```

<base-alert>

Pastikan untuk menambahkan komponen `<Nuxt />` saat membuat layout untuk benar-benar menyertakan komponen halaman.

</base-alert>

Kami kemudian menggunakan properti layout dengan nilai 'blog' di halaman di mana kami ingin layout itu digunakan.

```html{}[pages/posts.vue]
<template>
  <!-- Template Anda -->
</template>
<script>
  export default {
    layout: 'blog'
    // definisi komponen halaman
  }
</script>
```

<base-alert type="info">

Jika Anda tidak menambahkan properti layout ke halaman Anda, misalnya `layout: 'blog'` maka layout `default.vue` akan digunakan.

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

### Halaman Eror

Halaman eror adalah _komponen halaman_ yang selalu ditampilkan saat terjadi eror (yang tidak terjadi saat rendering sisi server).

<base-alert>

Meskipun file ini ditempatkan di folder `layouts`, file ini harus diperlakukan sebagai halaman.

</base-alert>

Seperti disebutkan di atas, layout ini spesial, karena Anda tidak boleh menyertakan komponen `<Nuxt />` di dalam template-nya. Anda harus melihat layout ini sebagai komponen yang ditampilkan saat terjadi kesalahan (`404`, `500`, dll.). Mirip dengan komponen halaman lainnya, Anda juga dapat menyetel layout kustom untuk halaman kesalahan dengan cara biasa.

Anda dapat menyesuaikan halaman kesalahan dengan menambahkan file `layouts/error.vue`:

```html{}[layouts/error.vue]
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Halaman tidak ditemukan</h1>
    <h1 v-else>Terjadi kesalahan</h1>
    <NuxtLink to="/">Halaman beranda</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // Anda dapat mengatur tata letak khusus untuk halaman kesalahan
  }
</script>
```

## Document: App.html

Template aplikasi digunakan untuk membuat bingkai HTML sebenarnya dari dokumen Anda untuk aplikasi Nuxt.js Anda yang memasukkan konten serta variabel untuk head dan body. File ini dibuat secara otomatis untuk Anda dan secara umum jarang perlu dimodifikasi. Anda dapat menyesuaikan templat aplikasi HTML yang digunakan oleh Nuxt.js untuk menyertakan skrip atau kelas CSS bersyarat dengan membuat file `app.html` dalam direktori sumber proyek Anda yang secara default adalah direktori root.

Template default yang digunakan oleh Nuxt.js adalah:

```html{}[app.html]
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

Salah satu kasus penggunaan menggunakan template aplikasi kustom adalah menambahkan kelas CSS bersyarat untuk IE:

```html{}[app.html]
<!DOCTYPE html>
<!--[if IE 9]><html class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

<base-alert type="info">

Meskipun Anda dapat menambahkan file JavaScript dan CSS di `app.html`, disarankan untuk menggunakan `nuxt.config.js` untuk tugas-tugas ini!.

</base-alert>

<quiz :questions="questions"></quiz>
