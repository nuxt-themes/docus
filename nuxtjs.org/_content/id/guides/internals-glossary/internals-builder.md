---
title: 'Kelas Builder'
description: Kelas Builder Nuxt
menu: Builder
category: internals-glossary
position: 7
---

- Sumber: **[builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)**

## Hooks

Anda dapat mendaftarkan _hooks_ pada siklus hidup Nuxt tertentu.

```js
// Tambahkan hook ketika kode selesai dibuat
this.nuxt.hook('build:done', (builder) => {
  ...
})
```

| Nama _Hook_             | Argumen                                     | Akan Dijalankan                                                                                                                                                                              |
| ----------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build:before`          | (nuxt, buildOptions)                        | Sebelum Nuxt membuat kode                                                                                                                                                                    |
| `builder:prepared`      | (nuxt, buildOptions)                        | Setelah berkas kode hasil berhasil dibuat                                                                                                                                                    |
| `builder:extendPlugins` | (plugins)                                   | Ketika membuat _plugin_                                                                                                                                                                      |
| `build:templates`       | ({ templatesFiles, templateVars, resolve }) | Ketika membuat _template_ untuk berkas `.nuxt`                                                                                                                                               |
| `build:extendRoutes`    | (routes, resolve)                           | Ketika membuat rute                                                                                                                                                                          |
| `webpack:config`        | (webpackConfigs)                            | Sebelum mengatur kompilator                                                                                                                                                                  |
| `build:compile`         | ({ name, compiler })                        | Sebelum webpack melakukan kompilasi (kompilator adalah objek `Compiler` webpack), apabila disetel dalam mode `universal`, akan dipanggil dua kali menggunakan nama `'client'` dan `'server'` |
| `build:compiled`        | ({ name, compiler, stats })                 | Ketika pembuatan kode oleh webpack selesai                                                                                                                                                   |
| `build:done`            | (nuxt)                                      | Ketika proses pembuatan kode oleh Nuxt selesai                                                                                                                                               |
