---
title: Pengambilan data
description: Pada Nuxt.js Kami memiliki 2 cara untuk mendapatkan data dari sebuah antarmuka pemrograman aplikasi (_API_). Kami dapat menggunakan metode _fetch_ atau metode _asyncData_.
position: 4
category: features
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/04_data_fetching?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Di mana Anda dapat menggunakan pengait _fetch_ pada Nuxt.js?
    answers:
      - halaman dan komponen
      - hanya di halaman
      - hanya di komponen
    correctAnswer: halaman dan komponen
  - question: Anda memiliki akses ke `this` ketika menggunakan pengait _fetch_ Nuxt.js?
    answers:
      - true
      - false
    correctAnswer: true
  - question: Kapan pengait _fetch_ Nuxt.js dipanggil?
    answers:
      - setelah _instance_ komponen
      - sebelum _instance_ komponen
      - selama _instance_ komponen
    correctAnswer: setelah _instance_ komponen
  - question: Mana yang memperbolehkan anda untuk menampilkan _placeholder_ ketika `fetch` dipanggil *pada sisi klien*?
    answers:
      - $fetchState.timestamp
      - $fetchState.error
      - $fetchState.pending
    correctAnswer: $fetchState.pending
  - question: Bagaimana Anda menyimpan pemanggilan _fetch_ pada halaman yang Anda pernah kunjungi?
    answers:
      - keep-alive
      - save-fetch
      - cache-fetch
    correctAnswer: keep-alive
  - question: Di pengait yang diaktifkan, properti mana yang Anda gunakan untuk menambahkan tembolok (_cache_) 30 detik yang akan diambil?
    answers:
      - $fetchState.pending
      - $fetchState.timestamp
      - $fetchState.cache
    correctAnswer: $fetchState.timestamp
  - question: Kapan `asyncData` dipanggil?
    answers:
      - setelah memuat halaman komponen
      - selama memuat halaman komponen
      - sebelum memuat halaman komponen
    correctAnswer: sebelum memuat halaman komponen
  - question: Anda memiliki akses ke `this` di dalam `asyncData`?
    answers:
      - true
      - false
    correctAnswer: false
  - question: asyncData dapat menggunakan parameter `context` untuk mengakses data pada rute dinamis?
    answers:
      - true
      - false
    correctAnswer: true
  - question: Anda memiliki akses ke galat statusCode di asyncData?
    answers:
      - true
      - false
    correctAnswer: true
---

Pada Nuxt.js Kami memiliki 2 cara untuk mendapatkan data dari sebuah antarmuka pemrograman aplikasi (_API_). Kami dapat menggunakan metode _fetch_ atau metode _asyncData_.

## The fetch hook

<base-alert type="info">

Pengait ini hanya tersedia untuk Nuxt versi `2.12+`.

</base-alert>

Pengait `fetch` Nuxt.js dipanggil setelah _instance_ komponen dibuat pada sisi _server_: `this` juga tersedia di dalamnya.

```js
export default {
  async fetch() {
    console.log(this)
  }
}
```

<base-alert>

