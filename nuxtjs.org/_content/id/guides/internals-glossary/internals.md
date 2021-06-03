---
title: 'Pengantar Modul Nuxt'
description: Memahami lebih dalam tentang internal Nuxt
menu: Nuxt Modules
category: internals-glossary
position: 3
---

Nuxt.js memiliki arsitektur yang sepenuhnya modular yang membuka kesempatan bagi pengembang untuk memperluas bagian apapun dari Nuxt Core menggunakan sebuah API yang fleksibel.

Anda dapat membaca [Panduan Modul](/docs/2.x/directory-structure/modules) untuk mempelajari lebih lanjut apabila Anda tertarik untuk mengembangkan modul Anda sendiri.

Dokumen ini membantu Anda untuk akrab dengan internal Nuxt dan dapat digunakan sebagai acuan ketika Anda mengembangkan modul Anda sendiri.

### Core

Kelas-kelas berikut merupakan kelas utama dalam Nuxt dan tersedia baik pada saat waktu eksekusi maupun pada saat kode program dibangun.

#### Nuxt

- [Kelas `Nuxt`](/docs/2.x/internals-glossary/internals-nuxt)
- Sumber: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)

#### Renderer

- [Kelas `Renderer`](/docs/2.x/internals-glossary/internals-renderer)
- Sumber: [vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)

#### ModuleContainer

- [Kelas `ModuleContainer`](/docs/2.x/internals-glossary/internals-module-container)
- Source: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)

### Build

Kelas-kelas berikut hanya dibutuhkan pada saat pengembangan atau pada saat kode program dibangun.

#### Builder

- [Kelas `Builder`](/docs/2.x/internals-glossary/internals-builder)
- Sumber: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)

#### Generator

- [Kelas `Generator`](/docs/2.x/internals-glossary/internals-generator)
- Sumber: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)

### Common

#### Utils

- Sumber: [utils/src](https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src)

#### Options

- Sumber: [config/options.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/config/src/options.js)

## Pengemasan dan Penggunaan

Nuxt mengekspor seluruh kelas secara umum untuk mengimpor kelas-kelas tersebut:

```js
import { Nuxt, Builder, Utils } from 'nuxt'
```

## Pola-pola Umum

Seluruh kelas Nuxt memiliki sebuah acuan pada objek dan konfigurasi `nuxt`, sehingga Anda selalu mempunyai API yang konsisten pada seluruh kelas untuk mengakses `options` dan `nuxt`.

```js
class SebuahKelas {
  constructor(nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  sebuahFungsi() {
    // Anda memiliki akses terhadap `this.nuxt` dan `this.options`
  }
}
```

Kelas merupakan hal yang _pluggable_ sehingga kelas harus mendaftarkan sebuah _plugin_ pada objek `nuxt` utama supaya dapat menambahkan _hooks_ tambahan.

```js
class KelasFoo {
  constructor(nuxt) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options

    this.nuxt.callHook('foo', this)
  }
}
```

Sehingga, Anda dapat menambahkan _hook_ pada modul `foo` dengan cara:

```js
nuxt.hook('foo', foo => {
  // ...
})
```
