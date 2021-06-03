---
title: Rute Terautentikasi (Auth Routes)
description: Contoh rute terautentikasi (Authenticated routes) menggunakan Nuxt.js
github: auth-routes
livedemo: https://nuxt-auth-routes.gomix.me
liveedit: https://gomix.com/#!/project/nuxt-auth-routes
category: advanced
position: 302
---

# Dokumentasi

> Nuxt.js dapat digunakan untuk membuat rute terautentikasi dengan mudah.

## Menggunakan Express dan Sessions

Untuk menambahkan fitur sesi (sessions) di aplikasi kita, kita akan menggunakan `express` dan `express-session`, untuk hal ini, kita perlu menggunakan Nuxt.js secara terprogram.

Pertama, kita instal dependensi:

```bash
yarn add express express-session body-parser whatwg-fetch
```

_Kita akan membahas tentang `whatwg-fetch` nanti._

Kemudian buat `server.js` kita:

```js
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()

// Body parser, untuk mengakses `req.body`
app.use(bodyParser.json())

// Sessions untuk membuat `req.session`
app.use(
  session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
)

// POST `/api/login` untuk memasukkan (log in) pengguna dan menambahkannya ke `req.session.authUser`
app.post('/api/login', function (req, res) {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

// POST `/api/logout` untuk mengeluarkan (log out) pengguna dan menghapusnya dari `req.session`
app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

// Kita instantiate Nuxt.js dengan opsi
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({ dev: !isProd })
// Tidak menggunakan build saat produksi
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3000)
console.log('Server is listening on http://localhost:3000')
```

Dan kita perbarui skrip `package.json` kita:

```json
// ...
"scripts": {
  "dev": "node server.js",
  "build": "nuxt build",
  "start": "cross-env NODE_ENV=production node server.js"
}
// ...
```

Catatan: Anda perlu untuk menjalankan `npm install --save-dev cross-env` agar contoh di atas dapat bekerja. Jika Anda _tidak_ mengembangkan di Windows Anda tidak memerlukan cross-env di dalam skrip `start` Anda dan mengatur `NODE_ENV` secara langsung.

## Menggunakan store

Kita memerlukan sebuah status global (global state) agar aplikasi kita tahu jika pengguna terhubung **di seluruh halaman**.

Agar Nuxt.js menggunakan Vuex, kita buat file `store/index.js` :

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Polyfill untuk `window.fetch()`
require('whatwg-fetch')

const store = () =>
  new Vuex.Store({
    state: {
      authUser: null
    },

    mutations: {
      SET_USER(state, user) {
        state.authUser = user
      }
    },

    actions: {
      // ...
    }
  })

export default store
```

1. Kita mengimpor `Vue` dan `Vuex` (sudah termasuk di dalam Nuxt.js) dan kita memberitahu Vue untuk menggunakan Vuex agar kita dapat menggunakan `$store` di komponen-komponen kita.
2. Kita `require('whatwg-fetch')` untuk polyfill metode `fetch()` di semua browser (lihat [fetch repo](https://github.com/github/fetch)).
3. Kita membuat mutasi (mutation) `SET_USER` yang akan mengatur `state.authUser` ke pengguna yang terhubung.
4. Kita mengekspor "store instance" ke Nuxt.js dapat memasukkannya ke aplikasi utama kita.

### Aksi nuxtServerInit()

Nuxt.js akan memanggil tindakan spesifik yang disebut `nuxtServerInit` dengan konteks dalam argumen, jadi saat aplikasi akan dimuat, store akan sudah terisi dengan beberapa data yang bisa kita dapatkan dari server.

Di `store/index.js`, kita dapat menambahkan aksi `nuxtServerInit`:

```js
nuxtServerInit ({ commit }, { req }) {
  if (req.session && req.session.authUser) {
    commit('SET_USER', req.session.authUser)
  }
}
```

Untuk membuat metode data asinkron, Nuxt.js menawarkan beragam cara, pilih yang paling Anda kenal:

1. mengembalikan `Promise`, Nuxt.js akan menunggu promise terselesaikan sebelum me-render komponennya.
2. Menggunakan [proposal `async`/`await`](https://github.com/lukehoban/ecmascript-asyncawait) ([pelajari lebih lanjut](https://zeit.co/blog/async-and-await)).

### Aksi login()

Kita menambahkan sebuah aksi `login` yang akan dipanggil dari komponen halaman kita untuk memasukkan (log in) pengguna:

```js
login ({ commit }, { username, password }) {
  return fetch('/api/login', {
    // Mengirim cookies client ke server
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then((res) => {
    if (res.status === 401) {
      throw new Error('Bad credentials')
    } else {
      return res.json()
    }
  })
  .then((authUser) => {
    commit('SET_USER', authUser)
  })
}
```

### Metode logout()

```js
logout ({ commit }) {
  return fetch('/api/logout', {
    // Mengirim cookies client ke server
    credentials: 'same-origin',
    method: 'POST'
  })
  .then(() => {
    commit('SET_USER', null)
  })
}
```

## Komponen halaman

Kemudian kita bisa menggunakan `$store.state.authUser` di komponen halaman kita untuk memeriksa apakah pengguna terhubung dalam aplikasi kita atau tidak.

### Mengalihkan pengguna jika tidak terhubung

Mari tambahkan sebuah rute `/secret` di mana hanya pengguna yang terhubung yang dapat melihat kontennya:

```html
<template>
  <div>
    <h1>Super secret page</h1>
    <router-link to="/">Back to the home page</router-link>
  </div>
</template>

<script>
  export default {
    // kita menggunakan fetch() karena kita tidak ingin mengatur data untuk komponen ini
    fetch({ store, redirect }) {
      if (!store.state.authUser) {
        return redirect('/')
      }
    }
  }
</script>
```

Kita bisa melihat dalam metode `fetch` bahwa kita memanggil `redirect('/')` ketika pengguna tidak terhubung.
