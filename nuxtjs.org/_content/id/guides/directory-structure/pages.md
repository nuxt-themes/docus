---
title: pages
description: Direktori `pages` berisikan semua halaman dan jalur aplikasi Anda. Nuxt.js membaca semua berkas `.vue` dalam direktori ini dan secara otomatis membuat konfigurasi jalur (_router_) untuk Anda.
position: 10
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/11_pages?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Pada direktori apa Anda menaruh komponen-komponen halaman Anda?
    answers:
      - views
      - pages
      - vues
    correctAnswer: pages
  - question: Untuk membuat _routes_, Anda dibutuhkan secara manual untuk melakukan konfigurasi pada berkas router.js
    answers:
      - true
      - false
    correctAnswer: false
  - question: Anda dapat membuat jalur (_routes_) dengan berkas .js dan berkas .ts
    answers:
      - true
      - false
    correctAnswer: true
  - question: Kapan _asyncData_ dipanggil?
    answers:
      - sebelum _loading_ komponen
      - ketika _loading_ komponent
      - setelah _loading_ komponen
    correctAnswer: sebelum _loading_ komponen
  - question: Pada properti apa Anda dapat menambahkan _meta tags_ Anda?
    answers:
      - head
      - meta
      - metaTags
    correctAnswer: head
  - question: Properti yang mana yang dapat Anda gunakan untuk menambahkan tata letak (_layout_) tampilan yang berbeda untuk halaman Anda?
    answers:
      - layouts
      - page
      - layout
    correctAnswer: layout
  - question: Bagaimana Anda menetapkan properti _scrollToTop_ jika Anda ingin memberi perintah pada Nuxt.js untuk melakukan pengguliran ke atas ketika melakukan _render_ pada jalur anak (_child route_)?
    answers:
      - "scrollToTop: 'scroll'"
      - 'scrollToTop: true'
      - "scroll: 'top'"
    correctAnswer: 'scrollToTop: true'
  - question: Bagaimana Anda menambahkan middleware/auth.js pada halaman Anda?
    answers:
      - 'middleware: true'
      - "middleware: 'auth'"
      - "import auth from 'middleware/auth.js'"
    correctAnswer: "middleware: 'auth'"
  - question: Untuk menetapkan pengintai (_watcher_) untuk _query strings_, properti apa yang dapat Anda gunakan?
    answers:
      - watcher
      - queryWatcher
      - watchQuery
    correctAnswer: watchQuery
  - question: Pengintaian (_watching_) dimatikan secara bawaan.
    answers:
      - true
      - false
    correctAnswer: true
---

Direktori `pages` berisikan semua halaman dan jalur aplikasi Anda. Nuxt.js membaca semua berkas `.vue` dalam direktori ini dan secara otomatis membuat konfigurasi jalur (_router_) untuk Anda.

<base-alert type="info">

Anda juga dapat membuat jalur (_routes_) dengan berkas .js dan berkas .ts.

</base-alert>

Setiap komponen halaman (_Page component_) merupakan komponen Vue, tetapi Nuxt.js menambahkan atribut dan fungsi-fungsi khusus yang dapat membantu Anda dalam pengembangan aplikasi _universal_ Anda semudah mungkin.

```html{}[pages
<template>
  <h1 class="red">Halo {{ nama }}!</h1>
</template>

<script>
  export default {
    // properti halaman berada disini
  }
</script>

<style>
  .red {
    color: red;
  }
</style>
```

## Halaman-halaman dinamis

Halaman-halaman dinamis dapat dibuat ketika Anda tidak tahu nama halaman tersebut karena nama halaman tersebut datang dari antarmuka pemrograman aplikasi (API) atau Anda tidak ingin membuat halaman yang sama secara berulang. Untuk membuat halaman dinamis, Anda dapat menambahkan simbol garis bawah (_underscore_) sebelum nama berkas .vue Anda atau sebelum nama direktori Anda jika Anda ingin direktori Anda menjadi dinamis. Anda dapat memberi nama berkas atau direktori Anda dengan apapun yang Anda inginkan, tetapi Anda harus memberi awalan nama tersebut dengan garis bawah (_underscore_).

