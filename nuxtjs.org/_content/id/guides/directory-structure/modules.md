---
title: modules
description: Nuxt.js menyediakan sistem modul tingkat tinggi yang memungkinkan untuk memperluas inti. Modul adalah fungsi yang dipanggil secara berurutan saat mem-boot Nuxt.js.
position: 9
category: directory-structure
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/04_directory_structure/10_modules?fontsize=14&hidenavigation=1&theme=dark
img: /docs/2.x/plugins.jpg
imgAlt: modules-servermiddleware-plugins-in-nuxt-js
questions:
  - question: Kapan modul dipanggil?
    answers:
      - sebelum Nuxt.js dimulai
      - saat Nuxt.js dijalankan
      - setelah Nuxt.js dimulai
    correctAnswer: sebelum Nuxt.js dimulai
  - question: Modul Nuxt.js dapat digabungkan ke dalam paket npm
    answers:
      - true
      - false
    correctAnswer: true
  - question: Di berkas nuxt.config.js Anda, di bawah properti apa Anda menambahkan modul?
    answers:
      - nuxtModules
      - modules
      - plugins
    correctAnswer: modules
  - question: Urutan Anda menambahkan modul ke berkas nuxt.config.js adalah penting
    answers:
      - true
      - false
    correctAnswer: true
  - question: Di mana Anda harus menambahkan modul yang hanya diperlukan selama pengembangan dan waktu pembuatan?
    answers:
      - modules
      - build
      - buildModules
    correctAnswer: buildModules
  - question: Apa sebenarnya modul itu?
    answers:
      - arrays
      - functions
      - plugins
    correctAnswer: functions
  - question: Apa yang kita gunakan ketika kita ingin melakukan sesuatu hanya pada kondisi tertentu dan tidak hanya selama inisialisasi Nuxt.js?
    answers:
      - plugins
      - hooks
      - asyncData
    correctAnswer: hooks
  - question: modul bisa
    answers:
      - hanya digunakan sebagai paket npm
      - hanya dapat langsung disertakan dalam kode sumber proyek Anda
      - keduanya
    correctAnswer: keduanya
  - question: Baris mana yang diperlukan jika Anda menerbitkan modul Anda sebagai paket npm?
    answers:
      - module.exports
      - module.exports.meta
      - module.exports.module
    correctAnswer: module.exports.meta
  - question: Anda dapat memberi tahu Nuxt.js untuk memuat modul dengan parameter opsional sebagai opsi
    answers:
      - true
      - false
    correctAnswer: true
---

## Exploring Nuxt Modules

