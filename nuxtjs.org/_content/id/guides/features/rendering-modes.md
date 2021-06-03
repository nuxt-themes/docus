---
title: Mode Render
description: Mode Render
position: 1
category: features
---

## Universal

`mode: 'universal'`: Aplikasi isomorfis (untuk website yang di-_render_ pada sisi _server_ ataupun website statis).

```js{}[nuxt.config.js]
export default {
  mode: 'universal' // nilai bawaannya adalah universal
}
```

<base-alert type="info">
Anda tidak harus menambahkan ini pada konfigurasi nuxt anda untuk menerapkan mode universal, karena mode universal sudah diterapkan sebagai mode bawaan.
</base-alert>

## SPA

`mode: 'spa'`: Tidak di-_render_ di sisi _server_ (hanya di-_render_ ketika terjadi navigasi pada sisi klien)

Anda bisa menggunakan properti `mode` untuk mengubah mode bawaan nuxt untuk proyek anda:

```js{}[nuxt.config.js]
export default {
  mode: 'spa' // nilai bawaannya adalah universal
}
```

<base-alert type="next">

[Properti mode](/docs/2.x/configuration-glossary/configuration-mode)

</base-alert>
