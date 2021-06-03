---
title: nuxt.config
description: Secara bawaan, Nuxt.js dikonfigurasi untuk mencakup sebagian besar kasus penggunaan. Konfigurasi bawaan ini dapat ditimpa dengan berkas nuxt.config.js.
position: 14
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/15_nuxt-config?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
  - question:
    answers:
      -
      -
      -
    correctAnswer:
---

Secara bawaan, Nuxt.js dikonfigurasi untuk mencakup sebagian besar kasus penggunaan. Konfigurasi bawaan ini dapat ditimpa dengan berkas nuxt.config.js.

## nuxt.config.js

### alias

Opsi ini memungkinkan Anda untuk mendefinisikan alias yang akan tersedia dalam JavaScript dan CSS.

```js{}[nuxt.config.js]
import { resolve } from 'path'

export default {
  alias: {
    'style': resolve(__dirname, './assets/style')
  }
}
```

<base-alert type="next">

Lihat selengkapnya di [properti alias](/docs/2.x/configuration-glossary/configuration-alias)

</base-alert>

### build

Opsi ini memungkinkan Anda mengonfigurasi berbagai pengaturan untuk langkah `build`, termasuk ` loaders`, `filenames`, konfigurasi `webpack`, dan `transpilation`.

```js{}[nuxt.config.js]
export default {
  build: {
    /*
     ** Anda dapat memperluas konfigurasi webpack di sini
     */
    extend(config, ctx) {}
  }
}
```

<base-alert type="next">

Lihat selengkapnya di [properti build](/docs/2.x/configuration-glossary/configuration-build)

</base-alert>

### css

Opsi ini memungkinkan Anda untuk mendefinisikan berkas CSS, modul, dan pustaka yang ingin disertakan secara global (di setiap laman).

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main.css', '~/assets/css/animations.scss']
}
```

Anda dapat menghilangkan ekstensi berkas untuk berkas CSS, SCSS, Postcss, Less, Stylus, ... yang terdaftar dalam larik css di berkas konfigurasi nuxt.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

Dengan menghilangkan ekstensi, misalnya jika Anda memiliki berkas CSS dan memutuskan untuk menggunakan SASS, Anda tidak perlu memperbarui nuxt.config karena akan menggunakan ekstensi baru selama nama berkas tetap sama.

<base-alert type="next">

Lihat selengkapnya di [properti css](/docs/2.x/configuration-glossary/configuration-css)

</base-alert>

### dev

Opsi ini memungkinkan Anda untuk mendefinisikan mode `pengembangan` atau` produksi` Nuxt.js (penting saat Anda menggunakan Nuxt.js secara terprogram)

```js{}[nuxt.config.js]
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

<base-alert type="next">

Lihat selengkapnya di [properti dev](/docs/2.x/configuration-glossary/configuration-dev)

</base-alert>

### env

Opsi ini memungkinkan Anda untuk mendefinisikan variabel lingkungan yang diperlukan pada waktu _build_ (bukan _runtime_) seperti `NODE_ENV=staging` atau `VERSION=1.2.3`. Namun, untuk variabel lingkungan _runtime_, diperlukan `runtimeConfig`.

```js{}[nuxt.config.js]
export default {
  env: {
    baseURL: process.env.BASE_URL
  }
}
```

### runtimeConfig