`fetch(context)` telah usang, namun Anda dapat menggunakan sebuah [_middleware_ anonim](/docs/2.x/directory-structure/middleware#anonymous-middleware) di halaman Anda:  `middleware(context)`

</base-alert>

### Kapan menggunakan _fetch_?

Setiap kali Anda harus mengambil data asinkron, `fetch` dipanggil pada sisi server ketika me-_render_ rute dan pada sisi klien ketika menggunakan navigasi.

Hal tersebut mengekspos `$fetchState` pada tingkatan komponen dengan properti sebagai berikut ini:

- `pending` merupakan sebuah `Boolean`, mengizinkan Anda untuk menampilkan _placeholder_ ketika `fetch` dipanggil _pada sisi klien_
- `error` dapat berupa antara `null` atau `Error` dan mengizinkan Anda untuk menampilkan pesan kegalatan (_error_)
- `timestamp` merupakan cap waktu dari terakhir kali pengambilan, berguna untuk [menembolok (_cache_) dengan `keep-alive`](#tembolok)

Anda juga memiliki akses ke `this.$fetch()`, ini berguna jika Anda ingin memanggil _hook_ `fetch` di komponen Anda.

```html{}[components/NuxtMountains.vue]
<template>
  <p v-if="$fetchState.pending">Mengambil gunung...</p>
  <p v-else-if="$fetchState.error">Terjadi kegalatan :(</p>
  <div v-else>
    <h1>Gunung selanjutnya</h1>
    <ul v-for="mountain of mountains">
      <li>{{ mountain.title }}</li>
    </ul>
    <button @click="$fetch">Segarkan</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>
```

<base-alert type="info">

Anda dapat mengakses [_context_](/docs/2.x/concepts/context-helpers) Nuxt di dalam pengait _fetch_ menggunakan `this.$nuxt.context`.

</base-alert>

### Opsi

`fetchOnServer`: `Boolean` atau `Function` (nilai anggapan: `true`), memanggil `fetch()` ketika server me-_render_ halaman.

`fetchDelay`: `Integer` (nilai anggapan: `200`), menetapkan waktu eksekusi minimal dalam milidetik (untuk menghindari eksekusi yang terlalu cepat)

Ketika `fetchOnServer` bernilai salah (`false` atau mengembalikan `false`), `fetch` akan dipanggil hanya pada sisi klien dan `$fetchState.pending` akan mengembalikan `true` ketika server me-_render_ komponen.

```js
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
  },
  // memanggil fetch hanya pada sisi klien
  fetchOnServer: false
}
```

### Memperhatikan perubahan untaian kueri (_query string_)

Pada dasarnya, pengait `fetch` tidak dipanggil pada perubahan untaian kueri. Untuk melakukan _watch_ untuk perubahan kueri, Anda dapat menambahkan _watcher_ pada `$route.query` dan memanggil `$fetch`:

```js
export default {
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    // juga dipanggil pada perubahan kueri
  }
}
```

### Tembolok

Anda dapat menggunakan direktif `keep-alive` di komponen `<nuxt/>` dan `<nuxt-child/>` untuk menyimpan pemanggilan `fetch` pada halaman yang Anda telah kunjungi:

```html{}[layouts/default.vue]
<template>
  <nuxt keep-alive />
</template>
```

Anda juga dapat melakukan spesifikasi pada [_props_](https://vuejs.org/v2/api/#keep-alive) yang dikirimkan ke `<keep-alive>` dengan mengirimkan `keep-alive-props` ke komponen `<nuxt>`.

```html{}[layouts/default.vue]
<nuxt keep-alive :keep-alive-props="{ max: 10 }" />
```

Menyimpan hanya 10 komponen halaman dalam memori.

### Menggunakan pengait `activated`

Nuxt akan secara langsung mengisi `this.$fetchState.timestamp` (cap waktu) dari terakhir kali `fetch` dipanggil (termasuk _render_ sisi server). Anda dapat menggunakan properti ini dikombinasikan dengan pengait `activated` untuk menambahkan tembolok selama 30 detik ke `fetch`:

```html{}[pages/posts/_id.vue]
<template> ... </template>

<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    activated() {
      // Memanggil fetch lagi jika terakhir fetch dipanggil lebih dari 30 detik yang lalu
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
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

Melakukan navigasi ke halaman yang sama tidak akan memanggil `fetch` kembali jika terakhir memanggil `fetch` masih kurang dari 30 detik yang lalu.

## Data Asinkron

<base-alert>

`asyncData` hanya dapat digunakan pada [halaman (_pages_)](/docs/2.x/directory-structure/pages) dan Anda tidak memiliki akses ke `this` di dalam pengait tersebut.

</base-alert>

Perbedaan utama antara `fetch` adalah Anda tidak perlu menangani status (_state_) yang tertunda atau galat. Nuxt akan menunggu pengait `asyncData` selesai sebelum menavigasi ke halaman selanjutnya atau menampilkan [halaman kegalatan](/docs/2.x/directory-structure/layouts#error-page))

Pengait menerima [konteks (_context_)](/docs/2.x/concepts/context-helpers) sebagai argumen pertama. Anda dapat menggunakan ini untuk menggambil beberapa data dan Nuxt.js akan secara otomatis mengabungkan objek yang dikembalikan dengan data pada komponen.

```html{}[pages/index.vue]
<template>
  <h1>{{ project }}</h1>
</template>

<script>
  export default {
    async asyncData(context) {
      return {
        project: 'nuxt'
      }
    }
  }
</script>
```

Pada contoh berikut ini, Kami menggunakan [@nuxt/http](https://http.nuxtjs.org/) yang mana Kami merekomendasikan untuk menggambil data dari antarmuka pemrograman aplikasi (_API_).

Pertama, kita perlu memasang paket ini:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxt/http
```

  </code-block>
  <code-block label="npm">

```bash
npm install @nuxt/http
```

  </code-block>
</code-group>

Lalu, tambahkan ini ke bagian `modules` dari `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxt/http']
}
```

```html{}[pages/posts/_id.vue]
<template>
  <div>
    <h1>{{ post.title }</h1>
    <p>{{ post.description }}</p>
  </div>
</template>

<script>
  export default {
    async asyncData({ params, $http }) {
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
      return { post }
    }
  }
</script>
```

### Memperhatikan perubahan pada kueri

Metode `asyncData` tidak dipanggil pada perubahan untaian kueri pada dasarnya. Jika Anda ingin mengubah sikap ini, contohnya ketika membangun sebuah komponen paginasi, Anda dapat menentukan parameter yang akan diperhatikan oleh properti `watchQuery` pada komponen halaman Anda.

<base-alert type="next">

Pelajari lebih lanjut mengenai [properti watchQuery](/docs/2.x/components-glossary/pages-watchquery) dan lihat daftar [kunci dari konteks](/docs/2.x/concepts/context-helpers) apa saja yang tersedia.

</base-alert>

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

<quiz :questions="questions"></quiz>
