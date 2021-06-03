---
title: 'API: Properti generate'
description: Konfigurasikan generasi aplikasi web universal Anda ke aplikasi web statis.
menu: generate
category: configuration
position: 110
---

# Properti generate

- Type: `Object`

> Konfigurasikan generasi aplikasi web universal Anda ke aplikasi web statis.

Ketika meluncurkan `nuxt generate` atau memanggil `nuxt.generate()` , Nuxt.js akan menggunakan konfigurasi yang didefinisikan dalam properti `generate` .

## dir

- Type: `String`
- Default: `'dist'`

Nama direktori dibuat oleh `nuxt generate` .

## fallback

- Type: `String` or `Boolean`
- Default: `'200.html'`

Jalur (path) menuju fallback SPA. File ini bisa digunakan ketika melakukan deploy website statis ke hosting statis. Ini akan dikembalikan ke mode `: 'spa' {/ code0} ketika rute tidak di-generate.`

## interval

- Type: `Number`
- Default: `0`

Interval antara 2 render agar tidak membanjiri panggilan API yang dibuat ke API potensial dari aplikasi web.

## minify

- Type: `Object`
- Default:

```js
minify: {
  collapseBooleanAttributes: true,
  collapseWhitespace: false,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeAttributeQuotes: false,
  removeComments: false,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: false,
  removeStyleLinkTypeAttributes: false,
  removeTagWhitespace: false,
  sortAttributes: true,
  sortClassName: false,
  trimCustomFragments: true,
  useShortDoctype: true
}
```

Anda dapat mengubah konfigurasi default dari [html-minifier](https://github.com/kangax/html-minifier) yang digunakan oleh Nuxt.js untuk memperkecil (minify) file html yang diciptakan selama proses generate.

## routes

- Type: `Array`

[Dynamic routes](/guide/routing#dynamic-routes) akan terabaikan oleh perintah `generate`.

Contoh:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

Hanya route `/` yang akan di-generate oleh Nuxt.js.

Jika Anda ingin Nuxt.js melakukan `generate route` dengan parameter dinamis (dynamic params), Anda perlu mengatur array pada rute dinamis (dynamic route).

Kita tambahkan rute untuk `/users/:id` di dalam file `nuxt.config.js`:

```js
module.exports = {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

Kemudian, ketika kita jalankan `nuxt generate`:

```bash
[nuxt] Generating...
[...]
nuxt:render Rendering url / +154ms
nuxt:render Rendering url /users/1 +12ms
nuxt:render Rendering url /users/2 +33ms
nuxt:render Rendering url /users/3 +7ms
nuxt:generate Generate file: /index.html +21ms
nuxt:generate Generate file: /users/1/index.html +31ms
nuxt:generate Generate file: /users/2/index.html +15ms
nuxt:generate Generate file: /users/3/index.html +23ms
nuxt:generate HTML Files generated in 7.6s +6ms
[nuxt] Generate done
```

Kerenkan, bagaimana jika kita punya **parameter dinamis (dynamic route)**?

1. Gunakan `Function` yang akan mengembalikan `Promise`.
2. Gunakan `Function` dengan `callback(err, params)`.

### Function yang akan mengembalikan Promise

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return '/users/' + user.id
        })
      })
    }
  }
}
```

### Function dengan menggunakan callback

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes(callback) {
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => {
            return '/users/' + user.id
          })
          callback(null, routes)
        })
        .catch(callback)
    }
  }
}
```

### Mempercepat proses generate dynamic route menggunakan `payload`

Pada contoh di atas, kita menggunakan `user.id` dari server untuk melakukan `generate` rute, tetapi ini akan menyia-nyiakan data lainnya. Biasanya, kita perlu melakukan `fetch` kembali di dalam file `/users/_id.vue`. Sementara kita melakukan itu, kita bisa juga mengatur `generate.interval` menjadi `100` supaya tidak membanjiri server. Karena ini akan mempercepat waktu dari proses `generate`, dan lebih baik untuk melewati objek `user` pada context di dalam file `_id.vue`. Kita akan melakukannya dengan memodifikasi kode di atas menjadi seperti berikut:

`nuxt.config.js`

```js
const axios = require('axios')

module.exports = {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return {
            route: '/users/' + user.id,
            payload: user
          }
        })
      })
    }
  }
}
```

Sekarang kita bisa mengakses `payload` dari `/users/_id.vue` seperti ini:

```js
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```

## subFolders

- Type: `Boolean`
- Default: `true`

Secara default, menjalankan perintah `nuxt generate` akan membuat direktori untuk masing-masing rute & bersama file `index.html`.

Contoh:

```bash
-| dist/
---| index.html
---| about/
-----| index.html
---| products/
-----| item/
-------| index.html
```

Ketika di-set menjadi false, file-file HTML akan di-generate berdasarkan path pada rute:

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```

_Catatan: cara ini akan lebih bermanfaat ketika kita menggunakan [Netlify](https://netlify.com) atau hosting statis menggunakan HTML fallbacks._
