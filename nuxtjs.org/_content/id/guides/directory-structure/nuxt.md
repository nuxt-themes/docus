---
title: .nuxt
description: Direktori `.nuxt` bisa disebut juga sebagai *direktori build*. Direktori ini dibuat secara dinamis dan disembunyikan secara default. Di dalam direktori ini, Anda dapat menemukan file yang dibuat secara otomatis saat menjalankan `nuxt dev` atau menggunakan artefak build ketika menjalankan` nuxt build`.
position: 1
category: directory-structure
questions:
  - question: Perintah apa yang digunakan untuk menghasilkan folder .nuxt?
    answers:
      - nuxt start
      - nuxt generate
      - nuxt build atau nuxt dev
    correctAnswer: nuxt build or nuxt dev
  - question: Properti apa yang Anda gunakan untuk mengganti nama folder nuxt?
    answers:
      - dir
      - build
      - buildDir
    correctAnswer: buildDir
  - question: Di file mana Anda dapat menemukan route yang Anda buat?
    answers:
      - pages.js
      - router.js
      - views.js
    correctAnswer: router.js
  - question: Apa yang dapat Anda temukan di folder komponen?
    answers:
      - nuxt components
      - custom components
      - global components
    correctAnswer: nuxt components
  - question: Folder .nuxt adalah folder yang perlu Anda unggah saat menerapkan situs statis.
    answers:
      - true
      - false
    correctAnswer: false
---

Direktori `.nuxt` bisa disebut juga sebagai _direktori build_. Direktori ini dibuat secara dinamis dan disembunyikan secara default. Di dalam direktori ini, Anda dapat menemukan file yang dibuat secara otomatis saat menjalankan `nuxt dev` atau menggunakan artefak build ketika menjalankan` nuxt build`. Memodifikasi file-file ini sangat bagus untuk keperluan debugging, tetapi ingat bahwa itu adalah file yang dihasilkan setelah Anda menjalankan perintah `dev` atau` build`. Jadi apapun yang disimpan di `.nuxt` akan dibuat ulang.

<base-alert>

Direktori `.nuxt` tidak boleh dimasukkan ke sistem version control Anda dan harus diabaikan melalui `.gitignore` karena akan dibuat secara otomatis saat menjalankan `nuxt dev` atau` nuxt build`.

</base-alert>

### Property buildDir

Secara default, banyak alat mengasumsikan bahwa `.nuxt` adalah direktori tersembunyi, karena namanya dimulai dengan titik. Anda dapat menggunakan opsi buildDir untuk mencegahnya. Jika Anda mengubah nama, ingatlah untuk menambahkan nama baru ke file `.gitignore` Anda.

```js{}[nuxt.config.js]
export default {
  buildDir: 'nuxt-dist'
}
```

### Yang ada di dalam .nuxt folder:

- File router.js adalah sebuah file untuk router oleh Nuxt.js untuk Anda ketika Anda meletakkan file `.vue` di dalam folder pages. Anda dapat menggunakan file ini untuk debugging ketika Anda ingin mencari rute mana yang dibuat untuk vue-router dan mencari tahu nama rute tertentu.
- router.scrollBehavior.js yang merupakan ScrollBehavior Router Anda
- Folder Components memiliki semua komponen Nuxt Anda seperti NuxtChild dan NuxtLink. Ini juga berisi nuxt-build-indicator yang merupakan halaman yang kita lihat ketika aplikasi Anda sedang dibangun dan nuxt-loading yang merupakan komponen pemuatan Anda yang terlihat ketika kami menunggu halaman Anda dimuat. Anda juga akan menemukan halaman nuxt-error di sini yang berisi halaman kesalahan default Nuxt.
- Folder mixins memiliki file yang dibutuhkan untuk metode `$ fetch` Nuxt.
- Folder views berisi template aplikasi dan halaman kesalahan server Anda.
- File app.js adalah file utama dari aplikasi.
- File client.js adalah file klien Anda yang diperlukan untuk semua hal yang terjadi di sisi klien.
- File empty sengaja dibiarkan kosong untuk alias noop.
- File index.js mem-bootstrap aplikasi Anda.
- File loading.html adalah file yang digunakan ketika halaman sedang loading.
- File middleware adalah tempat middleware Anda disimpan.
- File server.js adalah semua kode yang dijalankan di server
- Utilitas berisi hal-hal yang dibutuhkan Nuxt agar dapat berfungsi.

### Deploying

Folder `.nuxt` adalah bagian dari file yang diperlukan untuk menerapkan aplikasi SSR Anda. Ini tidak diperlukan untuk menerapkan aplikasi Nuxt.js statis Anda karena kami menggunakan folder `dist` untuk itu.

<quiz :questions="questions"></quiz>
