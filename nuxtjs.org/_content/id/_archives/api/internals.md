---
title: 'API: Pengenalan Modul Nuxt '
description: Mengenal lebih baik mengenai bagian dalam (internal) Nuxt
menu: Intro
category: internals
position: 301
---

# Bagian Dalam Nuxt

Nuxt.js memiliki arsitektur modular sepenuhnya yang memungkinkan developer memperluas bagian Inti Nuxt (Core) menggunakan API yang fleksibel.

Silahkan lihat [Panduan Modul](/guide/modules) untuk informasi lebih lanjut jika tertarik untuk mengembangkan modul Anda sendiri.

Bagian ini membantu membiasakan diri dengan bagian dalam Nuxt dan dapat digunakan sebagai referensi untuk memahaminya dengan lebih baik saat menulis modul Anda sendiri.

### Core

Kelas-kelas ini adalah jantung dari Nuxt dan harus ada baik ketika runtime maupun build time.

#### Nuxt

- [Kelas `Nuxt`](/api/internals-nuxt)
- Sumber: [core/nuxt.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/nuxt.js)

#### Renderer

- [Kelas `Renderer`](/api/internals-renderer)
- Sumber: [vue-renderer/renderer.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-renderer/src/renderer.js)

#### ModuleContainer

- [Kelas `ModuleContainer`](/api/internals-module-container)
- Sumber: [core/module.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/module.js)

### Build

Kelas-kelas ini hanya dibutuhkan ketika mode build atau dev.

### Builder

- [Kelas `Builder`](/api/internals-builder)
- Sumber: [builder/builder.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/builder/src/builder.js)

#### Generator

- [Kelas `Generator`](/api/internals-generator)
- Sumber: [generator/generator.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)

### Common

#### Utils

- Sumber: [utils/src](https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src)

#### Options

- Sumber: [config/options.js](https://github.com/nuxt/nuxt.js/blob/dev/packages/config/src/options.js)

## Pengemasan & Penggunaan

Nuxt mengekspor semua kelas secara default. Cara untuk require:

```js
const { Nuxt, Builder, Utils } = require('nuxt')
```

## Bentuk Umum (Common patterns)

Semua kelas Nuxt merujuk pada instansi dan pilihan (options) `nuxt`. Setiap kelas meng-`extends` [`tappable`](https://github.com/nuxt/tappable), dengan cara ini kita selalu memiliki API yang konsisten di seluruh kelas untuk mengakses `options` dan `nuxt`.

```js
const Tapable = require('tappable')

class SomeClass extends Tapable {
  constructor(nuxt, builder) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options
  }

  someFunction() {
    // Kita memiliki akses ke `this.nuxt` dan `this.options`
  }
}
```

Kelas-kelas tersebut _plugable_ sehingga mereka harus mendaftarkan (register) plugin pada wadah (container) utama `nuxt` untuk mendaftarkan (register) pengait (hooks) lainnya.

```js
class FooClass extends Tapable {
  constructor(nuxt, builder) {
    super()
    this.nuxt = nuxt
    this.options = nuxt.options

    this.nuxt.applyPluginsAsync('foo', this)
  }
}
```

Jadi kita dapat mengaitkan (hook) modul `foo` seperti ini:

```js
nuxt.plugin('foo', foo => {
  // ...
})
```
