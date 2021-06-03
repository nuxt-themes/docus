---
title: Instalasi
description: Untuk memulai dengan Nuxt.js itu sangat mudah. suatu projek yang sederhana hanya memerlukan 'nuxt' dependency.
category: getting-started
position: 101
---

> Untuk memulai dengan Nuxt.js itu sangat mudah. suatu projek yang sederhana hanya memerlukan 'nuxt' dependency.

<div>
  <a href="https://vueschool.io/courses/nuxtjs-fundamentals/?friend=nuxt" target="_blank" class="Promote">
    <img src="/nuxt-fundamentals.png" srcset="/nuxt-fundamentals-2x.png 2x" alt="Nuxt Fundamentals by vueschool"/>
    <div class="Promote__Content">
      <h4 class="Promote__Content__Title">Nuxt.js Fundamentals</h4>
      <p class="Promote__Content__Description">Learn how to get started quickly with Nuxt.js in videos.</p>
      <p class="Promote__Content__Signature">Video courses made by VueSchool to support Nuxt.js developpement.</p>
    </div>
  </a>
</div>

## Menggunakan `create-nuxt-app`

Untuk memulai sebuah projek dengan cepat, tim Nuxt.js telah membuat suatu scaffolding tool [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Pastikan anda sudah menginstall [npx](https://www.npmjs.com/package/npx) (`npx` sudah terisntall secara default pada npm `5.2.0`)

```bash
$ npx create-nuxt-app <project-name>
```

atau dengan [yarn](https://yarnpkg.com/en/):

```bash
$ yarn create nuxt-app <my-project>
```

Kemudian akan muncul beberapa pertanyaan:

1. Pilih framework untuk integrasi server-side:

- None (Nuxt default server)
- [Express](https://github.com/expressjs/express)
- [Koa](https://github.com/koajs/koa)
- [Hapi](https://github.com/hapijs/hapi)
- [Feathers](https://github.com/feathersjs/feathers)
- [Micro](https://github.com/zeit/micro)
- [Fastify](https://github.com/fastify/fastify)
- [Adonis](https://github.com/adonisjs/adonis-framework) (WIP)

2. Pilih framework UI kesukaan anda:

- None (feel free to add one later)
- [Bootstrap](https://github.com/bootstrap-vue/bootstrap-vue)
- [Vuetify](https://github.com/vuetifyjs/vuetify)
- [Bulma](https://github.com/jgthms/bulma)
- [Tailwind](https://github.com/tailwindcss/tailwindcss)
- [Element UI](https://github.com/ElemeFE/element)
- [Ant Design Vue](https://github.com/vueComponent/ant-design-vue)
- [Buefy](https://github.com/buefy/buefy)
- [iView](https://github.com/iview/iview)
- [Tachyons](https://github.com/tachyons-css/tachyons)

3. [Mode Nuxt yang anda inginkan (`Universal` or `SPA`)](https://nuxtjs.org/guide/release-notes#better-spa-experience)
4. Menambah [axios module](https://github.com/nuxt-community/axios-module) untuk mempermudah melakukan HTTP request pada aplikasi anda.
5. Menambah [EsLint](https://eslint.org/) untuk memformat coding anda dengan lint pada saat menyimpan.
6. Menambah [Prettier](https://prettier.io/) untuk memformat coding anda dengan prettier pada saat menyimpan.

Setelah menjawab semua pertanyaan, semua dependencies yang dibutuhkan akan terinstall dan langkah selanjut nya adalah menjalankan aplikasi dengan:

```bash
$ npm run dev
```

Aplikasi sekarang berjalan pada http://localhost:3000.

<div class="Alert">

Nuxt.js akan memantau perubahan pada file anda yang berada dalam direktori <code>pages</code>, jadi anda tidak perlu menjalankan ulang aplikasi anda ketika menambahkan halaman baru.

</div>

Untuk menemukan lebih lanjut mengenai struktur direktori pada projek : [Directory Structure Documentation](/guide/directory-structure).

## Memulai dari awal

Membuat suatu aplikasi dengan Nuxt.js dari awal itu mudah, anda hanya membutuhkan _1 file dan 1 direktori_. Mari kita membuat direktor baru untuk memulai pengerjaan projek:

```bash
$ mkdir <nama-project>
$ cd <project-name>
```

<div class="Alert Alert--nuxt-green">

<b>Info:</b> ganti <code>&lt;project-name&gt;</nom-du-projet></code> dengan nama project anda.

</div>

### The package.json

Projek anda membutuhkan file `package.json` untuk menemukan bagaimana menjalankan `nuxt`:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

`scripts` akan menjalankan Nuxt.js dengan `npm run dev`.

### Instalasi `nuxt`

Setelah file `package.json` dibuat, tambahkan `nuxt` pada projek anda dengan npm:

```bash
$ npm install --save nuxt
```

### Direktori `pages`

Nuxt.js akan men-transformasi setiap file `*.vue` yang berada dalam direktori `pages` sebagai route pada aplikasi anda

Membuat direktori `pages`:

```bash
$ mkdir pages
```

kemudian buat halaman pertama anda pada `pages/index.vue`:

```html
<template>
  <h1>Hello world!</h1>
</template>
```

dan jalankan projek dengan:

```bash
$ npm run dev
```

Aplikasi sekarang berjalan pada on http://localhost:3000.

<div class="Alert">

Nuxt.js akan memantau perubahan pada file anda yang berada dalam direktori <code>pages</code>, jadi anda tidak perlu menjalankan ulang aplikasi anda ketika menambahkan halaman baru.

</div>

Untuk menemukan lebih lanjut mengenai struktur direktori pada projek : [Directory Structure Documentation](/guide/directory-structure).
