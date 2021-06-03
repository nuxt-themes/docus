---
title: Target Penggelaran (Deploy)
description: Target Penggelaran (Deploy)
position: 2
category: features
---

## Hosting Statis

Untuk _hosting_ statis (_hosting_ tanpa pe-_render_-an di sisi server), anda perlu menambahkan properti `target` dengan nilai `static` pada berkas nuxt.config.

```js{}[nuxt.config.js]
export default {
  target: 'static' // nilai bawaannya adalah 'server'
}
```

Menjalankan perintah `nuxt dev` dengan properti `target` bernilai `static` akan meningkatkan pengalaman pengembang seperti:

- Menghapus `req` dan `res` dari `context`
- _Fallback_ ke pe-_render_-an di sisi klien dalam kasus 404, galat, dan _redirect_ [lihat _fallback_ SPA](/docs/2.x/concepts/static-site-generation#spa-fallback)
- `$route.query` akan selalu bernilai `{}` untuk pe-_render_-an di sisi server.
- `process.static` bernilai `true`

<base-alert type="info">
Kami juga mengekspos `process.target`, ini memungkinkan para pembuat modul untuk menambahkan logika tambahan berdasarkan target pengguna.
</base-alert>

## Server Hosting

Untuk _hosting_ server, properti `target` harus bernilai `server` (ini merupakan nilai bawaan properti `target`)

```js{}[nuxt.config.js]
export default {
  target: 'server'
}
```
