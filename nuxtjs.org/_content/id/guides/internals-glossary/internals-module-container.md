---
title: 'Kelas ModuleContainer'
description: Kelas ModuleContainer Nuxt
menu: Module Container
category: internals-glossary
position: 6
---

- Sumber: **[core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)**

Semua [modul](/docs/2.x/directory-structure/modules) akan dipanggil di dalam konteks _instance_ `ModuleContainer`.

## Tapable plugins

Anda dapat mendaftarkan _hooks_ pada siklus hidup Nuxt tertentu.

```js
nuxt.moduleContainer.plugin('ready', async moduleContainer => {
  // Lakukan ini setelah semua modul sudah siap
})
```

Di dalam konteks [modul](/docs/2.x/directory-structure/modules) Anda dapat menggunakan ini sebagai gantinya:

```js
this.plugin('ready', async moduleContainer => {
  // Lakukan ini setelah semua modul sudah siap
})
```

| Plugin  | Argumen         | Kapan                                                |
| ------- | --------------- | ---------------------------------------------------- |
| `ready` | moduleContainer | Semua modul di `nuxt.config.js` telah diinisialisasi |

## Metode

### addVendor (vendor)

**Tidak berlaku karena `vendor` tidak digunakan lagi**

Menambahkan ke `options.build.vendor` dan menerapkan filter unik.

### addTemplate (template)

- **template**: `String` atau `Object`
  - `src`
  - `options`
  - `fileName`

Memuat templat yang diberikan menggunakan [templat lodash](https://lodash.com/docs/4.17.4#template) saat membangun ke `buildDir` proyek (`.nuxt`).

Jika `fileName` tidak tersedia atau `template` adalah _string_, nama berkas target diubah secara bawaan ke `[dirName].[fileName].[pathHash].[ext]`.

Metode ini mengembalikan objek _final_ `{ dst, src, options }`.

### addPlugin (template)

- **template**: Properti objek (`src`, `options`, `fileName`, `mode`).

Mendaftarkan plugin menggunakan `addTemplate` dan menambahkannya ke larik `plugins[]`.

```js
this.addPlugin({
  src: path.resolve(__dirname, 'templates/foo.js'),
  fileName: 'foo.server.js' // [opsional] hanya sertakan di bundel peladen
  options: moduleOptions
})
```

**Catatan:** Anda dapat menggunakan _modifiers_ `mode` atau `.client` dan `.server` dengan opsi `fileName` untuk menggunakan plugin hanya di sisi pengguna atau peladen. (Lihat [plugins](/docs/2.x/directory-structure/plugins#name-conventional-plugin) untuk semua opsi yang tersedia)

Jika Anda menentukan `fileName`, Anda juga dapat mengonfigurasi _path_ untuk `fileName`, sehingga Anda dapat memilih struktur direktori di dalam direktori `.nuxt` untuk mencegah nama yang sama:

```js
{
  fileName: path.join('folder', 'foo.client.js'), // akan menghasilkan `.nuxt/folder/foo.client.js`
}
```

### addServerMiddleware (middleware)

Mendorong _middleware_ ke [options.serverMiddleware](/docs/2.x/configuration-glossary/configuration-servermiddleware).

### extendBuild (fn)

Mempermudah perluasan _build config_ webpack dengan merangkai fungsi [options.build.extend](/docs/2.x/configuration-glossary/configuration-build#extend).

### extendRoutes (fn)

Mempermudah perluasan rute dengan merangkai fungsi [options.build.extendRoutes](/docs/2.x/configuration-glossary/configuration-router#extendroutes).

### addModule (moduleOpts, requireOnce)

Fungsi asinkron

Mendaftarkan modul. `moduleOpts` dapat berupa _string_ atau _array_ (`[src, options]`). Jika `requireOnce` adalah `true` dan modul menghasilkan `meta`, itu mencegah pendaftaran modul yang sama dua kali.

### requireModule (moduleOpts)

Fungsi asinkron

Jalan pintas untuk `addModule(moduleOpts, true)`

## Hooks

Anda dapat mendaftarkan _hooks_ pada siklus hidup Nuxt tertentu.

| Hook             | Argumen                    | Kapan                                                                                           |
| ---------------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
| `modules:before` | (moduleContainer, options) | Dipanggil sebelum membuat kelas ModuleContainer, berguna untuk meng-_overload_ metode dan opsi. |
| `modules:done`   | (moduleContainer)          | Dipanggil setelah semua modul dimuat.                                                           |
