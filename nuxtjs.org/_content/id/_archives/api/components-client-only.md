---
title: 'API: The <client-only> Component'
description: Melewati render komponen pada server side (rendering), dan menampilkan
menu: client-only
category: components
position: 44
---

# Komponen &lt;no-ssr&gt;

> Komponen ini digunakan untuk menghapus komponen dari subjek server side rendering.

**Props**:

- placeholder: `String`
  - Prop ini digunakan sebagai konten di dalam `div` dan ditampilkan sebagai text pada server side rendering.

```html
<template>
  <div>
    <ssrfrendly-component />
    <no-ssr>
      <not-ssrfrendly />
    </no-ssr>
  </div>
</template>
```

Komponen ini adalah klon dari [egoist/vue-no-ssr](https://github.com/egoist/vue-no-ssr). Terima kasih [@egoist](https://github.com/egoist)!
