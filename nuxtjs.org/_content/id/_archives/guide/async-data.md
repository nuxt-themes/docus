---
title: Data Async
description: Anda mungkin ingin mengambil data dan me-rendernya di sisi-server. Nuxt.js menambahkan metode `asyncData` untuk memungkinkan Anda menangani operasi async sebelum menyetel data komponen.
category: getting-started
position: 106
---

> Anda mungkin ingin mengambil data dan me-rendernya di sisi-server. Nuxt.js menambahkan metode `asyncData` untuk memungkinkan Anda menangani operasi async sebelum menyetel data komponen.

<div>
  <a href="http://vueschool.io/?friend=nuxt" target="_blank" class="Promote">
    <img src="/async-data-with-nuxtjs.png" srcset="/async-data-with-nuxtjs-2x.png 2x" alt="AsyncData by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Async Data with Nuxt.js</h4>
      <p class="Promote__Content__Description">Learn how to manage asynchronous data with Nuxt.js.</p>
      <p class="Promote__Content__Signature">Video courses made by VueSchool to support Nuxt.js developpement.</p>
    </div>
  </a>
</div>

## Metode asyncData

Terkadang Anda hanya ingin mengambil data dan mem-"pre-render"-nya di server tanpa menggunakan simpanan (store). `asyncData` dipanggil setiap saat sebelum memuat komponen (**hanya untuk komponen halaman**). Ini bisa disebut sisi-server atau sebelum menavigasi ke rute yang sesuai. Metode ini menerima [context](/api/context) sebagai argumen pertama, Anda dapat menggunakannya untuk mengambil beberapa data dan Nuxt.js akan menggabungkannya dengan data komponen.

<div class="Alert Alert--orange">

Anda **TIDAK** memiliki akses contoh komponen melalui `this` di dalam `asyncData` karena ia dipanggil **sebelum memulai** komponennya.

</div>

Nuxt.js menawarkan berbagai cara untuk menggunakan `asyncData`. Pilih yang paling Anda lazimi:

1. Mengembalikan `Promise`. Nuxt.js akan menunggu promise terselesaikan sebelum me-render komponennya.
2. Menggunakan [async/await proposal](https://github.com/lukehoban/ecmascript-asyncawait) ([pelajari lebih lanjut](https://zeit.co/blog/async-and-await))
3. Tentukan callback sebagai argumen kedua. Ini harus dipanggil seperti ini: `callback(err, data)`

### Mengembalikan Promise

```js
export default {
  asyncData({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`).then(res => {
      return { title: res.data.title }
    })
  }
}
```

### Menggunakan async/await

```js
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### Menggunakan callback

```js
export default {
  asyncData({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`).then(res => {
      callback(null, { title: res.data.title })
    })
  }
}
```

### Menampilkan data

Hasil dari asyncData akan **digabungkan** dengan data. Anda dapat menampilkan data di dalam templat Anda seperti yang biasa Anda lakukan:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## Context

Untuk melihat daftar kunci yang tersedia dalam `context`, lihat <a href="/api/context" data-md-type="link">API Essential `context`</a>.

### Mengakses data rute dinamis

Anda dapat menggunakan objek context yang dimasukkan ke properti `asyncData` untuk mengakses data rute dinamis. Misalnya, rute dinamis params dapat diakses dengan menggunakan nama file atau folder yang telah dikonfigurasi. Jadi, jika Anda mendefinisikan sebuah file bernama `_slug.vue`, Anda dapat mengaksesnya melalui`context.params.slug`.

## Menangani Error

Nuxt.js menambahkan metode `error(params)` di dalam `context`, Anda dapat memanggilnya untuk menampilkan halaman kesalahan. `params.statusCode` juga akan digunakan untuk membuat kode status yang tepat dari sisi-server.

Contoh dengan `Promise`:

```js
export default {
  asyncData({ params, error }) {
    return axios
      .get(`https://my-api/posts/${params.id}`)
      .then(res => {
        return { title: res.data.title }
      })
      .catch(e => {
        error({ statusCode: 404, message: 'Post not found' })
      })
  }
}
```

Jika Anda menggunakan argumen `callback`, Anda dapat memanggil secara langsung dengan kesalahannya dan Nuxt.js akan memanggil metode `error` untuk Anda:

```js
export default {
  asyncData({ params }, callback) {
    axios
      .get(`https://my-api/posts/${params.id}`)
      .then(res => {
        callback(null, { title: res.data.title })
      })
      .catch(e => {
        callback({ statusCode: 404, message: 'Post not found' })
      })
  }
}
```

Untuk menyesuaikan halaman kesalahan, lihat [Panduan Tampilan tata letak (layout)](/guide/views#layouts).