Temukan [daftar modul](https://modules.nuxtjs.org) kami untuk meningkatkan proyek Nuxt Anda, yang dibuat oleh tim dan komunitas Nuxt.

- 145+ Modules
- 89+ Maintainers

<base-alert type="next">

Periksa [modules.nuxtjs.org](https://modules.nuxtjs.org)

</base-alert>

<app-modal :src="img" :alt="imgAlt"></app-modal>

Saat mengembangkan aplikasi tingkat produksi dengan Nuxt.js, Anda mungkin menemukan bahwa fungsionalitas inti framework tidak cukup. Nuxt.js dapat diperluas dengan opsi konfigurasi dan plugin, tetapi mempertahankan kustomisasi ini di banyak proyek itu membosankan, berulang, dan memakan waktu. Di sisi lain, mendukung setiap kebutuhan proyek di luar kotak akan membuat Nuxt.js sangat kompleks dan sulit digunakan.

Inilah salah satu alasan mengapa Nuxt.js menyediakan sistem modul tingkat tinggi yang memungkinkan untuk memperluas fitur utama. Modul adalah fungsi yang dipanggil secara berurutan saat mem-_boot_ Nuxt.js. Nuxt.js menunggu setiap modul selesai sebelum melanjutkan ke modul selanjutnya. Dengan cara ini, modul dapat menyesuaikan hampir semua aspek proyek Anda. Berkat desain modular Nuxt.js (berdasarkan webpack [Tapable](https://github.com/webpack/tapable)), modul dapat dengan mudah mennambahkan _hook_ untuk _entrypoint_ tertentu seperti inisialisasi builder. Modul juga dapat mengganti templat, mengonfigurasi webpack loader, menambahkan pustaka CSS, dan melakukan banyak tugas berguna lainnya.

Yang terbaik dari semuanya, modul Nuxt.js dapat digabungkan ke dalam paket NPM. Hal ini memungkinkan (modul) dapat digunakan kembali di seluruh proyek dan dibagikan dengan komunitas, membantu menciptakan ekosistem _add-on_ berkualitas tinggi.

## The modules Property

Modul adalah ekstensi Nuxt.js yang dapat memperluas fungsionalitas utama kerangka kerja dan menambahkan integrasi tanpa akhir. Setelah Anda memasang modul, Anda dapat menambahkannya ke berkas nuxt.config.js di bawah properti modules.

```js{}[nuxt.config.js]
export default {
  modules: [
    // Menggunakan nama paket NPM
    '@nuxtjs/axios',

    // Relatif terhadap struktur `srcDir` proyek Anda
    '~/modules/awesome.js',

    // Memberikan opsi
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // Definisi sebaris (_inline_)
    function () {}
  ]
}
```

<base-alert type="info">

Pengembang modul biasanya memberikan langkah dan detail tambahan yang diperlukan untuk penggunaan.

</base-alert>

Nuxt.js mencoba menyelesaikan setiap item dalam larik modul menggunakan jalur yang dibutuhkan node (dalam `node_modules`) dan kemudian akan menyelesaikan dari proyek `srcDir` jika alias `@` digunakan.

<base-alert>

Modul dijalankan secara berurutan sehingga urutannya penting.

</base-alert>

Modul harus mengekspor fungsi untuk meningkatkan build/runtime dan secara opsional mengembalikan sebuah promise sampai tugasnya selesai. Perhatikan bahwa mereka diimpor saat runtime sehingga seharusnya sudah ditranspilasi jika menggunakan fitur terbaru ES6.

## Write your own Module

Modul adalah fungsi. Mereka dapat dikemas sebagai modul NPM atau langsung disertakan dalam kode sumber proyek Anda.

```js{}[nuxt.config.js]
export default {
  exampleMsg: 'hello',
  modules: [
    // Contoh penggunaan
    '~/modules/example',
    // Menambahkan opsi secara langsung
    ['~/modules/example', { token: '123' }]
  ]
}
```

```js{}[modules/example.js]
export default function ExampleModule(moduleOptions) {
  console.log(moduleOptions.token) // '123'
  console.log(this.options.exampleMsg) // 'hello'

  this.nuxt.hook('ready', async nuxt => {
    console.log('Nuxt is ready')
  })
}

// WAJIB ADA jika mempublikasikan modul sebagai paket NPM
module.exports.meta = require('./package.json')
```

## 1) ModuleOptions

`moduleOptions`: Ini adalah objek yang diteruskan menggunakan _larik_ `modules` oleh pengguna. Kita dapat menggunakannya untuk menyesuaikan perilakunya.

### Top level options

Terkadang akan lebih mudah jika kita dapat menggunakan opsi level atas saat mendaftarkan modul di `nuxt.config.js`. Ini memungkinkan kami untuk menggabungkan berbagai sumber opsi.

```js{}[nuxt.config.js]
export default {
  modules: [['@nuxtjs/axios', { anotherOption: true }]],

  // modul axios memahami opsi ini menggunakan `this.options.axios`
  axios: {
    option1,
    option2
  }
}
```

## 2) this.options

`this.options`: Anda bisa langsung mengakses opsi Nuxt.js menggunakan referensi ini. Ini adalah konten dari pengguna `nuxt.config.js` dengan semua opsi default yang ditetapkan padanya. Ini dapat digunakan untuk opsi bersama antar modul.

```js{}[module.js]
export default function (moduleOptions) {
  // `options` berisi option1, option2 dan anotherOption
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // ...
}
```

### Add a CSS Library

Jika modul Anda akan menyediakan pustaka CSS, pastikan untuk melakukan pemeriksaan jika pengguna sudah menyertakan pustaka untuk menghindari duplikat, dan tambahkan opsi untuk menonaktifkan pustaka CSS di modul.

```js{}[module.js]
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Menambahkan modul Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```

### Emit assets

Kita dapat mendaftarkan plugin webpack untuk mengeluarkan aset selama pembuatan.

```js{}[module.js]
export default function (moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  this.options.build.plugins.push({
    apply(compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // Kode di bawah ini akan menghasilkan `.nuxt/dist/info.txt' dengan konten variabel `info`.
        // `source` dapat berupa buffer juga
        compilation.assets['info.txt'] = {
          source: () => info,
          size: () => info.length
        }

        cb()
      })
    }
  })
}
```

## 3) this.nuxt

`this.nuxt`: Ini adalah referensi ke instance Nuxt.js saat ini. Kita dapat mendaftarkan pengait pada peristiwa siklus hidup tertentu.

- **Ready** : Nuxt siap untuk bekerja (ModuleContainer dan Renderer siap).

```js
nuxt.hook('ready', async nuxt => {
  // Letakkan kode _custom_ Anda di sini
})
```

- **Error**: Galat yang tidak tertangani saat memanggil hook.

```js
nuxt.hook('error', async error => {
  // Letakkan kode _custom_ Anda di sini
})
```

- **Tutup**: Instance Nuxt ditutup dengan baik.

```js
nuxt.hook('close', async nuxt => {
  // Letakkan kode _custom_ Anda di sini
})
```

- **Listen**: Peladen (_server_) internal Nuxt mulai mendengarkan (_listening_). (Menggunakan `nuxt start` atau `nuxt dev`)

```js
nuxt.hook('listen', async (server, {host, port})) => {
  // Letakkan kode _custom_ Anda di sini
})
```

`this`: Konteks modul. Semua modul akan dipanggil dalam konteks instance ModuleContainer.

Silahkan lihat dokumentasi mengenai kelas [ModuleContainer](/docs/2.x/internals-glossary/internals-module-container) untuk mengetahui metode yang tersedia.

### Run Tasks on Specific hooks

Modul Anda mungkin perlu melakukan hal-hal hanya pada kondisi tertentu dan tidak hanya selama inisialisasi Nuxt.js. Kita bisa menggunakan hook Nuxt.js yang kuat untuk melakukan tugas pada acara tertentu (berdasarkan [Hookable](https://github.com/nuxt-contrib/hookable)). Nuxt.js akan menunggu fungsi Anda jika ia mengembalikan Promise atau didefinisikan sebagai `async`.

Berikut beberapa contoh dasar:

```js{}[modules/myModule.js]
export default function myModule() {
  this.nuxt.hook('modules:done', moduleContainer => {
    // Kode di sini akan dipanggil ketika semua modul telah sukses termuat
  })

  this.nuxt.hook('render:before', renderer => {
    // Kode di sini akan dipanggil setelah semua pe-_render_ selesai dibuat
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // Kode di sini akan dipanggil sebelum memulai _compiler_ (default: webpack)
  })

  this.nuxt.hook('generate:before', async generator => {
    // Kode di sini akan dipanggil sebelum Nuxt _generate_ halaman-halaman Anda
  })
}
```

### Provide plugins

Biasanya modul menyediakan satu atau lebih plugin saat ditambahkan. Misalnya modul [bootstrap-vue](https://bootstrap-vue.js.org/) akan mendaftarkan sendiri ke Vue. Dalam situasi seperti itu kita bisa menggunakan fungsi bantuan `this.addPlugin`.

```js{}[plugin.js]
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```

```js{}[module.js]
import path from 'path'

