---
title: View (Tampilan)
description: Bagian View (Tampilan) menggambarkan semua yang Anda perlukan untuk mengonfigurasi data dan tampilan untuk rute tertentu pada Aplikasi Nuxt.js Anda (Dokumen, Layout, Halaman, dan HTML Head).
category: getting-started
position: 105
---

> Bagian View (Tampilan) menggambarkan semua yang Anda perlukan untuk mengonfigurasi data dan tampilan untuk rute tertentu pada Aplikasi Nuxt.js Anda (Dokumen, Layout, Halaman, dan HTML Head).

![nuxt-views-schema](/nuxt-views-schema.svg)

## Dokumen

> Anda dapat mengkustomisasi dokumen utama dengan Nuxt.js.

Untuk meng-extend templat HTML, buatlah `app.html` pada root proyek Anda.

Templat default-nya adalah:

```html
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

Salah satu contoh jika menambahkan kelas CSS bersyarat (conditional CSS) untuk IE:

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## Tata Letak (Layouts)

Nuxt.js memungkinkan Anda meng-extend layout utama atau membuat layout secara kustom dengan menambahkannya ke dalam folder `layouts`.

### Layout Default

Anda bisa meng-extend layout utama dengan menambahkan file `layouts/default.vue` .

_Pastikan untuk menambahkan komponen `<nuxt/>` saat membuat layout untuk menampilkan komponen halaman._

Kode sumber layout yang default adalah:

```html
<template>
  <nuxt />
</template>
```

### Halaman Kesalahan (Error Page)

Anda dapat mengkustomisasi halaman kesalahan ini dengan cara menambahkan file `layouts/error.vue`.

Layout ini spesial, karena Anda _tidak_ harus menyertakan `<nuxt/>` pada templatnya. Anda harus memahami layout ini sebagai komponen yang ditampilkan ketika terjadi kesalahan (error) (`404`, `500`, dan sebagainya.).

Kode sumber halaman kesalahan yang default [tersedia di GitHub](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue).

Contoh kustomisasi halaman kesalahan pada file `layouts/error.vue`:

```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blog' // Anda dapat mengatur layout kustom untuk halaman kesalahan
  }
</script>
```

### Kustom Layout

Setiap file (_level pertama _) pada folder `layouts` akan membuat kustom layout yang dapat diakses dengan properti `layout` di dalam komponen halaman.

_Pastikan Anda menambahkan komponen `<nuxt/>` ketika membuat layout untuk menampilkan komponen halaman._

Contoh `layouts/blog.vue`:

```html
<template>
  <div>
    <div>My blog navigation bar here</div>
    <nuxt />
  </div>
</template>
```

Dan kemudian pada file `pages/posts.vue`, Anda bisa memberitahu Nuxt.js untuk menggunakan kustom layout Anda:

```html
<script>
  export default {
    layout: 'blog'
  }
</script>
```

Informasi lebih lanjut tentang properti `layout`: <a href="/api/pages-layout" data-md-type="link">Halaman API `layout`</a>

Lihat [video demonstrasi](https://www.youtube.com/watch?v=YOKnSTp7d38) untuk melihat bagaimana ia bekerja.

## Halaman (Pages)

Setiap komponen Halaman (Page) adalah komponen Vue, namun Nuxt.js menambahkan petunjuk khusus untuk membuat pengembangan (development) aplikasi universal Anda dengan cara yang sangat mudah.

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
  export default {
    asyncData (context) {
      // dipanggil setiap saat sebelum memuat komponen
      return { name: 'World' }
    },
    fetch () {
      // Metode `fetch` digunakan untuk mengisi store sebelum me-render halaman
    },
    head () {
      // Set Meta Tags untuk Halaman (Page) ini
    },
    // dan fungsionalitas lainnya untuk digali
    ...
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

| Atribut       | Penjelasan                                                                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asyncData`   | Kunci yang paling penting, bisa asinkronus dan menerima konteks sebagai argumen, baca [dokumentasi async data](/guide/async-data) untuk mengetahui bagaimana ia bekerja.               |
| `fetch`       | Digunakan untuk mengisi store sebelum me-render halaman, ini seperti metode `data` kecuali ia tidak mengatur data komponen. Lihat [dokumentasi Halaman API `fetch`](/api/pages-fetch). |
| `head`        | Mengatur `<meta>` tag khusus untuk halaman (aktif) saat ini. Lihat [dokumentasi Halaman API `head`](/api/pages-head).                                                                  |
| `layout`      | Menentukan layout yang ditetapkan dalam direktori `layouts`. Lihat [dokumentasi Halaman API `layout` ](/api/pages-layout).                                                             |
| `transition`  | Mengatur transisi tertentu untuk sebuah halaman. Lihat [Halaman API `transition`](/api/pages-transition).                                                                              |
| `scrollToTop` | Boolean (secara default: `false`). Tentukan apakah Anda ingin halaman men-scroll ke atas sebelum me-render halaman, ia digunakan untuk [nested routes](/guide/routing#nested-routes).  |
| `validate`    | Fungsi Validator untuk [rute dinamis](/guide/routing#dynamic-routes).                                                                                                                  |
| `middleware`  | Menetapkan middleware untuk halaman ini. Middleware akan dipanggil sebelum me-render halaman, melihat rute [middleware](/guide/routing#middleware).                                    |

Informasi lebih lanjut tentang penggunaan properti halaman: [Halaman API](/api)

## HTML Head

Nuxt.js menggunakan [vue-meta](https://github.com/nuxt/vue-meta) untuk memperbarui `headers` dan `atribut-atribut html` pada aplikasi Anda.

Nuxt.js mengonfigurasi `vue-meta` dengan opsi ini:

```js
{
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
}
```

### Standar Meta Tag

Nuxt.js memungkinkan Anda mendefinisikan semua `<meta>` standar (default) untuk aplikasi Anda di dalam file `nuxt.config.js`. Gunakan properti `head` yang sama:

Contoh kustom viewport dan kustom Google font:

```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

Untuk mengetahui daftar pilihan yang dapat Anda berikan pada metode `head`, lihat [dokumentasi vue-meta ](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

Informasi lebih lanjut tentang metode `head` : <a href="/api/configuration-head" data-md-type="link">Konfigurasi API `head`</a>.

### Kustomisasi Meta Tag pada sebuah Halaman

Informasi lebih lanjut tentang metode head : [Halaman API `head`](/api/pages-head).

<div class="Alert">

Untuk menghindari duplikasi saat menggunakannya pada child komponen, berikan pengenal unik dengan key `hid`. [Baca lebih lanjut](https://vue-meta.nuxtjs.org/api/#tagidkeyname) .

</div>
