---
title: 'Properti modulesDir'
description: Menyatakan direktori yang digunakan untuk menyimpan modul pada aplikasi Nuxt Anda
menu: modulesDir
category: configuration-glossary
position: 20
---

- Tipe Data: `Array`
- Nilai Anggapan: `['node_modules']`

> Digunakan untuk menetapkan direktori tempat penyimpanan modul yang digunakan pada proses pencarian modul, sebagai contoh: Nilai `resolveLoading`, `nodeExternals`, dan `postcss` pada konfigurasi Webpack. Direktori akan relatif terhadap [options.rootDir](/docs/2.x/configuration-glossary/configuration-rootdir) (nilai anggapan: `process.cwd()`).

```js{}[nuxt.config.js]
export default {
  modulesDir: ['../../node_modules']
}
```

Properti ini wajib dinyatakan apabila proyek Anda memiliki struktur seperti struktur _mono-repository_ milik Yarn.