export default function nuxtBootstrapVue(moduleOptions) {
  // Mendaftarkan templat `plugin.js`
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

### Template plugins

Templat dan plugin terdaftar dapat memanfaatkan [templat lodash](https://lodash.com/docs/4.17.4#template) untuk mengubah hasil keluaran plugin yang terdaftar dengan syarat-syarat tertentu.

```js{}[plugin.js]
// Mengatur Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Kode yang dijalankan ketika proses pengembangan
<% } %>
```

```js{}[module.js]
import path from 'path'

export default function nuxtGoogleAnalytics(moduleOptions) {
  // Mendaftarkan templat `plugin.js`
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt akan mengganti `options.ua` dengan `123` ketika menggandakan plugin untuk proyek yang kita buat
      ua: 123,

      // bagian kode yang menggunakan mode pengembangan akan dihilangkan dari kode plugin pada hasil produksi
      debug: this.options.dev
    }
  })
}
```

### Register custom webpack loaders

Kita bisa melakukan hal yang sama seperti `build.extend` di `nuxt.config.js` menggunakan `this.extendBuild`.

```js{}[module.js]
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` Loader
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Meng-_custom_ _loader_ yang sebelumnya tersedia
      // Mengacu pada kode sumber internal Nuxt berikut:
      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

## Async Modules

Tidak semua modul akan melakukan semuanya secara sinkronus. Misalnya, Anda mungkin ingin mengembangkan modul yang perlu mengambil beberapa API atau melakukan operasi asinkronus. Dalam kasus ini, Nuxt.js mendukung modul asinkronus yang dapat mengembalikan Promise atau memanggil callback.

### Use async/await

```js
import fse from 'fs-extra'

export default async function asyncModule() {
  // Anda dapat melakukan pekerjaan asinkronus menggunakan `async`/`await`
  const pages = await fse.readJson('./pages.json')
}
```

### Return a Promise

```js
export default function asyncModule($http) {
  return $http
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Melakukan sesuatu dengan meng-_extend_ _route_ Nuxt
    })
}
```

<base-alert type="info">

Ada lebih banyak kait (_hook_) dan kemungkinan yang dapat kita lakukan untuk modul. Silakan baca [Internal Nuxt](/docs/2.x/internals-glossary/internals) untuk mengetahui lebih lanjut tentang API nuxt-internal.

</base-alert>

## Publishing your module

`module.exports.meta`: Baris ini diperlukan jika Anda menerbitkan modul sebagai paket NPM. Nuxt secara internal menggunakan meta untuk bekerja lebih baik dengan paket Anda.

```js{}[modules/myModule.js]
module.exports.meta = require('./package.json')
```

## buildModules

Beberapa modul hanya diimpor selama pengembangan dan waktu pembuatan. Penggunaan `buildModules` membantu mempercepat proses produksi dan juga secara signifikan mengurangi ukuran `node_modules` Anda untuk penerapan produksi. Silakan merujuk ke dokumentasi berikut untuk setiap modul guna mengetahui apakah direkomendasikan untuk menggunakan `modules` atau `buildModules`.

Perbedaan penggunaannya adalah:

- Daripada menambahkan ke `modules` di dalam `nuxt.config.js`, gunakan `buildModules`

```js{}[nuxt.config.js]
export default {
  buildModules: ['@nuxtjs/eslint-module']
}
```

- Daripada menambahkan ke `dependencies` di dalam `package.json`, gunakan `devDependencies`

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D @nuxtjs/eslint-module
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save-dev @nuxtjs/eslint-module
```

  </code-block>
</code-group>

<base-alert type="info">

Jika Anda adalah pembuat modul, sangat disarankan untuk menyarankan pengguna memasang paket Anda sebagai `devDependency` dan gunakan `buildModules` alih-alih `modules` untuk `nuxt.config.js`.

</base-alert>

Modul Anda adalah `buildModule` kecuali:

- Ini menyediakan serverMiddleware
- Ini harus mendaftarkan hook runtime Node.js (Seperti penjaga)
- Ini mempengaruhi perilaku vue-renderer atau menggunakan hook dari `server:` atau namespace `vue-renderer:`
- Apa pun yang berada di luar cakupan webpack (Petunjuk: plugin dan template dikompilasi dan berada dalam cakupan webpack)

<base-alert>

Jika Anda akan menyarankan untuk pengguna Anda menggunakan `buildModules`, harap sebutkan bahwa fitur ini hanya tersedia sejak Nuxt v2.9. Pengguna Nuxt versi sebelumnya harus memutakhirkan Nuxt atau menggunakan bagian `modules`.

</base-alert>

<quiz :questions="questions"></quiz>
