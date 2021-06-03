---
title: 'API: Properti plugins'
description: 'Gunakan plugin Vue.js melalui properti plugins milik Nuxt.js'
menu: plugins
category: configuration-glossary
position: 21
---

**Note**: Sejak Nuxt.js 2.4, kita dapat menggunakan sub-properti `mode` dari properti `plugins` untuk menentukan tipe plugin yang kita gunakan, nilai yang dapat digunakan adalah: `client` atau `server`. Mode `ssr: false` juga akan diadaptasikan menjadi `mode: 'client'` dan akan menjadi _deprecated_ di rilis mayor selanjutnya.

- Tipe: `Array`
  - Butir: `String` atau `Object`

Jika butirnya berupa objek, propertinya adalah:

- src: `String` (_path_ dari berkas)
- mode: `String` (bisa bernilai `client` atau `server`) _Jika terdefinisi, berkas akan diikutkan hanya pada sisi yang tertulis (klien atau server)._

**Note**: Versi lama

- Tipe: `Array`
  - Butir: `String` or `Object`

Jika butir berupa objek, propertinya adalah:

- src: `String` (_path_ dari berkas)
- ssr: `Boolean` (nilai bawannya adalah `true`) _Jika bernilai false, berkas hanya akan diikutkan di sisi klien._

> Properti plugins memudahkan Anda untuk menggunakan plugin Vue.js di aplikasi Nuxt.js Anda.

```js{}[nuxt.config.js]
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

```js{}[nuxt.config.js]
export default {
  plugins: ['@/plugins/ant-design-vue']
}
```

```js{}[plugins/ant-design-vue.js]
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // Berdasarkan dokumentasi Ant Design

Vue.use(Antd)
```

Perlu dicatat bahwa berkas CSS di atas [diimpor berdasarkan panduan di dokumentasi Ant Design](https://vue.ant.design/docs/vue/getting-started/#3.-Use-antd's-Components)

Semua _path_ yang ditentukan di properti `plugins` akan **diimpor** sebelum aplikasi utama diinisialisasi.
