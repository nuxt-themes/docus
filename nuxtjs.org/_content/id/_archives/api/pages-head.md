---
title: 'API: Metode head'
description: Nuxt.js menggunakan vue-meta untuk memperbarui `headers` dan `HTML attributes` pada aplikasi Anda.
menu: head
category: pages
position: 23
---

# Metode head

> Nuxt.js menggunakan [vue-meta](https://github.com/nuxt/vue-meta) untuk memperbarui `headers` dan `html attributes` pada aplikasi Anda.

- **Type:** `Object` atau `Function`

Gunakan metode `head` untuk mengatur tag HTML Head untuk halaman saat ini.

Data komponen Anda tersedia dengan `this` pada metode `head`, Anda dapat menggunakan set kustom meta tag dengan data halaman.

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello World!'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }
  }
</script>
```

<div class="Alert">

Untuk menghindari duplikasi saat menggunakannya pada "komponen child", berikan pengenal unik dengan key `yang tersembunyi`, [baca lebih lanjut](https://vue-meta.nuxtjs.org/api/#tagidkeyname).

</div>
