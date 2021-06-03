---
title: 'API: Properti build'
description: Nuxt.js memungkinkan Anda menyesuaikan konfigurasi webpack untuk membangun aplikasi web Anda sesuai keinginan.
menu: build
category: configuration
position: 101
---

# Properti build

> Nuxt.js memungkinkan Anda menyesuaikan konfigurasi webpack untuk membangun aplikasi web Anda sesuai keinginan.

## analyze

> Nuxt.js menggunakan [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) untuk memvisualisasikan bundel milik Anda dan bagaimana cara mengoptimalkannya.

- Type: `Boolean` atau `Object`
- Default: `false`

Jika itu merupakan Object, lihat properti yang tersedia [di sini](https://github.com/th0r/webpack-bundle-analyzer#as-plugin).

Contoh (`nuxt.config.js`):

```js
module.exports = {
  build: {
    analyze: true,
    // atau
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<div class="Alert Alert--teal">

**Info:** anda bisa menggunakan perintah `nuxt build --analyze` atau `nuxt build -a` untuk mem'build aplikasi dan menjalankan bundle analyzer pada [http://localhost:8888](http://localhost:8888).

</div>

## babel

> Kostumisasi konfigurasi Babel untuk file-file JavaScript dan Vue.

- Type: `Object`

- Default:

  ```js
  {
    presets: ['@nuxt/babel-preset-app']
  }
  ```

Contoh (`nuxt.config.js`):

```js
module.exports = {
  build: {
    babel: {
      presets: ['es2015', 'stage-0']
    }
  }
}
```

## cssSourceMap

- Type: `boolean`
- Default: `true` untuk dev (development) dan `false` untuk production.

> Mengaktifkan dukungan CSS Source Map

## devMiddleware

- Type: `Object`

Lihat [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) untuk opsi yang tersedia.

## extend

> Extend konfigurasi webpack secara manual untuk bundel client & server.

- Type: `Function`

Extend dipanggil (call) dua kali, satu kali untuk bundel server, dan satu kali untuk bundel klien. Uraian dari metode ini adalah:

1. Konfigurasi object pada webpack,
2. Object dengan keys berikut ini (semuanya boolean): `isDev`, `isClient`, `isServer`.

Contoh (`nuxt.config.js`):

```js
module.exports = {
  build: {
    extend(config, { isClient }) {
      // hanya mengExtend webpack config untuk client-bundle
      if (isClient) {
        config.devtool = 'eval-source-map'
      }
    }
  }
}
```

Jika anda ingin melihat lebih lanjut mengenai konfigurasi default webpack, lihat [direktori webpack](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config) kami.

## extractCSS

> Mengaktifkan Common CSS Extraction menggunakan Vue Server Renderer. [Baca panduan](https://ssr.vuejs.org/en/css.html).

- Type: `Boolean`
- Default: `false`

Menggunakan [`extract-css-chunks-webpack-plugin`](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin) untuk mengekstrak CSS menjadi beberapa bagian file-file CSS (otomatis terinjeksi dengan template), yang memungkinkan file ter-cache secara terpisah. Ini disarankan bila ada banyak CSS bersama (shared CSS). CSS di dalam komponen async akan tetap digabung sebagai string JavaScript dan ditangani oleh vue-style-loader.

## filenames

> Kostumisasi bundle filenames (nama-nama file).

- Type: `Object`

- Default:

  ```js
  {
    app: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
    chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
    css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
    img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
    font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
    video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
  }
  ```

Contoh berikut ini mengubah nama-nama chunk menjadi id numerik (`nuxt.config.js`):

```js
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    }
  }
}
```

Untuk lebih memahami penggunaan manifes dan vendor, lihat [dokumentasi webpack](https://webpack.js.org/guides/code-splitting-libraries/) ini.

## hotMiddleware

- Type: `Object`

Lihat [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) untuk opsi yang tersedia.

## plugins

> Menambahkan plugin-plugin webpack

- Type: `Array`
- Default: `[]`

Contoh (`nuxt.config.js`):

```js
const webpack = require('webpack')

