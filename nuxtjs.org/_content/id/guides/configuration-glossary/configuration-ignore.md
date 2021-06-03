---
title: 'Properti ignore'
description: Tentukan berkas yang diabaikan untuk aplikasi Nuxt.js Anda
menu: ignore
category: configuration-glossary
position: 14
---

## .nuxtignore

Anda dapat menggunakan berkas `.nuxtignore` untuk memerintahkan Nuxt.js untuk mengabaikan berkas `layout`, `page`, `store` dan `middleware` yang ada di direktori akar (`rootDir`) proyek Anda selama fase _build_. Spesifikasi berkas `.nuxtignore` ini mirip seperti berkas `.gitignore` dan `.eslintignore`, yang tiap barisnya merupakan pola glob yang mengindikasikan berkas mana yang harus diabaikan.

Contoh:

```
# abaikan layout foo.vue
layouts/foo.vue
# abaikan berkas layout yang namanya berakhiran -ignore.vue
layouts/*-ignore.vue

# abaikan page bar.vue
pages/bar.vue
# abaikan semua page di dalam direktori ignore
pages/ignore/*.vue

# abaikan store baz.js
store/baz.js
# abaikan berkas store yang memiliki pola *.test.*
store/ignore/*.test.*

# abaikan semua berkas middleware di dalam direktori foo kecuali foo/bar.js
middleware/foo/*.js
!middleware/foo/bar.js
```

> Detail lebih lanjut terkait spesifikasi berkas .gitignore dapat dilihat [di sini](https://git-scm.com/docs/gitignore)

## Properti ignorePrefix

- Tipe: `String`
- Nilai bawaan: `'-'`

> Berkas apapun di dalam direktori pages/, layouts/, middleware/, ataupun store/ akan diabaikan selama proses build jika nama berkasnya berawalan sama dengan nilai `ignorePrefix`.

Bawaannya, semua berkas yang berawalan dengan `-` akan diabaikan, seperti `store/-foo.js` dan `pages/-bar.vue`. Hal ini memungkinkan kita untuk mengumpulkan tes, utilitas, dan komponen dengan pemanggilnya tanpa mengubah ketiga hal tersebut menjadi _routes_, _stores_, dll.

## Properti ignore

- Tipe: `Array`
- Nilai bawaan: `['**/*.test.*']`

> Lebih mudah dikustomisasi daripada `ignorePrefix`: semua berkas yang sesuai dengan pola glob yang ditentukan di properti `ignore` akan diabaikan saat proses build.

## ignoreOptions

Pada dasarnya, `nuxtignore` menggunakan `node-ignore`, sehingga `ignoreOptions` dapat dikonfigurasikan sebagai `options` dari `node-ignore`.

```js{}[nuxt.config.js]
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```
