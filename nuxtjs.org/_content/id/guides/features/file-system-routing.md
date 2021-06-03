---
title: File System Routing
description: Nuxt.js akan secara otomatis membuat konfigurasi vue-router berdasarkan turunan berkas dari berkas Vue di dalam direktori _pages_. Ketika Anda membuat berkas .vue di direktori _pages_, Anda akan memiliki _routing_ paling dasar terpasang tanpa tambahan konfigurasi lainnya.
position: 3
category: features
questions:
  - question: Apa nama komponen yang digunakan untuk melakukan navigasi diantara halaman?
    answers:
      - '<a>'
      - '<NuxtLink>'
      - '<Nuxt>'
    correctAnswer: '<NuxtLink>'
  - question: Apa yang Anda lakukan untuk menghasilkan konfigurasi _router_ secara otomatis?
    answers:
      - menambahkan berkas .vue pada direktori _pages_
      - membuat berkas router.config
      - menambahkan <NuxtLink> pada halaman
    correctAnswer: menambahkan berkas .vue pada direktori _pages_
  - question: Yang mana dari berikut ini yang tidak akan membuat rute dinamis?
    answers:
      - dynamic.vue
      - _slug.vue
      - _slug/index.vue
    correctAnswer: dynamic.vue
  - question: rute dinamis diabaikan oleh perintah _nuxt generate_?
    answers:
      - True
      - False
    correctAnswer: False
  - question: Bagaimana Anda mengakses rute paramater untuk halaman dinamis seperti users/_id.vue?
    answers:
      - $route.params.id
      - $route.id
      - $route.params.users.id
    correctAnswer: $route.params.id
  - question: Bagaimana Anda mendefinisikan komponen induk dari rute yang bersarang?
    answers:
      - membuat berkas Vue yang dipanggil oleh induk di dalam direktori yang terdapat _views_
      - membuat berkas Vue dengan nama yang berbeda dengan direktori yang terdapat _views_
      - membuat berkas Vue dengan nama yang sama dengan direktori yang terdapat _views_
    correctAnswer: membuat berkas Vue dengan nama yang sama dengan direktori yang terdapat _views_
  - question: Jika Anda tidak mengetahui seberapa dalam struktur _URL_, Anda dapat menggunakan berkas mana yang secara dinamis cocok dengan alur yang bersarang?
    answers:
      - _.vue
      - _index.vue
      - _id.vue
    correctAnswer: _.vue
  - question: Mana komponen yang dapat digunakan untuk me-_render_ _views_?
    answers:
      - '<Nuxt> dan <Child>'
      - '<Nuxt> dan <NuxtChild>'
      - '<NuxtChild> dan <NuxtLink>'
    correctAnswer: '<Nuxt> dan <NuxtChild>'
  - question: Di Nuxt.js, berkas mana yang dapat Anda gunakan untuk membuat pemaksaan posisi gulir (_scroll_) ke atas pada setiap rute?
    answers:
      - app/router.scrollBehavior.js
      - app/scrollBehavior.js
      - app/router.js
    correctAnswer: app/router.scrollBehavior.js
  - question: Di Nuxt.js Anda dapat menambahkan pemotong (_slash_) yang akan dimasukkan ke setiap rute?
    answers:
      - true
      - false
    correctAnswer: true
---

Nuxt.js akan secara otomatis membuat konfigurasi vue-router berdasarkan turunan berkas dari berkas Vue di dalam direktori _pages_. Ketika Anda membuat berkas .vue di direktori _pages_, Anda akan memiliki _routing_ paling dasar terpasang tanpa tambahan konfigurasi lainnya.

Terkadang Anda mungin perlu membuat rute dinamis atau rute bersarang atau Anda perlu konfigurasi rute lebih lanjut. Pada bagian ini akan memberi tahu Anda segalanya apa yang Anda perlu tahu untuk mengoptimalkan konfigurasi _router_.

<base-alert type="info">

Nuxt.js memberikan Anda pemisahan kode secara otomatis untuk rute. tidak ada konfigurasi yang dibutuhkan.

</base-alert>

<base-alert type="info">

