---
title: 'API: Metode validitas'
description: Nuxt.js memungkinkan Anda menentukan metode validator di dalam komponen rute dinamis Anda.
menu: validate
category: pages
position: 30
---

# Metode validitas

> Nuxt.js memungkinkan Anda menentukan metode validator di dalam komponen rute dinamis Anda.

- **Type:** `Function`

```js
validate({ params, query, store }) {
  return true // jika params valid
  return false // akan mencegah Nuxt.js untuk me-render rute dan menampilkan halaman kesalahan
}
```

Nuxt.js memungkinkan anda menentukan metode validasi di dalam komponen rute dinamis (Sebagai contoh: `pages/users/_id.vue`).

Jika metode validitas tidak mengembalikan nilai `true` , Nuxt.js secara otomatis akan memuat halaman kesalahan 404.

```js
export default {
  validate({ params }) {
    // Harus berupa angka
    return /^\d+$/.test(params.id)
  }
}
```

Anda juga dapat melakukan pengecekan data di dalam [store](/guide/vuex-store) milik anda sebagai contoh (disertakan oleh [`nuxtServerInit`](/guide/vuex-store#the-nuxtserverinit-action) sebelum action):

```js
export default {
  validate ({ params, store }) {
    // Check if `params.id` is an existing category
Cek jika `params.id` terdapat pada direktori
    return store.state.categories.some((category) => category.id === params.id)
  }
}
```
