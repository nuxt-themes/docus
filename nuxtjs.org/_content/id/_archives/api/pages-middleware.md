---
title: 'API: Properti middleware'
description: Menetapkan middleware untuk halaman tertentu dari aplikasi.
menu: middleware
category: pages
position: 27
---

# Properti middleware

- Type: `String` atau `Array`
  - Items: `String`

Menetapkan middleware untuk halaman tertentu dari aplikasi.

Contoh:

`pages/secret.vue`:

```html
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

`middleware/authenticated.js`:

```js
export default function ({ store, redirect }) {
  // Jika user tidak terautentikasi
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

Untuk mempelajari lebih lanjut tentang middleware, lihat [panduan middleware](/guide/routing#middleware).