module.exports = {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': require('./package.json').version
      })
    ]
  }
}
```

## postcss

> Kostumisasi plugin-plugin [PostCSS Loader](https://github.com/postcss/postcss-loader#usage).

- Type: `Array`, `Object` (direkomendasikan), `Function` atau `Boolean`

  **Catatan:** Ketika preset standarnya adalah OK dan cukup fleksibel untuk kasus penggunaan normal, penggunaan yang direkomendasikan oleh [`vue-loader`](https://vue-loader.vuejs.org/en/options.html#postcss) adalah menggunakan file `postcss.config.js` pada proyek Anda. Dengan membuat file tersebut maka akan otomatis terdeteksi dan pilihan ini terabaikan.

- Default:

  ```js
  {
    plugins: {
    'postcss-import' : {},
    'postcss-url': {},
    'postcss-cssnext': {}
    }
  }
  ```

Contoh (`nuxt.config.js`):

```js
module.exports = {
  build: {
    postcss: {
      plugins: {
        // Disable `postcss-url`
      'postcss-url': false

      // Kostumisasi `postcss-cssnext` default options
      'postcss-cssnext': {
        features: {
          customProperties: false
        }
      }

      // Add some plugins
      'postcss-nested': {},
      'postcss-responsive-type': {}
      'postcss-hexrgba': {}
      }
    }
  }
}
```

## publicPath

> Nuxt.js memungkinkan Anda mengunggah file dist Anda ke CDN Anda untuk performa yang maksimal, cukup dengan atur `publicPath` ke CDN Anda.

- Type: `String`
- Default: `'/_nuxt/'`

Contoh (`nuxt.config.js`):

```js
module.exports = {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

Kemudian, saat meluncurkan (launcing) `nuxt build` , unggah konten dari direktori `.nuxt/dist/` ke CDN dan lihat hasilnya!

## ssr

> Membuat bundel webpack khusus untuk perender SSR.

- Type: `Boolean`
- Default: `true` untuk mode Universal dan `false` untuk mode SPA

Pengaturan ini dipilih secara otomatis berdasarkan nilai `mode` jika tidak disediakan.

## templates

> Nuxt.js memungkinkan Anda menyediakan template Anda sendiri yang akan dirender berdasarkan konfigurasi Nuxt. Fitur ini sangat berguna untuk digunakan dengan [modul](/guide/modules) .

- Type: `Array`

Contoh (`nuxt.config.js`):

```js
module.exports = {
  build: {
    templates: [
      {
        src: '~/modules/support/plugin.js', // `src` can be absolute or relative
        dst: 'support.js', // `dst` is relative to project `.nuxt` dir
        options: {
          // Options are provided to template as `options` key
          live_chat: false
        }
      }
    ]
  }
}
```

Template dirender menggunakan [`lodash.template`](https://lodash.com/docs/#template). Anda dapat mempelajari lebih lanjut tentang cara menggunakannya [di sini](https://github.com/learn-co-students/javascript-lodash-templates-lab-v-000) .

## vendor

> Nuxt.js memungkinkan Anda menambahkan modul ke dalam file `vendor.bundle.js` untuk mengurangi ukuran bundel aplikasi. Hal ini sangat membantu saat menggunakan modul eksternal (seperti `axios` misalnya).

- Type: `Array`

Untuk menambahkan modul/file di dalam bundel vendor, tambahkan key `build.vendor` di dalam `nuxt.config.js` :

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

Anda juga bisa membuat file path, seperti kustom librari yang sudah Anda buat:

```js
module.exports = {
  build: {
    vendor: ['axios', '~/plugins/my-lib.js']
  }
}
```

## watch

> Anda dapat menyediakan file kostum untuk dapat memantau dan memperbaruinya setelah melakukan perubahan pada file tersebut. Fitur ini sangat berguna untuk digunakan bersama [modul](/guide/modules) .

- Type: `Array<String>`

```js
module.exports = {
  build: {
    watch: ['~/.nuxt/support.js']
  }
}
```

## followSymlinks

> By default, the build process does not scan files inside symlinks. This boolean includes them, thus allowing usage of symlinks inside folders such as the "pages" folder, for example.

- Type: `Boolean`

```js
export default {
  build: {
    followSymlinks: true
  }
}
```
