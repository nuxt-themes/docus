---
title: Perintah dan Penerapan (Deployment)
description: Nuxt.js hadir dengan seperangkat perintah yang berguna, baik untuk tujuan pengembangan maupun produksi.
category: getting-started
position: 113
---

> Nuxt.js hadir dengan seperangkat perintah yang berguna, baik untuk tujuan pengembangan maupun produksi.

## Daftar Perintah

| Perintah      | Penjelasan                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------- |
| nuxt          | Meluncurkan server pengembangan (development) di localhost:3000 dengan hot-reload.             |
| nuxt build    | Membangun (build) aplikasi Anda dengan webpack dan minify JS & CSS (untuk produksi).           |
| nuxt start    | Menjalankan server dalam mode produksi (setelah menjalankan `nuxt build`).                     |
| nuxt generate | Membangun aplikasi dan membuat setiap rute sebagai file HTML (digunakan untuk hosting statis). |

#### Argumen

Anda dapat menggunakan `--help` dengan perintah apapun untuk mendapatkan penggunaan secara rinci. Argumen umum sebagai berikut:

- **`--config-file` atau `-c`:** menentukan path ke file`nuxt.config.js`.
- **`--spa` atau `-s`:** Menjalankan perintah dalam mode SPA dengan menonaktifkan rendering sisi-server (SSR).

#### Menggunakan di package.json

Anda harus memasukkan perintah ini ke dalam `package.json`:

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

Kemudian, Anda bisa menjalankan perintah Anda melalui `npm run <command>` (contoh : `npm run dev`).

<div class="Alert Alert--nuxt-green">

<b>Pro tip:</b> untuk menyampaikan argumen kepada perintah npm, Anda perlu nama script ekstra berupa <code>--</code> (contoh: <code>npm run dev -- --spa</code>).

</div>

## Lingkungan Pengembangan (Development Environment)

Untuk meluncurkan Nuxt dalam mode pengembangan dengan hot reloading:

```bash
nuxt
// OR
npm run dev
```

## Penyebaran (Deployment) Produksi

Nuxt.js memungkinkan Anda memilih antara tiga mode untuk menerapkan aplikasi Anda: Server Rendered, SPA atau Static Generated.

### Penyebaran "Server Rendered" (Universal)

Alih-alih menjalankan `nuxt` untuk menyebarkan (deploy), Anda mungkin ingin membangun (build) terlebih dahulu. Oleh karena itu, membangun (build) dan memulai (start) adalah perintah yang terpisah:

```bash
nuxt build
nuxt start
```

`package.json` disarankan seperti berikut:

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

Catatan: kami merekomendasikan menempatkan `.nuxt` di `.npmignore` atau `.gitignore`.

### Penyebaran "Static Generated" (Pra Rendered)

Nuxt.js memberi Anda kemampuan untuk meng-host aplikasi web Anda pada hosting statis manapun.

Untuk menghasilkan aplikasi web kita menjadi file statis:

```bash
npm run generate
```

Ia akan membuat folder `dist` dengan segala sesuatu di dalamnya siap untuk digunakan pada situs hosting statis.

Jika Anda memiliki proyek dengan [rute dinamis](/guide/routing#dynamic-routes), lihat [konfigurasi generate](/api/configuration-generate) untuk memberi tahu Nuxt.js cara menghasilkan rute dinamis ini.

<div class="Alert">

Saat membuat aplikasi web Anda dengan `nuxt generate`, [konteks](/api/context) yang diberikan ke [data()](/guide/async-data#the-data-method) dan [fetch()](/guide/vuex-store#the-fetch-method) tidak akan memiliki `req` dan `res`.

</div>

### Penyebaran Aplikasi Halaman Tunggal (SPA)

`nuxt generate` masih membutuhkan mesin SSR selama membangun (build) atau menghasilkan (generate), sembari kita mendapatkan pra-render semua halaman kita, dan mendapat SEO yang tinggi dan skor pemuatan halaman (page load score). Konten dihasilkan pada _waktu pembuatan_. Misalnya, kita tidak dapat menggunakannya untuk aplikasi yang kontennya bergantung pada autentikasi pengguna atau API waktu-nyata (setidaknya untuk muatan pertama).

Ide SPA itu sederhana! Saat mode SPA diaktifkan menggunakan `mode: 'spa'` atau flag `--spa`, dan kita jalankan build, generation otomatis dimulai setelah build. Generasi ini berisi meta yang umum dan tautan sumber daya (resource), namun bukan konten halaman.

Jadi, untuk penyebaran SPA, Anda harus melakukan hal berikut:

- Ubah `mode` di `nuxt.config.js` ke `spa`.
- Jalankan `npm run build`.
- Sebarkan (deploy) folder `dist/` yang dibuat ke hosting statis Anda seperti Surge, GitHub Pages atau nginx.

Metode penyebaran lain adalah menggunakan Nuxt sebagai middleware dalam kerangka kerja (framework) sewaktu dalam mode `spa` . Ini membantu mengurangi beban server dan menggunakan Nuxt dalam proyek di mana SSR tidak memungkinkan.

<div class="Alert">

Lihat [Bagaimana cara deploy di Heroku?](/faq/heroku-deployment) untuk contoh penyebaran ke host populer.

</div>

<div class="Alert">

Lihat [Cara memasang di Halaman GitHub?](/faq/github-pages) untuk detail lebih lanjut tentang cara menyebarkan ke Halaman GitHub.

</div>
