---
title: layouts
description: Layouts adalah bagian yang sangatlah membantu ketika Anda ingin mengubah tampilan dan nuansa pada aplikasi Nuxt.js Anda, baik memasukkan _sidebar_ maupun memiliki layout berbeda untuk perangkat mobile dan desktop.
position: 7
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/07_layouts?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Anda dapat dengan mudahnya mengubah nama direktori layouts tanpa konfigurasi khusus.
    answers:
      - benar
      - salah
    correctAnswer: salah
  - question: Apa nama halaman tata letak default?
    answers:
      - layout.vue
      - default.vue
      - defaultLayout.vue
    correctAnswer: default.vue
  - question: Komponen apa saja yang harus ada pada seluruh layout?
    answers:
      - <Nuxt />
      - <NuxtLink />
      - <RouterView />
    correctAnswer: <Nuxt />
  - question: Anda dapat menambah komponen lain ke dalam layout Anda
    answers:
      - benar
      - salah
    correctAnswer: benar
  - question: Untuk menambah sebuah layout kustom, Anda perlu membuat sebuah berkas `.vue` dan ke folder manakah berkas itu akan ditempatkan?
    answers:
      - layout
      - layouts
      - page
    correctAnswer: layouts
  - question: Bagaimana caranya Anda memberitahukan sebuah halaman untuk menerapkan blog layout?
    answers:
      - "layout: 'blog'"
      - "name: 'blog'"
      - 'blog: true'
    correctAnswer: "layout: 'blog'"
  - question: Pada direktori manakah halaman galat seharusnya ditambahkan?
    answers:
      - pages
      - layouts
      - errors
    correctAnswer: layouts
  - question: Anda perlu menambahkan komponen `<Nuxt>` pada halaman galat?
    answers:
      - benar
      - salah
    correctAnswer: salah
  - question: Anda dapat menggunakan custom layout untuk halaman galat
    answers:
      - benar
      - salah
    correctAnswer: benar
  - question: Halaman galat ditampilkan ketika terjadi kesalahan pada saat rendering di sisi server (server side rendering)?
    answers:
      - benar
      - salah
    correctAnswer: salah
---

Layouts adalah bagian yang sangatlah membantu ketika Anda ingin mengubah tampilan dan nuansa pada aplikasi Nuxt.js Anda, baik memasukkan _sidebar_ maupun memiliki layout berbeda untuk perangkat mobile dan desktop.

<base-alert>

_Direktori ini tidak dapat diubah namanya tanpa konfigurasi khusus._

</base-alert>

## Default Layout

Anda dapat memperluas berkas layout utama dengan menambahkan berkas `layouts/default.vue`. Layout tersebut akan diterapkan pada seluruh halaman yang tidak memiliki layout khusus. Pastikan penggunaan komponen `<Nuxt>` ketika pembuatan layout untuk benar-benar menyertakan page component.

Semua yang Anda butuhkan pada layout adalah tiga baris kode berikut yang akan me-render page component.

```html{}[layouts/default.vue]
<template>
  <Nuxt />
</template>
```

Anda dapat menambahkan komponen-komponen lainnya seperti Navigation, Header, Footer, dan lain-lain.

```html{}[layouts/default.vue]
<template>
  <TheHeader />
  <Nuxt />
  <TheFooter />
</template>
```

<base-alert type="info">

Jika Anda memiliki [komponen-komponen yang nilainya di-_set_ _true_](/docs/2.x/directory-structure/components), maka tidak perlu lagi menambahkan pernyataan-pernyataan import pada komponen-komponen tersebut.

</base-alert>

## Layout Kustom

Seluruh berkas (_top-level_) pada direktori `layouts` akan membuat layout kustom yang dapat diakses dengan properti `layout` dalam page components.

Sebagai contoh, kita ingin membuat sebuah layout blog dan menyimpannya sebagai `layouts/blog.vue`:

```html{}[layouts/blog.vue]
<template>
  <div>
    <div>My blog navigation bar here</div>
    <Nuxt />
  </div>
</template>
```

Kemudian Anda perlu memberitahukan halaman-halaman untuk menggunakan layout kustom tersebut.

```js{}[pages/posts.vue]
<script>
export default {
  layout: 'blog',
  // OR
  layout (context) {
    return 'blog'
  }
}
</script>
```

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## Halaman galat

Halaman galat merupakan sebuah *page component* yang ditampilkan setiap kali terjadinya kesalahan (yang tidak dilempar ke sisi server).

<base-alert>

Meskipun berkas ini ditempatkan di folder `layouts`, berkas ini harus diperlakukan sebagai sebuah halaman.

</base-alert>

Seperti diberitahukan di atas, layout ini spesial dan
janganlah menyertakan `<Nuxt>` di dalam templatenya. Anda harus melihat layout ini sebagai sebuah komponen yang ditampilkan ketika terjadi kesalahan (`404`, `500`, dll.). Seperti halnya komponen-komponen halaman lainnya, Anda dapat menggunakan layout kustom untuk halaman galat seperti biasanya.

Anda dapat melakukan kustomisasi pada halaman galat dengan menambahkan berkas `layouts/galat.vue`:

```js{}[layouts/galat.vue]
<template>
  <div class="container">
    <h1 v-if="galat.statusCode === 404">Halaman tidak ditemukan</h1>
    <h1 v-else>Terjadi Kesalahan</h1>
    <NuxtLink to="/">BerAnda</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['galat'],
  layout: 'blog' // Anda dapat menetapkan sebuah layout kustom untuk halaman galat
}
</script>
```

<base-alert type="info">

Kode untuk halaman galat (default) [tersedia pada GitHub](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-galat.vue).

</base-alert>

<quiz :questions="questions"></quiz>