Jika Anda memberi nama salah satu berkas `_slug.vue` dalam direktori `pages` Anda, Anda dapat mengakses nilai tersebut menggunakan konteks (_context_) dengan `params.slug`

```html{}[pages/_slug.vue]
<template>
  <h1>{{ this.slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const slug = params.slug // Ketika memanggil /abc maka slug akan menjadi "abc"
      return { slug }
    }
  }
</script>
```

Jika Anda memberi nama sebuah berkas bernama \_slug.vue di dalam direktori \_book.vue, Anda dapat mengakses nilai tersebut menggunakan konteks (_context_) dengan `params.slug` dan `params.book`

```html{}[pages/_book/_slug.vue]
<template>
  <h1>{{ this.book }} / {{ this.slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const book = params.book
      const slug = params.slug
      return { book, slug }
    }
  }
</script>
```

## Properti

### asyncData

AsyncData dipanggil setiap kali sebelum pemuatan (_loading_) komponen terjadi. Properti ini dapat menjadi _asynchronous_ dan menerima konteks (_context_) menjadi argumen. Objek yang dikembalikan akan digabung (_merged_) dengan objek data Anda.

```js{}[pages/index.vue]
export default {
  asyncData (context) {
    return { name: 'World' }
  }
```

<base-alert type="next">

