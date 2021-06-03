---
title: 'API: The <nuxt-link> Component'
description: Menghubungkan antar halaman menggunakan nuxt-link.
menu: nuxt-link
category: components
position: 43
---

# Komponen &lt;nuxt-link&gt;

> Komponen ini digunakan sebagai penghubung antar halaman.

Saat ini, `<nuxt-link>` sama dengan [`<router-link>`](https://router.vuejs.org/en/api/router-link.html), jadi kami sarankan Anda untuk melihat bagaimana menggunakannya di [dokumentasi Vue Router](https://router.vuejs.org/en/api/router-link.html).

Contoh (`pages/index.vue`):

```html
<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="/about">About</nuxt-link>
  </div>
</template>
```

Ke depannya, kami akan menambahkan fitur pada komponen `<nuxt-link>`, yaitu mengambil terlebih dahulu (pre-fetching) melalui background untuk meningkatkan keresponsifan Aplikasi Nuxt.js.
