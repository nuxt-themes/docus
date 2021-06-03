---
title: Konfigurasi
description: Secara umum, Nuxt.js dikonfigurasi untuk menutupi sebagian besar kasus penggunaan. Konfigurasi default ini dapat ditimpa dengan menggunakan file `nuxt.config.js`.
category: getting-started
position: 103
---

> Secara umum, Nuxt.js dikonfigurasi untuk menutupi sebagian besar kasus penggunaan. Konfigurasi default ini dapat ditimpa dengan memodifikasi file `nuxt.config.js`.

### build

Pilihan ini memungkinkan Anda menambahkan modul ke dalam file `vendor.bundle.js` untuk mengurangi ukuran bundel aplikasi. Hal ini sangat membantu saat menggunakan modul eksternal.

[Dokumentasi tentang integrasi `build` ](/api/configuration-build)

### css

Pilihan ini memungkinkan Anda mendefinisikan file/modul/librari CSS yang ingin Anda atur sebagai global (disertakan dalam setiap halaman).

[Dokumentasi tentang integrasi `css`](/api/configuration-css)

### dev

Pilihan ini memungkinkan Anda menentukan mode `development` atau `production` Nuxt.js

[Dokumentasi tentang integrasi `dev`](/api/configuration-dev)

### env

Pilihan ini memungkinkan Anda menentukan variabel lingkungan (environment) yang tersedia baik klien dan server.

[Dokumentasi tentang integrasi `env`.](/api/configuration-env)

### generate

Opsi ini memungkinkan Anda menentukan nilai parameter untuk setiap rute dinamis di aplikasi Anda yang akan diubah menjadi file HTML oleh Nuxt.js.

[Dokumentasi tentang integrasi generate](/api/configuration-generate)

### head

Opsi ini memungkinkan Anda menentukan semua tag meta default untuk aplikasi Anda.

[Dokumentasi tentang integrasi head](/api/configuration-head)

### loading

Opsi ini memungkinkan Anda menyesuaikan komponen loading Nuxt.js secara default.

[Dokumentasi tentang integrasi `loading`](/api/configuration-loading)

### modules

Pilihan ini memungkinkan Anda menambahkan modul Nuxt ke proyek Anda.

[Dokumentasi tentang integrasi `modules`](/api/configuration-modules)

### plugins

Pilihan ini memungkinkan Anda menentukan plugin JavaScript yang akan dijalankan sebelum menginstal aplikasi root Vue.js.

[Dokumentasi tentang integrasi `plugins`](/api/configuration-plugins)

### rootDir

Pilihan ini memungkinkan Anda menentukan ruang kerja Aplikasi Nuxt.js Anda.

[Dokumentasi tentang integrasi `rootDir`](/api/configuration-rootdir)

### router

Pilihan ini memungkinkan Anda menimpa konfigurasi Nuxt.js default dari Vue Router.

[Dokumentasi tentang integrasi `router`](/api/configuration-router)

### srcDir

Pilihan ini memungkinkan Anda menentukan direktori asal dari Aplikasi Nuxt.js Anda.

[Dokumentasi tentang integrasi `srcDir`](/api/configuration-srcdir)

### transition

Pilihan ini memungkinkan Anda menentukan properti default dari transisi halaman.

[Dokumentasi tentang integrasi `transition`](/api/configuration-transition)
