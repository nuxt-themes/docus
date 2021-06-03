---
title: 'Properti Generate'
description: Konfigurasikan pengenerasi dari aplikasi web universal Anda ke web statis.
menu: generate
category: configuration-glossary
position: 10
---

- Tipe: `Object`

> Konfigurasikan pengenerasi dari aplikasi web universal Anda ke web statis.

Ketika memanggil `nuxt.generate()`, Nuxt.js akan menggunakan konfigurasi yang didefinisikan di properti `generate`

```js{}[nuxt.config.js]
export default {
  generate: {
    ...
  }
}
```

## cache

> Memperkenalkan di v2.14.0

- Tipe: `Object` atau `false`

Opsi ini digunakan oleh `nuxt generate` dengan [target statis](/docs/2.x/features/deployment-targets#static-hosting) untuk menghindari pembangunan ulang ketika berkas yang pantau tidak ada perubahan.

Nilai bawaan:

```js
{
  ignore: [
    '.nuxt', // buildDir
    'static', // dir.static
    'dist', // generate.dir
    'node_modules',
    '.**/*',
    '.*',
    'README.md'
  ]
}
```

Jika Anda ingin menghindari pembangunan ulang aplikasi ketika merubah konfigurasi berkas, tambahkan saja itu ke daftar opsi `cache.ignore`:

```js{}[nuxt.config.js]
export default {
  generate: {
    cache: {
      ignore: ['renovate.json'] // abaikan perubahan yang diterapkan di berkas ini
    }
  }
}
```

## concurrency

- Tipe: `Number`
- Nilai bawaan: `500`

Pengenerasi rute adalah terjadi bersama-sama, `generate.concurrency` menspesifikasikan jumlah rute yang berlajan dalam satu urutan.

## crawler

- Tipe: `boolean`
- Nilai bawaan: true

Pada Nuxt >= v2.13, Nuxt.js datang dengan _crawler_ yang terpasang yang akan meng-_crawl_ tautan relatif Anda dan mengenerasi tautan dinamis berdasarkan tautan ini. Jika Anda ingin menonaktifkan fitur ini, Anda dapat mengatur nilai ke `false`.

```js
export default {
  generate: {
    crawler: false
  }
}
```

## dir

- Tipe: `String`
- Nilai bawaan: `'dist'`

Nama direktori yang dibuat ketika membangun aplikasi web menggunakan perintah `nuxt generate`.

## devtools

- Tipe: `boolean`
- Nilai bawaan: `false`

Mengkonfigurasi apakah mengizinkan inspeksi [vue-devtools](https://github.com/vuejs/vue-devtools).

Jika Anda telah mengaktifkan melalui nuxt.config.js atau sebaliknya, devtools diaktifkan apapun benderanya.

## exclude

- Type: `Array`
  - Items: `String` or `RegExp`

Ini menerima `array of string` atau `regex` dan akan menghindarkan dari pengenerasian rute yang sama dengan mereka. Rute akan masih bisa diakses ketika `generate.fallback` digunakan.

Ambil contoh struktur ini:

```bash
-| pages/
---| index.vue
---| admin/
-----| about.vue
-----| index.vue
```

Secara bawaan, dengan menjalankan `nuxt generate` maka sebuak berkas akan dibuat untuk setiap rute.

```bash
-| dist/
---| index.html
---| admin/
-----| about.html
-----| item.html
```

Ketika menambahkan `regex` yang sesuai dengan semua rute dengan "ignore", ini akan menghindarkan dari pengenerasian rute tersebut.

```js{}[nuxt.config.js]
export default {
  generate: {
    exclude: [
      /^\/admin/ // path starts with /admin
    ]
  }
}
```

```bash
-| dist/
---| index.html
```

Anda juga dapat mengecualikan rute yang spesifik dengan memberikan sebuah _string_:

```js{}[nuxt.config.js]
export default {
  generate: {
    exclude: ['/my-secret-page']
  }
}
```

## fallback

- Tipe: `String` atau `Boolean`
- Nilai bawaan: `200.html`

```js{}[nuxt.config.js]
export default {
  generate: {
    fallback: '404.html'
  }
}
```

Jalur ke berkas _fallback_ HTML. Ini seharusnya diatur sebagai halaman kegalatan, jadi ini juga tidak diketahui rute yang ter-_render_ melalui Nuxt. Jika tidak diatur atau diatur ke nilai yang salah, nama dari berkas _fallback_ HTML akan `200.html`. Jika diatur ke `true`, nama berkas akan menjadi `404.html`. Jika Anda memberikan _string_ sebagai nilai, ini akan digunakan.

```{}[nuxt.config.js]
fallback: false;
```

Bila Anda bekerja dengan halaman yang digenereasikan secara statis, maka direkomendasikan untuk menggunakan halaman `404.html` sebagai halaman kegalatan dan untuk yang ditutup oleh [pengecualian (exclude)](https://nuxtjs.org/api/configuration-generate#exclude) (Berkas yang Anda tidak ingin digenerasi menjadi halaman statis.)

```js{}[nuxt.config.js]
fallback: true
```

Bagaimanapun, Nuxt mengizinkan Anda untuk mengkonfigurasi halaman apapun yang Anda suka, jadi jika Anda tidak ingin menggunakan halaman `200.html` atau `404.html` Anda dapat menambah sebuah _string_ dan kemudian tinggal memastikan bila akan dialihkan ke halaman tersebut. Ini tentunya tidak terlalu penting dan yang terbaik adalah mengalihkan ke `200.html`/`404.html`.

```js{}[nuxt.config.js]
fallback: 'fallbackPage.html'
```

_Catatan: Banyak layanan (contoh: Netlify) mendeteksi sebuah halaman `404.html` secara otomatis. Jika Anda melakukan konfigurasi pada \_web server_, tolong lihat pada dokumentasi untuk mencari tahu bagaimana cara mengatur halaman kegalatan dan mengubahnya ke `404.html`.\_

## interval

- Tipe: `Number`
- Nilai bawaan: `0`

Interval dalam milidetik diantara dua siklus _render_ untuk mengindari banyaknya potensi pemanggilan API dari aplikasi website.

## minify

- **Terdepresiasi!**
- Gunakan [build.html.minify](/docs/2.x/configuration-glossary/configuration-build#htmlminify) saja

## routes

- Tipe: `Array`

<base-alert type="info">

Seperti pada Nuxt v2.12, ada _crawler_ yang terpasang dan akan meng-_crawl_ tag dari tautan Anda dan akan mengenerasi rute ketika menjalankan `nuxt generate`.

Jika memiliki halaman yang tidak terhubung (seperti halaman rahasia) dan Anda akan juga ingin digenerasi maka Anda dapat menggunakan properti `generate.routes`.

</base-alert>

<base-alert>

Rute dinamis diabaikan oleh komando `generate` ketika menggunakan Nuxt <= v2.12.

</base-alert>

Contoh:

```bash
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

Hanya rute `/` yang akan digenerasi oleh Nuxt.js.

Jika Anda ingin Nuxt.js mengenerasi rute dengan parameter dinamis, Anda perlu mengatur `generate.routes` ke _Array_ dari rute dinamis.

Kita menambahkan rute untuk `/users/:id`:

```js{}[nuxt.config.js]
export default {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}
```

Maka ketika kita meluncurkan `nuxt generate`:

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

Bagus!, tapi bagaimana bila kita memiliki **parameter dinamis**?

1. Menggunakan sebuah `Function` yang akan mengembalikan `Promise`.
2. Menggunakan sebuah `Function` dengan `callback(err, params)`.

### Fungsi yang mengembalikan Promise

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
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

### callback Fungsi dengan Callback

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
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

### Mempercepat pengenerasian rute dinamis dengan `payload`

Pada contoh diatas, Kita menggunakan `user.id` dari peladen untuk mengenerasi rute namun melemparkan seluruh data. Biasanya kita perlu mmengambil data lagi dari `/users/_id.vue`. Selama bisa melakukan hal itu, kita mungkin akan perlu mengatur `generate.interval` ke angka seperti `100` untuk tidak membanjiri peladen dengan panggilan. Karena ini akan meningkatkan waktu berjalannya pengenerasian _script_, ini akan lebih dianjurkan untuk melewatkan seluruh objek `user` ke konteks di `_id.vue`. Kita melakukan itu dengan memodifikasi kode diatas menjadi seperti ini:

```js{}[nuxt.config.js]
import axios from 'axios'

export default {
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

Sekarang kita dapat mengakses `payload` dari `/users/_id.vue` seperti ini:

```js
async asyncData ({ params, error, payload }) {
  if (payload) return { user: payload }
  else return { user: await backend.fetchUser(params.id) }
}
```

## subFolders

- Tipe: `Boolean`
- Nilai bawaan: `true`

By default, when running `nuxt generate`, Nuxt.js will create a directory for each route & serve an `index.html` file.

Secara default, ketika menjalankan `nuxt.generate`, Nuxt akan membuat sebuah direktori untuk setiap rute dan menyajikan berkas `index.html` di dalamnya.

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

Ketika diatur ke `false`, berkas HTML akan digenerasi sesuai dengan alur rute:

```js{}[nuxt.config.js]
export default {
  generate: {
    subFolders: false
  }
}
```

```bash
-| dist/
---| index.html
---| about.html
---| products/
-----| item.html
```
