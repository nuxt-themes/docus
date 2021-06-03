---
title: Komponen-Komponen Nuxt
description: Nuxt.js memiliki beberapa komponen penting bawaan. Komponen-komponen ini akan sangat membantu Anda dalam membangun aplikasi.
position: 9
category: features
csb_link_nuxt_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/09_components_nuxt-link?fontsize=14&hidenavigation=1&theme=dark
csb_link_nuxt: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/09_components_nuxt?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Komponen apa yang Anda gunakan untuk menampilkan komponen page?
    answers:
      - '<Nuxt>'
      - '<Page>'
      - '<Views>'
    correctAnswer: '<Nuxt>'
  - question: Komponen `<Nuxt>` dapat digunakan di berkas ...
    answers:
      - components
      - pages
      - layouts
    correctAnswer: layouts
  - question: Komponen mana yang digunakan untuk menampilkan komponen-komponen anak dalam rute bersarang?
    answers:
      - '<Nuxt>'
      - '<NuxtChild>'
      - '<Children>'
    correctAnswer: '<NuxtChild>'
  - question: Di mana Anda bisa memasukkan komponen `<NuxtChild>`?
    answers:
      - pages/child.vue
      - pages/parent.vue
      - layouts/parent.vue
    correctAnswer: pages/parent.vue
  - question: '`keep-alive` dapat digunakan di ...'
    answers:
      - 'Hanya di komponen <Nuxt>'
      - 'Di komponen <Nuxt> dan <NuxtChild>'
      - 'Hanya di komponen <NuxtChild>'
    correctAnswer: 'Di komponen <Nuxt> dan <NuxtChild>'
  - question: Komponen apa yang kita gunakan untuk menautkan halaman-halaman internal?
    answers:
      - '<NuxtLink>'
      - '<RouterLink>'
      - '<a>'
    correctAnswer: '<NuxtLink>'
  - question: 'Bagaimana cara menggunakan <NuxtLink> untuk menautkan halaman tentang kami di aplikasi Anda?'
    answers:
      - <NuxtLink to="/tentang-kami" />
      - <NuxtLink href="/tentang-kami" />
      - <NuxtLink link="/tentang-kami" />
    correctAnswer: <NuxtLink to="/tentang-kami" />
  - question: _Key_ apa yang Anda gunakan untuk menonaktifkan fitur _prefetching_ untuk halaman-halaman tertentu?
    answers:
      - no-prefetch
      - :prefetch="false"
      - no-prefetch dan :prefetch="false"
    correctAnswer: no-prefetch dan :prefetch="false"
  - question: Apa kelas bawaan yang bisa Anda gunakan untuk menambahkan _style_ untuk tautan-tautang yang aktif?
    answers:
      - nuxt-link-active
      - link-active
      - router-link-active
    correctAnswer: nuxt-link-active
  - question: Apa kelas bawaan yang bisa Anda gunakan untuk menambahkan _style_ untuk tautan-tautan aktif tertentu?
    answers:
      - nuxt-link-exact-active
      - link-exact-active
      - nuxt-exact-active-link
    correctAnswer: nuxt-link-exact-active
  - question: Dalam Nuxt versi 2.9.0 ke atas, komponen mana yang Anda gunakan untuk membungkus komponen lain agar komponen yang terbungkus hanya di-_render_ di sisi klien?
    answers:
      - '<client-only>'
      - '<no-ssr>'
      - '<client>'
    correctAnswer: '<client-only>'
---

Nuxt.js memiliki beberapa komponen penting bawaan. Komponen-komponen ini akan sangat membantu Anda dalam membangun aplikasi. Komponen-komponen ini tersedia secara global, yang berarti Anda tidak perlu mengimpornya sebelum menggunakannya.

Paragraf-paragraf berikut ini berisi penjelasan untuk setiap komponen tersebut.

## Komponen Nuxt

