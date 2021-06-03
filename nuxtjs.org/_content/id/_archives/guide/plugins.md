---
title: Plugin
description: Nuxt.js memungkinkan Anda menentukan plugin JavaScript yang akan dijalankan sebelum menginstal Aplikasi root Vue.js. Hal ini sangat membantu saat menggunakan pustaka (library) atau modul eksternal Anda sendiri.
category: getting-started
position: 108
---

> Nuxt.js memungkinkan Anda menentukan plugin JavaScript yang akan dijalankan sebelum menginstal Aplikasi root Vue.js. Hal ini sangat membantu saat menggunakan pustaka (library) atau modul eksternal Anda sendiri.

<div class="Alert">

Penting untuk diketahui bahwa dalam Vue [instance lifecycle](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram), hanya kait (hook) `beforeCreate` dan`created` yang dipanggil **keduanya dari sisi-klien dan sisi-server**. Semua kait (hook) lainnya hanya dipanggil dari sisi-klien.

</div>

## Paket Eksternal

Kita mungkin ingin menggunakan paket/modul eksternal dalam aplikasi kita, salah satu contoh bagusnya adalah [axios](https://github.com/mzabriskie/axios) untuk membuat permintaan (request) HTTP untuk server dan klien.

Kita menginstalnya melalui npm:

```bash
npm install --save axios
```

Kemudian, kita bisa menggunakannya langsung di halaman kita:

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  import axios from 'axios'

  export default {
    async asyncData({ params }) {
      let { data } = await axios.get(`https://my-api/posts/${params.id}`)
      return { title: data.title }
    }
  }
</script>
```

Tapi ada **satu masalah di sini**. Jika kita mengimpor axios di halaman lain, maka ia akan disertakan lagi untuk bundel halaman. Kita ingin menyertakan `axios` hanya satu kali dalam aplikasi kita. Untuk melakukan ini, kita menggunakan kunci `build.vendor` pada `nuxt.config.js` kita:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

Kemudian, kita bisa mengimport `axios` di mana saja tanpa harus khawatir membuat bundel menjadi lebih besar!

## Plugin Vue

Jika kita ingin menggunakan [vue-notifications](https://github.com/se-panfilov/vue-notifications) untuk menampilkan pemberitahuan pada aplikasi kita, kita perlu menyiapkan plugin sebelum meluncurkan aplikasi.

File `plugins/vue-notifications.js` :

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Kemudian, kita tambahkan file di dalam kunci `plugins` `nuxt.config.js`:

```js
module.exports = {
  plugins: ['~/plugins/vue-notifications']
}
```

Untuk mempelajari lebih lanjut tentang kunci konfigurasi `plugins`, lihat [plugins API](/api/configuration-plugins).

Sebenarnya, `vue-notifications` akan disertakan dalam bundel aplikasi, tapi karena ini adalah pustaka (library), kita ingin memasukkannya ke dalam paket vendor untuk penyimpanan (caching) yang lebih baik.

Kita dapat memperbarui `nuxt.config.js` untuk menambahkan `vue-notifications` di dalam bundel vendor:

```js
module.exports = {
  build: {
    vendor: ['vue-notifications']
  },
  plugins: ['~/plugins/vue-notifications']
}
```

## Memasukkan (inject) dalam \$root & context

Beberapa plugin perlu dimasukkan di dalam root Aplikasi untuk dapat digunakan, seperti [vue-i18n](https://github.com/kazupon/vue-i18n). Dengan Nuxt.js, Anda dapat menggunakan `app` yang tersedia ke dalam `context` saat mengekspor sebuah metode:

`plugins/i18n.js`:

```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app }, inject) => {
  // Set `i18n` instance on `app`
  // This way we can use it in middleware and pages `asyncData`/`fetch`
  app.i18n = new VueI18n({
    /* `VueI18n` options... */
  })
}
```

`nuxt.config.js`:

```js
module.exports = {
  build: {
    vendor: ['vue-i18n']
  },
  plugins: ['~/plugins/i18n.js']
}
```

Silakan lihat [contoh i18n](/examples/i18n) untuk melihat bagaimana cara menggunakannya.

## Hanya pada sisi-klien (client-side only)

Beberapa plugin mungkin **hanya berfungsi untuk browser**, Anda dapat menggunakan opsi `ssr: false` di `plugins` untuk menjalankan file hanya pada sisi-klien.

Contoh:

`nuxt.config.js`:

```js
module.exports = {
  plugins: [{ src: '~/plugins/vue-notifications', ssr: false }]
}
```

`plugins/vue-notifications.js`:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Jika Anda memerlukan beberapa pustaka (library) hanya untuk server, Anda dapat menggunakan variabel `process.server` set ke `true` ketika webpack membuat file `server.bundle.js`.

Juga, jika Anda perlu tahu apakah Anda berada di dalam aplikasi yang dihasilkan (melalui `nuxt generate`), Anda dapat memeriksa `process.static`, set ke `true` selama generasi dan sesudahnya. Untuk mengetahui keadaan ketika sebuah halaman sedang di-render pada sisi-server oleh `nuxt generate` sebelum disimpan, Anda dapat menggunakan `process.static && process.server`.