Gunakan [komponen NuxtLink](/docs/2.x/features/nuxt-components#the-nuxtlink-component) untuk melakukan navigasi antara halaman.

</base-alert>

```html
<template>
  <nuxt-link to="/">Halaman Beranda</nuxt-link>
</template>
```

## Rute Dasar

Turunan berkas ini:

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

akan secara otomatis menghasilkan:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## Rute Dinamis

Terkadang ini tidak memungkinkan untuk mengetahui nama dari rute tersebut ketika kita memanggil sebuah program aplikasi antar muka (_api_) untuk mendapatkan daftar pengguna atau postingan _blog_. Kita memanggil rute dinamis tersebut. Untuk membuat rute dinamis Anda perlu membuat berkas yang diawali dengan nama berkas (\_) sebelum .vue atau sebelum nama dari direktori. Anda dapat memberikan nama berkas atau direktori apapun yang Anda mau namun Anda harus memberikan awalan dengan garis bawah.

Turunan berkas ini:

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

akan secara otomatis menghasilkan:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

<base-alert type="info">

Seperti yang dapat Anda lihat, nama rute `users-id` memiliki jalur `:id?` yang membuatnya opsional, jika Anda ingin membuatnya wajib maka buatlah sebuah `index.vue` di direktori `users/_id`.

</base-alert>

<base-alert type="info">

Pada Nuxt >= v2.13, terdapat _crawler_ yang terpasang dan akan melakukan _crawl_ penanda tautan Anda dan menghasilkan rute dinamis bedasarkan tautan tersebut. Bagaimanapun itu jika Anda memiliki halaman yang tidak terhubung ke halaman yang rahasia, maka Anda akan memerlukan membuat rute dinamis tersebut secara manual.

</base-alert>

<base-alert type="next">

[Pembuat situs statis](/docs/2.x/concepts/static-site-generation) untuk situs statis.

</base-alert>

### Mengakses parameter _Route_ secara Lokal

Anda dapat mengakses parameter rute saat ini didalam halaman atau komponen dengan mengambil referensi `this.$route.params.{parameterName}`. Contohnya, jika Anda memiliki halaman pengguna dinamis (`users/_id.vue`) dan ingin mengakses parameter `id` untuk memuat informasi pengguna, Anda bisa melakukan akses dengan kode seperti berikut ini `this.$route.params.id`.

## Rute Bersarang (_Nested_)

Nuxt.js mengizinkan Anda untuk membuat rute bersarang dengan menggunakan rute anak dari vue-router. Untuk mendefinisikan komponen induk dari rute bersarang, Anda perlu membuat berkas Vue dengan nama yang sama dengan direktori yang mengandung _views_.

<base-alert>

Jangan lupa untuk memasukkan [komponen NuxtChild](/docs/2.x/features/nuxt-components#the-nuxtchild-component) di dalam komponen induk (`.vue` file).

</base-alert>

Turunan berkas ini:

```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

akan secara otomatis menghasilkan:

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## Rute Bersarang Dinamis

Ini bukanlah skenario yang umum, namun ini memungkinkan dengan Nuxt.js untuk memiliki rute anak yang dinamis di dalam rute induk yang dinamis.

Turunan berkas ini:

```
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

akan secara otomatis menghasilkan:

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

## Rute Bersarang Dinamis yang Tidak Diketahui

Jika Anda tidak mengatahui seberapa dalam struktur _URL_ Anda, Anda dapat menggunakan `_.vue` untuk membuat rute bersarang secara dinamis. Hal ini akan mengarahkan permintaan yang tidak sesuai dengan permintaan rute yang spesifik.

Turunan berkas ini:

```
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

Ini akan menangani permintaan seperti ini:

```
/ -> index.vue
/people -> people/index.vue
/people/123 -> people/_id.vue
/about -> _.vue
/about/careers -> _.vue
/about/careers/chicago -> _.vue
```

<base-alert type="info">

Menangani halaman 404 sekarang bisa dilakukan di dalam logika kode dari halaman `_.vue`.

</base-alert>

## Memperpanjang _router_

Ada beberapa cara untuk memperpanjang rute pada Nuxt:

- [router-extras-module](https://github.com/nuxt-community/router-extras-module) untuk melakukan kustomisasi parameter rute di dalam halaman
- Komponen [@nuxtjs/router](https://github.com/nuxt-community/router-module) untuk menimpa _router_ Nuxt dan menuliskan berkas `router.js` milik anda sendiri
- Gunakan properti [router.extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes) di `nuxt.config.js`

## Properti _router_

Properti _router_ mengizinkan Anda melakukan kustomisasi _router_ Nuxt.js (vue-router).

```js{}[nuxt.config.js]
export default {
  router: {
    // mengkustom router Nuxt.js
  }
}
```

### Dasar:

Dasar _URL_ dari aplikasi. Contohnya jika keseluruhan aplikasi halaman tunggal disajikan di bawah `/app/`, kemudian dasarannya seharusnya menggunakan nilai `'/app/'`.

<base-alert type="next">

[Properti dasar rute](/docs/2.x/configuration-glossary/configuration-router#base)

</base-alert>

### extendRoutes

Anda mungkin ingin memperpanjang rute yang dibuat oleh Nuxt.js. Anda dapat melakukan seperti itu melalui opsi `extendRoutes`.

Contoh penambahan rute kustom:

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

Jika Anda ingin mengurutkan rute, Anda dapat menggunakan fungsi `sortRoutes(routes)` dari `@nuxt/utils`:

```js{}[nuxt.config.js]
import { sortRoutes } from '@nuxt/utils'
export default {
  router: {
    extendRoutes(routes, resolve) {
      // tambahkan beberapa rute di sini

      // dan urutkan mereka
      sortRoutes(routes)
    }
  }
}
```

<base-alert>

Skema dari rute harus mengikuti [vue-router](https://router.vuejs.org/en/)

</base-alert>

<base-alert>

Ketika menambahkan rute yang menggunakan [_Views_ yang dinamai](/docs/2.x/features/file-system-routings), jangan lupa menambahkan `chunkNames` dari `components` yang dinamai.

</base-alert>

```js{}[nuxt.config.js]
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/users/:id',
        components: {
          default: resolve(__dirname, 'pages/users'), // atau routes[index].component
          modal: resolve(__dirname, 'components/modal.vue')
        },
        chunkNames: {
          modal: 'components/modal'
        }
      })
    }
  }
}
```

<base-alert type="next">

[Properti extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes)

</base-alert>

### fallback

Anda dapat mengontrol apakah _router_ harus kembali ke mode _hash_ ketika peramban tidak mendukung `history.pushState` namun mode ditetapkan sebagai mode _history_.

<base-alert type="next">

[Properti fallback](/docs/2.x/configuration-glossary/configuration-router#fallback)

</base-alert>

### mode

Lakukan konfigurasi pada _router_, namun ini tidak direkomendasikan untuk mengganti karena per-_render_-an sisi server.

<base-alert type="next">

[Properti pada mode](/docs/2.x/configuration-glossary/configuration-router#mode)

</base-alert>

### parseQuery / stringifyQuery

Memberikan kustom untaian kueri / fungsi stringify.

<base-alert type="next">

[Properti parseQuery / stringifyQuery](/docs/2.x/configuration-glossary/configuration-router#parsequery--stringifyquery)

</base-alert>

### routeNameSplitter

Anda mungkin ingin mengubah pemisah antara nama rute yang digunakan Nuxt.js. Anda dapat melakukannya melalui opsi `routeNameSplitter` pada berkas konfigurasi Anda. Misalkan kita memiliki halaman berkas `pages/posts/_id.vue`. Nuxt.js akan membuat nama rute secara terprogram, pada hal ini `posts-id`. Mengubah konfigurasi `routeNameSplitter` ke `/`, maka akan mengubah rute menjadi `posts/id`.

```js{}[nuxt.config.js]
export default {
  router: {
    routeNameSplitter: '/'
  }
}
```

### scrollBehavior

Opsi `scrollBehavior` mengizinkan Anda mendefinisikan sebuah perilaku yang dikustomisasi untuk posisi _scroll_ diantara rute. Metode ini dipanggil setiap kali halaman di-_render_.

<base-alert type="next">

Untuk mempelajari lebih lanjut tentang hal ini, lihat [dokumentasi vue-router scrollBehavior](https://router.vuejs.org/guide/advanced/scroll-behavior.html).

</base-alert>

Tersedia sejak versi: v2.9.0

Pada Nuxt.js Anda dapat menggunakan sebuah berkas untuk menimpa scrollBehavior pada _router_. Berkas ini harus diletakkan di sebuah direktori yang disebut app.

`~/app/router.scrollBehavior.js`.

Contoh dari memaksakan posisi _scroll_ ke atas untuk setiap rute:

```js{}[app/router.scrollBehavior.js]
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

