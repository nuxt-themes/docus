---
title: 'API: Metode fetch'
description: Metode `fetch` digunakan untuk mengisi store sebelum me-render halaman, ia seperti metode `asyncData` tetapi ia tidak mengatur data komponen.
menu: fetch
category: pages
position: 22
---

# Metode fetch

> Metode fetch digunakan untuk mengisi store sebelum me-render halaman, ia seperti metode `asyncData` tetapi ia tidak mengatur data komponen.

- **Tipe:** `Function`

Metode `fetch`, _jika diatur_, dipanggil setiap saat sebelum memuat komponen (**hanya untuk komponen halaman**). Dia bisa dipanggil dari sisi-server atau sebelum mengarah ke rute yang sesuai.

Metode `fetch` menerima [objek `context`](/api/context) sebagai argumen pertama, kita dapat menggunakannya untuk mengambil beberapa data dan mengisi store. Untuk membuat metode `fetch` asinkron (asynchronous), **mengembalikan sebuah Promise**, Nuxt.js akan menunggu promise selesai (resolved) sebelum me-render komponen.

Contoh dari `pages/index.vue`:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    fetch({ store, params }) {
      return axios.get('http://my-api/stars').then(res => {
        store.commit('setStars', res.data)
      })
    }
  }
</script>
```

Anda juga bisa menggunakan `async`/`await` untuk membuat kode Anda lebih jelas:

```html
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
  export default {
    async fetch({ store, params }) {
      let { data } = await axios.get('http://my-api/stars')
      store.commit('setStars', data)
    }
  }
</script>
```

## Vuex

Jika Anda ingin memanggil aksi dari store (store action), gunakan `store.dispatch` di dalam `fetch`, pastikan untuk menunggu aksi berakhir dengan menggunakan `async`/`await` di dalam:

```html
<script>
  export default {
    async fetch({ store, params }) {
      await store.dispatch('GET_STARS')
    }
  }
</script>
```

`store/index.js`

```js
// ...
export const actions = {
  async GET_STARS({ commit }) {
    const { data } = await axios.get('http://my-api/stars')
    commit('SET_STARS', data)
  }
}
```
