---
title: 'Kelas Renderer'
description: Kelas Renderer Nuxt
menu: Renderer
category: internals-glossary
position: 5
---

- Sumber: **[vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)**

Kelas ini mengekspor _middleware connect_ yang menangani dan melayani semua permintaan SSR dan aset.

## Hooks

Anda dapat mendaftarkan _hook_ pada _life cycle_ tertentu.

| Hook                     | Argumen                  | Kapan                                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `render:before`          | (renderer, options)      | Sebelum menyiapkan _middleware_ dan sumber daya untuk kelas _Renderer_, berguna untuk _overload_ beberapa metode dan opsi.                                                                                                                                            |
| `render:setupMiddleware` | (app) _connect instance_ | Sebelum Nuxt menambahkan _middleware_-nya. Anda dapat menggunakannya untuk mendaftarkan _middleware_ pada sisi peladen.                                                                                                                                               |
| `render:errorMiddleware` | (app) _connect instance_ | Sebelum menambahkan _middleware_ galat Nuxt, berguna untuk menambahkan _middleware_ Anda sendiri sebelum menggunakan _middleware_ Nuxt. Lihat [Modul Sentry](https://github.com/nuxt-community/sentry-module/blob/v4.0.3/lib/module.js#L151) untuk info lebih lanjut. |
| `render:resourcesLoaded` | (resources)              | Dipanggil setelah sumber daya untuk _renderer_ dimuat (_client manifest_, _server bundle_, dll).                                                                                                                                                                      |
| `render:done`            | (renderer)               | _Middleware_ SSR dan semua sumber daya sudah siap (_Renderer_ sudah siap)                                                                                                                                                                                             |
| `render:routeContext`    | (context.nuxt)           | Setiap kali rute yang dimuat di sisi peladen dan sebelum _hook_ `render:route`. Dipanggil sebelum mengubah konteks Nuxt menjadi `window.__NUXT__`, berguna untuk menambahkan data yang dapat Anda ambil di sisi pengguna.                                             |
| `render:route`           | (url, result, context)   | Setiap kali rute yang dimuat di sisi peladen. Dipanggil sebelum mengirim kembali permintaan ke peramban.                                                                                                                                                              |
| `render:routeDone`       | (url, result, context)   | Setiap kali rute yang dimuat di sisi peladen. Dipanggil setelah tanggapan berhasil dikirim ke peramban.                                                                                                                                                               |
