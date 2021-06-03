---
title: 'Properti middleware'
description: Atur middleware untuk halaman aplikasi tertentu.
menu: Properti Middleware
category: components-glossary
position: 0
---

- Type: `String` or `Array` or `Function`
  - Items: `String` or `Function`

Atur middleware untuk halaman aplikasi tertentu.

## Middleware bernama

Anda dapat membuat middleware bernama dengan membuat file di dalam direktori `middleware/`, nama file akan menjadi nama middleware.

```js{[middleware/authenticated.js]}
export default function ({ store, redirect }) {
  // Jika pengguna tidak diautentikasi
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
```

```html{}[pages/secret.vue]
<template>
  <h1>Halaman di rahasiakan</h1>
</template>

<script>
  export default {
    middleware: 'authenticated'
  }
</script>
```

## Middleware anonim

Jika Anda perlu menggunakan middleware hanya untuk halaman tertentu, Anda dapat langsung menggunakan fungsinya (atau serangkaian fungsi):

```html{[pages/secret.vue]}
<template>
  <h1>Halaman di rahasiakan</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // Jika pengguna tidak diautentikasi
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```
