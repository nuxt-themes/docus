---
title: 'API: Kelas Nuxt'
description: Kelas Inti Nuxt
menu: Nuxt
category: internals
position: 302
---

# Kelas Nuxt

- Sumber: **[core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)**

Ini adalah wadah inti yang memungkinkan semua modul dan kelas berkomunikasi satu sama lain. Semua modul memiliki akses ke instansi Nuxt menggunakan `this.nuxt`.

## Plugin yang dapat ditukar (Tapable plugins)

Kita bisa mendaftarkan kait (hooks) pada peristiwa siklus hidup (life cycle) tertentu.

```js
nuxt.plugin('ready', async nuxt => {
  // Kode kustom Anda di sini
})
```

| Plugin   | Argumen                | Keterangan                                                                                          |
| -------- | ---------------------- | --------------------------------------------------------------------------------------------------- |
| `ready`  | nuxt                   | Semua modul diinisialisasi dan sebelum menginisialisasi `renderer`                                  |
| `error`  | error args             | An unhandled error by one of Nuxt modules caught                                                    |
| `close`  | -                      | Instansi Nuxt ditutup dengan luwes                                                                  |
| `listen` | ({server, host, port}) | **Internal** server Nuxt mulai mendengarkan (listening). (Menggunakan `nuxt start` atau `nuxt dev`) |
