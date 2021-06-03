---
title: 'Properti loading'
description: Properti `loading` memberi Anda opsi untuk menonaktifkan bilah loading secara default pada halaman tertentu.
menu: Properti Loading
category: components-glossary
position: 0
---

> Properti loading memberi Anda opsi untuk menonaktifkan bilah loading secara default pada halaman tertentu.

- **Tipe:** `Boolean` (default: `true`)

Secara default, Nuxt.js menggunakan komponennya sendiri untuk menampilkan bilah kemajuan di antara rute.

Anda dapat menonaktifkan atau menyesuaikannya secara global melalui [Opsi konfigurasi loading](/docs/2.x/configuration-glossary/configuration-loading), tetapi Anda juga bisa menonaktifkannya untuk halaman tertentu dengan menyetel properti `loading` dengan nilai `false`:

```html
<template>
  <h1>Halaman saya</h1>
</template>

<script>
  export default {
    loading: false
  }
</script>
```
