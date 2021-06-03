---
title: 'Properti mode'
description: Untuk mengubah mode bawaan Nuxt.js
menu: mode
category: configuration-glossary
position: 17
---

- Tipe: `string`
  - Nilai bawaan: `universal`
  - Nilai yang dapat digunakan:
    - `'spa'`: Tanpa pe-_render_-an di sisi server (hanya navigasi di sisi klien)
    - `'universal'`: Aplikasi isomorfis (pe-_render_-an di sisi server + navigasi di sisi klien)

> Anda dapat menggunakan properti ini untuk mengubah mode bawaan Nuxt.js di proyek Anda melalui berkas `nuxt.config.js`

<base-alert type="warning">

_Deprecated_: gunakan `ssr: false` alih-alih `mode: spa`

</base-alert>

<base-alert type="next">

Untuk mempelajari lebih lanjut mengenai properti `ssr`, kunjungi halaman [properti ssr](/docs/2.x/configuration-glossary/configuration-ssr).

</base-alert>

<base-alert type="next">

Untuk mempelajari lebih lanjut mengenai properti `mode`, kunjungi [bagian mode _render_](/docs/2.x/features/rendering-modes).

</base-alert>
