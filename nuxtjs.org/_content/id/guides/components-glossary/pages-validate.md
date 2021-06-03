---
title: 'Metode Validasi'
description: Nuxt.js memungkinkan Anda menentukan metode validator di dalam komponen rute dinamis Anda.
menu: Metode Validasi
category: components-glossary
position: 0
---

> Nuxt.js memungkinkan Anda menentukan metode validator di dalam komponen rute dinamis Anda.

- **Type:** `Function` atau `Async Function`

`validate` dipanggil setiap kali sebelum menavigasi ke rute baru. Ini akan disebut sisi server sekali (pada permintaan pertama ke aplikasi Nuxt) dan sisi klien saat menavigasi ke rute lebih lanjut. Metode ini mengambil [`konteks`](/docs/2.x/internals-glossary/context) object as an argument.

```js
validate({ params, query, store }) {
  return true // jika parameternya benar
  return false // akan menghentikan Nuxt.js untuk membuat rute dan menampilkan halaman kesalahan
}
```

```js
async validate({ params, query, store }) {
  // menunggu pengerjaan
  return true // jika parameternya benar
  return false // akan menghentikan Nuxt.js untuk membuat rute dan menampilkan halaman kesalahan
}
```

Anda juga dapat mengembalikan _fungsi_:

```js
validate({ params, query, store }) {
  return new Promise((resolve) => setTimeout(() => resolve()))
}
```

Nuxt.js memungkinkan Anda menentukan metode validator di dalam komponen rute dinamis (Contoh: `pages/users/_id.vue`).

Jika metode validasi tidak mengembalikan `true`, Nuxt.js akan secara otomatis memuat halaman kesalahan 404.

```js
export default {
  validate({ params }) {
    // Harus berupa angka
    return /^\d+$/.test(params.id)
  }
}
```

Anda juga dapat memeriksa beberapa data di berkas [store](/docs/2.x/directory-structure/store) misalnya (diisi oleh [`nuxtServerInit`](/docs/2.x/directory-structure/store#the-nuxtserverinit-action) Sebelum tindakan):

```js
export default {
  validate({ params, store }) {
    // Periksa apakah `params.id` adalah kategori yang ada
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

Anda juga dapat menampilkan galat yang diharapkan atau tidak terduga selama eksekusi fungsi validasi:

```js
export default {
  async validate({ params, store }) {
    // Melempar kesalahan server internal 500 dengan pesan khusus
    throw new Error('Under Construction!')
  }
}
```
