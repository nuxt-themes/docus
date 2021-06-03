---
title: 'API: The <nuxt> Component'
description: Menampilkan komponen halaman di dalam layout
menu: nuxt
category: components
position: 41
---

# Komponen &lt;nuxt&gt;

> Komponen ini hanya digunakan di dalam [layouts](/guide/views#layouts) untuk menampilkan komponen halaman.

**Props**:

- nuxtChildKey: `string`
  - Prop ini di-set ke `<router-view/>`, berguna untuk membuat transisi di dalam halaman yang dinamis dan rute yang berbeda.
  - Default: `$route.path`

Contoh (`layouts/default.vue`):

```html
<template>
  <div>
    <div>My nav bar</div>
    <nuxt />
    <div>My footer</div>
  </div>
</template>
```

Untuk melihat contoh, silakan lihat [contoh layouts](/examples/layouts).
