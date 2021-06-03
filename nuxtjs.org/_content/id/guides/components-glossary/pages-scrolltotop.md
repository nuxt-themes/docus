---
title: 'Properti scrollToTop'
description: Properti `scrollToTop` memungkinkan Anda memberi tahu Nuxt.js untuk menggulir ke atas sebelum merender halaman.
menu: Properti scrollToTop
category: components-glossary
position: 0
---

> Properti scrollToTop memungkinkan Anda memberi tahu Nuxt.js untuk menggulir ke atas sebelum merender halaman.

- **Tipe:** `Boolean` (default: `false`)

Secara default, Nuxt.js menggulir ke atas saat Anda pergi ke halaman lain, tetapi dengan children routes, Nuxt.js mempertahankan posisi gulir. Jika Anda ingin memberi tahu Nuxt.js untuk menggulir ke atas saat merender child route Anda, setel `scrollToTop` ke nilai `true`:

```html
<template>
  <h1>Komponen child route saya</h1>
</template>

<script>
  export default {
    scrollToTop: true
  }
</script>
```

Sebaliknya, Anda juga dapat menyetel `scrollToTop` ke nilai `false` secara manual pada route induk.

Jika Anda ingin menimpa perilaku scroll default Nuxt.js, lihat file [opsi scrollBehavior](/docs/2.x/configuration-glossary/configuration-router#scrollbehavior).
