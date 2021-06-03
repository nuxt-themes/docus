---
title: 'API: Properti rootDir'
description: Menentukan ruang kerja pada aplikasi Nuxt.js
menu: rootDir
category: configuration
position: 123
---

# Properti rootDir

- Type: `String`
- Default: `process.cwd()`

> Menentukan ruang kerja pada aplikasi Nuxt.js Anda.

Properti ini ditimpa oleh [perintah nuxt](/guide/commands) dan diset ke argumen perintah (contoh: `nuxt my-app/` akan mengeset `rootDir` ke `my-app/` dengan jalur/path absolutnya).

Properti ini digunakan ketika menggunakan [Nuxt.js secara terprogram](/api/nuxt).

<div class="Alert Alert--blue">

Kelemahan dari pilihan ini adalah direktori `node_modules` Anda berada di dalam folder `rootDir`. Jika Anda ingin mengatur jalur aplikasi tanpa node_modules, gunakan [opsi `srcDir`](/api/configuration-srcdir).

</div>
