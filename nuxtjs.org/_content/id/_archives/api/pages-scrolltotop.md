---
title: 'API: Properti scrollToTop'
description: Properti `scrollToTop`  memungkinkan Anda memberitahu Nuxt.js untuk menggulir (scroll) ke atas sebelum me-render halaman.
menu: scrollToTop
category: pages
position: 28
---

# Properti scrollToTop

> Properti scrollToTop memungkinkan Anda memberitahu Nuxt.js untuk menggulir (scroll) ke atas sebelum me-render halaman.

- **Tipe:** `Boolean` (default: `false`)

Secara default, Nuxt.js bergulir (scroll) ke atas halaman ketika Anda membuka halaman lain, tetapi dengan anak rute (children routes), Nuxt.js menyimpan posisi gulir. Jika Anda ingin memberi tahu Nuxt.js untuk menggulir ke atas saat me-render anak rute, atur `scrollToTop: true`:

```html
<template>
  <h1>My child component</h1>
</template>

<script>
  export default {
    scrollToTop: true
  }
</script>
```

Jika Anda ingin menimpa perilaku gulir default pada Nuxt.js, lihat [opsi scrollBehavior](/api/configuration-router#scrollBehavior).
