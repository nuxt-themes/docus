---
title: 'Properti rootDir'
description: Tentukan ruang kerja aplikasi Nuxt.js Anda
menu: rootDir
category: configuration-glossary
position: 23
---

- Tipe: `String`
- Nilai bawaan: `process.cwd()`

> Tentukan direktori ruang kerja dari aplikasi Nuxt.js Anda.

Properti ini akan ditimpa oleh perintah-perintah nuxt (nuxt start, nuxt build, dll) jika sebuah argumen dioper ke perintah-perintah tersebut. Misal, menjalankan `nuxt ./app-saya/` akan membuat `rootDir` bernilai _absolute path_ dari `./app-saya/` dari direktori kerja Anda saat itu.

Dengan demikian Anda biasanya tidak perlu mengkonfigurasi properti ini kecuali jika Anda akan menggunakan [Nuxt.js secara terprogram](/docs/2.x/internals-glossary/nuxt).

<base-alert type="info">

Dua `rootDir` sebagai akar paket yang berisi direktori `node_modules` harus berada di dalam satu struktur direktori yang sama agar Node.js dapat <a href="https://nodejs.org/api/modules.html#modules_all_together">menemukan (_resolve_) dependensi proyek Anda</a>. Kunjungi halaman [properti `srcDir`](/docs/2.x/configuration-glossary/configuration-srcdir) untuk melihat contoh-contoh struktur direktori yang dapat digunakan jika hal tersebut tidak memungkinkan.

</base-alert>