Konfigurasi _runtime_ memiliki dukungan [dotenv](https://github.com/motdotla/dotenv) bawaan untuk keamanan yang lebih baik dan pengembangan yang lebih cepat. Konfigurasi _runtime_ ditambahkan ke _payload_ Nuxt sehingga tidak perlu membangun kembali untuk memperbarui konfigurasi _runtime_ saat bekerja dalam pengembangan atau dengan aplikasi _server-side rendering_ atau _client-only_. (Untuk situs statis, Anda masih perlu membuat ulang situs Anda untuk melihat perubahan.)

#### dukungan `.env`

Jika Anda memiliki berkas `.env` di direktori akar proyek Anda, berkas tersebut akan secara otomatis dimuat ke dalam `process.env` dan dapat diakses dalam `nuxt.config`/`serverMiddleware` dan berkas lain yang diimpor.

Anda dapat menyesuaikan jalur dengan menggunakan `--dotenv <file>` atau menonaktifkan sepenuhnya dengan `--dotenv false`. Misalnya, Anda mungkin menetapkan berkas `.env` yang berbeda dalam lingkungan produksi, pementasan, atau pengembangan.

#### `publicRuntimeConfig`

- harus menampung semua variabel env yang bersifat publik karena ini akan diekspos di _frontend_. Misalnya referensi ke URL publik.
- tersedia di peladen dan klien menggunakan `$config`.

```js{}[nuxt.config.js]
export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://nuxtjs.org'
  }
}
```

#### `privateRuntimeConfig`

- harus menampung semua variabel env yang bersifat pribadi dan yang tidak boleh diekspos di _frontend_. Misalnya referensi ke token rahasia API.
- hanya tersedia di peladen yang menggunakan `$config` yang sama (ini menggantikan publicRuntimeConfig)

```js{}[nuxt.config.js]
export default {
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  }
}
```

#### **Menggunakan nilai konfigurasi Anda:**

Anda dapat mengakses nilai-nilai ini di mana saja dengan menggunakan konteks di laman, penyimpanan, komponen, dan _plugin_ dengan menggunakan `this.$Config` atau `context.$Config`.

```html{}[pages/index.vue]
<script>
  asyncData ({ $config: { baseURL } }) {
    const posts = await fetch(`${baseURL}/posts`)
      .then(res => res.json())
  }
</script>
```

Di dalam templat, Anda dapat mengakses runtimeConfigs secara langsung menggunakan `$config.*`

```html{}[pages/index.vue]
<template>
  <p>Our Url is: {{ $config.baseURL}}</p>
</template>
```

<base-alert>

Konfigurasi pribadi Anda dapat diekspos jika Anda menggunakan `$config` di luar konteks _server-only_ (misalnya, jika Anda menggunakan `$config` di `fetch`, `asyncData` atau langsung di dalam templat).

</base-alert>

<base-alert type="next">

Lihat selengkapnya di [runtimeConfig](/docs/2.x/configuration-glossary/configuration-runtime-config)

</base-alert>

<base-alert type="next">

Lihat entri blog kami tentang [Berpindah dari @nuxtjs/dotenv ke konfigurasi _runtime_](/blog/moving-from-nuxtjs-dotenv-to-runtime-config)

</base-alert>

<base-alert type="next">

Lihat selengkapnya di [properti env](/docs/2.x/configuration-glossary/configuration-env)

</base-alert>

### generate

Opsi ini memungkinkan Anda mengatur nilai parameter untuk setiap rute dinamis dalam aplikasi Anda yang akan diubah menjadi berkas HTML oleh Nuxt.js.

```js{}[nuxt.config.js]
export default {
  generate: {
    dir: 'gh_pages', // bukan dist/ tapi gh_pages/
    subFolders: false // Berkas HTML dibuat sesuai dengan jalur rute
  }
}
```

<base-alert type="next">

Lihat selengkapnya di [properti generate](/docs/2.x/configuration-glossary/configuration-generate)

</base-alert>

### head

```js{}[nuxt.config.js]
export default {
	head: {
    title: 'my title',
    meta: [
      { charset: 'utf-8' },
			.....
		]
	}
}
```

Opsi ini memungkinkan Anda untuk mendefinisikan semua tag meta bawaan untuk aplikasi Anda.

<base-alert type="next">

Lebih lanjut lihat [integrasi head](/docs/2.x/configuration-glossary/configuration-head)

</base-alert>

### loading

Opsi ini memungkinkan Anda menyesuaikan komponen pemuatan bawaan yang digunakan Nuxt.js.

```js{}[nuxt.config.js]
export default {
  loading: {
    color: '#fff'
  }
}
```

<base-alert type="next">

Lebih lanjut lihat [integrasi loading](/docs/2.x/configuration-glossary/configuration-loading)

</base-alert>

### modules

Dengan opsi ini Anda dapat menambahkan modul Nuxt.js ke proyek Anda.

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxtjs/axios']
}
```

<base-alert type="next">

Lihat selengkapnya di [properti modules](/docs/2.x/configuration-glossary/configuration-modules)

</base-alert>

### modulesDir

Properti modulesDir digunakan untuk mengatur direktori modul untuk penyelesaian jalur. Misalnya: resolveLoading, nodeExternals, dan postcss _Webpack_. Jalur konfigurasi relatif terhadap `options.rootDir` (bawaan: process.cwd()).

```js{}[nuxt.config.js]
export default {
  modulesDir: ['../../node_modules']
}
```

Menyesuaikan lokasi ini mungkin diperlukan jika proyek diatur sebagai ruang kerja Yarn dengan mono-repositori.

<base-alert type="next">

Lihat selengkapnya di [properti modulesDir](/docs/2.x/configuration-glossary/configuration-modulesdir)

</base-alert>

### plugins

Opsi ini memungkinkan Anda untuk mendefinisikan _plugin_ JavaScript yang harus dijalankan sebelum _instantiate_ _root_ aplikasi Vue.js.

```js{}[nuxt.config.js]
export default {
  plugins: ['~/plugins/url-helpers.js']
}
```

<base-alert type="next">

Lihat selengkapnya di [properti plugins](/docs/2.x/configuration-glossary/configuration-plugins)

</base-alert>

### router

Dengan opsi `router` Anda dapat menimpa konfigurasi Vue Router bawaan dari Nuxt.js.

```js{}[nuxt.config.js]
export default {
  router: {
    linkExactActiveClass: 'text-primary'
  }
}
```

<base-alert type="next">

Lihat selengkapnya di [properti router](/docs/2.x/configuration-glossary/configuration-router)

</base-alert>

### server

Opsi ini memungkinkan Anda untuk mengkonfigurasi variabel koneksi untuk _instance_ peladen dari aplikasi Nuxt.js.

```js{}[nuxt.config.js]
import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

