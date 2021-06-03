---
title: 'Kelas Generator'
description: Kelas Generator Nuxt
menu: Generator
category: internals-glossary
position: 8
---

- Sumber: **[generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)**

## Hooks

`generate:` hooks:

| Nama _Hook_             | Argumen                      | Akan Dijalankan                                                                                                                               |
| ----------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `generate:before`       | (generator, generateOptions) | Sebelum program Nuxt dibuat                                                                                                                   |
| `generate:distRemoved`  | (generator)                  | Sebelum berkas tujuan dihapus                                                                                                                 |
| `generate:distCopied`   | (generator)                  | Ketika berkas statis dan kode hasil disalin                                                                                                   |
| `generate:route`        | ({ route, setPayload })      | Sebelum halaman web dibuat, berguna untuk muatan dinamis, lihat [#7422](https://github.com/nuxt/nuxt.js/pull/7422), tersedia sejak Nuxt 2.13+ |
| `generate:page`         | ({ route, path, html })      | Memperbolehkan pengguna untuk memperbarui alamat dan html setelah kode dibuat                                                                 |
| `generate:routeCreated` | ({ route, path, errors })    | Ketika halaman yang dibuat berhasil disimpan                                                                                                  |
| `generate:extendRoutes` | (routes)                     | Memperbolehkan pengguna untuk memperbarui rute untuk dibuat ulang                                                                             |
| `generate:routeFailed`  | ({ route, errors })          | Ketika halaman yang dibuat gagal disimpan                                                                                                     |
| `generate:done`         | (generator, errors)          | Ketika proses pembuatan kode selesai dijalankan                                                                                               |
