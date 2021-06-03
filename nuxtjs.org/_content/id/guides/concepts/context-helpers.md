---
title: Context and Helpers
description: Context-Nya memberikan *additional* dan seringkali informasi opsional tentang permintaan saat ini ke aplikasi.
position: 2
category: concepts
csb_link_context: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-context?fontsize=14&hidenavigation=1&theme=dark
csb_link_helpers: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/02_concepts/02_context_helpers-helpers?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/context.svg
imgAlt: nuxt-js-context-keys
questions:
  - question: Apa alasan menggunakan context?
    answers:
      - Rendering disisi Server-side
      - Memiliki status global
      - Laziness (Kemalasan)
    correctAnswer: Rendering disisi Server-side
  - question: Kunci mana yang tidak ada di context?
    answers:
      - env
      - isDev
      - $store
    correctAnswer: $store
  - question: Kunci context mana yang hanya tersedia di sisi *server*?
    answers:
      - from
      - app
      - req
    correctAnswer: req
  - question: Kunci context mana yang hanya tersedia di sisi *client*?
    answers:
      - from
      - res
      - app
    correctAnswer: from
  - question: Apa yang dapat dilakukan oleh helper `$nuxt`?
    answers:
      - Menampilkan versi Nuxt
      - Memberikan info tentang status koneksi internet pengguna
      - Mengakses fungsi modul yang terbuka
    correctAnswer: Menampilkan versi Nuxt
  - question: Apa nama pembantu helper proses?
    answers:
      - global, client, dan server
      - server, client, dan static
      - ssr, spa, dan static
    correctAnswer: server, client, dan static
---

<app-modal :src="img" :alt="imgAlt"></app-modal>

