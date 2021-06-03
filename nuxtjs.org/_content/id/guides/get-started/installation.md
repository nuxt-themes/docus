---
title: Instalasi
description: Di sini, Anda akan menemukan informasi tentang menyiapkan dan menjalankan proyek Nuxt.js dalam 4 langkah.
position: 1
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/01_installation?fontsize=14&hidenavigation=1&theme=dark
---

## Persyaratan

Di sini, Anda akan menemukan informasi tentang menyiapkan dan menjalankan proyek Nuxt.js dalam 4 langkah.

<base-alert type="info">

Cara lain untuk memulai dengan Nuxt.js adalah dengan menggunakan [CodeSandbox](https://template.nuxtjs.org) yang merupakan cara terbaik untuk bermain-main dengan cepat dengan Nuxt.js dan / atau berbagi kode Anda dengan orang lain.

</base-alert>

### Node

[node](https://nodejs.org/en/download/) - setidaknya v8.9.0

_Kami menyarankan Anda menginstal versi terbaru._

### Text editor

Gunakan apa pun yang Anda suka, tetapi kami menyarankan [VSCode](https://code.visualstudio.com/).

### Terminal

Gunakan apa pun yang Anda suka, tetapi kami merekomendasikan menggunakan [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) VSCode.

## Mulai dari awal

Membuat proyek Nuxt.js dari awal hanya membutuhkan satu file dan satu direktori.

Dalam contoh khusus ini, kita akan menggunakan terminal untuk membuat direktori dan file, tetapi jangan ragu untuk membuatnya menggunakan editor pilihan Anda.

### Siapkan proyek Anda

Untuk memulai, buat direktori kosong dengan nama proyek Anda dan navigasikan ke dalamnya:

```bash
mkdir <project-name>
cd <project-name>
```

Ganti `<project-name>` dengan nama proyek Anda.\_

Kemudian buat file bernama `package.json`:

```bash
touch package.json
```

Buka file package.json di editor kode favorit Anda dan isi dengan konten JSON ini:

```json{}[package.json]
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "start": "nuxt start"
  }
}
```

`scripts` tentukan perintah Nuxt.js yang akan diluncurkan dengan perintah `npm run <command>`.

#### **Apa itu file package.json?**

Ini `package.json` seperti kartu ID proyek Anda. Jika Anda tidak tahu apa `package.json` file tersebut, kami sangat menyarankan Anda untuk membaca sekilas [dokumentasi npm](https://docs.npmjs.com/creating-a-package-json-file).

### Install nuxt

Setelah `package.json` dibuat, tambahkan `nuxt` ke proyek Anda melalui `npm` atau `yarn` seperti dibawah ini:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add nuxt
```

  </code-block>
  <code-block label="npm">

```bash
npm install nuxt
```

  </code-block>
</code-group>

Perintah ini akan ditambahkan `nuxt` sebagai _dependency_ pada proyek Anda dan akan ditambahkan ke `package.json` Anda secara otomatis. Direktori `node_modules` juga akan dibuat yang mana semua paket yang terinstal dan dependensi mereka disimpan.

<base-alert type="info">

File `yarn.lock` atau `package-lock.json` juga dibuat untuk memastikan penginstalan yang konsisten dan dependensi yang kompatibel dari paket yang diinstal di proyek Anda.

</base-alert>

### Buat halaman pertama Anda

Nuxt.js mengubah setiap `*.vue` file di dalam direktori `pages` sebagai rute untuk aplikasi.

Buat direktori `pages` di proyek Anda:

```bash
mkdir pages
```

Lalu buat file `index.vue` di dalam direktori `pages`:

```bash
touch pages/index.vue
```

Halaman ini penting untuk dipanggil `index.vue` karena ini akan menjadi halaman default yang ditampilkan Nuxt saat aplikasi dijalankan. Ini adalah beranda dan harus disebut _index_.

Buka file `index.vue` di editor Anda dan tambahkan konten berikut:

```html{}[pages/index.vue]
<template>
  <h1>Hello world!</h1>
</template>
```

### Memulai proyeknya

Jalankan proyek Anda dengan mengetik salah satu dari perintah berikut di bawah ini di terminal Anda:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
npm run dev
```

  </code-block>
</code-group>

<base-alert type="info">

Kita gunakan perintah _dev_ ketika menjalankan aplikasi dalam mode pengembangan.

</base-alert>

Aplikasi sekarang berjalan di **[http://localhost:3000](http://localhost:3000/).**

Buka di _browser_ Anda dengan mengklik link di terminal Anda dan Anda akan melihat teks "Hello World" yang kita salin di langkah sebelumnya.

<base-alert type="info">

Saat meluncurkan Nuxt.js dalam mode pengembangan, ia akan mendengarkan perubahan file di sebagian besar direktori, jadi tidak perlu memulai ulang aplikasi saat misalnya menambahkan halaman baru.

</base-alert>

<base-alert type="warning">

Saat Anda menjalankan perintah _dev_, folder .nuxt akan dibuat. Folder ini harus
diabaikan dari kontrol versi. Anda dapat mengabaikan file dengan membuat file .gitignore di tingkat _root_ dan menambahkan .nuxt.

</base-alert>

### Langkah Bonus

Buat halaman bernama `fun.vue` di dalam direktori `pages`.

Tambahkan `<template></template>` dan sertakan judul dengan kalimat lucu di dalamnya.

Kemudian, buka _browser_ Anda dan lihat halaman baru Anda di **[http://localhost:3000/fun](http://localhost:3000/fun).**

<base-alert type="info">

Buat nama direktori `more-fun` dan letakan file `index.vue` di dalamnya. Ini akan memberikan hasil yang sama seperti membuat file `more-fun.vue`.

</base-alert>

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## Menggunakan create-nuxt-app

Untuk memulai dengan cepat, Anda dapat menggunakan aplikasi [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Pastikan Anda telah menginstal npx (npx tersedia secara default sejak npm 5.2.0) atau npm v6.1 atau yarn.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create nuxt-app <project-name>
```

  </code-block>
  <code-block label="npx">

```bash
npx create-nuxt-app <project-name>
```

  </code-block>
    <code-block label="npm">

```bash
npm init nuxt-app <project-name>
```

  </code-block>

</code-group>

Ini akan menanyakan beberapa pertanyaan (nama, opsi Nuxt, kerangka UI, TypeScript, linter, kerangka pengujian, dll.), Ketika dijawab, itu akan menginstal semua dependensi. Langkah selanjutnya adalah menavigasi ke folder proyek dan meluncurkannya:

<code-group>
  <code-block label="Yarn" active>

```bash
cd <project-name>
yarn dev
```

  </code-block>
  <code-block label="npm">

```bash
cd <project-name>
npm run dev
```

  </code-block>
</code-group>

Aplikasi sekarang berjalan di [http://localhost:3000](http://localhost:3000). Bagus!
