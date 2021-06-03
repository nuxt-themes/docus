---
title: 'Propert buildDir'
description: Menentukan direktori dist untuk aplikasi Nuxt.js kamu
menu: buildDir
category: configuration-glossary
position: 2
---

- Tipe: `String`
- Bawaan: `.nuxt`

> Menentukan direktori dist untuk aplikasi Nuxt.js kamu

```js{}[nuxt.config.js]
export default {
  buildDir: 'nuxt-dist'
}
```

Secara bawaan, banyak alat mengasumsikan bahwa `.nuxt` adalah direktori tersembunyi, karena namanya dimulai dengan titik. Kamu dapat menggunakan opsi ini untuk mencegahnya.