Komponen `<Nuxt>` adalah komponen yang Anda gunakan untuk menampilkan komponen-komponen _page_ Anda. Sederhananya, komponen ini akan ditimpa oleh apapun yang ada di dalam komponen _page_ Anda tergantung pada halaman mana yang sedang ditampilkan. Maka dari itu, Anda harus menambahkan komponen `<Nuxt>` ke dalam berkas _layout_ Anda.

```html{}[layouts/default.vue]
<template>
  <div>
    <div>Bar navigasi saya</div>
    <Nuxt />
    <div>Footer saya</div>
  </div>
</template>
```

<base-alert>

Komponen `<Nuxt>` hanya dapat digunakan di dalam berkas-berkas [_layout_](/docs/2.x/concepts/views#layouts).

</base-alert>

Komponen `<Nuxt>` dapat menerima _prop_ `nuxt-child-key`. _Prop_ ini akan dioper ke `<RouterView>` agar transisi Anda dapat berjalan dengan sesuai dalam halaman-halaman dinamis.

Terdapat 2 cara untuk menangani _prop_ `key` internal dari `<RouterView>`.

1. Gunakan _prop_ `nuxt-child-key` pada komponen `<Nuxt>` Anda.

```html{}[layouts/default.vue]
<template>
  <div>
    <Nuxt :nuxt-child-key="someKey" />
  </div>
</template>
```

2. Tambahkan opsi `key` ke dalam komponen-komponen _page_ sebagai _string_ atau fungsi.

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```

## Komponen NuxtChild

Komponen ini digunakan untuk menampilkan komponen-komponen anak dalam rute bersarang.

Contoh:

```
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

Struktur berkas seperti ini akan menghasilkan rute seperti berikut:

```js
;[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

Untuk menampilkan komponen `child.vue`, Anda harus menambahkan komponen `<NuxtChild>` ke dalam `pages/parent.vue` seperti berikut:

```html{}[pages/parent.vue]
<template>
  <div>
    <h1>Ini view parent</h1>
    <NuxtChild :foobar="123" />
  </div>
</template>
```

## keep-alive

Komponen `<Nuxt>` dan `<NuxtChild/>` dapat menerima _prop_ `keep-alive` dan `keep-alive-props`.

<base-alert type="info">

Untuk mempelajari lebih lanjut tentang keep-alive dan keep-alive-props, lihat [dokumentasi Vue.js](https://vuejs.org/v2/api/#keep-alive)

</base-alert>

```html{}[layouts/default.vue]
<template>
  <div>
    <Nuxt keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- Akan diubah menjadi seperti ini -->
<div>
  <KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
</div>
```

```html{}[pages/parent.vue]
<template>
  <div>
    <NuxtChild keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- Akan diubah menjadi seperti ini -->
<div>
  <KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
</div>
```

Komponen `<NuxtChild>` juga dapat menerima properti layaknya komponen Vue biasa.

```html
<template>
  <div>
    <NuxtChild :key="$route.params.id" />
  </div>
</template>
```

Untuk melihat contoh, kunjungi [contoh rute bersarang](/examples/nested-routes).

<app-modal>
  <code-sandbox  :src="csb_link_nuxt"></code-sandbox>
</app-modal>

## Komponen NuxtLink

Untuk navigasi antar halaman dalam aplikasi Anda, Anda sebaiknya menggunakan komponen `<NuxtLink>`. Komponen ini merupakan komponen bawaan Nuxt.js sehingga Anda tidak perlu mengimpornya terlebih dahulu layaknya komponen-komponen lainnya. Komponen ini mirip dengan _tag_ `<a>` HTML, hanya saja Anda menggunakan `to="/tetang-kami"` dan bukannya `href="/tentang-kami"`. Jika Anda pernah menggunakan `vue-router` sebelumnya, Anda bisa menganggap `<NuxtLink>` sebagai pengganti `<RouterLink>`.

Tautan sederhana ke komponen `index.vue` di dalam folder `pages` Anda:

```html
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```

Komponen `<NuxtLink>` sebaiknya digunakan untuk semua tautan internal. Ini berarti Anda sebaiknya menggunakan `<NuxtLink>` untuk setiap tautan yang mengarah pada halaman di situs web Anda. _Tag_ `<a>` sebaiknya hanya digunakan untuk tautan-tautan yang mengarah ke halaman eksternal. Ini berarti Anda sebaiknya menggunakan _tag_ `<a>` untuk tautan yang mengarah ke situs web lain.

```html
<template>
  <div>
    <h1>Halaman beranda</h1>
    <NuxtLink to="/about">
      Tentang kami (tautan internal ke sebuah halaman di situs web Anda)
    </NuxtLink>

    <a href="https://nuxtjs.org">
      Tautan eksternal yang mengarah ke situs web lain
    </a>
  </div>
</template>
```

<base-alert type="info">

Jika Anda ingin mempelajari lebih lanjut tentang `<RouterLink>`, silakan baca [dokumentasi Vue Router](https://router.vuejs.org/api/#router-link).

</base-alert>

<base-alert type="info">

`<NuxtLink>` juga memiliki fitur [_smart prefetching_](/docs/2.x/features/nuxt-components#the-nuxtlink-component) bawaan.

</base-alert>

## prefetchLinks

Nuxt.js memiliki fitur _smart prefetching_ bawaan. Ini berarti Nuxt.js dapat mendeteksi ketika sebuah tautan nampak pada pengguna, baik di dalam _viewport_ ataupun ketika menggulir layar (_scrolling_). Jika tautan nampak, Nuxt.js akan melakukan _prefetch_ skrip JavaScript untuk halaman-halaman tersebut agar halaman langsung siap diakses ketika pengguna mengeklik tautan tersebut. Nuxt.js hanya memuat sumber daya ketika _browser_ sedang tidak sibuk dan melewatkan _prefetching_ jika koneksi sedang _offline_ atau jika Anda hanya memiliki konektivitas 2G.

### Menonaktifkan prefetching untuk tautan-tautan tertentu

Dalam sebagian kasus, Anda mungkin ingin menonaktifkan fitur _prefetching_ untuk tautan-tautan tertentu yang mengandung banyak JavaScript atau Anda memiliki banyak halaman yang harus di-_prefetch_ atau Anda memiliki banyak pustaka pihak ketiga yang harus dimuat. Untuk menonaktifkan _prefetching_ untuk tautan-tautan tertentu, Anda bisa menggunakan _prop_ `no-prefetch`.

Sejak Nuxt.js versi 2.10.0, Anda juga bisa menyetel _prop_ `prefetch` agar bernilai `false`.

```html
<NuxtLink to="/about" no-prefetch>About page not pre-fetched</NuxtLink>
<NuxtLink to="/about" :prefetch="false">About page not pre-fetched</NuxtLink>
```

### Menonaktifkan prefetching secara global

Untuk menonaktifkan _prefetching_ untuk semua tautan, setel nilai properti `prefetchLinks` ke `false` di dalam berkas `nuxt.config.js` Anda:

```js{}[nuxt.config.js]
export default {
  router: {
    prefetchLinks: false
  }
}
```

Sejak Nuxt.js versi 2.10.0, jika Anda sudah menyetel nilai `prefetchLinks` ke `false` tetapi Anda ingin mengaktifkan _prefetch_ untuk tautan-tautan tertentu, Anda bisa menggunakan _prop_ `prefetch` untuk tautan tersebut:

```html
<NuxtLink to="/about" prefetch>About page pre-fetched</NuxtLink>
```

## linkActiveClass

Cara kerja `linkActiveClass` sama dengan kelas `vue-router` untuk tautan-tautan aktif. Jika Anda ingin menampilkan tautan-tautan mana yang sedang aktif, Anda cukup membuat sebuah _styling_ untuk kelas `nuxt-link-active`.

```css
.nuxt-link-active {
  color: red;
}
```

<base-alert>

CSS ini dapat ditambahkan ke komponen navigasi atau untuk halaman / layout tertentu atau di dalam berkas main.css Anda.

</base-alert>

Jika Anda mau, Anda juga bisa mengubah nama kelasnya. Anda bisa melakukan ini dengan cara memodifikasi nilai `linkActiveClass` di dalam properti _router_ dalam berkas `nuxt.config.js` Anda.

```js
export default {
  router: {
    linkActiveClass: 'nama-kelas-yang-baru'
  }
}
```

<base-alert type="info">

Opsi ini dioper langsung ke `linkActiveClass` milik `vue-router`. Lihat [dokumentasi vue-router](https://router.vuejs.org/api/#active-class) untuk informasi lebih lanjut.

</base-alert>

## linkExactActiveClass

Cara kerja `linkExactActiveClass` sama dengan kelas `vue-router` untuk tautan-tautan aktif eksak. Jika Anda ingin menampilkan tautan-tautan mana yang sedang aktif dengan pencocokan persis, Anda hanya perlu membuat _styling_ untuk kelas `nuxt-link-exact-active`.

```css
.nuxt-link-exact-active {
  color: green;
}
```

<base-alert type="info">

CSS ini dapat ditambahkan ke komponen navigasi atau untuk halaman / _layout_ tertentu atau di dalam berkas main.css Anda.

</base-alert>

Jika Anda mau, Anda juga bisa mengubah nama kelasnya. Anda bisa melakukan ini dengan cara memodifikasi nilai `linkExactActiveClass` di dalam properti _router_ dalam berkas `nuxt.config.js` Anda.

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'nama-kelas-tautan-aktif-eksak-yang-baru'
  }
}
```

<base-alert type="info">

Opsi ini dioper langsung ke `linkExactActiveClass` milik `vue-router`. Lihat [dokumentasi vue-router](https://router.vuejs.org/api/#active-class) untuk informasi lebih lanjut.

</base-alert>

## linkPrefetchedClass

`linkPrefetchedClass` memungkinkan Anda untuk menambahkan _style_ untuk semua tautan yang telah di-_prefetch_. Hal ini berguna untuk mengetes tautan mana yang sedang di-_prefetch_ setelah memodifikasi perilaku bawaannya. Secara bawaan,`linkPrefetchedClass` tidaklah aktif. Jika Anda ingin mengaktifkannya, Anda harus menambahkannya ke properti `router` dalam berkas `nuxt.config.js` Anda.

```js{}[nuxt.config.js]
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

Lalu Anda bisa menambahkan _style_ untuk kelas tersebut.

```css
.nuxt-link-prefetched {
  color: orangeRed;
}
```

<base-alert type="info">

Di contoh ini kami menggunakan nama kelas `nuxt-link-prefetched`. Anda bisa menggunakan nama lain jika Anda suka.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link_nuxt_link"></code-sandbox>
</app-modal>

## Komponen client-only

Komponen ini digunakan untuk secara sengaja me-_render_ komponen hanya pada sisi klien. Untuk mengimpor komponen hanya di sisi klien, daftarkan komponen di dalam sebuah _plugin_ yang hanya akan dijalankan di sisi klien.

```html{}[pages/example.vue]
<template>
  <div>
    <sidebar />
    <client-only placeholder="Loading...">
      <!-- Komponen ini hanya akan di-render di sisi klien -->
      <comments />
    </client-only>
  </div>
</template>
```

Gunakan _slot_ sebagai _placeholder_ sampai komponen `<client-only />` terpasang (_mounted_) di sisi klien.

```html{}[pages/example.vue]
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- Komponen ini hanya akan di-render di sisi klien -->
      <comments />

      <!-- Indikator sedang memuat, di-render di sisi server -->
      <comments-placeholder slot="placeholder" />
    </client-only>
  </div>
</template>
```

<base-alert>

Jika Anda menggunakan Nuxt versi di bawah 2.9.0, gunakan `<no-ssr>` sebagai pengganti `<client-only>`.

</base-alert>

<quiz :questions="questions"></quiz>
