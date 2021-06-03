---
title: 'API: Kelas ModuleContainer'
description: Kelas ModuleContainer Nuxt
menu: Module Container
category: internals
position: 304
---

# Kelas ModuleContainer

- Sumber: **[core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)**

Semua [modules](/guide/modules) akan dipanggil di dalam konteks dari instansi `ModuleContainer`.

## Plugin yang dapat ditukar (Tapable plugins)

Kita bisa mendaftarkan kait (hooks) pada peristiwa siklus hidup (life cycle) tertentu.

```js
nuxt.moduleContainer.plugin('ready', async moduleContainer => {
  // Lakukan hal ini setelah semua modul siap
})
```

Di dalam konteks [modules](/guide/modules) kita bisa menggunakan ini sebagai gantinya:

```js
this.plugin('ready', async moduleContainer => {
  // Lakukan hal ini setelah semua modul siap
})
```

| Plugin  | Argumen         | Keterangan                                           |
| ------- | --------------- | ---------------------------------------------------- |
| `ready` | moduleContainer | Semua modul di `nuxt.config.js` telah diinisialisasi |

## Metode

### addVendor (vendor)

Menambahkan ke `options.build.vendor` dan menerapkan filter yang unik.

### addTemplate (template)

- **template**: `String` atau `Object`
  - `src`
  - `options`
  - `fileName`

Me-render templat yang diberikan menggunakan [lodash template](https://lodash.com/docs/4.17.4#template) selama membangun (build) ke `buildDir` proyek (`.nuxt`).

Jika `fileName` tidak tersedia atau `template` adalah string, nama default target berkas (file) menjadi `[dirName].[fileName].[pathHash].[ext]`.

Metode ini mengembalikan objek akhir `{ dist, src, options }`.

### addPlugin (template)

Mendaftarkan (register) plugin menggunakan `addTemplate` dan menambahkannya ke opsi pertama `plugins[]`.

Anda dapat menggunakan `template.ssr: false` untuk menonaktifkan plugin yang termasuk dalam paket (bundle) SSR.

### addServerMiddleware (middleware)

Memasukkan middleware ke [options.serverMiddleware](/api/configuration-servermiddleware).

### extendBuild (fn)

Memungkinkan menambahkan/mengubah konfigurasi webpack build dengan mudah, dengan menghubungkannya pada fungsi [options.build.extend](/api/configuration-build#extend).

### extendRoutes (fn)

Memungkinkan menambah/mengubah rute dengan mudah, dengan menghubungkannya pada fungsi [options.build.extendRoutes](/api/configuration-router#extendroutes).

### addModule (moduleOpts, requireOnce)

Mendaftarkan (register) modul. `moduleOpts` dapat berupa string atau `[src, options]`. Jika `requireOnce` bernilai `true` dan modul yang ditemukan (resolved) mengekspor `meta` dapat mencegah pendaftaran modul yang sama dua kali.

### requireModule (moduleOpts)

Sebuah jalan pintas untuk `addModule(moduleOpts, true)`
