---
title: Perkenalan
description: '25 Oktober 2016, tim dari zeit.co, mengumumkan Next.js, sebuah framework untuk me-render server aplikasi React. Beberapa jam setelah pengumuman, ide untuk membuat aplikasi render-server Vue.js dengan cara yang sama seperti Next.js semakin nyata: Nuxt.js telah lahir.'
category: prologue
position: 1
---

> 25 Oktober 2016, tim dari zeit.co, mengumumkan Next.js, sebuah framework untuk me-render server aplikasi React. Beberapa jam setelah pengumuman, ide untuk membuat aplikasi render-server Vue.js dengan cara yang sama seperti Next.js semakin nyata: Nuxt.js telah lahir.

## Apa itu Nuxt.js ?

Nuxt.js adalah sebuah framework untuk membuat Aplikasi Vue Js Universal.

Ruang lingkup utamanya adalah **Me-render UI** sembari mengabtraksi distribusi client/server.

Tujuan kami adalah untuk membuat framework yang cukup fleksibel yang bisa Anda gunakan sebagai basis proyek utama atau disamping proyek Anda saat ini yang berbasis Node.js.

Nuxt.js mengatur semua konfigurasi yang diperlukan untuk membuat pengembangan **Pe-render-an Server** Aplikasi Vue.js Anda lebih menyenangkan.

Selain itu, kami juga menyediakan opsi penempatan lain yang disebut: _nuxt generate_. Ini akan membangun Aplikasi Vue.js **Secara Statis**. Kami percaya bahwa opsi itu bisa menjadi langkah besar selanjutnya dalam pengembangan Aplikasi Web dengan microservis.

Sebagai framework, Nuxt.js hadir dengan banyak fitur untuk membantu Anda dalam pengembangan antara sisi client dan sisi server seperti Data Asinkronus, Middleware, Layout, dll.

## Cara Kerja

![Vue dengan webpack dan Babel](https://i.imgur.com/avEUftE.png)

Nuxt.js memasukan berikut ini untuk membuat pengembangan aplikasi web yang kaya:

- [Vue 2](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/en/)
- [Vuex](https://vuex.vuejs.org/en/) (dimasukan hanya ketika menggunakan [opsi store](/guide/vuex-store))
- [Perender Server Vue](https://ssr.vuejs.org/en/) (dikeluarkan ketika menggunakan [`mode: 'spa'`](/api/configuration-mode))
- [vue-meta](https://github.com/nuxt/vue-meta)

Ukuran total hanya **57kB min+gzip** (53kB dengan Vuex).

Didalamnya kami menggunakan [webpack](https://github.com/webpack/webpack) dengan [vue-loader](https://github.com/vuejs/vue-loader) dan [babel-loader](https://github.com/babel/babel-loader) untuk bundle, split kode dan me-minify kode.

## Fitur

- Menulis File Vue (`*.vue`)
- Split Kode Otomatis
- Render Sisi Server
- Sistem Routing Yang Kuat dengan Data Asinkronus
- Penyajian File Statis
- Penggunaan ES2015+
- Mem-bundle dan me-minify JS & CSS
- Mengatur elemen `<head>` (`<title>`, `<meta>`, dll.)
- Hot module replacement di pengembangan
- Pra-prosesor: Sass, Less, Stylus, dll.
- Siap untuk mendorong header HTTP/2
- Memperluas dengan arsitektur Modular

## Skema

Skema ini menunjukan apa yang disebut Nuxt.js ketika server dipanggil atau ketika pengguna menavigasi aplikasi melalui `<nuxt-link>`:

![skema-nuxt](/nuxt-schema.svg)

## Me-render Server (Universal SSR)

Anda bisa menggunakan Nuxt.js sebagai framework untuk mengatasi semua pe-render-an proyek Anda.

Ketika meluncurkan `nuxt`, ini akan memulai sebuah pengembangan server hot-reloading dan [Perender Server Vue](https://ssr.vuejs.org/en/)

### Single Page Applications (SPA)

Jika, untuk beberapa alasan, Anda lebih suka untuk tidak menggunakan render sisi server atau butuh hosting statis untuk aplikasi Anda, Anda bisa menggunakan mode SPA dengan mudah menggunala `nuxt --spa`. Dalam kombinasi dengan fitur _generate_, ini memberi Anda sebuah mekanisme pengembangan SPA yang kuat tanpa menggunakan runtime Node.js atau penanganan server khusus lainnya.

Lihat di [sebuah perintah](/guide/commands) untuk belajar lebih banyak tentang kegunaannya.

Jika Anda sudah memiliki server, anda bisa menambah Nuxt.js dengan menggunakannya sebagai middleware. Semua tidak ada larangan ketika menggunakan Nuxt.js untuk mengembangkan Aplikasi Web Universal Anda. Lihat panduan [Menggunakan Nuxt.js Secara Ter-program](/api/nuxt).

## Generate Statis (Pra Pe-renderan)

Inovasi besar Nuxt.js datang dengan perintah `nuxt generate`.

Ketika membangun aplikasi Anda, ini akan menghasilkan HTML untuk semua dari routes Anda dan menyimpannya dalam sebuah file.

Sebagai contoh, struktur file berikut:

```bash
-| pages/
----| about.vue
----| index.vue
```

Akan meng-generate:

```
-| dist/
----| about/
------| index.html
----| index.html
```

Dengan ini, Anda bisa meng-host aplikasi web yang di-generate di hosting statis apapun.

Contoh terbaiknya adalah situs ini. Ini ter-generate dan ter-hosting di GitHub Pages:

- [Kode sumber](https://github.com/nuxt/nuxtjs.org)
- [Kode ter-generate](https://github.com/nuxt/nuxtjs.org/tree/gh-pages)

Kita tidak ingin meng-generate aplikasi secara manual setiap kita memperbarui [repositori docs](https://github.com/nuxt/docs), jadi setiap push membuat panggilan sebuah fungsi AWS Lambda yang mana:

1. Clone [repositori nuxtjs.org](https://github.com/nuxt/nuxtjs.org)
2. Instal dependencies via `npm install`
3. Menjalanlan `nuxt generate`
4. Push folder `dist` ke branch `gh-pages`

Sekarang kita memiliki **Aplikasi Web Yang Dihasilkan Tanpa Server Statis** :)

Kita dapat melangkah lebih jauh dengan memikirkan aplikasi web e-commerce yang dibuat dengan `nuxt generate` dan di-host di CDN. Setiap kali produk kehabisan stok atau stok kembali, kita membuat ulang aplikasi web. Tetapi jika pengguna saat itu menavigasi melalui aplikasi web, akan otomatis ter-update berkat panggilan API yang dibuat ke API e-commerce. Tidak perlu lagi memiliki banyak tuntutan server + cache!

<div class="Alert">

Lihat [Bagaimana cara deploy di Github Pages?](/faq/github-pages) untuk detail lembih banyak tentang cara deploy ke Github Pages

</div>
