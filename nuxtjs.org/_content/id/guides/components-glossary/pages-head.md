---
title: 'Metode head'
description: Nuxt.js menggunakan vue-meta untuk memperbarui header dan atribut HTML aplikasi Anda.
menu: Metode Head
category: components-glossary
position: 0
---

> Nuxt.js penggunaan [vue-meta](https://github.com/nuxt/vue-meta) untuk memperbarui `headers` dan `html attributes` pada aplikasi Anda.

- **Tipe:** `Object` atau `Function`

Menggunakan metode `head` untuk mengatur tag head HTML untuk halaman saat ini.

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Halo Dunia!'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          // hid digunakan sebagai pengenal unik. Jangan gunakan `vmid` untuk itu karena tidak akan berhasil
          {
            hid: 'description',
            name: 'description',
            content: 'Deskripsi kustom saya'
          }
        ]
      }
    }
  }
</script>
```
