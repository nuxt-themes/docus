---
title: 'API: Properti plugin'
description: Menggunakan plugin Vue.js dengan opsi plugin dari Nuxt.js
menu: plugins
category: configuration
position: 121
---

# Properti plugin

- Type: `Array`
  - Items: `String` atau `Object`

Jika item adalah objek, propertinya adalah:

- src: `String` (path dari file)
- ssr: `Boolean` (default ke `true`) _Jika `false`, file tersebut akan disertakan hanya pada sisi-klien._

> Properti plugin memungkinkan Anda menambahkan plugin Vue.js dengan mudah ke aplikasi utama Anda.

Contoh (`nuxt.config.js`):

```js
module.exports = {
  plugins: ['~/plugins/vue-notifications']
}
```

Lalu, kita perlu membuat file pada `plugins/vue-notifications.js`:

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

Semua jalur (path) yang didefinisikan pada properti `plugins` akan **diimpor** sebelum menginisialisasi aplikasi utama.

Setiap kali Anda perlu menggunakan `Vue.use()`, Anda harus membuat file dalam `plugins/` dan menambahkan `path` ke `plugins` di `nuxt.config.js`.

Untuk mempelajari lebih lanjut cara menggunakan plugin, lihat [dokumentasi panduan](/guide/plugins#vue-plugins).
