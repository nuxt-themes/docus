---
title: 'Properti head'
description: Nuxt.js memberikan opsi kepada Anda untuk mendefinisikan meta bawaan untuk aplikasi Anda di dalam nuxt.config.js.
menu: head
category: configuration-glossary
position: 12
---

> Nuxt.js memberikan opsi kepada Anda untuk mendefinisikan meta bawaan untuk aplikasi Anda di dalam `nuxt.config.js`, Anda dapat mengaturnya di dalam properti `head`

- Tipe: `Object` atau `Function`

```js{}[nuxt.config.js]
export default {
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid digunakan sebagai identitas unik. Jangan gunakan `vmid` karena hal tersebut tidak akan bekerja
      { hid: 'description', name: 'description', content: 'Meta description' }
    ]
  }
}
```

Untuk memahami opsi yang dapat Anda gunakan di dalam properti `head`, silahkan melihat [dokumentasi vue-meta](https://vue-meta.nuxtjs.org/api/#metainfo-properties).

Anda juga dapat menggunakan `head` sebagai fungsi di dalam komponen Anda untuk mengakses komponen data melalui `this` ([baca lebih lanjut](/docs/2.x/components-glossary/pages-head))

<base-alert type="info">

Untuk mencegah duplikat tag meta ketika digunakan di komponen anak (_child component_), gunakan identitas unik dengan kunci `hid` pada elemen meta Anda ([baca lebih lanjut](https://vue-meta.nuxtjs.org/api/#tagidkeyname))

</base-alert>