<base-alert type="next">

[Berkas bawaan Nuxt.js `router.scrollBehavior.js`.](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js)

</base-alert>

<base-alert type="next">

[Properti scrollBehavior](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior)

</base-alert>

### trailingSlash

Tersedia sejak versi: v2.10

Jika opsi ini dipasang ke `true`, maka garis miring di akhir akan dimasukkan pada setiap rute. Jika dipasang sebagai `false`, maka mereka akan dilepaskan.

```js{}[nuxt.config.js]
export default {
  router: {
    trailingSlash: true
  }
}
```

<base-alert>

Opsi ini seharusnya tidak diatur tanpa persiapan dan harus dicoba sepenuhnya. Ketika mengatur `router.trailingSlash` ke tempat selain `undefined`(merupakan nilai bawaan), selain itu rute tidak akan bekerja. Jadi kode pengalihan 301 harus berada ditempat dan tautan internal Anda harus diadaptasikan secara benar. Jika Anda mengatur `trailingSlash` ke `true`, maka hanya `example.com/abc/` yang akan bekerja namun `example.com/abc` tidak. Jika diatur `false`, maka sebaliknya.

</base-alert>

<base-alert type="next">

[Properti trailingSlash](/docs/2.x/configuration-glossary/configuration-router#trailingslash)

</base-alert>

<quiz :questions="questions"></quiz>
