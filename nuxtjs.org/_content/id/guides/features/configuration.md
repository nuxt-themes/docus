---
title: Konfigurasi
description: Secara bawaan, Nuxt.js dikonfigurasi untuk mencakup sebagian besar kasus penggunaan. Konfigurasi bawaan ini dapat ditimpa dengan berkas nuxt.config.js.
position: 7
category: features
csb_link_host_port: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_host_port?fontsize=14&hidenavigation=1&theme=dark
csb_link_pre-processors: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/03_features/07_configuration_pre-processors?fontsize=14&hidenavigation=1&theme=dark
questions:
  - question: Anda dapat menggunakan axios-module pada berkas nuxt.config.js?
    answers:
      - true
      - false
    correctAnswer: false
  - question: Apa _server_ pengembangan bawaan dari Nuxt.js?
    answers:
      - localhost
      - 3000
      - '0'
    correctAnswer: localhost
  - question: Atribut mana yang Anda gunakan pada tag _style_ untuk menggunakan SCSS?
    answers:
      - lang="scss"
      - language="scss"
      - style="scss"
    correctAnswer: lang="scss"
  - question: Apa port _server_ pengembangan bawaan dari Nuxt.js?
    answers:
      - 8000
      - 3000
      - localhost
    correctAnswer: 3000
  - question: Pada Nuxt.config.js, apa properti yang Anda gunakan untuk menambahkan berkas CSS secara global?
    answers:
      - styles
      - css
      - globalCss
    correctAnswer: css
  - question: Apakah Anda dapat menggunakan JSX di aplikasi Nuxt.js?
    answers:
      - True
      - False
    correctAnswer: True
  - question: Pada Nuxt.config.js, apa properti yang Anda gunakan untuk menambahkan berkas CSS secara global?
    answers:
      - styles
      - css
      - global-css
    correctAnswer: css
  - question: Pada Nuxt.config.js, apa properti yang Anda gunakan untuk memperpanjang (extend) konfigurasi webpack?
    answers:
      - webpack.extend
      - build.extend
      - extend.build
    correctAnswer: build.extend
  - question: Apa berkas yang dipanggil untuk mengabaikan berkas di Nuxt.js?
    answers:
      - .ignore
      - .nuxtignore
      - .ignorenuxt
    correctAnswer: .nuxtignore
  - question: Jika Anda ingin mengabaikan berkas di Nuxt.js, apa prefix yang akan Anda gunakan?
    answers:
      - _about.vue
      - -about.vue
      - __about.vue
    correctAnswer: -about.vue
---

Secara bawaan, Nuxt.js dikonfigurasi untuk mencakup sebagian besar kasus penggunaan. Konfigurasi bawaan ini dapat ditimpa dengan berkas nuxt.config.js.

## Properti CSS

Nuxt.js mengizinkan Anda untuk mendefinisikan berkas/modul/pustaka yang ingin Anda setel secara _global_ (termasuk setiap halaman).

<base-alert>

Seandainya Anda ingin menggunakan `sass`, pastikan Anda telah memasang paket (_packages_) `sass` dan `sass-loader`.

</base-alert>

Pada `nuxt.config.js`, tambahkan sumber CSS:

```js{}[nuxt.config.js]
export default {
  css: [
    // Muat Node.js module secara langsung (disini sebuah berkas SASS)
    'bulma',
    // berkas CSS pada proyek
    '~/assets/css/main.css',
    // berkas SCSS pada proyek
    '~/assets/css/main.scss'
  ]
}
```

<base-alert>

Nuxt.js akan secara otomatis menebak berkas berdasarkan jenis ekstensi berkas dan menggunakan pemuat _pre-processor_ yang pantas untuk webpack. Anda masih harus memasang pemuat yang dibutuhkan jika Anda akan menggunakan mereka.

</base-alert>

### Ekstensi berkas

Anda dapat menghilangkan ekstensi berkas untuk berkas CSS/SCSS/Postcss/Less/Stylus yang terdaftar dalam CSS di berkas konfigurasi nuxt Anda.

