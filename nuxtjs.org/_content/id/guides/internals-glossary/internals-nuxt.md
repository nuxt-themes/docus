---
title: 'Kelas Nuxt'
description: Kelas Inti Nuxt
menu: Kelas Nuxt
category: internals-glossary
position: 4
---

- Sumber: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)**

Ini adalah wadah inti yang memungkinkan semua modul dan kelas berkomunikasi satu sama lain. Semua modul memiliki akses ke _instance_ Nuxt dengan menggunakan `this.nuxt`.

## Hooks

Anda dapat mendaftarkan _hook_ pada _life cycle_ tertentu.

```js
nuxt.hook('ready', async nuxt => {
  // Kode Anda
})
```

| Plugin   | Argumen                | Kapan                                                                                 |
| -------- | ---------------------- | ------------------------------------------------------------------------------------- |
| `ready`  | (nuxt)                 | Nuxt siap bekerja (`ModuleContainer` dan `Renderer` sudah siap).                      |
| `error`  | (error)                | Kesalahan yang tidak teratasi saat memanggil _hook_.                                  |
| `close`  | (nuxt)                 | _Instance_ Nuxt ditutup dengan baik.                                                  |
| `listen` | (server, {host, port}) | Peladen **internal** Nuxt mulai berjalan. (Menggunakan `nuxt start` atau `nuxt dev`). |