<base-alert type="next">

Lihat selengkapnya di [properti server](/docs/2.x/configuration-glossary/configuration-server)

</base-alert>

### srcDir

Opsi ini memungkinkan Anda untuk mendefinisikan direktori sumber dari aplikasi Nuxt.js.

```js{}[nuxt.config.js]
export default {
  srcDir: 'client/'
}
```

Contoh struktur proyek aplikasi Nuxt.js di direktori `client`.

```bash
**-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| client/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/**
```

### dir

Opsi ini memungkinkan Anda untuk mendefinisikan nama khusus untuk direktori Nuxt.js.

```js{}[nuxt.config.js]
export default {
  pages: 'views' // Nuxt akan mencari di direktori views/ bukan di direktori pages/
}
```

<base-alert type="next">

Lihat selengkapnya di [properti dir](/docs/2.x/configuration-glossary/configuration-dir)

</base-alert>

### pageTransition

Opsi ini memungkinkan Anda untuk mendefinisikan properti bawaan dari transisi laman.

```js{}[nuxt.config.js]
export default {
  pageTransition: 'page'
}
```

<base-alert type="next">

Lihat selengkapnya di [properti transition](/docs/2.x/configuration-glossary/configuration-transition)

</base-alert>

## Berkas konfigurasi lainnya

Selain `nuxt.config.js`, mungkin ada beberapa berkas konfigurasi lainnya di _root_ proyek Anda, seperti [.eslintrc](https://eslint.org/), [prettier.config.json](https://prettier.io/) atau [.gitignore](https://git-scm.com/docs/gitignore). Berkas-berkas ini digunakan untuk mengonfigurasi alat-alat lain seperti linter, pemformat kode, atau repositori git Anda dan terpisah dari `nuxt.config.js`.

### .gitignore

Dalam berkas .gitignore, Anda perlu menambahkan yang berikut ini agar diabaikan dan tidak ditambahkan ke kontrol versi. `node_modules` yang merupakan tempat semua modul yang terinstal berada. Direktori `nuxt` yang dibuat saat menjalankan perintah dev atau build. Direktori `dist` yang merupakan direktori yang dibuat saat menjalankan perintah generate.

```markdown{}[.gitignore]
node_modules
.nuxt
dist
```

### Apa selanjutnya

<base-alert type="next">

Lihat [glosarium-konfigurasi](/docs/2.x/configuration-glossary/configuration-build)

</base-alert>