```js{}[nuxt.config.js]
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

<base-alert>

Jika Anda memiliki dua berkas dengan nama yang sama contoh `main.scss` dan `main.css`, dan tidak mendefinisikan ekstensi pada _array_ CSS, contoh `css: ['~/assets/css/main']`. Kemudian hanya satu berkas yang akan dimuat tergantung berdasarkan urutan pada `styleExtensions`. Pada kasus ini hanya berkas `css` yang akan dimuat dan `scss` akan diabaikan karena `css` berada pada urutan awal di _array_ `styleExtension`.

</base-alert>

Urutan secara default: `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`

<app-modal>
  <code-sandbox  :src="csb_link_pre-processors"></code-sandbox>
</app-modal>

## Pre-processors

Terima kasih kepada [Vue Loader](http://vue-loader.vuejs.org/en/configurations/pre-processors.html), Anda dapat menggunakan setiap jenis _pre-processor_ untuk `<template>` atau `<style>`: dengan menggunakan atribut `lang`.

Contoh dari `pages/index.vue` kami menggunakan [Pug](https://github.com/pugjs/pug) dan [Sass](http://sass-lang.com/):

```html{}[pages/index.vue]
<template lang="pug"> h1.red Hello {{ name }}! </template>

<style lang="scss">
  .red {
    color: red;
  }
</style>
```

Untuk menggunakan _pre-processors_ ini, kita perlu memasang beberapa pemuat Webpack:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D pug pug-plain-loader
yarn add -D sass sass-loader@10 fibers
```

  </code-block>
  <code-block label="npm">

```bash
npm install --save-dev pug pug-plain-loader
npm install --save-dev sass sass-loader@10 fibers
```

  </code-block>
</code-group>

## JSX