Lihat informasi lebih lanjut mengenai bagaimana asyncData bekerja, pada bab [Data Fetching](/docs/2.x/features/data-fetching#async-data)

</base-alert>

### _fetch_ (pengambilan)

Setiap kali anda ingin mendapatkan data _asynchronous_ anda dapat menggunakan fungsi _fetch_. _Fetch_ dipanggil pada _server-side_ ketika me-_render_ jalur (_route_), dan pada _client-side_ ketika bernavigasi.

```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    async fetch() {
      this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
        res.json()
      )
    }
  }
</script>
```

<base-alert type="next">

Lihat lebih lanjut bagaimana _fetch_ bekerja pada bab [Data Fetching](/docs/2.x/features/data-fetching)

</base-alert>

### _head_ (kepala)

Menetapkan label <meta> yang spesifik untuk halaman sekarang, Nuxt.js menggunakan `vue-meta` untuk memperbarui dokumen _head_ dan atribut-atribut meta pada aplikasi Anda.

```js{}[pages/index.vue]
export default {
  head() {
    // Tetapkan _Meta Tags_ untuk halaman ini
  }
}
```

<base-alert type="next">

Lihat lebih lanjut pada bab [Meta Tags dan SEO](/docs/2.x/features/meta-tags-seo).

</base-alert>

### _layout_ (penampilan)

Tentukan penampilan pada direktori _layouts_

```js{}[pages/index.vue]
export default {
  layout: 'blog'
}
```

<base-alert type="next">

Lihat lebih lanjut mengenai _layouts_ pada bab [Views](/docs/2.x/concepts/views#layouts).

</base-alert>

### _loading_ (memuat)

Jika ditetapkan menjadi _false_, menghindari halaman melakukan panggilan otomatis kepada fungsi `this.$nuxt.$loading.finish()` ketika Anda masuk dan `this.$nuxt.$loading.start()` ketika Anda meninggalkannya, membiarkan Anda mengontrol secara manual tingkah lakunya, seperti pada [contoh ini](/examples/custom-loading-component) memperlihatkan.

```js{}[pages/index.vue]
export default {
  loading: false
}
```

<base-alert type="info">

Hanya berlaku jika pemuatan (_loading_) juga ditetapkan pada nuxt.config.js.

</base-alert>

<base-alert type="next">

Lihat lebih lanjut pada bab [Loading](/docs/2.x/features/loading).

</base-alert>

### _transition_ (transisi)

Menetapkan transisi secara spesifik untuk halaman tertentu.

```js{}[pages/index.vue]
export default {
  transition: 'fade'
}
```

<base-alert type="next">

Lihat lebih lanjut pada bab [Transitions](/docs/2.x/features/transitions).

</base-alert>

### _scrollToTop_ (gulir ke atas)

Properti `scrollToTop` membiarkan Anda untuk memberi perintah pada Nuxt.js untuk melakukan pengguliran ke atas sebelum halaman di-_render_. Secara bawaan, Nuxt.js melakukan pengguliran ke atas ketika Anda mengganti ke halaman lain, tetapi jalur anak-anak (_child routes_), Nuxt.js mempertahankan posisi pengguliran. Jika Anda ingin memberi perintah pada Nuxt.js untuk melakukan pengguliran ke atas ketika melakukan _render_ jalur anak-anak Anda, tetapkan `scrollToTop` menjadi `true`.

```js{}[pages/index.vue]
export default {
  scrollToTop: true
}
```

Sebaliknya, Anda juga dapat secara manual menetapkan `scrollToTop` menjadi `false` pada jalur induk (_parent routes_).

Jika Anda ingin menimpa tingkah pengguliran secara bawaan dari Nuxt.js, silahkan melihat pada [scrollBehavior Option](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior).

### _middleware_

Menetapkan _middleware_ untuk halaman ini. _Middleware_ tersebut akan dipanggil sebelum melakukan _render_ pada halaman.

```js{}[pages/index.vue]
export default {
  middleware: 'auth'
}
```

<base-alert type="next">

Lihat lebih lanjut pada bab [Middleware](/docs/2.x/directory-structure/middleware).

</base-alert>

### Properti _watchQuery_

Gunakan kunci `watchQuery` untuk menetapkan pengintai (_watcher_) untuk _query strings_. Jika _strings_ berubah, maka semua fungsi (_methods_) komponen (_asyncData_, _fetch_, _validate_, _layout_, ...) akan dipanggil. Pengintaian dimatikan secara bawaan untuk meningkatkan performa.

```js{}[pages/index.vue]
export default {
  watchQuery: ['page']
}
```

<base-alert type="info">

Jika anda ingin menetapkan pengintai (_watcher_) untuk semua _query strings_, tetapkan `watchQuery` menjadi `true`.

</base-alert>

```js{}[pages/index.vue]
export default {
  watchQuery: true
}
```

Anda juga dapat menggunakan fungsi `watchQuery(newQuery, oldQuery)` untuk mendapat pengamat yang lebih baik.

```js{}[pages/index.vue]
export default {
  watchQuery(newQuery, oldQuery) {
    // Hanya eksekusi metode pada komponen jika _old query string_ mengandung 'bar'
    // dan _new query string_ mengandung 'foo'
    return newQuery.foo && oldQuery.bar
  }
}
```

<base-alert type="next">

Lihat lebih lanjut mengenai properti _watch query_ pada bab [Data Fetching](/docs/2.x/features/data-fetching).

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

## Mengabaikan Halaman

Jika Anda ingin mengabaikan halaman-halaman agar mereka tidak dimasukkan dalam berkas `router.js` yang dihasilkan secara otomatis, maka anda dapat mengabaikan mereka dengan memberi awalan (_prefixing_) dengan `-`.

Sebagai contoh, `pages/-about.vue` akan diabaikan.

<base-alert type="next">

Lihat [ignore option](/docs/2.x/configuration-glossary/configuration-ignore) untuk mempelajari lebih lanjut.

</base-alert>

## Konfigurasi

Anda dapat mengganti nama direktori `pages/` menjadi yang lain dengan opsi pengaturan `dir.pages`:

```js{}[nuxt.config.js]
export default {
  dir: {
    // Mengganti nama direktori `pages` menjadi `routes`
    pages: 'routes'
  }
}
```

<base-alert type="next">

Lihat [dir option](/docs/2.x/configuration-glossary/configuration-dir) untuk mempelajari lebih lanjut.

</base-alert>

<quiz :questions="questions"></quiz>