Objek `context` tersedia dalam fungsi Nuxt tertentu seperti [asyncData](/docs/2.x/features/data-fetching#async-data), [plugins](/docs/2.x/directory-structure/plugins), [middleware](/docs/2.x/directory-structure/middleware) dan [nuxtServerInit](/docs/2.x/directory-structure/store#the-nuxtserverinit-action). Ini memberikan _additional_ dan seringkali informasi opsional tentang permintaan saat ini ke aplikasi.

Pertama dan terpenting, context digunakan untuk menyediakan akses ke bagian lain dari aplikasi Nuxt.js, mis. penyimpanan Vuex atau instance `connect` yang mendasarinya. Jadi, kami memiliki objek `req` dan `res` dalam context yang tersedia di sisi server dan `store` selalu tersedia. Namun seiring waktu, contextnya diperluas dengan banyak variabel dan pintasan bermanfaat lainnya. Sekarang kita memiliki akses ke fungsionalitas HMR dalam mode `development`, `route` saat ini, halaman `params` dan `query`, serta opsi untuk mengakses variabel lingkungan melalui context. Selanjutnya, fungsi modul dan pembantu dapat diekspos melalui context untuk tersedia di kedua sisi - sisi klien dan server.

**Semua kunci context yang ada secara default**

```js
function (context) { // Bisa menggunakan asyncData, nuxtServerInit, ...
  // Selalu tersedia
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
   $config
  } = context

  // Hanya tersedia disisi Server-side
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
  }

  // Hanya tersedia disisi Client-side
  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

<base-alert>

_Context_ yang kami rujuk di sini tidak sama dengan objek `context` yang tersedia di [Vuex Actions](https://vuex.vuejs.org/guide/actions.html) atau yang tersedia di `build.extend` di `nuxt.config.js` Anda. Ini semua tidak berhubungan satu sama lain!.

</base-alert>

Pelajari lebih lanjut tentang kunci context yang berbeda di [Internals Glossary](/docs/2.x/internals-glossary/context) kami.

## Contoh

### Menggunakan parameter halaman untuk API Query Anda

Context secara langsung memperlihatkan kemungkinan parameter dinamis dari rute melalui `context.params`. Pada contoh berikut, kami memanggil API melalui modul `nuxt/http` menggunakan parameter halaman dinamis sebagai bagian dari URL. Modul, seperti modul [nuxt/http](https://http.nuxtjs.org/), dapat menampilkan fungsi sendiri yang kemudian tersedia melalui objek [context.app](http://context.app).

Selain itu, kami membungkus panggilan API dalam pernyataan `try/catch` untuk menangani potensi kesalahan. Dengan fungsi `context.error`, kita bisa langsung menampilkan halaman kesalahan Nuxt dan meneruskan kesalahan yang terjadi.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData(context) {
    const id = context.params.id
    try {
      // Menggunakan modul nuxtjs/http di sini diekspos melalui context.app
      const post = await context.app.$http.$get(
        `https://api.nuxtjs.dev/posts/${id}`
      )
      return { post }
    } catch (e) {
      context.error(e) // Tampilkan halaman nuxt error dengan kesalahan yang dilemparkan
    }
  }
}
```

Dengan [ES6](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/) Anda dapat menggunakan sintaks ini untuk mendeskripsikan objek context Anda. Anda dapat memasukkan objek yang ingin Anda akses dan kemudian Anda dapat menggunakannya dalam kode tanpa menggunakan kata context.

```js{}[pages/posts/_id.vue]
export default {
  async asyncData({ params, $http, error }) {
    const id = params.id

    try {
      // Menggunakan modul nuxtjs/http di sini diekspos melalui context.app
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${id}`)
      return { post }
    } catch (e) {
      error(e) // Tampilkan halaman nuxt error dengan kesalahan yang dilemparkan
    }
  }
}
```

Ingin menggunakan parameter query Anda? kemudian Anda menggunakan [context.query.id](/docs/2.x/internals-glossary/context#query) then.

### Redirecting user & mengakses store

Mengakses Vuex store (jika Anda telah mengaturnya melalui direktori `store`) juga dimungkinkan melalui context. Ini menyediakan objek `store` yang dapat diperlakukan sebagai `this.$store` dalam komponen Vue. Selain itu, kami menggunakan metode `redirect`, helper yang diekspos melalui context, untuk mengarahkan pengguna jika status `authenticated` salah.

```js
export default {
  middleware({ store, redirect }) {
    // mengambil kunci melalui object destructuring
    const isAuthenticated = store.state.authenticated
    if (!isAuthenticated) {
      return redirect('/login')
    }
  }
}
```

<app-modal>
  <code-sandbox :src="csb_link_context"></code-sandbox>
</app-modal>

## Helpers

Selain pintasan dalam context, ada juga pembantu kecil lainnya yang ada di aplikasi Nuxt.js Anda.

## `$nuxt`: helper Nuxt.js

`$nuxt` adalah helper yang dirancang untuk meningkatkan pengalaman pengguna dan menjadi jalan keluar dalam beberapa situasi. Ia dapat diakses melalui `this.$nuxt` di komponen Vue dan melalui `window.$nuxt` jika tidak di sisi klien.

### Pemeriksa koneksi

Helper `$nuxt` menyediakan cara cepat untuk mengetahui apakah koneksi internet pengguna ada atau tidak: Ini mengekspos nilai boolean `isOffline` dan `isOnline`. Kita dapat menggunakan ini untuk menampilkan pesan segera setelah pengguna offline (misalnya).

```html{}[layouts/default.vue]
<template>
  <div>
    <div v-if="$nuxt.isOffline">Anda sedang offline</div>
    <Nuxt />
  </div>
</template>
```

### Mengakses instance root

Selain menyediakan fitur DX/UX, helper `$nuxt` juga menyediakan jalan pintas ke instance root aplikasi Anda dari setiap komponen lainnya. Tetapi itu belum semuanya, Anda juga dapat mengakses helper `$nuxt` melalui `window.$nuxt` yang dapat digunakan sebagai jalan keluar untuk mendapatkan akses ke metode modul seperti `$axios` dari luar komponen Vue Anda. Bagaimanapun, ini harus digunakan dengan bijak dan **hanya sebagai pilihan terakhir**.

### Menyegarkan halaman data

Saat Anda ingin menyegarkan halaman saat ini untuk pengguna, Anda tidak ingin memuat ulang halaman sepenuhnya karena Anda mungkin menekan server lagi dan setidaknya menginisialisasi ulang seluruh aplikasi Nuxt.js. Sebagai gantinya, Anda sering kali hanya ingin menyegarkan data, yang disediakan oleh `asyncData` atau `fetch`.

Anda dapat melakukannya dengan menggunakan `this.$nuxt.refresh()`!

```html
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Segarkan</button>
  </div>
</template>

<script>
  export default {
    asyncData() {
      return { content: 'Tambahkan waktu: ' + new Date() }
    },
    methods: {
      refresh() {
        this.$nuxt.refresh()
      }
    }
  }
</script>
```

### Mengontrol loading bar

Dengan `$nuxt`, Anda juga dapat mengontrol loading bar Nuxt secara terprogram melalui `this.$nuxt.$loading`.

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

Baca lebih lanjut di bab fitur loading yang sesuai

## Helper onNuxtReady

Jika Anda ingin menjalankan beberapa skrip _setelah_ aplikasi Nuxt.js Anda telah dimuat dan siap, Anda dapat menggunakan fungsi `window.onNuxtReady`. Ini dapat berguna saat Anda ingin menjalankan fungsi di sisi klien tanpa menambah waktu untuk interaktif di situs Anda.

```js
window.onNuxtReady(() => {
  console.log('Nuxt.js sudah siap dan dipasang')
})
```

## Proses helpers

Nuxt.js memasukkan tiga nilai boolean ke dalam objek `process` global yang akan membantu Anda menentukan apakah aplikasi Anda dirender di server atau sepenuhnya di klien, serta memeriksa pembuatan situs statis. Helper ini tersedia di seluruh aplikasi Anda dan biasanya digunakan dalam kode userland `asyncData`.

```html{}[pages/about.vue]
<template>
  <h1>Saya dirender di sisi {{ renderedOn }}</h1>
</template>

<script>
  export default {
    asyncData() {
      return { renderedOn: process.client ? 'client' : 'server' }
    }
  }
</script>
```

Dalam contoh, `renderedOn` akan dievaluasi ke `'server'` saat menggunakan rendering sisi server dan pengguna mengakses halaman secara langsung. Saat pengguna membuka halaman dari bagian lain aplikasi, misalnya. dengan mengklik pada `<NuxtLink>`, itu akan mengevaluasi ke klien.

<app-modal>
  <code-sandbox :src="csb_link_helpers"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