Nuxt.js menggunakan [@nuxt/babel-preset-app](https://github.com/nuxt/nuxt.js/tree/dev/packages/babel-preset-app), yang berdasarkan sumber resmi [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) untuk konfigurasi asli Babel, jadi Anda dapat menggunakan JSX pada komponen Anda.

Anda juga dapat menggunakan JSX pada metode `render` dari komponen Anda:

```js
<script>
export default {
  data () {
    return { name: 'World' }
  },
  render (h) {
    return <h1 class="red">{this.name}</h1>
  }
}
</script>
```

Mengaliaskan (_alias_) dari `createElement` ke `h` adalah hal yang umum, Anda akan melihat pada ekosistem Vue namun sebenarnya ini opsional untuk JSX mengingat ini [secara otomatis menginjeksi](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection) `const h = this.$createElement` pada metode apapun dan _getter_ (bukan fungsi atau _arrow function_) dideklarasikan pada sintak ES2015 yang memiliki JSX, jadi Anda dapat menghilangkan parameter (h).

Anda dapat mempelajari lebih lanjut bagaimana menggunakan [JSX](https://vuejs.org/v2/guide/render-function.html#JSX) pada dokumentasi Vue.js.

## Mengabaikan berkas

### .nuxtignore

Anda dapat menggunakan `.nuxtignore` untuk mengizinkan Nuxt.js mengabaikan berkas `layout`, `page`, `store` and `middleware` pada dasar direktori proyek (`rootDir`) ketika fase _build_. berkas `.nuxtignore` merujuk pada spesifikasi yang sama seperti berkas `.gitignore` dan `.eslintignore`, di mana setiap baris adalah sekumpulan pola yang menunjukkan berkas mana yang harus diabaikan.

```markdown{}[.nuxtignore]
# abaikan layout foo.vue

layouts/foo.vue

# abaikan berkas layout yang namanya berakhir dengan -ignore.vue

layouts/\*-ignore.vue

# abaikan page bar.vue

pages/bar.vue

# abaikan halaman didalam folder ignore

pages/ignore/\*.vue

# abaikan store baz.js

store/baz.js

# abaikan berkas store yang cocok dengan _.test._

store/ignore/_.test._

# abaikan berkas middleware didalam folder foo kecuali foo/bar.js

middleware/foo/\*.js !middleware/foo/bar.js
```

### Properti ignorePrefix

Setiap berkas pada `pages/`, `layout/`, `middleware/` atau `store/` akan diabaikan ketika _build_ jika nama berkasnya dimulai dengan awalan yang telah dispesifikasikan di _ignorePrefix_.

Secara nilai bawaan semua berkas yang dimulai dengan `-` akan diabaikan, seperti `store/-foo.js` dan `pages/-bar.vue`. Hal ini memungkinkan pengujian, utilitas, dan komponen dengan pemanggilnya tanpa diubah menjadi _routes_, _store_, dll.

### Properti Ignore

Dapat lebih dikustomisasi daripada _ignorePrefix_: semua berkas yang cocok dengan sekumpulan pola yang dispesifikasikan di dalam _ignore_ akan diabaikan ketika proses _build_.

```js{}[nuxt.config.js]
export default {
  ignore: 'pages/bar.vue'
}
```

### ignoreOptions

`nuxtignore` menggunakan `node-ignore` pada dasarnya, `ignoreOptions` dapat dikonfigurasikan sebagai `options` pada `node-ignore`.

```js{}[nuxt.config.js]
export default {
  ignoreOptions: {
    ignorecase: false
  }
}
```

## Memperpanjang Konfigurasi Webpack

Anda dapat memperpanjang konfigurasi webpack pada Nuxt.js melalui opsi `extend` pada berkas `nuxt.config.js`. Opsi `extend` pada properti `build` adalah sebuah metode yang menerima dua argumen. Argumen pertama adalah sebuah objek `config` webpack yang diekspor dari konfigurasi webpack pada Nuxt.js. Argumen kedua adalah sebuah objek konteks dengan properti _boolean_ sebagai berikut ini: `{ isDev, isClient, isServer, loaders }`.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      // memasang webpack ke mode pengembangan jika `isDev` bernilai `true`
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
```

Metode `extend` dipanggil dua kali, pertama untuk membundel klien dan selebihnya untuk membundel _server_.

### Mengkustomisasi konfigurasi _Chunks_

Anda mungkin ingin mengubah [konfigurasi optimasi](/docs/2.x/configuration-glossary/configuration-build#optimization) sedikit untuk menghindari penulisan ulang dari objek bawaan.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
      }
    }
  }
}
```

### Eksekusi ESLint pada setiap membangun webpack di lingkungan pengembangan

Untuk lebih perhatian terhadap gaya kode yang galat, Anda mungkin ingin menjalankan [ESLint](https://github.com/webpack-contrib/eslint-loader) pada setiap _build_ pada lingkungan pengembangan.

```js{}[nuxt.config.js]
export default {
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
```

## Mengubah _host_ dan _port_

Secara bawaan, _server_ pengembangan Nuxt.js adalah `localhost` yang mana hanya dapat diakses dari dalam mesin _host_. Untuk melihat aplikasi Anda pada perangkat lain, Anda perlu memodifikasi _host_. Anda dapat memodifikasi _host_ di berkas `nuxt.config.js`.

_Host_ `'0.0.0.0'` dirancang untuk memberi tahu Nuxt.js agar menetapkan alamat _host_, yang dapat diakses oleh koneksi di luar mesin _host_ (misalnya LAN). Jika _host_ diberi nilai string `'0'` (bukan 0, yang mana berarti _false_), atau `' 0.0.0.0'` alamat IP lokal Anda akan ditetapkan ke aplikasi Nuxt.js Anda.

```js{}[nuxt.config.js]
export default {
  server: {
    host: '0' // bawaan: localhost
  }
}
```

Anda juga dapat mengubah nomor _port_ dari _port_ 3000 yang merupakan _port_ bawaan.

```js{}[nuxt.config.js]
export default {
  server: {
    port: 8000 // bawaan: 3000
  }
}
```

<base-alert type="info">

Jika _port_ diberikan nilai _string_ `'0'` (bukan 0, yang mana berarti _false_), _port_ acak akan diberikan ke aplikasi Nuxt.js Anda.

</base-alert>

Meskipun Anda dapat memodifikasi ini pada berkas nuxt.config.js, ini tidak disarankan karena dapat mengakibatkan masalah ketika menunggah ke _hosting_.

```bash
HOST=0 PORT=8000 npm run dev
```

atau buatlah sebuah skrip di berkas package.json

```json
"scripts": {
  "dev:host": "nuxt --hostname '0' --port 8000"
}
```

<app-modal>
  <code-sandbox  :src="csb_link_host_port"></code-sandbox>
</app-modal>

## Konfigurasi Asinkron

Meskipun lebih baik menggunakan konfigurasi normal `export default {}` Anda bisa memiliki konfigurasi asinkron dengan mengekspor fungsi asinkron yang mengembalikan konfigurasi objek.

```js{}[nuxt.config.js]
import axios from 'axios'

export default async () => {
  const data = await axios.get('https://api.nuxtjs.dev/posts')
  return {
    head: {
      title: data.title
      //... sisa dari konfigurasi
    }
  }
}
```

<base-alert>

_Axios-module_ tidak dapat digunakan di `nuxt.config.js`. Anda harus melakukan _import_ `axios` dan mengkonfigurasikan itu kembali.

</base-alert>

## Konfigurasi lebih lanjut

<base-alert type="next">

`Nuxt.config.js` memiliki lebih banyak opsi penyesuaian dan konfigurasi! Lihat semua kuncinya di [glosarium konfigurasi](/docs/2.x/configuration-glossary/configuration-build).

</base-alert>

<quiz :questions="questions"></quiz>
