---
title: Struktur Direktori
description: Struktur aplikasi Nuxt.js default dimaksudkan untuk memberikan titik awal yang bagus untuk aplikasi kecil dan besar. Anda bebas untuk mengatur aplikasi Anda sesuka Anda dan dapat membuat direktori lain jika Anda membutuhkannya.
position: 3
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/03_directory_structure?fontsize=14&hidenavigation=1&theme=dark
---

Struktur aplikasi Nuxt.js default dimaksudkan untuk memberikan titik awal yang bagus untuk aplikasi kecil dan besar. Anda bebas untuk mengatur aplikasi Anda sesuka Anda dan dapat membuat direktori lain jika Anda membutuhkannya.

Mari buat direktori dan file yang belum ada di proyek kita.

```bash
mkdir components assets static
touch nuxt.config.js
```

Ini adalah direktori dan file utama yang kami gunakan saat membangun aplikasi Nuxt.js. Anda akan menemukan penjelasan masing-masing di bawah ini.

<base-alert type="info">

Membuat direktori dengan nama ini untuk mengaktifkan fitur dalam proyek Nuxt.js Anda.

</base-alert>

## Direktori

### Direktori pages

Direktori `pages` berisi tampilan dan rute aplikasi Anda. Seperti yang telah Anda pelajari di bab terakhir, Nuxt.js membaca semua file `.vue` di dalam direktori ini dan menggunakannya untuk membuat _router_ aplikasi.

<base-alert type="next">

Pelajari lebih lanjut tentang [direktori pages](/docs/2.x/directory-structure/pages)

</base-alert>

### Direktori components

Direktori `components` adalah tempat Anda meletakkan semua komponen Vue.js yang kemudian diimpor ke halaman Anda.

Dengan Nuxt.js Anda dapat membuat komponen Anda dan mengimpornya secara otomatis ke file .vue Anda berarti tidak perlu mengimpornya secara manual di bagian _script_. Nuxt.js akan memindai dan mengimpor ini secara otomatis untuk Anda setelah Anda menyetel komponen ke _true_.

<base-alert type="next">

Pelajari lebih lanjut tentang [direktori components](/docs/2.x/directory-structure/components)

</base-alert>

### Direktori assets

Direktori `assets` berisi _assets_ Anda yang tidak dikompilasi seperti _styles_, _images_, atau _fonts_ Anda.

<base-alert type="next">

Pelajari lebih lanjut tentang [direktori assets](/docs/2.x/directory-structure/assets)

</base-alert>

### Direktori static

Direktori `static` secara langsung dipetakan ke _root server_ dan berisi file yang harus tetap menggunakan namanya (mis. `robots.txt`) _atau_ kemungkinan besar tidak akan berubah (mis. favicon).

<base-alert type="next">

Pelajari lebih lanjut tentang [direktori static](/docs/2.x/directory-structure/static)

</base-alert>

### File nuxt.config.js

File `nuxt.config.js` adalah satu titik konfigurasi untuk Nuxt.js. Jika Anda ingin menambahkan modul atau mengganti pengaturan default, ini adalah tempat untuk menerapkan perubahan.

<base-alert type="next">

Pelajari lebih lanjut tentang [file nuxt.config.js](/docs/2.x/directory-structure/nuxt-config)

</base-alert>

### File package.json

File `package.json` berisi semua dependensi dan _script_ untuk aplikasi Anda.

<app-modal>
  <code-sandbox :src="csb_link"></code-sandbox>
</app-modal>

## Lebih lanjut tentang struktur proyek

Ada lebih banyak direktori dan file yang berguna, termasuk [content](/docs/2.x/directory-structure/content), [layouts](/docs/2.x/directory-structure/layouts), [middleware](/docs/2.x/directory-structure/middleware), [modules](/docs/2.x/directory-structure/modules), [plugins](/docs/2.x/directory-structure/plugins) dan [store](/docs/2.x/directory-structure/store). Karena tidak diperlukan untuk aplikasi kecil, mereka tidak dibahas di sini.

<base-alert type="next">

Untuk mempelajari tentang semua direktori secara mendetail, silakan baca [Dokumentasi Directory Structure](/docs/2.x/directory-structure/nuxt).

</base-alert>
