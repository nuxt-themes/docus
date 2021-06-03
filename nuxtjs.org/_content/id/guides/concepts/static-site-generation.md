---
title: Pembuatan Situs Statis
description: Dengan pembuatan situs statis, Anda dapat merender aplikasi selama fase build dan menerapkannya ke layanan hosting statis apa pun seperti Netlify, halaman Github, Vercel, dll.
position: 4
category: concepts
questions:
  - question: Apakah Anda memerlukan server untuk menghosting situs statis
    answers:
      - True
      - False
    correctAnswer: False
  - question: Perintah apa yang Anda gunakan untuk membuat situs statis?
    answers:
      - nuxt build
      - nuxt prerender
      - nuxt generate
    correctAnswer: nuxt generate
  - question: Kapan API Anda dipanggil?
    answers:
      - Setiap kali membuka halaman dengan konten API
      - Saat membuat situs Anda
      - Saat Anda membuat situs Anda dan setiap kali membuka halaman dengan konten API
    correctAnswer: Saat membuat situs Anda
  - question: Halaman mana yang akan kembali ke mode SPA?
    answers:
      - Halaman kesalahan
      - Mereka yang dikecualikan dari pembuatan dengan generate.excludes
      - Semua halaman di navigasi
    correctAnswer: Mereka yang dikecualikan dari pembuatan dengan generate.excludes
  - question: Bagaimana Anda memperbarui konten ke situs Anda?
    answers:
      - Ini diperbarui secara otomatis
      - Anda perlu membuat ulang situs Anda
    correctAnswer: Anda perlu membuat ulang situs Anda
---

Dengan pembuatan situs statis, Anda dapat merender aplikasi Anda selama fase build dan menerapkannya ke layanan hosting statis apa pun seperti Netlify, halaman Github, Vercel, dll. Ini berarti tidak diperlukan server untuk menerapkan aplikasi Anda.

### Menghasilkan situs Anda

Saat menerapkan situs Anda dengan [target:static](/docs/2.x/features/deployment-targets#static-hosting) semua halaman `.vue` Anda akan dibuat menjadi file HTML dan JavaScript. Semua panggilan ke API akan dibuat dan di-cache dalam folder bernama statis di dalam konten yang Anda buat sehingga tidak ada panggilan ke API Anda yang perlu dibuat di navigasi sisi klien.

### Langkah 1: Browser ke CDN

Ketika browser mengirimkan permintaan awal, itu akan memuat CDN.

### Langkah 2: CDN ke Browser

CDN akan mengirimkan HTML, JavaScript, dan assets statis yang telah dibuat dan mengirimkannya kembali ke browser. Konten ditampilkan dan hidrasi Vue.js masuk, membuatnya reaktif. Setelah proses ini, halaman menjadi interaktif.

### Langkah 3: Browser ke Browser

Navigasi di antara halaman dengan [`<NuxtLink>`](/docs/2.x/features/nuxt-components#the-nuxtlink-component) dilakukan di sisi klien sehingga Anda tidak memuat CDN lagi dan semua panggilan API akan dimuat dari folder statis yang sudah di-cache bahkan jika Anda melakukan refresh pada browser.

### Penganti SPA

Halaman yang telah dikecualikan dari pembuatan, dengan menggunakan properti `generate.exclude` akan kembali menjadi aplikasi halaman tunggal. Karenanya, halaman ini tidak akan ada di CDN dan akan ditampilkan di sisi klien di browser setelah pengguna membuka halaman tersebut.

<base-alert type="next">

Untuk mempelajari lebih lanjut tentang [properti generate](/docs/2.x/configuration-glossary/configuration-generate#exclude)

</base-alert>

### Memperbarui konten Anda

Untuk mendapatkan konten baru ke situs Anda dari API, Anda perlu membuat kembali situs Anda. Dengan sebagian besar penyedia hosting situs statis, Anda dapat melakukan ini dengan mendorong perubahan Anda ke cabang master melalui perintah git atau melalui permintaan tarik.

### Mode preview

Mode Pratinjau akan memanggil API atau CMS Anda sehingga Anda dapat melihat perubahan secara langsung sebelum menerapkan. Lihat [mode preview](/docs/2.x/features/live-preview) tentang cara mengaktifkan fitur ini.

<quiz :questions="questions"></quiz>
